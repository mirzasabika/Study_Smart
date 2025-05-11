import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai" ;
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json", // Ensure JSON response
  };
  
  
   export const GenerateTopicsAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Learn Python::As your are coaching teacher\n    - User want to learn about the topic\n    - Generate 5-7 Course title for study (Short)\n    - Make sure it is releated to description\n    - Output will be ARRAY of String in JSON FORMAT only\n    - Do not add any plain text in output,"
            },
          ]
        },
        {
          role: "model",
          parts: [
            {
              text: "```json\n[\n  \"Python Basics: First Steps\",\n  \"Core Python Concepts\",\n  \"Data Structures in Python\",\n  \"Functions and Modules\",\n  \"Object-Oriented Python\",\n  \"Handling Errors and Files\",\n  \"Python Journey: Next Level\"\n]\n```"
            },
          ]
        },
        {
          role: "user",
          parts: [
            {
              text: "INSERT_INPUT_HERE", // Placeholder for dynamic input
            },
          ]
        },
      ],
    });


    export const GenerateCourseAIModel = model.startChat({
      generationConfig,
      history: [ ],
    });
  
    // const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    // return result.response.text();






