module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the user or another user.',
    options: [
        {
            name: 'user',
            type: 6, 
            description: 'Select a user to view their avatar',
            required: false, 
        },
    ],
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const avatarEmbed = {
            color: 0x0099ff,
            title: `${user.username}'s Avatar`,
            image: {
                url: avatarUrl,
            },
            timestamp: new Date(),
            footer: {
                text: `Requested by ${interaction.user.username}`,
            },
        };

        const downloadButton = {
            type: 2, 
            style: 5, 
            label: 'Download Avatar',
            url: avatarUrl,
        };

        await interaction.reply({ embeds: [avatarEmbed], components: [{ type: 1, components: [downloadButton] }] });
    },
};
