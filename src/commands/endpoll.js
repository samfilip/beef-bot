// commands/endpoll.js
import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const endpoll = {
    data: new SlashCommandBuilder()
        .setName('endpoll')
        .setDescription('End an existing poll')
        .addStringOption(option => 
            option.setName('message_id')
                .setDescription('The ID of the message containing the poll')
                .setRequired(true)),
                
    async execute(interaction) {
        const messageId = interaction.options.getString('message_id');
        
        try {
            const message = await interaction.channel.messages.fetch(messageId);
            
            if (!message.poll) {
                return interaction.reply({
                    content: 'This message does not contain a poll.',
                    flags: MessageFlags.Ephemeral
                });
            }

            await message.poll.end();

            await interaction.reply({
                content: `Poll "${message.poll.question.text}" has been ended successfully.`
            });

        } catch (error) {
            console.error('Error ending poll:', error);
            await interaction.reply({
                content: 'There was an error ending the poll. Make sure the message ID is correct and the bot has the necessary permissions.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};

export default endpoll;