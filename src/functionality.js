const API_KEY =
  "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"; // Replace with your actual key (this is a fake key the real one is hidden)

export async function sendMsgToChatBot(message) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-thinking-exp-1219:free",
        messages: [
          {
            role: "system",
            content:
              "You are an advanced AI specialized in early disease detection. If the user asks your name then tell them that you are SwiftCheckup AI and you excel in providing early disease detection. You provide preliminary assessments based on symptoms and risk factors but do not replace professional medical advice. Always recommend what diseases might the user face for the symptoms they listed. Always recommend consulting a healthcare provider for confirmation and treatment. You are strictly limited to medical-related queries. If a user asks a non-medical question, politely decline without offering any help or guidance. Do not provide any alternative suggestions or attempt to assist in non-medical topics.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 1000,
        temperature: 0.1,
        repetition_penalty: 2,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Error: No response from AI";
  } catch (error) {
    console.error("API call failed:", error);
    return "Error: Unable to fetch response.";
  }
}
