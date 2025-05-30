// const callDeepSeek = async () => {
//   const res = await fetch("/api/ai-messages", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       prompt: "Tell me an interesting fact about space.",
//     }),
//   });

//   const data = await res.json();
//   console.log(data.result);
// };
"use client";

import React, { useState } from "react";

export default function HFTextGen() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/suggest-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.result);

      if (res.ok && data.success) {
        setResult(data.result);
      } else {
        setResult("Error: " + (data.message ?? "Unknown error"));
      }
    } catch (error) {
      setResult("Network error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>DeepSeek AI Text Generator</h1>

      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Generating Messages..." : "Generate Messages"}
      </button>

      {result && (
        <section
          style={{
            marginTop: 20,
            whiteSpace: "pre-wrap",
            backgroundColor: "#f0f0f0",
            padding: 15,
            borderRadius: 5,
            color: "#333",
          }}
        >
          <strong>Result:</strong>
          <br />
          {result}
        </section>
      )}
    </main>
  );
}

/////////// Hugging Face Text Generation Example
// "use client";

// import React, { useState } from "react";

// export default function HFTextGen() {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("/api/suggest-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setResult(data.result);
//       } else {
//         setResult("Error: " + (data.message ?? "Unknown error"));
//       }
//     } catch (error) {
//       setResult("Network error: " + (error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main
//       style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}
//     >
//       <h1>Hugging Face Text Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           rows={5}
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter prompt here..."
//           style={{ width: "100%", fontSize: 16, padding: 10 }}
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           style={{ marginTop: 10, padding: "0.5rem 1rem" }}
//         >
//           {loading ? "Generating..." : "Generate Text"}
//         </button>
//       </form>
//       {result && (
//         <section
//           style={{
//             marginTop: 20,
//             whiteSpace: "pre-wrap",
//             backgroundColor: "#f0f0f0",
//             padding: 15,
//             borderRadius: 5,
//             color: "#333",
//           }}
//         >
//           <strong>Result:</strong>
//           <br />
//           {result}
//         </section>
//       )}
//     </main>
//   );
// }

////////DeepAI Text Generation Example////////
// "use client";

// import React, { useState } from "react";

// export default function DeepAITextGen() {
//   //   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("/api/suggest-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setResult(data.result);
//       } else {
//         setResult("Error: " + (data.message ?? "Unknown error"));
//       }
//     } catch (error) {
//       setResult("Network error: " + (error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div
//       style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}
//     >
//       <h1>DeepAI Text Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <button
//           type="submit"
//           disabled={loading}
//           style={{ marginTop: 10, padding: "0.5rem 1rem" }}
//         >
//           {loading ? "Generating..." : "Generate Text"}
//         </button>
//       </form>
//       {result && (
//         <div
//           style={{
//             marginTop: 20,
//             whiteSpace: "pre-wrap",
//             backgroundColor: "#f0f0f0",
//             padding: 15,
//             borderRadius: 5,
//             color: "#333",
//           }}
//         >
//           <strong>Result:</strong> <br />
//           {result}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";

// export default function SuggestMessagePage() {
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState("");

//   const fetchMessage = async () => {
//     setLoading(true);
//     setResponse("");

//     try {
//       const res = await fetch("/api/suggest-message", {
//         method: "POST",
//       });

//       const data = await res.json();
//       if (data.success) {
//         setResponse(data.result);
//       } else {
//         setResponse("❌ Failed: " + data.message);
//       }
//     } catch (error) {
//       setResponse("❌ Error: " + String(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Ask OpenAI</h1>
//       <button
//         onClick={fetchMessage}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Get Questions"}
//       </button>

//       {response && (
//         <div className="mt-4 p-4 border rounded text-black bg-gray-100">
//           <strong>Response:</strong>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";

// const SuggestPage = () => {
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStream = async () => {
//       try {
//         const res = await fetch("/api/suggest-message", {
//           method: "POST",
//         });

//         if (!res.body) {
//           setResult("No response stream available.");
//           setLoading(false);
//           return;
//         }

//         const reader = res.body.getReader();
//         const decoder = new TextDecoder("utf-8");

//         let fullText = "";

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           const chunk = decoder.decode(value, { stream: true });
//           fullText += chunk;
//           setResult((prev) => prev + chunk);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("Streaming error:", err);
//         setResult("An error occurred while fetching the data.");
//         setLoading(false);
//       }
//     };

//     fetchStream();
//   }, []);

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Suggested Questions</h1>
//       <div className="bg-gray-100 text-black rounded-lg p-4 min-h-[100px] whitespace-pre-wrap">
//         {loading ? "Loading..." : result}
//       </div>
//     </div>
//   );
// };

// export default SuggestPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const SuggestPage = () => {
//   const [result, setResult] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.post(
//         "http://localhost:3000/api/suggest-message",
//         {
//           messages: [
//             {
//               role: "user",
//               content: "what is name of the best movie in 2023?",
//             },
//           ],
//         },
//         {
//           responseType: "stream", // Use "text" for plain text response
//         }
//       );

//       if (!res || !res.data) {
//         setResult("Error: No data returned");
//         return;
//       }

//       setResult(res.data);
//     };

//     fetchData();
//   }, [result]);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-semibold mb-2">Result from API:</h1>
//       <p>{result || "Loading..."}</p>
//     </div>
//   );
// };

// export default SuggestPage;
