const { channel_id_notifications_voice_Join } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute(oldState, newState, client) {
        if (!oldState.channelId && newState.channelId) {
            const channel = client.channels.cache.get(channel_id_notifications_voice_Join);

            if (channel) {
                const member = newState.member;

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('📣 Member Joined Voice Channel')
                    .addFields(
                        { name: 'Member Information', value: `User: <@${member.id}>\nUsername: ${member.user.username}\nUser ID: ${member.id}`, inline: false },
                        { name: 'Voice Channel Joined', value: `Channel: ${newState.channel.name}\nName: ${newState.channel.name}\nJoin Time: ${new Date().toLocaleString()}`, inline: false }
                    )
                    .setTimestamp();

                channel.send({ embeds: [embed] });
            } else {
                console.error('Could not find the designated notification channel.');
            }
        }
    }
};
