
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getOpenAIAPIResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(message);
    const response = result.response.text();

    if (!response) throw new Error("Empty Gemini response");

    return response;
  } catch (error) {
    console.error("Gemini SDK error:", error);
    return "Gemini failed to generate a response.";
  }
};

export default getOpenAIAPIResponse;

// import "dotenv/config";
 
// const getOpenAIAPIResponse = async (message) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gemini-3-flash-preview",
//       messages: [
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/{model=models/*}:generateContent",
//       options,
//     );
//     const data = await response.json();
//     console.log(data);
//     console.log(data.choices[0]);
//     const result = response.json({
//       status: 200,
//       message: "It was successful",
//       data: data,
//     });
//     return result; //reply
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default getOpenAIAPIResponse;
