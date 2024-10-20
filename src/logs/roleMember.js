const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Member_role } = require('../../config.json');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        const logChannel = newMember.guild.channels.cache.get(channel_id_notifications_Member_role);
        if (!logChannel) return;

        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        if (addedRoles.size === 0) return; 

        const roleNames = addedRoles.map(role => role.name).join(', ');
        const author = newMember.user ? newMember.user.tag : 'Unknown user';
        const updateTime = new Date().toLocaleString();

        const embed = new EmbedBuilder()
            .setTitle('Role Added')
            .setColor(0x00ff00)
            .addFields(
                { name: 'Member', value: author, inline: true },
                { name: 'New Role(s)', value: `\`\`${roleNames}\`\``, inline: false }, 
                { name: 'Assigned At', value: updateTime, inline: false }
            )
            .setFooter({ text: 'Role assignment log' })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
