const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Edit_message } = require('../../config.json');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        if (oldMessage.partial) {
            try {
                await oldMessage.fetch();
            } catch (error) {
                console.error('Could not fetch old message:', error);
                return;
            }
        }

        if (newMessage.partial) {
            try {
                await newMessage.fetch();
            } catch (error) {
                console.error('Could not fetch new message:', error);
                return;
            }
        }

        const logChannel = newMessage.guild.channels.cache.get(channel_id_notifications_Edit_message);
        if (!logChannel) return;

        const oldContent = oldMessage.content ? `\`\`${oldMessage.content}\`\`` : 'No content (maybe an embed or attachment)';
        const newContent = newMessage.content ? `\`\`${newMessage.content}\`\`` : 'No content (maybe an embed or attachment)';
        const author = newMessage.author ? newMessage.author.tag : 'Unknown author';
        const updateTime = new Date().toLocaleString();

        if (oldContent === newContent) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setColor(0xffa500)
            .addFields(
                { name: 'Author', value: author, inline: true },
                { name: 'Channel', value: newMessage.channel.name, inline: true },
                { name: 'Original Message', value: oldContent, inline: false },
                { name: 'Edited Message', value: newContent, inline: false },
                { name: 'Edited At', value: updateTime, inline: false }
            )
            .setFooter({ text: 'Message edit log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
