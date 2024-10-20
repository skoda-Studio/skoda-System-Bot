const { channel_id_notifications_thread_Delete } = require('../../config.json'); 
const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute(thread, client) {
        const channel = client.channels.cache.get(channel_id_notifications_thread_Delete); 

        if (channel) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('📣 A thread has been closed!')
                .addFields(
                    { name: 'Thread Name', value: thread.name, inline: false },
                    { name: 'Closed By', value: `<@${thread.ownerId}>`, inline: false },
                    { name: 'Thread ID', value: thread.id, inline: false },
                    { name: 'Closure Time', value: new Date().toLocaleString(), inline: false }
                )
                .setTimestamp();

            channel.send({ embeds: [embed] });
        } else {
            console.error('Could not find the designated notification channel for thread closure.');
        }
    }
};
