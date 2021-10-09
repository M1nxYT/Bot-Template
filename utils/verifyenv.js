require('dotenv').config()

module.exports = () => {
    let missingenvs = []
    if(!process.env['DISCORD_TOKEN']){
        missingenvs.push('DISCORD_TOKEN')
    }
    if(!process.env['DISCORD_PREFIX']) {
        missingenvs.push('DISCORD_PREFIX')
    }
    if(!process.env['DISCORD_CLIENT_ID']){
        missingenvs.push('DISCORD_CLIENT_ID')
    }
    if(!process.env['DISCORD_GUILD_ID']){
        missingenvs.push('DISCORD_GUILD_ID')
    }
    if(!process.env['DISCORD_OWNER_ID']){
        missingenvs.push('DISCORD_OWNER_ID')
    }
    if(!process.env['MONGO_URL']){
        missingenvs.push('MONGO_URL')
    }
    return missingenvs
};