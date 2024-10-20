module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    async execute(interaction) {
        const guild = interaction.guild;
        const serverInfoEmbed = {
            color: 0x0099ff,
            title: `${guild.name} Information`,
            fields: [
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
                { name: 'Created At', value: guild.createdAt.toDateString(), inline: true },
                { name: 'Region', value: guild.preferredLocale, inline: true },
            ],
            thumbnail: {
                url: guild.iconURL() || '',
            },
            timestamp: new Date(),
            footer: {
                text: `Requested by: ${interaction.user.tag}`,
            },
        };

        await interaction.reply({ embeds: [serverInfoEmbed] });
    },
};
