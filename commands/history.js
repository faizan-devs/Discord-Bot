import { SlashCommandBuilder } from 'discord.js';
import Message from '../models/message.model.js';

export default {
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('View your recent ChatGPT questions and responses'),

    async execute(interaction) {
        const discordId = interaction.user.id;

        await interaction.deferReply({ ephemeral: true });

        try {
            const messages = await Message.find({ discordId })
                .sort({ createdAt: -1 })
                .limit(5);

            if (!messages.length) {
                return await interaction.editReply('No history found.');
            }

            const formatted = messages.map((msg, i) =>
                `**${i + 1}.** ${msg.question}\n ${msg.response.substring(0, 200)}...`
            ).join('\n\n');

            await interaction.editReply({ content: formatted });
        } catch (err) {
            console.error('History error:', err);
            await interaction.editReply('Failed to fetch history.');
        }
    }
};
