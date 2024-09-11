import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const commands = [
    {
      command: "I would like to order *",
      callback: (food, { resetTranscript }) => {
        setMessage(`Your order is for: ${food}`);
        setIsListening(false);
        SpeechRecognition.stopListening();

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

  useEffect(() => {
    if (isListening === true) {
      if (listening === false) {
        console.log("Asnwering your query", transcript);
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
    </div>
  );
};
export default Dictaphone;

// import React, { useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const Dictaphone = () => {
//   const [message, setMessage] = useState("");
//   const commands = [
//     {
//       command: "I would like to order *",
//       callback: (food) => setMessage(`Your order is for: ${food}`),
//     },
//     {
//       command: "The weather is :condition today",
//       callback: (condition) => setMessage(`Today, the weather is ${condition}`),
//     },
//     {
//       command: "My top sports are * and *",
//       callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
//     },
//     {
//       command: "Pass the salt (please)",
//       callback: () => setMessage("My pleasure"),
//     },
//     {
//       command: ["Hello", "Hi"],
//       callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
//       matchInterim: true,
//     },
//     {
//       command: "Beijing",
//       callback: (command, spokenPhrase, similarityRatio) =>
//         setMessage(
//           `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
//         ),
//       // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2,
//     },
//     {
//       command: ["eat", "sleep", "leave"],
//       callback: (command) => setMessage(`Best matching command: ${command}`),
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2,
//       bestMatchOnly: true,
//     },
//     {
//       command: "clear",
//       callback: ({ resetTranscript }) => resetTranscript(),
//     },
//   ];

//   const {
//     transcript,
//     browserSupportsSpeechRecognition,
//     resetTranscript,
//     listening,
//   } = useSpeechRecognition({
//     commands,
//     onEnd: () => {
//       console.log("Speech recognition ended.");
//     },
//     onResult: (result) => {
//       console.log("Result received:", result);
//     },
//     onError: (error) => {
//       console.error("Speech recognition error:", error);
//     },
//     onNoMatch: () => {
//       console.log("No match found.");
//     },
//     onSoundStart: () => {
//       console.log("Listening started.");
//     },
//     onSoundEnd: () => {
//       console.log("Listening stopped.");
//     },
//     onStart: () => {
//       console.log("Speech recognition started.");
//     },
//   });

//   if (!browserSupportsSpeechRecognition) {
//     return null;
//   }

//   return (
//     <div>
//       <div>
//         <p>Microphone: {listening ? "on" : "off"}</p>
//         <button
//           onClick={
//             SpeechRecognition.startListening
//             // SpeechRecognition.startListening({
//             //   continuous: true,
//             //   language: "hi-IN",
//             // })
//           }
//         >
//           Start
//         </button>
//         <button onClick={SpeechRecognition.stopListening}>Stop</button>
//         <button onClick={resetTranscript}>Reset</button>
//         {/* <p>{transcript}</p> */}
//       </div>
//       <h1>this is dictaphone</h1>
//       <p>{message}</p>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;
