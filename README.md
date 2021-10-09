# Bot Template
An easy to use bot template written using discordjs 13.

# Setup
Rename `template.env` to `.env` and fill out all values with correct working tokens.
Run `yarn install` and then `yarn run start`.

# Deploy Commands 
Run `yarn run deploy` to push commands to the guild you put in the .env file
To push global commands you will need to uncomment the code in `deploy.js` and comment out the matching code with the `process.env['DISCORD_GUILD_ID']` addition.

# Example Command
View the ping command for extensive notes about command properties.
The reload command also demonstrates how to go about making hidden commands.

# Adding commands to help
In the help command I have commented code for a misc category, use this to create other categories. Note: commands categories have to match this (case-sensitive) to appear in said category.
