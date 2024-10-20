const { channel_id_notifications_voice_Leave } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute(oldState, newState, client) {
        if (oldState.channelId && !newState.channelId) {
            const channel = client.channels.cache.get(channel_id_notifications_voice_Leave);

            if (channel) {
                const member = oldState.member;

                const embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('📣 Member Left Voice Channel')
                    .addFields(
                        { name: 'Member Information', value: `User: <@${member.id}>\nUsername: ${member.user.username}\nUser ID: ${member.id}`, inline: false },
                        { name: 'Voice Channel Left', value: `Channel: ${oldState.channel.name}\nName: ${oldState.channel.name}\nLeave Time: ${new Date().toLocaleString()}`, inline: false }
                    )
                    .setTimestamp();

                channel.send({ embeds: [embed] });
            } else {
                console.error('Could not find the designated notification channel.');
            }
        }
    }
};
