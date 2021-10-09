# Bot Template
An easy to use bot template written using discordjs 13.

# Setup
Rename `template.env` to `.env` and fill out all values with correct working tokens.
Run `yarn install` and then `yarn start`.

# Deploy Commands 
Run `yarn run deploy` to push commands to the guild you put in the .env file
To push global commands you will need to uncomment the code in `deploy.js` and comment out the matching code with the `process.env['DISCORD_GUILD_ID']` addition.

# TODO
```diff
+ Help command.
```
