// noinspection JSUnusedLocalSymbols

const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity(`for ${client.prefix} ${client.guilds.cache.size} servers`, { type: "WATCHING", });
        console.log(success`Ready as ${client.user.tag}`)
    }
}