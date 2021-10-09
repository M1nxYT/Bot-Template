module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity(`for ${client.prefix} ${client.guilds.cache.size} servers`, { type: "WATCHING", });
        console.log(`Ready as ${client.user.tag}`)
    }
}