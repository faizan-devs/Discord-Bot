import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
});

export async function askChatGPT(question) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
        });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const statusText = error.response.statusText;
            const body = await error.response.text();

            throw new Error(`OpenRouter API Error: ${status} ${statusText} — ${body}`);
        } else {
            throw new Error('Failed to get response from ChatGPT (unknown error).');
        }
    }
}
