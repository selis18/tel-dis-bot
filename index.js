const Discord = require('discord.js');
const { Client, GatewayIntentBits} = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Парсинг данных из тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// Определяем статическую директорию для наших статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Определяем маршрут для отображения HTML страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/start-bot', (req, res) => {
  const telegramToken = req.body.tk;
  const telegramChatId = req.body.tci;
  const discordToken = req.body.dt;

  // Создание экземпляра клиента Discord
  const discordBot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
  });

  // Создание экземпляра Telegram бота
  const telegramBot = new TelegramBot(telegramToken, {polling: true});

  // Функция отправки сообщения в Telegram
  async function sendTelegramMessage(message, chatId, markup) {
    await telegramBot.sendMessage(chatId, message, { reply_markup: markup });
  }

  discordBot.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channel) {
        const guildId = newState.channel.guild.id;
        const channelId = newState.channel.id;
        const voiceChatLink = `https://discord.com/channels/${guildId}/${channelId}`;
    
        // Создаем кастомную клавиатуру Telegram с кнопкой
        const urlButton = {
          text: "Ссылка на голосовой канал",
          url: voiceChatLink,
       };
       const replyMarkup = {
          inline_keyboard: [[urlButton]],
       };
    
        const message = `${newState.member.user.globalName} присоединился к голосовому каналу ${newState.channel.name}.`;
        await sendTelegramMessage(message, telegramChatId, replyMarkup);
     }
    });

  // Запуск бота Discord
  discordBot.login(discordToken);

  res.send('Bot запущен успешно!');
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});