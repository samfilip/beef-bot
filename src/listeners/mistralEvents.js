import { Events } from "discord.js";
import axios from "axios";

// Try both localhost and the Windows host from WSL
const WINDOWS_HOST = "host.docker.internal"; // This is often how WSL can access Windows

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    
    const content = message.content.toLowerCase();
    
    // Only implement a simpler version for testing
    if (content === 'ping') {
      // Start typing - will stop automatically when message is sent
      message.channel.sendTyping();
      
      try {
        // Try to connect to Ollama with a short timeout
        console.log("Attempting to connect to Ollama...");
        
        // Try Windows host first
        let modelResponse;
        try {
          console.log(`Trying Windows host: ${WINDOWS_HOST}`);
          const response = await axios.post(`http://${WINDOWS_HOST}:11434/api/generate`, {
            model: "mistral",
            prompt: "Reply with only the word 'PONG' in all caps.",
            stream: false
          }, { timeout: 5000 }); // 5 second timeout
          
          modelResponse = response.data.response;
          console.log("Got response from Windows host!");
        } catch (windowsError) {
          console.log(`Windows host error: ${windowsError.message}`);
          
          // Try localhost as fallback
          console.log("Trying localhost fallback...");
          const response = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral",
            prompt: "Reply with only the word 'PONG' in all caps.",
            stream: false
          }, { timeout: 5000 }); // 5 second timeout
          
          modelResponse = response.data.response;
          console.log("Got response from localhost!");
        }
        
        // Send the response
        message.reply(modelResponse || "Pong! (default response)");
      } catch (error) {
        // Log the error and send a fallback response
        console.error("Error connecting to Ollama:", error.message);
        message.reply("Pong! (I couldn't reach Ollama - check your server connection)");
      }
    }
    
    // Add a diagnostic command
    if (content === 'test ollama') {
      message.reply("Testing connection to Ollama, please wait...");
      
      try {
        // Try multiple methods to connect
        const methods = [
          { name: "Windows host", url: `http://${WINDOWS_HOST}:11434/api/tags` },
          { name: "Localhost", url: "http://localhost:11434/api/tags" },
          // You can add more potential hosts here
        ];
        
        let results = [];
        
        for (const method of methods) {
          try {
            console.log(`Testing ${method.name} at ${method.url}`);
            const startTime = Date.now();
            const response = await axios.get(method.url, { timeout: 3000 });
            const endTime = Date.now();
            
            results.push(`✅ ${method.name}: Success (${endTime - startTime}ms)`);
            console.log(`${method.name} succeeded!`);
          } catch (err) {
            results.push(`❌ ${method.name}: Failed (${err.message})`);
            console.log(`${method.name} failed: ${err.message}`);
          }
        }
        
        // Send the results
        message.reply(`Ollama connection test results:\n${results.join('\n')}`);
      } catch (error) {
        console.error("Error during Ollama test:", error);
        message.reply("Error running Ollama connection tests. Check the console for details.");
      }
    }
  }
}