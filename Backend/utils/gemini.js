

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




