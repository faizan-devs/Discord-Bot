import { SlashCommandBuilder } from 'discord.js';
import { askChatGPT } from '../utils/chatgpt.js';
import { checkCooldown } from '../utils/cooldown.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask a question to ChatGPT')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question')
                .setRequired(true)
        ),

    async execute(interaction) {
        const discordId = interaction.user.id;
        const username = `${interaction.user.username}#${interaction.user.discriminator}`;
        const question = interaction.options.getString('question');

        // Cooldown check
        const cooldownMsg = checkCooldown(discordId, 10000);
        if (cooldownMsg) {
            return interaction.reply({ content: cooldownMsg, ephemeral: true });
        }

        await interaction.deferReply();

        try {
            // Ask ChatGPT
            const response = await askChatGPT(question);

            // Prevent storing if invalid
            if (!response || typeof response !== 'string') {
                throw new Error('Invalid response from ChatGPT');
            }

            // Log to MongoDB
            await Message.create({
                discordId,
                username,
                question,
                response,
                createdAt: new Date()
            });

            // Update or create user profile
            await User.findOneAndUpdate(
                { discordId },
                {
                    $set: { username },
                    $inc: { totalMessages: 1 },
                    $setOnInsert: { createdAt: new Date() },
                    lastUsedAt: new Date(),
                },
                { upsert: true }
            );

            await interaction.editReply(response);

        } catch (err) {
            console.error('ChatGPT error:', err);
            await interaction.editReply('Error: Unable to get a response from ChatGPT.');
        }
    }
};
