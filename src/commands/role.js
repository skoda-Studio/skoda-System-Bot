const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'role',
    description: 'Assign or remove a role from a user',
    options: [
        {
            name: 'action',
            type: 3, // String
            description: 'add or remove role',
            required: true,
            choices: [
                { name: 'add', value: 'add' },
                { name: 'remove', value: 'remove' }
            ]
        },
        {
            name: 'role',
            type: 8, // Role
            description: 'The role to add or remove',
            required: true
        },
        {
            name: 'user',
            type: 6, // User
            description: 'The user to assign or remove the role from',
            required: true
        }
    ],
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const role = interaction.options.getRole('role');
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        // تحقق من صلاحيات العضو
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({ content: 'You do not have permission to manage roles.', ephemeral: true });
        }

        try {
            if (action === 'add') {
                await member.roles.add(role);
                return interaction.reply({ content: `Role ${role.name} has been added to ${user.username}.`, ephemeral: true });
            } else if (action === 'remove') {
                await member.roles.remove(role);
                return interaction.reply({ content: `Role ${role.name} has been removed from ${user.username}.`, ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error managing the role.', ephemeral: true });
        }
    }
};
