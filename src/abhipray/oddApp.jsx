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

const apiUrl = import.meta.env.VITE_BASE_API;

function App() {
  const navigate = useNavigate();

  const appContext = useContext(AppContext);
  const { loading, setLoading } = appContext || {};
  const { pathname } = useLocation();

  const [redirectUrl, setRedirectUrl] = useState("");
  const [isInValid, setIsInValid] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    commands: [
      {
        command: commands,
        callback: (redirectPage) => {
          redirectPage = redirectPage.toLowerCase();

          console.log("Redirecting to:", redirectPage);
          if (
            redirectPage.includes("my store") ||
            redirectPage.includes("mystore")
          ) {
            // navigate("/mystore");
            navigate("/mystore");
          } else if (redirectPage.includes("dashboard")) {
            navigate("/dashboard");
          } else if (
            redirectPage.includes("kya") ||
            redirectPage.includes("kyaa")
          ) {
            console.log("What is Vyapar Sathi?");
            console.log(redirectPage);
          } else if (redirectPage.includes("inventory")) {
            navigate("/inventory");
          } else if (
            redirectPage.includes("what") ||
            redirectPage.includes("What")
          ) {
            console.log("What is Vyapar Sathi?");
            console.log(redirectPage);
            const data =
              "The Open Network for Digital Commerce (ONDC) is an initiative launched by the Government of India to democratize digital commerce and create a level playing field for small and medium enterprises (SMEs). ONDC aims to promote open networks developed on open-sourced methodology, using open specifications and open network protocols, independent of any specific platform.";
            playTTS(data, "hi");
          } else if (redirectPage.includes("inventory")) {
            navigate("/inventory");
          } else if (
            redirectPage.includes("sign in") ||
            redirectPage.includes("signin")
          ) {
            navigate("/signin");
          } else if (
            redirectPage.includes("sign up") ||
            redirectPage.includes("signup")
          ) {
            navigate("/signup");
          } else if (redirectPage.includes("voice")) {
            navigate("/voice");
          } else if (
            redirectPage.includes("store onboarding") ||
            redirectPage.includes("store-onboarding") ||
            redirectPage.includes("dukaan") ||
            redirectPage.includes("store") ||
            redirectPage.includes("shop") ||
            redirectPage.includes("dukan")
          ) {
            navigate("/store-onboarding");
          } else {
            setIsInValid(true);
          }

          console.log("Redirecting to:", redirectPage);
        },
      },
    ],
  });

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
  const urls = {
    home: "/",
    dashboard: "/dashboard",
    mystore: "/mystore",
    inventory: "/inventory",
    signin: "/signin",
    signup: "/signup",
    "store-onboarding": "/store-onboarding",
    voice: "/voice",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      if (setLoading) {
        setLoading(false);
      }
    }, 1000);
  }, [setLoading]);

  useEffect(() => {
    if (redirectUrl && pages.includes(redirectUrl)) {
      setRedirectUrl(redirectUrl);
    }
  }, [redirectUrl]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Connection successful:", data);
      })
      .catch((error) => {
        console.error("Error connecting to server:", error);
      });
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

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="asis-cont">
        <div
          className={`assitant ${
            pathname === "/store-onboarding" ? "left" : "right"
          }`}
        >
          <div className="asis">
            <div className="transcript-cont" ref={transcriptRef}>
              <p className="transcript">
                {transcript.length === 0
                  ? "This is Vyapar Sathi! 🙏 Let's onboard your digital store on ONDC."
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
                } else {
                  SpeechRecognition.startListening();
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

// import React from "react";
// import GptChat from './voiceCommands/chatConvo.tsx';

// function App() {
//   return (
//     <div>
//       <h1>Chat with GPT</h1>
//       <GptChat />
//     </div>
//   );
// }

// export default App;




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

const apiUrl = (import.meta as any).env.VITE_BASE_API;

function App() {
  // const navigate = useNavigate();

  // const appContext = useContext(AppContext);
  // const { loading, setLoading } = appContext || {};
  // const { pathname } = useLocation();

  // const [redirectUrl, setRedirectUrl] = useState("");
  // const [isInValid, setIsInValid] = useState(false);

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition({
  //   commands: [
  //     {
  //       command: commands,
  //       callback: (redirectPage) => {
  //         redirectPage = redirectPage.toLowerCase();

  //         console.log("Redirecting to:", redirectPage);
  //         if (
  //           redirectPage.includes("my store") ||
  //           redirectPage.includes("mystore")
  //         ) {
  //           // navigate("/mystore");
  //           navigate("/mystore");
  //         } else if (redirectPage.includes("dashboard")) {
  //           navigate("/dashboard");
  //         } else if (
  //           redirectPage.includes("kya") ||
  //           redirectPage.includes("kyaa")
  //         ) {
  //           console.log("What is Vyapar Sathi?");
  //           console.log(redirectPage);
  //         } else if (redirectPage.includes("inventory")) {
  //           navigate("/inventory");
  //         } else if (
  //           redirectPage.includes("what") ||
  //           redirectPage.includes("What")
  //         ) {
  //           console.log("What is Vyapar Sathi?");
  //           console.log(redirectPage);
  //           const data =
  //             "The Open Network for Digital Commerce (ONDC) is an initiative launched by the Government of India to democratize digital commerce and create a level playing field for small and medium enterprises (SMEs). ONDC aims to promote open networks developed on open-sourced methodology, using open specifications and open network protocols, independent of any specific platform.";
  //           playTTS(data, "hi");
  //         } else if (redirectPage.includes("inventory")) {
  //           navigate("/inventory");
  //         } else if (
  //           redirectPage.includes("sign in") ||
  //           redirectPage.includes("signin")
  //         ) {
  //           navigate("/signin");
  //         } else if (
  //           redirectPage.includes("sign up") ||
  //           redirectPage.includes("signup")
  //         ) {
  //           navigate("/signup");
  //         } else if (redirectPage.includes("voice")) {
  //           navigate("/voice");
  //         } else if (
  //           redirectPage.includes("store onboarding") ||
  //           redirectPage.includes("store-onboarding") ||
  //           redirectPage.includes("dukaan") ||
  //           redirectPage.includes("store") ||
  //           redirectPage.includes("shop") ||
  //           redirectPage.includes("dukan")
  //         ) {
  //           navigate("/store-onboarding");
  //         } else {
  //           setIsInValid(true);
  //         }

  //         console.log("Redirecting to:", redirectPage);
  //       },
  //     },
  //   ],
  // });

  // const pages = [
  //   "home",
  //   "dashboard",
  //   "mystore",
  //   "inventory",
  //   "signin",
  //   "signup",
  //   "store-onboarding",
  //   "voice",
  // ];
  // const urls = {
  //   home: "/",
  //   dashboard: "/dashboard",
  //   mystore: "/mystore",
  //   inventory: "/inventory",
  //   signin: "/signin",
  //   signup: "/signup",
  //   "store-onboarding": "/store-onboarding",
  //   voice: "/voice",
  // };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (setLoading) {
  //       setLoading(false);
  //     }
  //   }, 1000);
  // }, [setLoading]);

  // useEffect(() => {
  //   if (redirectUrl && pages.includes(redirectUrl)) {
  //     setRedirectUrl(redirectUrl);
  //   }
  // }, [redirectUrl]);

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Connection successful:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error connecting to server:", error);
  //     });
  // }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loading, setLoading } = useContext(AppContext) || {};

  const [redirectUrl, setRedirectUrl] = useState("");
  const [isInValid, setIsInValid] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands: [
      {
        command: commands,
        callback: handleVoiceCommand,
      },
    ],
  });

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

  const urls = {
    home: "/",
    dashboard: "/dashboard",
    mystore: "/mystore",
    inventory: "/inventory",
    signin: "/signin",
    signup: "/signup",
    "store-onboarding": "/store-onboarding",
    voice: "/voice",
  };

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
    } else if (
      redirectPage.includes("ondc") ||
      redirectPage.includes("ondc") ||
      redirectPage.includes("vyapar")
    ) {
      handleQueryAboutVyapar();
    } else {
      setIsInValid(true);
    }
  }

  function handleQueryAboutVyapar() {
    const data =
      "The Open Network for Digital Commerce (ONDC) is an initiative launched by the Government of India to democratize digital commerce and create a level playing field for small and medium enterprises (SMEs). ONDC promotes open networks developed on open-sourced methodology.";
    playTTS(data, "hi");
    console.log("Responding to query about Vyapar.");
  }

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

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <div className="asis-cont">
        <div
          className={`assitant ${
            pathname === "/store-onboarding" ? "left" : "right"
          }`}
        >
          <div className="asis">
            <div className="transcript-cont" ref={transcriptRef}>
              <p className="transcript">
                {transcript.length === 0
                  ? "This is Vyapar Sathi! 🙏 Let's onboard your digital store on ONDC."
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
                } else {
                  SpeechRecognition.startListening();
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
