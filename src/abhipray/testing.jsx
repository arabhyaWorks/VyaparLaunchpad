import React, { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null); // To store the fetched audio content
  const audioRef = useRef(null); // Reference for the audio player

  const commands = [
    // Add your voice commands here
  ];

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // Function to fetch the TTS audio data
  const fetchAudio = async (text) => {
    const ttsResponse = await axios.post(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      // https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline
      {
        pipelineTasks: [
          {
            taskType: "tts",
            config: {
              language: {
                sourceLanguage: "en",
              },
              // serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
              // serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
              serviceId: "ai4bharat/indic-tts-coqui-misc-gpu--t4",
              // AI4Bharat Indic-TTS : English_Latin
              gender: "male",
              samplingRate: 16000,
              // samplingRate: 22050,
            },
          },
        ],
        inputData: {
          input: [{ source: text }],
        },
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const audioContent = ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
    if (audioContent) {
      setAudioSrc(`data:audio/wav;base64,${audioContent}`); // Set the new audio source
    } else {
      console.error("No audio content found in the response");
    }
  };

  // Handle playing the new audio when audioSrc updates
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc; // Update the audio element source
      audioRef.current.load(); // Reload the audio element with the new source
      audioRef.current.play(); // Play the new audio
      audioRef.current.playbackRate = 1.08; // Set the playback speed to 1.08x

    }
  }, [audioSrc]);

  // Handling recognition of queries and classification
  useEffect(() => {
    if (isListening === true) {
      if (listening === false) {
        console.log("Classifying your query");
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

  const handleStaticQuery = (query) => {
    fetchAnswers(query).then((answer) => {
      setMessage(answer);
      fetchAudio(answer); // Fetch the audio for the answer
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

  return (
    <div>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() => {
            // SpeechRecognition.startListening({language: 'hi-IN'});
            SpeechRecognition.startListening()
            setIsListening(true);
          }}
        >
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <h1>This is Dictaphone</h1>
      <p>{message}</p>
      <p>{transcript}</p>

      {/* Render audio player */}
      {audioSrc && (
        <div>
          <audio ref={audioRef} controls>
            <source src={audioSrc} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div>
        {data?.map((item) => (
          <div className="orders" key={item.upk}>
            <h3>{item.customer_name}</h3>
            <p>{item.product_name}</p>
            <p>{item.orderedOn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dictaphone;


