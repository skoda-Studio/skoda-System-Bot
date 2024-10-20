const { Client, GatewayIntentBits } = require('discord.js');
const { token, GUILD_ID } = require('./config.json');
const port = 3000;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });


// commands
client.commands = new Map();
const userInfoCommand = require('./src/commands/userinfo');
client.commands.set('userinfo', userInfoCommand);
const helpCommand = require('./src/commands/help');
client.commands.set('help', helpCommand);
const avatarCommand = require('./src/commands/avatar');
client.commands.set('avatar', avatarCommand);
const serverInfoCommand = require('./src/commands/serverinfo');
client.commands.set('serverinfo', serverInfoCommand);
const bannerCommand = require('./src/commands/banner');
client.commands.set('banner', bannerCommand);
const kickCommand = require('./src/commands/kick');
client.commands.set('kick', kickCommand);
const clearCommand = require('./src/commands/clear');
client.commands.set('clear', clearCommand);
const banCommand = require('./src/commands/ban');
client.commands.set('ban', banCommand);
const unbanCommand = require('./src/commands/unban');
client.commands.set('unban', unbanCommand);
const muteCommand = require('./src/commands/mute');
client.commands.set('mute', muteCommand);
const unmuteCommand = require('./src/commands/unmute');
client.commands.set('unmute', unmuteCommand);
const lockCommand = require('./src/commands/lock');
client.commands.set('lock', lockCommand);
const unlockCommand = require('./src/commands/unlock');
client.commands.set('unlock', unlockCommand);
const roleCommand = require('./src/commands/role');
client.commands.set('role', roleCommand);
const colorsCommand = require('./src/commands/colors');
client.commands.set('colors', colorsCommand);
const roleColorCommand = require('./src/commands/rolecolor');
client.commands.set('rolecolor', roleColorCommand);
const addResponseCommand = require('./src/commands/addresponse');
client.commands.set('addresponse', addResponseCommand);
const removeResponseCommand = require('./src/commands/removeResponse');
client.commands.set('removeresponse', removeResponseCommand);

// Logs
const channelCreateEvent = require('./src/logs/channelCreate');
client.on('channelCreate', channelCreateEvent.execute);
const channelDeleteEvent = require('./src/logs/channelDelete');
client.on('channelDelete', channelDeleteEvent.execute);
const channelUpdateEvent = require('./src/logs/channelUpdate');
client.on('channelUpdate', channelUpdateEvent.execute);
const messageDeleteEvent = require('./src/logs/messageDelete');
client.on('messageDelete', messageDeleteEvent.execute);
const messageUpdateEvent = require('./src/logs/messageUpdate');
client.on('messageUpdate', messageUpdateEvent.execute);
const roleCreatedEvent = require('./src/logs/roleCreated');
client.on('roleCreate', roleCreatedEvent.execute);
const roleDeletedEvent = require('./src/logs/roleDeleted');
client.on('roleDelete', roleDeletedEvent.execute);
const roleMemberEvent = require('./src/logs/roleMember');
client.on('guildMemberUpdate', roleMemberEvent.execute);
const roleRemovedEvent = require('./src/logs/roleRemoved');
client.on('guildMemberUpdate', roleRemovedEvent.execute);
const memberJoinEvent = require('./src/logs/memberJoin');
client.on('guildMemberAdd', memberJoinEvent.execute);
const memberLeaveEvent = require('./src/logs/memberLeave');
client.on('guildMemberRemove', memberLeaveEvent.execute);
const memberKickEvent = require('./src/logs/memberKick');
client.on('guildMemberRemove', memberKickEvent.execute);
const memberBanEvent = require('./src/logs/memberBan');
client.on('guildMemberRemove', memberBanEvent.execute);
const voiceChannelJoinEvent = require('./src/logs/voiceChannelJoin');
client.on('voiceChannelJoin', voiceChannelJoinEvent.execute);
const voiceChannelLeaveEvent = require('./src/logs/voiceChannelLeave');
client.on('voiceChannelLeave', voiceChannelLeaveEvent.execute);
const voiceChannelSwitchEvent = require('./src/logs/voiceChannelSwitch');
client.on('voiceStateUpdate', voiceChannelSwitchEvent.execute);
const threadCreateEvent = require('./src/logs/threadCreate');
client.on('threadCreate', threadCreateEvent.execute);
const threadDeleteEvent = require('./src/logs/threadDelete');
client.on('threadDelete', threadDeleteEvent.execute);

// events
const autoReply = require('./src/events/autoReply');
client.on('messageCreate', autoReply.execute);
const welcomeEvent = require('./src/events/welcome');
client.on('guildMemberAdd', welcomeEvent.execute);
const memberRoleAssignEvent = require('./src/events/memberRoleAssign');
client.on('guildMemberAdd', memberRoleAssignEvent.execute);
const ready = require('./src/events/ready');
client.once('ready', () => ready.execute(client));


// security
const linkProtection = require('./src/security/linkProtection');
client.on('messageCreate', linkProtection.execute);
const spamProtection = require('./src/security/spamProtection');
client.on('messageCreate', spamProtection.execute);

// dashboard
const { startServer } = require('./src/dashboard/server.js');


startServer();


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        await command.execute(interaction);
    }
});

async function registerCommands() {
    const commands = [...client.commands.values()].map(command => ({
        name: command.name,
        description: command.description,
        options: command.options,
    }));

    try {
        await client.application.commands.set(commands, GUILD_ID);
    } catch (error) {
        console.error('Error while registering commands:', error);
    }
}

client.login(token).then(() => {
    registerCommands();
});
