import { Configuration, OpenAIApi } from "openai";
import { NextApiHandler } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { initialMessages } from "../../components/Chat";
import { type Message } from "../../components/ChatLine";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const botName = "Dating match";
const userName = "You"; // TODO: move to ENV var
const firstMessge = initialMessages[0].message;

const openai = new OpenAIApi(configuration);

// @TODO: unit test this. good case for unit testing
const generatePromptFromMessages = (messages: Message[]) => {
    console.log("== INITIAL messages ==", messages);

    let prompt = "";

    // add first user message to prompt
    prompt += messages[1].message;

    // remove first conversaiton (first 2 messages)
    const messagesWithoutFirstConvo = messages.slice(2);
    console.log(" == messagesWithoutFirstConvo", messagesWithoutFirstConvo);

    // early return if no messages
    if (messagesWithoutFirstConvo.length == 0) {
        return prompt;
    }

    messagesWithoutFirstConvo.forEach((message: Message) => {
        const name = message.who === "user" ? userName : botName;
        prompt += `\n${name}: ${message.message}`;
    });
    return prompt;
};

const handler: NextApiHandler = async (req, res) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session)
        return res.status(401).json({
            error: "not_authenticated",
            description:
                "The user does not have an active session or is not authenticated",
        });

    const messages = req.body.messages;
    const messagesPrompt = generatePromptFromMessages(messages);
    const defaultPrompt = `This is the conversation between ${botName} and a ${userName}.\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `;
    const finalPrompt = process.env.AI_PROMPT
        ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
        : defaultPrompt;

    const payload = {
        model: "text-davinci-003",
        prompt: finalPrompt,
        temperature: process.env.AI_TEMP
            ? parseFloat(process.env.AI_TEMP)
            : 0.7,
        max_tokens: process.env.AI_MAX_TOKENS
            ? parseInt(process.env.AI_MAX_TOKENS)
            : 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: [`${userName}:`],
        user: req.body?.user,
    };

    /**
     * @doc https://vercel.com/docs/concepts/limits/overview#serverless-function-execution-timeout
     * Serverless Function Execution Timeout
     * The maximum execution timeout is 10 seconds when deployed on a Personal Account (Hobby plan).
     * For Teams, the execution timeout is 60 seconds (Pro plan) or 900 seconds (Enterprise plan).
     */
    const response = await openai.createCompletion(payload);
    const firstResponse = response.data.choices[0].text;

    res.status(200).json({ text: firstResponse });
};

export default handler;
