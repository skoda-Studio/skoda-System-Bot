const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a member in the server.',
    options: [
        {
            name: 'member',
            type: 6, // Type 6 is for a user (mentionable)
            description: 'The member to mute',
            required: true
        },
        {
            name: 'duration',
            type: 3, // Type 3 is for a string
            description: 'Duration of the mute (e.g., 10m, 1h)',
            required: true
        }
    ],
    async execute(interaction) {
        // Check if the user has permissions to mute members
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'You do not have enough permissions to mute members.', ephemeral: true });
        }

        const member = interaction.options.getMember('member');
        const duration = interaction.options.getString('duration');

        if (!member) {
            return interaction.reply({ content: 'Could not find the member.', ephemeral: true });
        }

        const time = ms(duration);
        if (!time) {
            return interaction.reply({ content: 'Invalid duration format. Use something like 10m or 1h.', ephemeral: true });
        }

        try {
            await member.timeout(time, 'Muted by bot command');
            return interaction.reply({ content: `${member.user.tag} has been muted for ${duration}.`, ephemeral: true });
        } catch (error) {
            return interaction.reply({ content: 'Failed to mute the member.', ephemeral: true });
        }
    }
};

// Helper function to convert duration to milliseconds
function ms(duration) {
    const match = duration.match(/^(\d+)([smhd])$/); // Match format like 10m, 1h
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 's': return value * 1000; // Seconds
        case 'm': return value * 60 * 1000; // Minutes
        case 'h': return value * 60 * 60 * 1000; // Hours
        case 'd': return value * 24 * 60 * 60 * 1000; // Days
        default: return null;
    }
}
