import { createParser } from "eventsource-parser";

export const ChatGPTAgent = {
  USER: "user",
  SYSTEM: "system",
};

/**
 * @typedef {Object} ChatGPTMessage
 * @property {('user'|'system')} role
 * @property {string} content
 */

/**
 * @typedef {Object} OpenAIStreamPayload
 * @property {string} model
 * @property {ChatGPTMessage[]} messages
 * @property {number} temperature
 * @property {number} top_p
 * @property {number} frequency_penalty
 * @property {number} presence_penalty
 * @property {number} max_tokens
 * @property {boolean} stream
 * @property {number} n
 */

export const OpenAIStream = async (payload) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const steam = new ReadableStream({
    async start(controller) {
      function onParse(event) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            console.log("json", json);
            const text = json.choices[0].delta?.content || "";
            console.log("text", text);
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(error);
          }
        }
      }
      const parser = createParser(onParse);
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return steam;
};
