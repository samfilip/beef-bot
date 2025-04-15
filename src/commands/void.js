import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const startbeef = {
    data: new SlashCommandBuilder()
        .setName('shout')
        .setDescription('Shout in to the void'),
    async execute(interaction) {
        const starter = interaction.user;
        await interaction.reply(`${starter} shouted in to the void. 🌌`);
    },
};

export default startbeef;