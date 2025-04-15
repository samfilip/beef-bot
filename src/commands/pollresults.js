// commands/pollresults.js
import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';

const pollresults = {
    data: new SlashCommandBuilder()
        .setName('pollresults')
        .setDescription('Get detailed results for an existing poll')
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

            const poll = message.poll;

            const resultsEmbed = new EmbedBuilder()
                .setTitle(`Poll Results: ${poll.question.text}`)
                .setColor(0x0099FF)
                .setTimestamp();

            let totalVotes = 0;
            poll.answers.forEach((answer) => {
                totalVotes += answer.voteCount || 0;
            });
            
            poll.answers.forEach((answer, index) => {
                const voteCount = answer.voteCount || 0;
                const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                const progressBarLength = 20;
                const filledBars = Math.round((percentage / 100) * progressBarLength);
                const progressBar = '█'.repeat(filledBars) + '░'.repeat(progressBarLength - filledBars);
                
                resultsEmbed.addFields({
                    name: `Option ${index + 1}: ${answer.text}`,
                    value: `${progressBar} ${voteCount} votes (${percentage}%)`
                });
            });

            resultsEmbed.addFields(
                { name: 'Total Votes', value: `${totalVotes}`, inline: true },
                { name: 'Status', value: poll.resultsFinalized ? 'Ended' : 'Active', inline: true }
            );
            
            if (poll.expiresAt) {
                resultsEmbed.addFields({
                    name: 'Expires',
                    value: `<t:${Math.floor(poll.expiresTimestamp / 1000)}:R>`,
                    inline: true
                });
            }

            await interaction.reply({
                embeds: [resultsEmbed]
            });
            
        } catch (error) {
            console.error('Error getting poll results:', error);
            await interaction.reply({
                content: 'There was an error getting the poll results. Make sure the message ID is correct and the bot has the necessary permissions.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};

export default pollresults;