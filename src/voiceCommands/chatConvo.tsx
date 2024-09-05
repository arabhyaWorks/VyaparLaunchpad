import React, { useState } from "react";
import axios from "axios";
import "./chatConvo.css";




const GptChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${"sk-HcmL_46_aW4WCrx_JRl_utkA1AtOtBNQAdfo13OXM7T3BlbkFJ8F1jRqGmURPvDY7n0kvXFYm5J0DUNTbrIzEpARv0EA"}`,
          },
        }
      );

      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResponse("Sorry, something went wrong.");
    }
  };

  return (
    <div className="chat-convo-cont">
      <form onSubmit={handleSubmit}>
        <label>
          Ask GPT:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "300px", margin: "10px" }}
          />
        </label>
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default GptChat;