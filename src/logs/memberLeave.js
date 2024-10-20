const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Leave_member } = require('../../config.json');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const channel = member.guild.channels.cache.get(channel_id_notifications_Leave_member);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('👋 A member has left the server')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: 'Member Info', value: `**Username:** ${member.user.tag}` },
                { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        channel.send({ embeds: [embed] });
    },
};
