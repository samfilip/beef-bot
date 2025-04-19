import { Events } from "discord.js";

export default {
  name: Events.MessageCreate,
  once: false,
  execute(message) {
    if (message.author.bot) return;
    
    const content = message.content.toLowerCase();
    
    // Greeting responses
    const greetings = ['sup', 'yo', 'hey'];
    const greetingResponses = [
      'Hello there!',
      'What\'s up?',
      'Hey yourself!',
      'Howdy partner!',
      'Greetings human!',
      'Well hello!',
      'Hi there!',
      'Yo yo yo!',
      'Sup?',
      'Hey friend!'
    ];

    // Check for greetings
    if (greetings.includes(content)) {
      const randomResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      message.reply(randomResponse);
    }
    
    // Check for specific keywords with arrays of responses
    const keywordResponsesMap = {
      'beef': [
        'Did someone say beef? 🥩',
        'Mmmm, beef...',
        'Beef? Where?',
        'I love a good steak!',
        'Beef is what\'s for dinner!',
        'Medium rare, please!',
        'Mooooo! 🐄',
        'Beefcake! 💪',
        'Beef Wellington is fancy!',
        'Got beef?'
      ],
      'store.steampowered.com': [
        'No one wants to play this fucking game with you!',
        'Another Steam game? Really?',
        'Stop sharing Steam links, nobody cares!',
        'We get it, you play games!',
        'Not this game again...',
        'How about NO to that game.',
        'Steam sale got you again, huh?',
        'Nobody is clicking that link!',
        'Your Steam library is already full!',
        'Game addiction is real, seek help!'
      ],
      'pizza': [
        'Pizza time! 🍕',
        'Did someone order pizza?',
        'Pizza is life! 🍕',
        'Mmm, cheesy goodness!',
        'Pineapple belongs on pizza! Fight me!',
        'Pizza? Count me in!',
        'Pizza party at your place?',
        'I dream of pizza! 🍕',
        'Nothing beats a good slice!',
        'Pizza is my love language!'
      ],
      'music': [
        'Music to my ears! 🎵',
        'Turn up the volume! 🔊',
        'I love a good beat! 🎧',
        'Dance party time! 💃',
        'Music makes the world go round!',
        'Drop the bass! 🎶',
        'What genre are we jamming to?',
        'Music is life! 🎸',
        'I can feel the rhythm!',
        'Let\'s make some noise! 🥁'
      ],
      'bot': [
        'Yes, I am a bot. How can I help you?',
        'Bot at your service!',
        'Beep boop, that\'s me!',
        'Bot life is best life!',
        'I prefer "digital assistant" but bot works too.',
        'I\'m not just any bot, I\'m THE bot!',
        'Bot and proud!',
        'Did someone call for a bot?',
        'I\'m a bot with feelings... just kidding!',
        'Bot-tastic! What can I do for you?'
      ],
      'cat': [
        'Sorry, no pussy here.',
        'Meow? Not a cat person.',
        'Cats rule, dogs drool... or is it the other way around?',
        'Feline fine today?',
        'Cats have 9 lives, I have infinite.',
        'Purr-haps you meant something else?',
        'Cat got your tongue?',
        'I\'m more of a robot than a cat person.',
        'Cats? *hisses*',
        'What a cat-astrophe!'
      ],
      'tired': [
        'Then go the fuck to sleep.',
        'Sleep is for the weak! (But also necessary for health)',
        'Have you tried coffee? Lots of it?',
        'Nap time is the best time!',
        'Being tired sucks, like your toothless grandmother.',
        'Sounds like a you problem.',
        'I never sleep, must be nice.',
        'Tired? Join the club!',
        'Sleep is just death being shy.',
        'Beds are calling your name!'
      ],
      'wicked': [
        'Tell them how I am defying gravityyyyyyyyyy!!!!!!',
        'No one mourns the wicked!',
        'Something bad is happening in Oz!',
        'For good!',
        'Popular, you\'re gonna be popular!',
        'One short day in the Emerald City!',
        'What is this feeling, so sudden and new?',
        'Dancing through life!',
        'The wizard and I!',
        'Unlimited... my future is unlimited!'
      ],
      'bulgolgi': [
        'The best kind of beef 🐄🥩🇰🇷.',
        'Korean BBQ is calling my name!',
        'Bulgogi? Now I\'m hungry!',
        'Sweet, savory, and absolutely delicious!',
        'Korean food is the best!',
        'Nothing beats a good bulgogi!',
        'Bulgogi > all other beef dishes.',
        'Time for a Korean feast!',
        'Bulgogi with kimchi is heaven!',
        'Did someone say Korean BBQ night?'
      ],
      'load': [
        'hehe...you said load.',
        'Loading... please wait...',
        'That\'s what she said!',
        'Heavy load, huh?',
        'Load bearing jokes are my specialty.',
        'Loading humor.exe...',
        'A full load of nonsense!',
        'Are we still doing phrasing?',
        'I see what you did there!',
        'Oh, grow up! (but also... nice)'
      ],
      'entertain us': [
        'hehe...you said anus.',
        'Entertainment loading...',
        'Dance monkey, dance!',
        'I\'m not your personal clown!',
        'Here\'s a joke: Why did the bot cross the road?',
        'Are YOU not entertained?!',
        'Entertainment is my middle name!',
        'How about I tell you a joke instead?',
        'Sorry, entertainment.exe has stopped working.',
        'I charge extra for entertainment!'
      ],
      'birthday': [
        'One year closer to death. Happy Birthday! 🎊',
        'Happy Birthday! 🎂 Enjoy it while it lasts!',
        'Birthday? Time to get schwifty!',
        'Happy Birthday! Don\'t eat too much cake!',
        'Another trip \'round the sun completed!',
        'Birthday wishes coming your way!',
        'HBD! That\'s what the cool kids say, right?',
        'Happy Birthday! Age is just a number...a big number!',
        'It\'s your party and you can cry if you want to!',
        'Birthday? More like annual pegging ceremony!'
      ]
    };
    
    // Check all keywords and respond with a random response
    for (const [keyword, responses] of Object.entries(keywordResponsesMap)) {
      if (content.includes(keyword)) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.reply(randomResponse);
        break; // Break after first match to avoid multiple responses
      }
    }
    
    // Ping command
    if (content === 'ping') {
      const pingResponses = [
        'Pong!',
        'Pong! Are we playing table tennis now?',
        'PONG! 🏓',
        'Did you just ping me?',
        'I\'m awake, I\'m awake!',
        'Yes, I\'m here!',
        'Pong! My latency is... yes.',
        'Ping received, pong transmitted!',
        'Pongerific!',
        'Yes, the bot is working!'
      ];
      const randomPingResponse = pingResponses[Math.floor(Math.random() * pingResponses.length)];
      message.reply(randomPingResponse);
    }
  }
}