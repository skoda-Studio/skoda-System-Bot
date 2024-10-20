const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    options: [
        {
            name: 'user',
            type: 6, // Type for user mention
            description: 'The user to ban',
            required: true
        },
        {
            name: 'reason',
            type: 3, // Type for string
            description: 'Reason for the ban',
            required: false
        }
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have enough permissions to use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!user) {
            return interaction.reply({ content: 'User not found.', ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (member) {
            await member.ban({ reason });
            return interaction.reply({ content: `Successfully banned ${user.tag} for: ${reason}`, ephemeral: true });
        } else {
            return interaction.reply({ content: 'The user is not in this server.', ephemeral: true });
        }
    }
};
