require('dotenv').config()

module.exports = () => {
    let missingenvs = []
    if(!process.env['DISCORD_TOKEN']){
        missingenvs.push(`'DISCORD_TOKEN'`)
    }
    if(!process.env['DISCORD_PREFIX']) {
        missingenvs.push(`'DISCORD_PREFIX'`)
    }
    if(!process.env['MONGO_URL']){
        missingenvs.push(`'MONGO_URL'`)
    }
    return missingenvs
};