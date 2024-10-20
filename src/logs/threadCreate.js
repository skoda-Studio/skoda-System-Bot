const { channel_id_notifications_thread_Create } = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    execute(thread, client) {
        const channel = client.channels.cache.get(channel_id_notifications_thread_Create); 

        if (channel) {
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('📣 A new thread has been created!')
                .addFields(
                    { name: 'Thread Name', value: thread.name, inline: false },
                    { name: 'Created By', value: `<@${thread.ownerId}>`, inline: false },
                    { name: 'Thread ID', value: thread.id, inline: false },
                    { name: 'Creation Time', value: new Date().toLocaleString(), inline: false }
                )
                .setTimestamp();

            channel.send({ embeds: [embed] });
        } else {
            console.error('Could not find the designated notification channel for thread creation.');
        }
    }
};
