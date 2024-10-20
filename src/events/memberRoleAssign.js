const { MEMBER_ROLE_ID, BOT_ROLE_ID } = require('../../config.json');

module.exports = {
    async execute(member) {
        let roleId;

        if (member.user.bot) {
            roleId = BOT_ROLE_ID;
        } else {
            roleId = MEMBER_ROLE_ID;
        }

        const role = member.guild.roles.cache.get(roleId);
        if (role) {
            await member.roles.add(role).catch(console.error);
        } else {
            console.error('Role not found!');
        }
    }
};
