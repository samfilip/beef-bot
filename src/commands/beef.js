import { SlashCommandBuilder } from 'discord.js';

const beef = {
    data: new SlashCommandBuilder()
        .setName('beef')
        .setDescription('Gives the beef'),
    async execute(interaction) {
        await interaction.reply({ content: "Here's your beef: 🥩" });
    },
};

export default beef;