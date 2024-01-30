# Discord Telegram Bot
This is a Discord Telegram Bot built with Node.js and Discord.js library. The bot allows you to receive updates about voice channel activity on your Discord server in your Telegram chat.

### Features
- Receives updates about users joining voice channels on the Discord server.
- Sends a message to the specified Telegram chat with a link to the voice channel.
- Uses Telegram bot API and Discord API to establish communication.

### Usage
To use the bot, you need to do the following steps:
1. Сlone or download the repository files.
2. Install the required dependencies by running npm install.
3. Start the bot server by executing `npm start`.

**Telegram Token**: Enter your Telegram bot token.
**Telegram Chat ID**: Specify the chat ID of the Telegram chat where you want to receive updates.
**Discord Token**: Provide your Discord bot token.
Click the **"Start bot"** button on the website to initialize the bot.

The bot will start listening for voice channel updates on your Discord server. Whenever a user joins a voice channel, the bot will send a message with a link to the voice channel in the specified Telegram chat.

Customize the bot's behavior by modifying the code in the `voiceStateUpdate` event handler and the `sendTelegramMessage` function.
