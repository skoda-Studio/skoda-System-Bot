const fs = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'removeresponse',
    description: 'Remove a question and all its answers from the responses file',
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return await interaction.reply('You do not have permission to use this command.');
        }

        const filePath = path.join(__dirname, '../../responses.json');

        let responses = {};
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            responses = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`File not found: ${filePath}`);
                return await interaction.reply('Responses file not found.');
            } else {
                console.error('Error reading responses.json:', error);
                return await interaction.reply('An error occurred while reading the responses file.');
            }
        }

        const questions = Object.keys(responses);
        if (questions.length === 0) {
            return await interaction.reply('No questions found in the responses.');
        }

        const options = questions.map(question => ({
            label: question,
            value: question,
        }));

        const questionSelectMenu = {
            type: 1,
            components: [
                {
                    type: 3,
                    custom_id: 'select_question_menu',
                    placeholder: 'Select a question to delete...',
                    options: options,
                },
            ],
        };

        await interaction.reply({
            content: 'Please select a question to delete:',
            components: [questionSelectMenu],
        });

        const filter = i => i.customId === 'select_question_menu' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            const selectedQuestion = i.values[0];

            delete responses[selectedQuestion];

            fs.writeFileSync(filePath, JSON.stringify(responses, null, 2), 'utf-8');
            await i.reply(`Deleted question: "${selectedQuestion}" along with its answers.`);

            collector.stop();
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp('You did not select any question in time.');
            }
        });
    },
};
