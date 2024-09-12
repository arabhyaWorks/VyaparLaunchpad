import axios from "axios";

const API_KEY =
  "sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0";

const playTTS = async (text, languageCode) => {
  if (!text || !languageCode) {
    console.error("Text and language code are required.");
    return;
  }

  console.log("this is somethign");
  console.log(text, languageCode);

  //   try {
  //     const ttsResponse = await axios.post(
  //       "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
  //       {
  //         pipelineTasks: [
  //           {
  //             taskType: "tts",
  //             config: {
  //               language: {
  //                 sourceLanguage: languageCode, // Pass the language code dynamically
  //               },
  //               serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4", // Adjust serviceId if necessary
  //               gender: "female",
  //               samplingRate: 48000,
  //             },
  //           },
  //         ],
  //         inputData: {
  //           input: [{ source: text }],
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${API_KEY}`, // Replace with your actual API key
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const audioContent = ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
  //     if (audioContent) {
  //       const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
  //       audio.playbackRate = 1.08; // Adjust the speed if necessary
  //       audio.play();
  //     } else {
  //       console.error("No audio content found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error during TTS request:", error);
  //   }

  try {
    const translationResponse = await axios.post(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      {
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: "en",
                targetLanguage: languageCode,
              },
              serviceId: "ai4bharat/indictrans-v2-all-gpu--t4",
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

    const translatedText =
      translationResponse.data.pipelineResponse[0].output[0].target;

    console.log("Translated Text:", translatedText);

    const ttsResponse = await axios.post(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      {
        pipelineTasks: [
          {
            taskType: "tts",
            config: {
              language: {
                sourceLanguage: languageCode,
              },
              serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
              gender: "female",
              samplingRate: 8000,
            },
          },
        ],
        inputData: {
          input: [{ source: translatedText }],
        },
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // const audioContent = ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
    // if (audioContent) {
    //   const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
    // //   audioRef.current = audio;
    //   audio.play();
    // //   hasPlayed.current = true;

    // } else {
    //   console.error("No audio content found in the response");
    // }

    console.log(
      "TTS Response:",
      ttsResponse.data.pipelineResponse[0].audio[0].audioContent
    );

    const audioContent =
      ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
    if (audioContent) {
      const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
      audio.playbackRate = 1.08; // Adjust the speed if necessary
      audio.play();
    } else {
      console.error("No audio content found in the response");
    }
  } catch (error) {
    console.error("Error in TTS:", error.response || error.message);
  }
};

export default playTTS;
