const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_delete_message } = require('../../config.json');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (message.partial) {
            try {
                await message.fetch();
            } catch (error) {
                console.error('Could not fetch deleted message:', error);
                return;
            }
        }

        const logChannel = message.guild.channels.cache.get(channel_id_notifications_delete_message);
        if (!logChannel) return;

        const messageContent = message.content ? message.content : 'No content (maybe an embed or attachment)';
        const author = message.author ? message.author.tag : 'Unknown author';
        const deletionTime = new Date().toLocaleString();

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor(0xff0000)
            .addFields(
                { name: 'Author', value: author, inline: true },
                { name: 'Channel', value: message.channel.name, inline: true },
                { name: 'Message Content', value: messageContent || 'No content', inline: false },
                { name: 'Deleted At', value: deletionTime, inline: false }
            )
            .setFooter({ text: 'Message deletion log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
