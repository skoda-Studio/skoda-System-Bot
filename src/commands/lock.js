const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'Locks a channel to prevent members from sending messages.',
    async execute(interaction) {
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'You do not have permission to lock this channel.', ephemeral: true });
        }

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            return interaction.reply({ content: '🔒 This channel has been locked.', ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Failed to lock the channel.', ephemeral: true });
        }
    }
};
