module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    async execute(interaction) {
        const commandList = Array.from(interaction.client.commands.values()).filter(cmd => cmd.name !== 'help');
        const guild = interaction.guild;
        const serverIconURL = guild.iconURL() ? guild.iconURL() : null;

        const helpEmbed = {
            color: 0x0099ff,
            title: 'Available Commands',
            fields: commandList.map(command => ({
                name: command.name,
                value: command.description,
                inline: false,
            })),
            timestamp: new Date(),
            footer: {
                text: `Requested by: ${interaction.user.tag}`,
            },
            thumbnail: serverIconURL ? { url: serverIconURL } : null,
        };

        await interaction.reply({ embeds: [helpEmbed] });
    },
};
