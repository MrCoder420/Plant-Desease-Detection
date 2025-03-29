import React, { useState } from "react";

const SolutionPage = () => {
  const [plantName, setPlantName] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "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";
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

  const sendMessage = async () => {
    if (!plantName || !diseaseName) return;

    const userMessage = `What is the solution for ${diseaseName} in ${plantName}?`;
    setMessages([...messages, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-24b-instruct-2501:free",
          messages: [{ role: "user", content: userMessage }],
          top_p: 1,
          temperature: 0.9,
        }),
      });

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages([...messages, { role: "user", content: userMessage }, { role: "bot", content: botMessage }]);
    } catch (error) {
      setMessages([...messages, { role: "bot", content: "Error fetching response!" }]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Plant Disease Diagnosis</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Plant Name"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Disease Name"
          value={diseaseName}
          onChange={(e) => setDiseaseName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={sendMessage}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Solution"}
      </button>

      <div className="mt-6 border-t pt-4 max-h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 my-2 rounded-lg ${
              msg.role === "user" ? "bg-gray-200 text-left" : "bg-green-200 text-left"
            }`}
          >
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionPage;
