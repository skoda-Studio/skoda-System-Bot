module.exports = {
    name: 'userinfo',
    description: 'Displays user information',
    async execute(interaction) {
        const member = interaction.options.getMember('user') || interaction.member;

        const userInfoEmbed = {
            color: 0x0099ff,
            title: `User Information for ${member.user.username}`,
            fields: [
                {
                    name: 'Username',
                    value: member.user.tag,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: member.id,
                    inline: true,
                },
                {
                    name: 'Join Date',
                    value: member.joinedAt.toDateString(),
                    inline: true,
                },
                {
                    name: 'Account Creation Date',
                    value: member.user.createdAt.toDateString(),
                    inline: true,
                },
            ],
            thumbnail: {
                url: member.user.displayAvatarURL(),
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [userInfoEmbed] });
    },
};
