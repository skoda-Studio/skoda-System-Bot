const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear messages in the channel.',
    options: [
        {
            name: 'amount',
            type: 4,
            description: 'The number of messages to clear',
            required: true
        }
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: 'You do not have enough permissions to use this command.', ephemeral: true });
        }

        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'The amount must be between 1 and 100.', ephemeral: true });
        }

        const fetched = await interaction.channel.messages.fetch({ limit: amount });
        await interaction.channel.bulkDelete(fetched);

        return interaction.reply({ content: `Successfully cleared ${fetched.size} messages!`, ephemeral: true });
    }
};
