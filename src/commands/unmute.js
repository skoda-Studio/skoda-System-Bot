const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a member in the server.',
    options: [
        {
            name: 'member',
            type: 6, 
            description: 'The member to unmute',
            required: true
        }
    ],
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'You do not have enough permissions to unmute members.', ephemeral: true });
        }

        const member = interaction.options.getMember('member');

        if (!member) {
            return interaction.reply({ content: 'Could not find the member.', ephemeral: true });
        }

        try {
            await member.timeout(null); 
            return interaction.reply({ content: `${member.user.tag} has been unmuted.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Failed to unmute the member.', ephemeral: true });
        }
    }
};
