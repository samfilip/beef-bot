import { SlashCommandBuilder } from 'discord.js';

const voidShout = {
    data: new SlashCommandBuilder()
        .setName('shout')
        .setDescription('Shout in to the void'),
    async execute(interaction) {
        const starter = interaction.user;
        await interaction.reply(`${starter} shouted in to the void. 🌌`);
    },
};

export default voidShout;