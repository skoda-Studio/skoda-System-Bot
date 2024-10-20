const { EmbedBuilder, ChannelType } = require('discord.js');
const { Channel_ID_Notifications_Create_Room } = require('../../config.json');

module.exports = {
    name: 'channelCreate',
    async execute(channel) {
        const guild = channel.guild;
        const notificationChannel = guild.channels.cache.get(Channel_ID_Notifications_Create_Room);

        if (notificationChannel) {
            try {
                const fetchedLogs = await guild.fetchAuditLogs({
                    limit: 1,
                    type: 10,
                });

                const log = fetchedLogs.entries.first();
                const creator = log ? log.executor : 'Unknown Member';

                const channelMention = channel.toString();
                const channelType = ChannelType[channel.type] || 'Unknown';
                const createdAt = new Date(channel.createdTimestamp).toLocaleString();

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('New Channel Created!')
                    .addFields(
                        { name: 'Channel Name', value: channelMention, inline: true },
                        { name: 'Creator', value: creator ? `<@${creator.id}>` : 'Unknown Member', inline: true },
                        { name: 'Channel Type', value: `**${channelType}**`, inline: true },
                        { name: 'Created At', value: `**${createdAt}**`, inline: true }
                    )
                    .setTimestamp();

                notificationChannel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Error fetching audit logs:', error);
            }
        }
    },
};
