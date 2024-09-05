import { useEffect, useContext, useState, useRef } from "react";
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

import { Player } from "@lottiefiles/react-lottie-player";
import siri from "../src/assets/LottieAnimation/siri3.json";
import SiriAnimation from "./SiriAnimation";

import Loader from "./components/common/Loader";
import PageTitle from "./components/common/PageTitle";

import SignUp from "./Pages/Authentication/Signup";
import SignIn from "./Pages/Authentication/Signin";

import Dashboard from "./Pages/Dashboard/Dashboard";
import StoreOnboarding from "./Pages/StoreOnboarding/StoreOnboard";
import ProductOnBoarding from "./Pages/ProductOnboarding/ProductOnboard";
import ProductPage from "./Pages/ProductOnboarding/ProductPage";
import Voice from "./Pages/Voice/Voice";
import MyStore from "./Pages/MyStore/MyStore";
import Inventory from "./Pages/Inventory/Inventory";
import DefaultLayout from "./layout/DefaultLayout";
import LivePage from "./Pages/LivePage/LivePage";

import commands from "./voiceCommands";

const apiUrl = (import.meta as any).env.VITE_BASE_API;

function App() {
  const navigate = useNavigate();

  const { loading, setLoading } = useContext(AppContext);
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
    setTimeout(() => setLoading(false), 1000);
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
    return <div>Browser doesn't support speech recognition.</div>;
  }

  const transcriptRef = useRef(null);

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
            {/* <h1>Vyapar Sathi</h1> */}
            {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
            {/* <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button> */}

            <div className="transcript-cont" ref={transcriptRef}>
              <p className="transcript">
                {transcript.length === 0
                  ? "This is Vyapar Sathi! 🙏 Let's onboard your digital store on ONDC."
                  : transcript}
              </p>
            </div>

            {/* <p>
              {pathname.slice(1).slice(0, 1).toUpperCase() +
                pathname.slice(1).slice(1).toLowerCase()}
            </p> */}
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
      {/* 
      {redirectUrl && pages.includes(redirectUrl) && (
        <Navigate to={urls[redirectUrl]} replace />
      )} */}

      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <SignIn />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/mystore"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <MyStore />
            </>
          }
        />

        <Route
          path="/inventory"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <Inventory />
            </>
          }
        />

        <Route
          path="/product-onboarding"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <ProductOnBoarding />
            </>
          }
        />

        <Route
          path="/product-page"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <ProductPage />
            </>
          }
        />

        <Route
          path="/voice"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <Voice />
            </>
          }
        />
        <Route
          path="/store-onboarding"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <StoreOnboarding />
            </>
          }
        />
        <Route
          path="/live/:shareable_id"
          element={
            <>
              <PageTitle title="Vyapar Launchpad" />
              <LivePage />
            </>
          }
        />
      </Routes>
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
