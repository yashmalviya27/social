const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: "AIzaSyCPP0BpHnWhj5ggsvJ_Uq9gx4F01nLwgEw",
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();

async function generateContent(imageBase64) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction: "Generate a short, meaningful social media caption (max 15 words).",
        }
    });
    return response.text;
}

module.exports = {
    generateContent,
}