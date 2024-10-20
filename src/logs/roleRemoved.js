const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Removed_role } = require('../../config.json');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        const logChannel = newMember.guild.channels.cache.get(channel_id_notifications_Removed_role);
        if (!logChannel) return;

        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
        if (removedRoles.size === 0) return;

        const roleNames = removedRoles.map(role => role.name).join(', ');
        const author = newMember.user ? newMember.user.tag : 'Unknown user';
        const removalTime = new Date().toLocaleString();

        // إنشاء Embed
        const embed = new EmbedBuilder()
            .setTitle('Role Removed')
            .setColor(0xff0000) 
            .addFields(
                { name: 'Member', value: author, inline: true },
                { name: 'Removed Role(s)', value: `\`\`${roleNames}\`\``, inline: false },
                { name: 'Removed At', value: removalTime, inline: false }
            )
            .setFooter({ text: 'Role removal log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
