const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'linkProtection',
    description: 'Link protection system',
    execute(message) {
        if (message.author.bot) return;

        const urlRegex = /https?:\/\/[^\s]+/i;
        if (urlRegex.test(message.content)) {
            const hasPermission = message.member.permissions.has(PermissionsBitField.Flags.ManageMessages);

            if (!hasPermission) {
                message.delete()
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setColor('#FF0000')
                            .setTitle('Warning!')
                            .setDescription(`Sorry, you are not allowed to post links in this server.`)
                            .setFooter({ text: `Deleted by ${message.guild.name}`, iconURL: message.author.displayAvatarURL() })
                            .setTimestamp();

                        message.channel.send({ embeds: [embed] })
                            .then(sentMessage => {
                                setTimeout(() => {
                                    sentMessage.delete().catch(err => console.error('Failed to delete warning message:', err));
                                }, 5000);
                            })
                            .catch(err => console.error('Failed to send message:', err));
                    })
                    .catch(err => console.error('Failed to delete message:', err));
            }
        }
    }
};
