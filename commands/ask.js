import { SlashCommandBuilder } from 'discord.js';
import { askChatGPT } from '../utils/chatgpt.js';
import { checkCooldown } from '../utils/cooldown.js';

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
        const cooldownMsg = checkCooldown(interaction.user.id, 10000);
        if (cooldownMsg) {
            return interaction.reply({ content: cooldownMsg, ephemeral: true });
        }

        const question = interaction.options.getString('question');
        await interaction.deferReply();

        try {
            const response = await askChatGPT(question);
            await interaction.editReply(response);
        } catch (err) {
            await interaction.editReply('Error: Unable to get a response from ChatGPT.');
        }
    }
};
