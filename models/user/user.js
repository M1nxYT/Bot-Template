const {Schema, model} = require('mongoose');

const Userschema = new Schema({ // the schema definition for this model (See https://mongoosejs.com/docs/guide.html#definition for more information)
    userid: Number, // data type of the userid
})

module.exports = {
    name: 'user', // name of model in models collection (client.models can be accessed in any file due to client being an arg of most events)
    data: model('user', Userschema) // the model definition for the doc (See https://mongoosejs.com/docs/models.html for more information)
}

/*
An example use for this model, would be to log who has used the bot before.
to add an entry to the database 1st check if the user id is already in the database using (for message style commands just switch interaction for message):

let User = client.models.get('user')
let user = User.find(interaction.user.id)
if(user.length > 0){
    return // do nothing user already exists in collection
} else{
    const newuser = new User({
			userid: interaction.user.id,
	}).save().then(console.log(`Entry for ${interation.user.id} added to the Database`)).catch((err) => { console.log(err) })
	return
}

*/