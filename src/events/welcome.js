const { EmbedBuilder } = require('discord.js');
const { WELCOME_CHANNEL_ID, SERVER_IMAGE } = require('../../config.json');

module.exports = {
    async execute(member) {
        const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (!welcomeChannel) return;

        const invites = await member.guild.invites.fetch();
        const invite = invites.find(invite => invite.uses > 0);

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Welcome to the Server!')
            .setDescription(`Welcome ${member}, we hope you have a great time here!`)
            .addFields(
                { name: 'Invited by:', value: invite ? `\`${invite.inviter.tag}\`` : 'Unknown', inline: true },
                { name: 'Invite Code:', value: invite ? `\`${invite.code}\`` : 'N/A', inline: true }
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setImage(SERVER_IMAGE)
            .setFooter({ text: 'Enjoy your stay!', iconURL: SERVER_IMAGE })
            .setAuthor({ name: member.guild.name, iconURL: SERVER_IMAGE })
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    }
};
