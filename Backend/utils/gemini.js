// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) =>{
//     const options = {
//         method: "POST",
//          headers: {
//              "Content-Type": "application/json",
//              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//          },
//          body: JSON.stringify({
//              model: "gpt-4o-mini",
//              messages: [{
//                  role: "user",
//                  content:message
//              }]
//          })
//      };

//      try {
//          const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//          const data = await response.json();
         
        
//           return data.choices[0].message.content;
//      } catch(err) {
//          console.log(err);
//      }
 
// }




// export default getOpenAIAPIResponse;






// import { GoogleGenerativeAI } from "@google/generative-ai";

// // .env se key uthao
// const genAI = new GoogleGenerativeAI("AIzaSyBVGwh0xWB4aRq3q85pNLhU0MxZ1FYqNM8");

// const getGeminiResponse = async (message) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const result = await model.generateContent(message);
//         const response = await result.response;
//         return response.text(); 
//     } catch (error) {
//         console.error("Gemini Error:", error.message);
//         return "Bhai, Gemini mein bhi kuch gadbad hai: " + error.message;
//     }
// };

// export default getGeminiResponse;




// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyBVGwh0xWB4aRq3q85pNLhU0MxZ1FYqNM8");

// const getGeminiResponse = async (message) => {
//     try {
//         // "gemini-pro" ki jagah "gemini-1.5-flash" ya "gemini-1.5-pro" use karein
//         // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

//         // YAHAN CHANGE HAI: apiVersion ko "v1" set karo (v1beta nahi)
//         // const model = genAI.getGenerativeModel({ 
//         //     model: "gemini-1.5-flash"
//         // }, { apiVersion: "v1" });

//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const result = await model.generateContent(message);
//         const response = await result.response;
//         const text = response.text();
        
//         return text;
//     } catch (error) {
//         console.error("Gemini Error Detail:", error);
//         return "Bhai, Gemini mein error hai: " + error.message;
//     }
// };

 //export default getGeminiResponse;


import Groq from "groq-sdk";


const groq = new Groq({ 
    
    apiKey: process.env.GROQ_API_KEY
});


// 2. Pehle function ko define karo
const getGeminiResponse = async (message) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system", 
                    content: "You are a helpful assistant. Always format your responses using Markdown, use bullet points, tables, or new lines to make it readable."
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return chatCompletion.choices[0]?.message?.content || "Bhai, reply nahi aaya.";
    } catch (error) {
        console.error("Groq Error:", error);
        return "Error: " + error.message;
    }
};

// 3. SABSE LAST MEIN EXPORT KARO
export default getGeminiResponse;




