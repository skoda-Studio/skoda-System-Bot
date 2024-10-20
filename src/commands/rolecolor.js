const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'role_ids.json');

module.exports = {
    name: 'rolecolor',
    description: 'Allows a member to select and get a role from a list of colors.',
    options: [],
    async execute(interaction) {
        if (!fs.existsSync(filePath)) {
            return interaction.reply({
                content: 'The command has not been set up yet. Please contact the admin.',
                ephemeral: true
            });
        }

        let roleIds;
        try {
            const rawData = fs.readFileSync(filePath, 'utf-8');
            roleIds = JSON.parse(rawData);
        } catch (error) {
            console.error('Error reading role_ids.json:', error);
            return interaction.reply({ content: 'An error occurred while reading the roles.', ephemeral: true });
        }

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select-role')
                .setPlaceholder('Select your role color')
                .addOptions(
                    roleIds.map(role => ({
                        label: role.name,
                        value: role.id
                    }))
                )
        );

        await interaction.reply({
            content: 'Choose the color role you want:',
            components: [row],
            ephemeral: true
        });

        const filter = i => i.customId === 'select-role' && i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000
        });

        collector.on('collect', async i => {
            await i.deferUpdate(); // Deferring the update to acknowledge the interaction

            const selectedRoleId = i.values[0];
            const member = i.guild.members.cache.get(i.user.id);

            try {
                const role = i.guild.roles.cache.get(selectedRoleId);
                if (!role) return i.followUp({ content: 'Role not found.', ephemeral: true });

                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role);
                    await i.followUp({ content: `Removed the role ${role.name} from you!`, ephemeral: true });
                } else {
                    await member.roles.add(role);
                    await i.followUp({ content: `Added the role ${role.name} to you!`, ephemeral: true });
                }
            } catch (error) {
                console.error('Error handling role:', error);
                await i.followUp({ content: 'An error occurred while trying to handle the role.', ephemeral: true });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: 'Time is up, no role was selected.', components: [] });
            }
        });
    }
};
