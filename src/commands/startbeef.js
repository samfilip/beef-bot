import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import getLLMResponse from '../ollama/response.js';

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
        const prompt = `Say something along the lines of Let's get ready to rumble as well as some vile trash talk about ${target}. Do not tag ${target} in your response.`
        const message = `${starter} started some beef with ${target}`

        const response = await getLLMResponse(prompt);
        
        await interaction.reply(`${message}. ${response}`);
    },
};

export default startbeef;