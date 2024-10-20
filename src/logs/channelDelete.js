const { EmbedBuilder, ChannelType } = require('discord.js');
const { channel_id_notifications_delete_room } = require('../../config.json');

module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        const guild = channel.guild;
        const notificationChannel = guild.channels.cache.get(channel_id_notifications_delete_room);

        if (notificationChannel) {
            try {
                const fetchedLogs = await guild.fetchAuditLogs({
                    limit: 1,
                    type: 12, 
                });

                const log = fetchedLogs.entries.first();
                const creator = log ? log.executor : 'Unknown Member';

                const channelMention = channel.toString();
                const channelType = ChannelType[channel.type] || 'Unknown';
                const deletedAt = new Date().toLocaleString();

                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Channel Deleted!')
                    .addFields(
                        { name: 'Channel Name', value: channelMention, inline: true },
                        { name: 'Creator', value: creator ? `<@${creator.id}>` : 'Unknown Member', inline: true },
                        { name: 'Channel Type', value: `**${channelType}**`, inline: true },
                        { name: 'Deleted At', value: `**${deletedAt}**`, inline: true }
                    )
                    .setTimestamp();

                notificationChannel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Error fetching audit logs:', error);
            }
        }
    },
};
