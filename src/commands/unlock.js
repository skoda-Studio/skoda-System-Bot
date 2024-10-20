const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlocks a channel to allow members to send messages.',
    async execute(interaction) {
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'You do not have permission to unlock this channel.', ephemeral: true });
        }

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            return interaction.reply({ content: '🔓 This channel has been unlocked.', ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Failed to unlock the channel.', ephemeral: true });
        }
    }
};
