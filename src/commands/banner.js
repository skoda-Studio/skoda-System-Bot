module.exports = {
    name: 'banner',
    description: 'Displays the server banner.',
    async execute(interaction) {
        const guild = interaction.guild;
        const bannerUrl = guild.bannerURL({ dynamic: true, size: 1024 });

        if (!bannerUrl) {
            return interaction.reply('This server does not have a banner.');
        }

        const bannerEmbed = {
            color: 0x0099ff,
            title: `${guild.name} Banner`,
            image: {
                url: bannerUrl,
            },
            timestamp: new Date(),
            footer: {
                text: `Requested by: ${interaction.user.tag}`,
            },
        };

        const downloadButton = {
            type: 2, // Button type
            style: 5, // Button style
            label: 'Download Banner',
            url: bannerUrl, // Link to the banner image
        };

        await interaction.reply({ embeds: [bannerEmbed], components: [{ type: 1, components: [downloadButton] }] });
    },
};
