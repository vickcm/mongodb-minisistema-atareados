import dotenv from "dotenv";
dotenv.config();

const prompt = [
  "Escriba una tarea del hogar que tenga que ver con la limpieza",
  "Escriba una tarea del hogar que tenga que ver con el orden",
  "Escriba una tarea del hogar que tenga que ver con cocinar",
  "Escriba una tarea del hogar que tenga que ver con la ropa",
  "Escriba una tarea del hogar que tenga que ver con la comida",
  "escriba una tarea del hogar que tenga que ver con la hacer las compras",
  "escriba una tarea del hogar que tenga que ver con la habitación",
  "escriba una tarea del hogar que tenga que ver con la cocina",


];

async function getSuggestedTasks() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const randomIndex = Math.floor(Math.random() * prompt.length);
    const randomPrompt = prompt[randomIndex];

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: randomPrompt,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
        max_tokens: 50,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const suggestedTask = data.choices[0].text.trim();

      return suggestedTask;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
  } catch (error) {
    throw error;
  }
}

export { getSuggestedTasks };
