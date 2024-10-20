const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Kick_member } = require('../../config.json');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const auditLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 20, 
        });
        const kickLog = auditLogs.entries.first();

        if (!kickLog) return;

        const { executor, target } = kickLog;
        if (target.id !== member.id) return;

        const channel = member.guild.channels.cache.get(channel_id_notifications_Kick_member);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('🚫 A member has been kicked from the server!')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: 'Member Info', value: `**Member:** <@${member.id}>\n**Username:** ${member.user.tag}` },
                { name: 'Kicked By', value: `The member was kicked by ${executor.tag}.` },
                { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        channel.send({ embeds: [embed] });
    },
};
