import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
// import getOrdersByDateRange from "../utils/fetchData";
import { getOrdersByDateRange, fetchAnswers } from "../utils/fetchData";
import "./testing.css";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const commands = [
    {
      command: "I would like to order *",
      callback: (food, { resetTranscript }) => {
        setMessage(`Your order is for: ${food}`);
        setIsListening(false);
        SpeechRecognition.stopListening();
        resetTranscript();

        // listening = false;
      },
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    {
      command: ["Hello", "Hi"],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: "Beijing",
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    // {
    //   command: /.*/,
    //   callback: () => {
    //     console.log(`Unknown command: ${transcript}`);
    //     console.log(transcript)
    //     //   handleUnknownCommand(transcript);
    //   },
    // },
  ];

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
  } = useSpeechRecognition({
    commands,
  });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // Function to classify the query
  const queryClassification = async (query) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/classify",
        {
          query: query,
          variables: {},
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Parsing the crucial string data to json
      const rawString = response.data;
      let jsonString = rawString.replace(/'/g, '"');
      jsonString = jsonString.replace(/(\w+):/g, '"$1":');
      console.log(jsonString);

      try {
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData);
        const data = {
          type: "dynamic",
          data: {
            intent: "orders",
            timePeriod: {
              startDate: "2024-09-07",
              endDate: "2024-09-12",
            },
          },
        };

        return parsedData;

        // if (
        //   parsedData.type === "dynamic" &&
        //   parsedData.data.intent === "orders"
        // ) {
        //   getOrdersByDateRange(
        //     parsedData.data.timePeriod.startDate,
        //     parsedData.data.timePeriod.endDate,
        //     setData
        //   );
        // }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } catch (error) {
      console.error(
        "Error classifying query:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to handle static queries
  // Like How can I Onboard my product on ONDC?
  // What are the required documents to list your product on ONDC?
  // This function will directly fetch the answer from the API
  const handleStaticQuery = (query) => {
    fetchAnswers(query).then((answer) => {
      setMessage(answer);
    });
  };

  const handleDynamicQuery = (classifiedData, query) => {
    if (classifiedData.data.intent === "orders") {
      getOrdersByDateRange(
        classifiedData.data.timePeriod.startDate,
        classifiedData.data.timePeriod.endDate,
        setData
      );
    }
  };

  // Handling recognition of quweries which are different from the voice commands
  useEffect(() => {
    if (isListening === true) {
      if (listening === false) {

        console.log("Classifing your query");
        console.log(transcript);
        console.log("");
        queryClassification(transcript).then((classifiedData) => {
          if (classifiedData.type === "static") {
            handleStaticQuery(transcript);
          } else {
            handleDynamicQuery(classifiedData, transcript);
          }
        });

        resetTranscript();
      }
    }
  }, [listening]);

  return (
    <div>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() => {
            SpeechRecognition.startListening();
            setIsListening(true);
            // SpeechRecognition.startListening({
            //   continuous: true,
            //   language: "hi-IN",
            // })
          }}
        >
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        {/* <p>{transcript}</p> */}
      </div>
      <h1>this is dictaphone</h1>
      <p>{message}</p>
      <p>{transcript}</p>

      {/* <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      /> */}

      {/* <button onClick={queryClassification}>Classify query</button> */}

      <div>
        {data?.map((item) => {
          return (
            <div className="orders" key={item.upk}>
              <h3>{item.customer_name}</h3>
              <p>{item.product_name}</p>
              <p>{item.orderedOn}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Dictaphone;

