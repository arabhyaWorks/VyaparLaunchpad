import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
// import getOrdersByDateRange from "../utils/fetchData";
import {
  getOrdersByDateRange,
  fetchAnswers,
  queryClassification,
} from "../utils/fetchData";
import "./testing.css";
import strings from "../Strings/vyapar";

const API_KEY =
  "sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null); // To store the fetched audio content
  const audioRef = useRef(null); // Reference for the audio player

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

  // Function to handle static queries
  // Like How can I Onboard my product on ONDC?
  // What are the required documents to list your product on ONDC?
  // This function will directly fetch the answer from the API
  const handleStaticQuery = (query) => {
    console.log("Fetching answers");
    fetchAnswers(query).then((answer) => {
      setMessage(answer);
      fetchAudio(answer)
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

  // const fetchAudio = async () => {
  //   console.log("fetching audio")
  //   const ttsResponse = await axios.post(
  //     "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
  //     {
  //       pipelineTasks: [
  //         {
  //           taskType: "tts",
  //           config: {
  //             language: {
  //               sourceLanguage: "hi",
  //             },
  //             serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  //             gender: "male",
  //             samplingRate: 48000,
  //           },
  //         },
  //       ],
  //       inputData: {
  //         input: [{ source: strings[0] }],
  //       },
  //     },
  //     {
  //       headers: {
  //         Authorization: API_KEY,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log(
  //     "TTS Response:",
  //     ttsResponse.data.pipelineResponse[0].audio[0].audioContent
  //   );

  //   const audioContent =
  //     ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
  //   if (audioContent) {
  //     const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
  //     audio.playbackRate = 1.04; // Adjust the speed if necessary
  //     audio.play();
  //   } else {
  //     console.error("No audio content found in the response");
  //   }
  // };

  const fetchAudio = async (string) => {
    const ttsResponse = await axios.post(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      {
        pipelineTasks: [
          {
            taskType: "tts",
            config: {
              language: {
                sourceLanguage: "hi",
              },
              // English
              // serviceId: "ai4bharat/indic-tts-coqui-misc-gpu--t4",
              // Hindi
              serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
              gender: "female",
              samplingRate: 8000,
            },
          },
        ],
        inputData: {
          input: [{ source: string }],
          // input: [{ source: strings[0] }],
        },
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const audioContent =
      ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
    if (audioContent) {
      setAudioSrc(`data:audio/wav;base64,${audioContent}`); // Set the audio source
    } else {
      console.error("No audio content found in the response");
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

  // useEffect(() => {
  //   if (audioSrc) {
  //     if (audioRef.current) {
  //       audioRef.current.play(); // Play the audio
  //     }
  //     console.log("playing audio throug ref");
  //   }
  // }, [audioSrc, audioRef]);

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

      {/* <button onClick={fetchAudio}>Classify query</button> */}

      {/* Render audio player */}

      <h1>{audioSrc ? "true" : "false"}</h1>
      {audioSrc && (
        <div>
          <audio ref={audioRef} controls>
            <source src={audioSrc} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

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
