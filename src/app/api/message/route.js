import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";
import { MessageArraySchema } from "@/lib/validators/message";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI client with the free API key from Google AI Studio
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  // Combine all messages into a single prompt
  let combinedPrompt = chatbotPrompt + "\n\n";
  parsedMessages.forEach((message) => {
    combinedPrompt += `${message.isUserMessage ? "User" : "Assistant"}: ${message.text}\n`;
  });
  combinedPrompt += "Assistant: ";

  // Use the Gemini Pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // gemini-1.5-flash

  // Generate the response
  const result = await model.generateContent(combinedPrompt);
  const response = result.response;

  // Return the response as a stream
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(response.text()));
      controller.close();
    },
  });

  return new Response(stream);
}
