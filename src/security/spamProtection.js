const { PermissionsBitField, EmbedBuilder } = require('discord.js');

const cooldowns = new Map();

module.exports = {
    name: 'spamProtection',
    description: 'Protects against spam messages',
    execute(message) {
        if (message.author.bot) return;

        const userId = message.author.id;
        const now = Date.now();
        const cooldownAmount = 5000; 
        const timeoutDuration = 5 * 60 * 1000; 

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + cooldownAmount;

            if (now < expirationTime) {
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

                return;
            }
        }

        cooldowns.set(userId, now);
    }
};
