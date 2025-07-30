import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const fileUrl = pathToFileURL(path.join(commandsPath, file)).href;
    const commandModule = await import(fileUrl);
    const command = commandModule.default;

    if (command?.data && command?.execute) {
        client.commands.set(command.data.name, command);
    }
}

// Bot ready
client.on('ready', () => {
    console.log(`Bot ready: ${client.user.tag}`);
});

// Slash command handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch {
        await interaction.reply({ content: 'Command execution failed.', ephemeral: true });
    }
});

// Start bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Express server to keep bot alive
const app = express();
app.get('/', (_, res) => res.send('Bot is running.'));
app.listen(process.env.PORT || 3000);