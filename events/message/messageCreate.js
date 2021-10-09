const permCheck = require("../../utils/checkpermission");

module.exports = {
    name: 'messageCreate',
    execute: async function (message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix)) return;
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

        let args = message.content.slice(client.prefix.length).trim().split(' ');
        let commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName))
            return message.reply(`Command not found!`);
        else {
            let cmd = client.commands.get(commandName)
            if (!permCheck(message.member, cmd.perms)) {
                if(cmd.hidden){
                    return message.reply(`Command not found!`);
                }
                else{
                    return message.reply(`To run this command you need the following permissions:\n \`${cmd.perms.join('` `')}` + '`');
                }
            }
            else{
                await cmd.prefixExecute(client, message, args)
            }
        }
    }
}