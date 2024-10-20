const { channel_id_notifications_voice_Switch } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute(oldState, newState, client) {

        if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
            const channel = client.channels.cache.get(channel_id_notifications_voice_Switch);

            if (channel) {
                const member = newState.member;

                const embed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('📣 Member Switched Voice Channels')
                    .addFields(
                        { name: 'Member Information', value: `User: <@${member.id}>\nUsername: ${member.user.username}\nUser ID: ${member.id}`, inline: false },
                        { name: 'Old Voice Channel', value: `Channel: ${oldState.channel.name}\nName: ${oldState.channel.name}`, inline: false },
                        { name: 'New Voice Channel', value: `Channel: ${newState.channel.name}\nName: ${newState.channel.name}`, inline: false },
                        { name: 'Switch Time', value: `${new Date().toLocaleString()}`, inline: false }
                    )
                    .setTimestamp();

                channel.send({ embeds: [embed] });
            } else {
                console.error('Could not find the designated notification channel.');
            }
        }
    }
};
