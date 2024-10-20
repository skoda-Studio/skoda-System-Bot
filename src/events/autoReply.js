const fs = require('fs');
const path = require('path');

module.exports = {
    async execute(message) {
        if (message.author.bot) return;

        const filePath = path.join(__dirname, '../../responses.json');

        let responses = {};
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            responses = JSON.parse(data);
        } catch (error) {
            console.error('Error reading responses.json:', error);
            return;
        }

        const question = message.content.trim();
        const answers = responses[question];

        if (answers && answers.length > 0) {
            const randomIndex = Math.floor(Math.random() * answers.length);
            const randomAnswer = answers[randomIndex];

            await message.reply(randomAnswer);
        }
    },
};
