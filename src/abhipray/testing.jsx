import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "I would like to order *",
      callback: (food) => setMessage(`Your order is for: ${food}`),
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
  ];

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
  } = useSpeechRecognition({
    commands,
    onEnd: () => {
      console.log("Speech recognition ended.");
    },
    onResult: (result) => {
      console.log("Result received:", result);
    },
    onError: (error) => {
      console.error("Speech recognition error:", error);
    },
    onNoMatch: () => {
      console.log("No match found.");
    },
    onSoundStart: () => {
      console.log("Listening started.");
    },
    onSoundEnd: () => {
      console.log("Listening stopped.");
    },
    onStart: () => {
      console.log("Speech recognition started.");
    },
  });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={
            SpeechRecognition.startListening
            // SpeechRecognition.startListening({
            //   continuous: true,
            //   language: "hi-IN",
            // })
          }
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
    </div>
  );
};
export default Dictaphone;

// import React from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const Dictaphone = () => {
//   //   const {
//   //     transcript,
//   //     listening,
//   //     resetTranscript,
//   //     browserSupportsSpeechRecognition
//   //   } = useSpeechRecognition();

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition({
//     commands: [
//       {
//         command: commands,
//         callback: (redirectPage) => {
//           redirectPage = redirectPage.toLowerCase();

//           console.log("Redirecting to:", redirectPage);
//           if (
//             redirectPage.includes("my store") ||
//             redirectPage.includes("mystore")
//           ) {
//             // navigate("/mystore");
//             // navigate("/mystore");
//           } else if (redirectPage.includes("dashboard")) {
//             // navigate("/dashboard");
//           } else if (
//             redirectPage.includes("kya") ||
//             redirectPage.includes("kyaa")
//           ) {
//             console.log("What is Vyapar Sathi?");
//             console.log(redirectPage);
//           } else if (redirectPage.includes("inventory")) {
//             // navigate("/inventory");
//           } else if (
//             redirectPage.includes("what") ||
//             redirectPage.includes("What")
//           ) {
//             console.log("What is Vyapar Sathi?");
//             console.log(redirectPage);
//             const data =
//               "The Open Network for Digital Commerce (ONDC) is an initiative launched by the Government of India to democratize digital commerce and create a level playing field for small and medium enterprises (SMEs). ONDC aims to promote open networks developed on open-sourced methodology, using open specifications and open network protocols, independent of any specific platform.";
//             // playTTS(data, "hi");
//           } else if (redirectPage.includes("inventory")) {
//             // navigate("/inventory");
//           } else if (
//             redirectPage.includes("sign in") ||
//             redirectPage.includes("signin")
//           ) {
//             // navigate("/signin");
//           } else if (
//             redirectPage.includes("sign up") ||
//             redirectPage.includes("signup")
//           ) {
//             // navigate("/signup");
//           } else if (redirectPage.includes("voice")) {
//             // navigate("/voice");
//           } else if (
//             redirectPage.includes("store onboarding") ||
//             redirectPage.includes("store-onboarding") ||
//             redirectPage.includes("dukaan") ||
//             redirectPage.includes("store") ||
//             redirectPage.includes("shop") ||
//             redirectPage.includes("dukan")
//           ) {
//             // navigate("/store-onboarding");
//           } else {
//             // setIsInValid(true);
//           }

//           console.log("Redirecting to:", redirectPage);
//         },
//       },
//     ],
//   });

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? "on" : "off"}</p>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;
