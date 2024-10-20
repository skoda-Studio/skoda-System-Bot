const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user from the server.',
    options: [
        {
            name: 'user_id',
            type: 3, // Type for string (user ID)
            description: 'The ID of the user to unban',
            required: true
        }
    ],
    async execute(interaction) {
        // Check if the user has permissions to unban members
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have enough permissions to use this command.', ephemeral: true });
        }

        const userId = interaction.options.getString('user_id');

        try {
            // Unban the user
            await interaction.guild.members.unban(userId);
            return interaction.reply({ content: `Successfully unbanned user with ID: ${userId}`, ephemeral: true });
        } catch (error) {
            return interaction.reply({ content: 'Failed to unban the user. Please make sure the ID is correct and the user is banned.', ephemeral: true });
        }
    }
};
