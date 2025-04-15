
// commands/startbeef.js
import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const startbeef = {
    data: new SlashCommandBuilder()
        .setName('startbeef')
        .setDescription('Start some beef with another user')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to start beef with')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const starter = interaction.user;

        if (target.id === interaction.client.user.id) {
            return interaction.reply({
                content: "You can't start beef with me, I'm just a bot!",
                flags: MessageFlags.Ephemeral
            });
        }

        if (target.id === starter.id) {
            return interaction.reply({
                content: "You can't start beef with yourself!",
                flags: MessageFlags.Ephemeral
            });
        }
        
        await interaction.reply(`${starter} started some beef with ${target}. Let's get Beefy!`);
    },
};

export default startbeef;