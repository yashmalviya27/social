const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: "AIzaSyB-g8OyeYOJaX05OAZ-aPSWfOpqnWJS57I",
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
            systemInstruction: "your are an expert image captioning assistant that generates captions for images. single line captions only.",
        }
    });
    return response.text;
}

module.exports = {
    generateContent,
}