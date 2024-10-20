const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Created_role } = require('../../config.json');

module.exports = {
    name: 'roleCreate',
    async execute(role) {
        const logChannel = role.guild.channels.cache.get(channel_id_notifications_Created_role);
        if (!logChannel) return;

        const roleName = role.name;
        const creationTime = new Date().toLocaleString();

        const embed = new EmbedBuilder()
            .setTitle('Role Created')
            .setColor(0x00ff00) 
            .addFields(
                { name: 'Role Name', value: `\`\`${roleName}\`\``, inline: false },
                { name: 'Created At', value: creationTime, inline: false }
            )
            .setFooter({ text: 'Role creation log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
