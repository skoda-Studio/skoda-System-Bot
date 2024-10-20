const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Deleted_role } = require('../../config.json');

module.exports = {
    name: 'roleDelete',
    async execute(role) {
        const logChannel = role.guild.channels.cache.get(channel_id_notifications_Deleted_role);
        if (!logChannel) return;

        const roleName = role.name;
        const deletionTime = new Date().toLocaleString();

        const embed = new EmbedBuilder()
            .setTitle('Role Deleted')
            .setColor(0xff0000)
            .addFields(
                { name: 'Role Name', value: `\`\`${roleName}\`\``, inline: false },
                { name: 'Deleted At', value: deletionTime, inline: false }
            )
            .setFooter({ text: 'Role deletion log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
