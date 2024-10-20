const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { channel_id_notifications_Update_room } = require('../../config.json');

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel) {
        const oldPermissions = oldChannel.permissionOverwrites.cache;
        const newPermissions = newChannel.permissionOverwrites.cache;

        const lockedPermissions = newPermissions.filter(perm => 
            perm.id === newChannel.guild.id && !perm.allow.has(PermissionsBitField.Flags.ViewChannel)
        );

        if (!oldPermissions.equals(newPermissions) || lockedPermissions.size > 0) {
            const logChannel = newChannel.guild.channels.cache.get(channel_id_notifications_Update_room);
            if (!logChannel) return;

            let permissionChanges = '';
            let lockedPermissionsList = '';

            newPermissions.forEach((newPerm, id) => {
                const oldPerm = oldPermissions.get(id);
                if (!oldPerm || !newPerm.allow.equals(oldPerm.allow)) {
                    const roleOrMember = newChannel.guild.roles.cache.get(id) || newChannel.guild.members.cache.get(id);
                    const name = roleOrMember ? roleOrMember.toString() : 'unknown';
                    const changes = newPerm.allow.toArray().map(perm => `- ${perm}`).join('\n');
                    permissionChanges += `${name}\n${changes}\n`;
                }
            });

            if (lockedPermissions.size > 0) {
                lockedPermissions.forEach(perm => {
                    const roleOrMember = newChannel.guild.roles.cache.get(perm.id) || newChannel.guild.members.cache.get(perm.id);
                    const name = roleOrMember ? roleOrMember.toString() : 'unknown';
                    lockedPermissionsList += `${name}\n- ViewChannel\n`;
                });
            }

            const fetchedLogs = await newChannel.guild.fetchAuditLogs({
                limit: 1,
                type: 12,
            });

            const auditEntry = fetchedLogs.entries.first();
            if (!auditEntry) return;

            const { executor, createdAt } = auditEntry;

            const embed = new EmbedBuilder()
                .setTitle('🔒 Channel Permissions Updated 🔒')
                .setDescription('Updated Channel Information')
                .addFields(
                    { name: 'Channel', value: newChannel.toString(), inline: true },
                    { name: 'Name', value: `${newChannel.name}`, inline: true },
                    { name: 'Type', value: `${newChannel.type === 0 ? 'Text Channel' : 'Voice Channel'}`, inline: true },
                    { name: 'Updated Permissions', value: permissionChanges ? `✅\n${permissionChanges}` : '❌ No changes', inline: false },
                    { name: 'Locked Permissions', value: lockedPermissionsList ? `❌\n${lockedPermissionsList}` : '✅ No locks', inline: false },
                    { name: 'Updated by', value: `Admin: ${executor.tag}\nAdmin Name: ${executor.username}\nAdmin ID: (${executor.id})`, inline: false }
                )
                .setColor(0x00AE86)
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
};
