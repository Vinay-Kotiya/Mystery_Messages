///////OpenRouter API //////
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. give me only answer not any other text or explanation. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    // const { prompt } = await req.json();
    // console.log("Received prompt:", prompt);

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // store in .env
          "Content-Type": "application/json",
          // "HTTP-Referer": "http://localhost:3000", // Optional, but recommended
          "X-Title": "My DeepSeek App", // Optional, your app name
        },
        body: JSON.stringify({
          // model: "tngtech/deepseek-r1t-chimera:free", // or "deepseek-ai/deepseek-coder"
          // model: "deepseek/deepseek-r1:free", // public and available
          model: "deepseek/deepseek-chat:free", //faster then any other model, public and available and latest from deepseek
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, message: `OpenRouter error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

////////hagging_face /////
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();
//     console.log("Received prompt:", prompt);
//     if (!prompt || typeof prompt !== "string") {
//       return NextResponse.json(
//         { success: false, message: "Invalid or missing prompt" },
//         { status: 400 }
//       );
//     }

//     // Example model: EleutherAI/gpt-neo-125M (free and small)
//     // const model = "deepseek-ai/DeepSeek-R1";
//     // const model = "nvidia/AceReason-Nemotron-14B";
//     const model = "openai-community/gpt2"; // public and available

//     const response = await fetch(
//       `https://api-inference.huggingface.co/models/${model}`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           parameters: {
//             max_new_tokens: 50,
//             return_full_text: false,
//           },
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { success: false, message: `Hugging Face API error: ${errorText}` },
//         { status: response.status }
//       );
//     }
//     console.log("Response from Hugging Face API:", response);
//     const data = await response.json();

//     // data format example: [{ generated_text: "..." }]
//     if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
//       return NextResponse.json({
//         success: true,
//         result: data[0].generated_text,
//       });
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unexpected response format from Hugging Face",
//         },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Error calling Hugging Face API:", error);
//     return NextResponse.json(
//       { success: false, message: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

//     if (!prompt || typeof prompt !== "string") {
//       return NextResponse.json(
//         { success: false, message: "Invalid or missing prompt" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch("https://api.deepai.org/api/text-generator", {
//       method: "POST",
//       headers: {
//         "Api-Key": process.env.DEEPAI_API_KEY ?? "",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({ text: prompt }),
//     });

//     if (!response.ok) {
//       const errorData = await response.text();
//       return NextResponse.json(
//         { success: false, message: `DeepAI API error: ${errorData}` },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();

//     return NextResponse.json({ success: true, result: data.output });
//   } catch (error) {
//     console.error("Error calling DeepAI API:", error);
//     return NextResponse.json(
//       { success: false, message: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // const prompt =
// //   "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";
// const prompt="Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
// const result = await generateText({
//   model: openai("gpt-3.5-turbo"), // ✅ Works with free-tier
//   prompt,
// });

// return new Response(
//   JSON.stringify({
//     success: true,
//     result: result.text,
//   }),
//   {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   }
// );
//   } catch (error) {
//     console.error("Error in generation:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Error in generation",
//         error: String(error),
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// // app/api/suggest-message/route.ts
// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

// // Optional: increase timeout for Vercel
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     // For fixed prompt (no need to send from frontend)
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const result = await streamText({
//       model: openai("gpt-3.5-turbo"),
//       prompt, // not using `messages`
//     });

//     return result.toDataStreamResponse(); // returns a streaming response
//   } catch (error) {
//     console.error("Streaming error:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Error in streaming",
//         error: String(error),
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const prompt = "what is name of the best movie in 2023?";

//     const result = await streamText({
//       model: openai("gpt-3.5-turbo-instruct"),
//       prompt,
//     });

//     // const text = await result.getText();
//     // return Response.json({ success: true, message: text });
//     //

//     // const text = await result.text(); // ✅ Important!
//     // console.log("result from OpenAI API:", text);

//     return result.toDataStreamResponse(); // ✅ Streams response to client
//   } catch (error) {
//     console.error("Error in streaming:", error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Error in streaming",
//         error: String(error), // Add this for real error visibility
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
