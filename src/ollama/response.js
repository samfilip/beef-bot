import axios from "axios";

const OLLAMA_ENDPOINT = "http://localhost:11434/api/generate";

const defaultResponses = {
  'greeting': 'Hello there!',
  'beef': 'Did someone say beef? 🥩',
  'help': 'Need help? Try using the /help command!',
  'steam': 'No one wants to play this fucking game with you!',
  'pizza': 'Pizza time! 🍕',
  'music': 'Music to my ears! 🎵',
  'bot': 'Yes, I am a bot. How can I help you?',
  'cat': 'Sorry, no pussy here.',
  'tired': 'Then go the fuck to sleep.',
  'wicked': 'Tell them how I am defying gravityyyyyyyyyy!!!!!!',
  'bulgolgi': 'The best kind of beef 🐄🥩🇰🇷.',
  'load': 'hehe...you said load.',
  'entertain us': 'hehe...you said anus.',
  'birthday': 'One year closer to death. Happy Birthday! 🎊',
  'ping': 'Pong!'
};

export default async function getLLMResponse(prompt, message = '') {
  try {
    const response = await axios.post(OLLAMA_ENDPOINT, {
      model: "mistral",
      prompt: `You are a funny and extremely sarcastic Discord bot. Keep responses very short, casual, and entertaining but can be very rude and crass. 
              Use as much profanity as you want or none if you don't want to. 
              Your target audience is male gamers in their thirties. 
              Respond to this message if present: ${message}, and consider the prompt associated with the keyword: "${prompt}"
              Make your response no longer than one sentence if possible and only provide one line as if a conversational jab`,
      stream: false
    }, { timeout: 10000 });
    
    return response.data.response;
  } catch (error) {
    console.error(`Error getting LLM response: ${error.message}`);
    return defaultResponses[prompt] || "I'm not feeling very creative right now.";
  }
}
