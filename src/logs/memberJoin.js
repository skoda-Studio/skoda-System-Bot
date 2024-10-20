const { EmbedBuilder } = require('discord.js');
const { channel_id_notifications_Join_member } = require('../../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.get(channel_id_notifications_Join_member);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('🎉 A new member has joined the server!')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: 'Member Info', value: `**Member:** <@${member.id}>\n**Username:** ${member.user.tag}` },
                { name: 'Invited By', value: 'Joined the server, but the inviter could not be identified.' },
                { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        channel.send({ embeds: [embed] });
    },
};
