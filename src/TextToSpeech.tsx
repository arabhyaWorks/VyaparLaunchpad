// TextToSpeech.tsx

import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

interface TextToSpeechProps {
  text: string;
  onAudioPlayEnd?: () => void;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, onAudioPlayEnd }) => {
  const { selectedLanguage } = useContext(AppContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  const API_KEY = "sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0";

  useEffect(() => {
    if (hasPlayed.current) {
      return;
    }

    const fetchAudio = async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

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
                    targetLanguage: selectedLanguage,
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

        const translatedText = translationResponse.data.pipelineResponse[0].output[0].target;

        const ttsResponse = await axios.post(
          "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
          {
            pipelineTasks: [
              {
                taskType: "tts",
                config: {
                  language: {
                    sourceLanguage: selectedLanguage,
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

        const audioContent = ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
        if (audioContent) {
          const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
          audioRef.current = audio;
          audio.play();
          hasPlayed.current = true;

          audio.onended = () => {
            if (onAudioPlayEnd) {
              onAudioPlayEnd();
            }
          };
        } else {
          console.error("No audio content found in the response");
        }
      } catch (error) {
        console.error("Error in TTS:", error.response || error.message);
      }
    };

    fetchAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [text, selectedLanguage, onAudioPlayEnd]);

  return null;
};

export default TextToSpeech;
