const { PermissionsBitField, EmbedBuilder } = require('discord.js');

const messageCounts = new Map();
const timeoutDuration = 5 * 60 * 1000;

module.exports = {
    name: 'spamProtection',
    description: 'Protects against spam messages',
    execute(message) {
        if (message.author.bot) return;

        const userId = message.author.id;
        const now = Date.now();

        if (!messageCounts.has(userId)) {
            messageCounts.set(userId, { count: 0, firstMessageTime: now });
        }

        const userData = messageCounts.get(userId);
        userData.count++;

        if (now - userData.firstMessageTime > 60 * 1000) {
            userData.count = 1;
            userData.firstMessageTime = now;
        }

        if (userData.count > 5) {
            message.delete();

            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Warning!')
                .setDescription(`You are sending messages too quickly. You have been timed out for 5 minutes.`)
                .setFooter({ text: `Timed out by ${message.guild.name}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();

            message.channel.send({ embeds: [embed] })
                .then(sentMessage => {
                    setTimeout(() => {
                        sentMessage.delete().catch(err => console.error('Failed to delete warning message:', err));
                    }, 5000);
                })
                .catch(err => console.error('Failed to send message:', err));

            const member = message.member;
            member.timeout(timeoutDuration, 'Spamming too quickly')
                .catch(err => console.error('Failed to timeout user:', err));

            messageCounts.delete(userId);
            return;
        }

        messageCounts.set(userId, userData);
    }
};
