import { Events } from "discord.js";
import getLLMResponse from "../ollama/response.js";

export default {
  name: Events.MessageCreate,
  once: false,
  lastResponseTime: 0,
  COOLDOWN_DURATION: 10 * 60 * 1000,
  async execute(message) {
    if (message.author.bot) return;

    const now = Date.now();
    if (now - this.lastResponseTime < this.COOLDOWN_DURATION) {
      console.log(`Still on cool down for ${this.COOLDOWN_DURATION - this.lastResponseTime}. Ignore this message`);
      return;
    }
    
    const content = message.content.toLowerCase();

    const greetings = ['sup', 'yo', 'hey'];
    if (greetings.includes(content)) {
      message.channel.sendTyping();
      const botResponse = await getLLMResponse('greeting');
      this.lastResponseTime = Date.now();
      message.reply(botResponse);
      return;
    }
    
    const keywordPrompts = {
      'beef': 'Generate a funny response about beef or steak',
      'help': 'The user needs help. Tell them to use the /help command in a casual way',
      'store.steampowered.com': 'Someone shared a Steam game link. Tell them no one wants to play their game in a rude but funny way',
      'pizza': 'React enthusiastically to someone mentioning pizza',
      'music': 'React enthusiastically to someone mentioning music',
      'bot': 'Someone maybe mentioned that you, Lil\' beef, are a bot. Acknowledge this in a clever way and maybe pick a fight',
      'cat': 'Make a sarcastic joke about cats with a subtle reference to the slang meaning of "pussy"',
      'tired': 'Tell someone who is tired to go to sleep in a rude but funny way',
      'wicked': 'Make a reference to the musical Wicked, specifically about defying gravity',
      'bulgolgi': 'Say something enthusiastic about Korean bulgogi beef and how Koreans are superior',
      'load': 'Make an innuendo joke about the word "load"',
      'birthday': 'Give a darkly humorous birthday message about getting closer to death'
    };

    for (const [keyword, prompt] of Object.entries(keywordPrompts)) {
      if (content.includes(keyword)) {
        message.channel.sendTyping();
        const botResponse = await getLLMResponse(prompt, content);
        message.reply(botResponse);
        this.lastResponseTime = Date.now();
        return;
      }
    }

    if (content === 'ping') {
      message.channel.sendTyping();
      const botResponse = await getLLMResponse('ping');
      message.reply(botResponse);
      this.lastResponseTime = Date.now();
    }
  }
}