# ChatGPT Discord Bot (OpenRouter Edition)

A Discord bot that allows users to interact with ChatGPT via slash commands, using the [OpenRouter](https://openrouter.ai) API. Built using the official `discord.js` library with support for cooldowns and slash command handling.

---

## 🧰 Tech Stack

| Layer        | Technology                                                              | Purpose                                       |
| ------------ | ----------------------------------------------------------------------- | --------------------------------------------- |
| **Language** | [Node.js](https://nodejs.org)                                           | JavaScript runtime environment                |
| **Bot API**  | [discord.js](https://discord.js.org)                                    | Interacts with the Discord API                |
| **AI API**   | [OpenRouter](https://openrouter.ai)                                     | Access to LLMs like ChatGPT via a unified API |
| **Server**   | [Express](https://expressjs.com)                                        | Lightweight web server to keep the bot alive  |
| **Env Vars** | [dotenv](https://github.com/motdotla/dotenv)                            | Manages sensitive configuration via `.env`    |
| **Modules**  | Native [ECMAScript Modules](https://nodejs.org/api/esm.html) (`import`) | Modern JavaScript module system               |

## Features

- 🔗 Connects to OpenRouter API to access ChatGPT (gpt-3.5-turbo or any supported model)
- ⚡ Slash command: `/ask` for real-time AI responses
- 🕐 Cooldown system to prevent spam
- 🌐 Lightweight Express server to keep the bot alive (for platforms like Replit, Railway, etc.)

---

## 🚀 Getting Started

1.  Dotenv file setup

```env
DISCORD_BOT_TOKEN=Your_Token
CLIENT_ID=Your_ID
OPENROUTER_API_KEY=Your_API_Key
GUILD_ID=Your_ID
PORT=3000
```

2. Slash Command: /ask, /history <br>
   In Discord Server:- <br>
   `/ask` question: How does AI work? <br>
   `/history` Press Enter (To get 5 recent search history)

And receive an intelligent reply powered by OpenRouter's ChatGPT model.

3. Clone the repo

```bash
git clone https://github.com/faizan-devs/Discord-Bot
cd chatgpt-discord-bot
```
