module.exports = (guildMember, permArray) => {
    for(let perm of permArray){
        if(!guildMember.permissions.has(perm, false)){
            return false
        }
    }
    return true
};