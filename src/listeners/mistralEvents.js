import { Events } from "discord.js";
import getLLMResponse from "../ollama/response.js";

export default {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    
    const content = message.content.toLowerCase();

    const greetings = ['sup', 'yo', 'hey'];
    if (greetings.includes(content)) {
      message.channel.sendTyping();
      const botResponse = await getLLMResponse('greeting');
      message.reply(botResponse);
      return;
    }
    
    const keywordPrompts = {
      'beef': 'Generate a funny response about beef or steak',
      'help': 'The user needs help. Tell them to use the /help command in a casual way',
      'store.steampowered.com': 'Someone shared a Steam game link. Tell them no one wants to play their game in a rude but funny way',
      'pizza': 'React enthusiastically to someone mentioning pizza',
      'music': 'React enthusiastically to someone mentioning music',
      'bot': 'Someone mentioned you are a bot. Acknowledge this in a clever way',
      'cat': 'Make a sarcastic joke about cats with a subtle reference to the slang meaning of "pussy"',
      'tired': 'Tell someone who is tired to go to sleep in a rude but funny way',
      'wicked': 'Make a reference to the musical Wicked, specifically about defying gravity',
      'bulgolgi': 'Say something enthusiastic about Korean bulgogi beef',
      'load': 'Make an innuendo joke about the word "load"',
      'entertain us': 'Make a pun that connects "entertain us" with "anus"',
      'birthday': 'Give a darkly humorous birthday message about getting closer to death'
    };

    for (const [keyword, prompt] of Object.entries(keywordPrompts)) {
      if (content.includes(keyword)) {
        message.channel.sendTyping();
        const botResponse = await getLLMResponse(prompt, content);
        message.reply(botResponse);
        return;
      }
    }

    if (content === 'ping') {
      message.channel.sendTyping();
      const botResponse = await getLLMResponse('ping');
      message.reply(botResponse);
    }
  }
}