const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    options: [
        {
            name: 'user',
            type: 6,
            description: 'Select a user to kick',
            required: true,
        },
        {
            name: 'reason',
            type: 3,
            description: 'Reason for kicking the user',
            required: false,
        },
    ],
    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply('You do not have permission to use this command.');
        }

        if (!member) {
            return interaction.reply('User not found.');
        }

        try {
            await member.kick(reason);
            await interaction.reply(`Successfully kicked ${member.user.tag}. Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('I was unable to kick the member. Please check my permissions.');
        }
    },
};
