const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'colors',
    description: 'Setup color roles.',
    options: [
        {
            name: 'setup',
            type: 1,
            description: 'Setup color roles for the server',
        }
    ],
    async execute(interaction) {
        const guildOwnerId = interaction.guild.ownerId;
        if (interaction.user.id !== guildOwnerId) {
            return interaction.reply({ content: 'Only the server owner can use this command.', ephemeral: true });
        }

        if (interaction.options.getSubcommand() === 'setup') {
            await interaction.deferReply();
            await interaction.followUp({ content: 'Processing your request, please wait...', ephemeral: true });

            const colors = [
                { name: 'Red', hex: '#FF0000' },
                { name: 'Blue', hex: '#0000FF' },
                { name: 'Green', hex: '#00FF00' },
                { name: 'Yellow', hex: '#FFFF00' },
                { name: 'Purple', hex: '#800080' },
                { name: 'Orange', hex: '#FFA500' },
                { name: 'Cyan', hex: '#00FFFF' },
                { name: 'Magenta', hex: '#FF00FF' },
                { name: 'Lime', hex: '#00FF00' },
                { name: 'Pink', hex: '#FFC0CB' },
                { name: 'Teal', hex: '#008080' },
                { name: 'Navy', hex: '#000080' },
                { name: 'Maroon', hex: '#800000' },
                { name: 'Olive', hex: '#808000' },
                { name: 'Silver', hex: '#C0C0C0' },
                { name: 'Gray', hex: '#808080' },
                { name: 'Gold', hex: '#FFD700' },
                { name: 'Coral', hex: '#FF7F50' },
                { name: 'Salmon', hex: '#FA8072' },
                { name: 'Plum', hex: '#DDA0DD' },
                { name: 'Khaki', hex: '#F0E68C' },
                { name: 'Lavender', hex: '#E6E6FA' },
                { name: 'Chocolate', hex: '#D2691E' },
                { name: 'Peru', hex: '#CD853F' },
                { name: 'Sienna', hex: '#A0522D' },
            ];

            const roleData = [];

            try {
                for (const color of colors) {
                    const role = await interaction.guild.roles.create({
                        name: color.name,
                        color: color.hex,
                        reason: 'Setting up color roles',
                    });
                    roleData.push({ name: color.name, id: role.id });
                }

                const filePath = path.join(__dirname, 'role_ids.json');
                fs.writeFileSync(filePath, JSON.stringify(roleData, null, 2));

                await interaction.editReply({
                    content: 'Color roles have been set up successfully!',
                    ephemeral: true
                });

                await interaction.followUp({
                    content: 'Please note: It is recommended to use this command once every 48 hours to avoid bot restrictions due to Discord’s rate limiting policies.',
                    ephemeral: true
                });

            } catch (error) {
                console.error('Error creating roles:', error);
                return interaction.editReply({ content: 'An error occurred while setting up color roles.', ephemeral: true });
            }
        }
    }
};
