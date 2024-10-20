const fs = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'addresponse',
    description: 'Add a question and multiple answers to the responses file',
    options: [
        {
            name: 'question',
            type: 3,
            description: 'The question to add',
            required: true,
        },
        {
            name: 'answer',
            type: 3,
            description: 'The answer to add (separate multiple answers with a comma)',
            required: true,
        },
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return await interaction.reply('You do not have permission to use this command.');
        }

        const question = interaction.options.getString('question');
        const answerString = interaction.options.getString('answer');

        const answers = answerString.split(',').map(answer => answer.trim());

        const filePath = path.join(__dirname, '../../responses.json');

        let responses = {};
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            responses = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`File not found, creating new responses.json at: ${filePath}`);
            } else {
                console.error('Error reading responses.json:', error);
            }
        }

        if (responses[question]) {
            responses[question] = [...new Set([...responses[question], ...answers])];
        } else {
            responses[question] = answers;
        }

        try {
            fs.writeFileSync(filePath, JSON.stringify(responses, null, 2), 'utf-8');
            await interaction.reply(`Added question: "${question}" and answers: "${answers.join(', ')}"`);
        } catch (error) {
            console.error('Error writing to responses.json:', error);
            await interaction.reply('An error occurred while adding the question and answers.');
        }
    },
};
