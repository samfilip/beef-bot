import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const nativepoll = {
    data: new SlashCommandBuilder()
        .setName('nativepoll')
        .setDescription('Create a native Discord poll')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('The poll question')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('option1')
                .setDescription('First option')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('option2')
                .setDescription('Second option')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('option3')
                .setDescription('Third option (optional)')
                .setRequired(false))
        .addStringOption(option => 
            option.setName('option4')
                .setDescription('Fourth option (optional)')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('multiselect')
                .setDescription('Allow users to select multiple options')
                .setRequired(false)),
                
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const optionStrings = [
            interaction.options.getString('option1'),
            interaction.options.getString('option2'),
            interaction.options.getString('option3'),
            interaction.options.getString('option4')
        ].filter(Boolean);

        const allowMultiselect = interaction.options.getBoolean('multiselect') || false;
        
        try {
            const pollOptions = optionStrings?.map(text => {
                return {
                    text: text
                };
            });

            const pollMessage = await interaction.channel.send({
                poll: {
                    question: { 
                      text: question
                    },
                    answers: pollOptions,
                    allowMultiselect: allowMultiselect
                }
            });

            const messageId = pollMessage.id;

            await interaction.reply({
                content: `Poll created successfully!\n\nPoll Message ID: \`${messageId}\`\n(You'll need this ID to reference this poll in other commands)`,
                ephemeral: true
            });
            
            console.log(`Poll created successfully with message ID: ${messageId}`);
            
            console.log(`Successfully created native poll: ${question}`);
        } catch (error) {
            console.error('Error creating native poll:', error);
            await interaction.reply({ 
                content: 'There was an error creating the poll. Make sure the bot has the "Create Polls" permission.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};

export default nativepoll;