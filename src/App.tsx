import React, { useEffect, useContext, useState, useRef } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AppContext } from "./AppContext";
import "./App.css";
import playTTS from "./Bhasini/tts";
import SiriAnimation from "./SiriAnimation";
import Loader from "./components/common/Loader";
import DefaultLayout from "./layout/DefaultLayout";
import commands from "./voiceCommands";
import Pages from "./Routes";
import axios from "axios";
import { fetchAnswers } from "./utils/fetchData";
import { getOrdersByDateRange } from "./utils/fetchData";
import { queryClassification } from "./utils/fetchData";

const API_KEY =
  "sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0";

const apiUrl = (import.meta as any).env.VITE_BASE_API;

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loading, setLoading } = useContext(AppContext) || {};

  const [redirectUrl, setRedirectUrl] = useState("");
  const [isInValid, setIsInValid] = useState(false);

  const [message, setMessage] = useState("");
  const [stateData, setStateData] = useState("");
  // const [voiceState, setVoiceState] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showingCaption, setShowingCaption] = useState(false);
  const [data, setData] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands: [
      {
        command: commands,
        callback: handleVoiceCommand,
      },
    ],
  });

  // Pages to redirect to
  const pages = [
    "home",
    "dashboard",
    "mystore",
    "inventory",
    "signin",
    "signup",
    "store-onboarding",
    "voice",
  ];

  // handling voice commands
  function handleVoiceCommand(redirectPage: string) {
    redirectPage = redirectPage.toLowerCase();
    console.log("Redirecting to:", redirectPage);

    const pageMappings = [
      { keywords: ["my store", "mystore"], path: "/mystore" },
      { keywords: ["dashboard"], path: "/dashboard" },
      { keywords: ["inventory"], path: "/inventory" },
      { keywords: ["sign in", "signin"], path: "/signin" },
      { keywords: ["sign up", "signup"], path: "/signup" },
      { keywords: ["voice"], path: "/voice" },
      {
        keywords: [
          "store onboarding",
          "store-onboarding",
          "dukaan",
          "store",
          "shop",
          "dukan",
        ],
        path: "/store-onboarding",
      },
    ];

    const pageMatch = pageMappings.find((page) =>
      page.keywords.some((keyword) => redirectPage.includes(keyword))
    );

    if (pageMatch) {
      navigate(pageMatch.path);

      console.log("stopping the stuffs to happen");
      setIsListening(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      console.log("Invalid command.");
      console.log(redirectPage, transcript);
      setIsInValid(true);
      console.log("stopping the stuffs to happen");
      setIsListening(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
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

    const audioContent =
      ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
    if (audioContent) {
      setAudioSrc(`data:audio/wav;base64,${audioContent}`); // Set the new audio source
    } else {
      console.error("No audio content found in the response");
    }
  };

  // Handling recognition of queries and classification
  useEffect(() => {
    if (isListening === true) {
      if (listening === false && transcript.length > 0) {
        console.log("Classifying your query...");
        setStateData("Classifying your query");
        // setStateData("आपका प्रश्न का वर्गीकरण कर रहा हूँ|");
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
    // setStateData("आपके प्रश्न का उत्तर लाया जा रहा है।");
    setStateData("fetching the asnwer of the question.");
    fetchAnswers(query).then((answer) => {
      setMessage(answer);
      setStateData("Generating the audio for the answer.");
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (setLoading) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [setLoading]);

  useEffect(() => {
    if (redirectUrl && pages.includes(redirectUrl)) {
      setRedirectUrl(redirectUrl);
    }
  }, [redirectUrl]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log("Connection successful:", data))
      .catch((error) => console.error("Error connecting to server:", error));
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div>
        <h1 style={{ color: "black" }}>
          Browser doesn't support speech recognition.
        </h1>
      </div>
    );
  }

  const transcriptRef = useRef<HTMLDivElement>(null);

  // Handle playing the new audio when audioSrc updates
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc; // Update the audio element source
      audioRef.current.load(); // Reload the audio element with the new source
      audioRef.current.play(); // Play the new audio
      setStateData("");
      SpeechRecognition.startListening();
      setIsListening(false);
      audioRef.current.playbackRate = 1.1; // Set the playback speed to 1.08x
    }
  }, [audioSrc]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div
        style={{
          display:
            pathname === "/voice" || pathname === "/product-page"
              ? "none"
              : "block",
        }}
        className="asis-cont"
      >
        <div
          className={`assitant ${
            pathname === "/store-onboarding" ? "left" : "right"
          }`}
        >
          {/* Render audio player */}
          {audioSrc && (
            <div
              style={{
                opacity: 0,
              }}
            >
              <audio ref={audioRef} controls>
                <source src={audioSrc} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div className="asis">
            <div className="transcript-cont" ref={transcriptRef}>
              <p className="transcript">
                {/* "नमस्ते, मैं व्यापार साथी हूँ!🙏 चलिए आपके डिजिटल स्टोर को ONDC पर ऑनबोर्ड करते हैं।" */}
                {transcript.length === 0
                  ? stateData
                    ? stateData
                    : "This is Vyapar Sathi! 🙏 Let's onboard your digital store on ONDC."
                  : transcript}
              </p>
            </div>
          </div>

          <div
            className={`siri ${
              pathname === "/store-onboarding" ? "siri-left" : "siri-right"
            }`}
          >
            <SiriAnimation
              onClick={() => {
                if (listening) {
                  SpeechRecognition.stopListening();
                  if (audioRef && audioRef.current) {
                    audioRef.current.pause();
                    setAudioSrc(null);
                  }
                } else {
                  if (!audioSrc) {
                    SpeechRecognition.startListening();
                    // SpeechRecognition.startListening({language: 'hi-IN'});
                    setIsListening(true);
                  } else {
                    if (audioRef.current) {
                      audioRef.current.pause(); // Play the new audio
                      setAudioSrc(null);
                    }
                  }
                }
              }}
              length={transcript}
              listening={listening}
            />
          </div>
        </div>
      </div>

      {/* routes */}

      <Pages />
    </DefaultLayout>
  );
}

export default App;
