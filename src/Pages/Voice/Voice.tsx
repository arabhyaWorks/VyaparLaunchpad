// @ts-nocheck
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "./Voice.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { AppContext } from "../../AppContext";
import voiceBg from "../../assets/LottieAnimation/voice-background.svg";
import logo from "../../assets/LottieAnimation/logo.svg";
import botLogo from "../../assets/LottieAnimation/botIcon.svg";
import imageUpload from "../../assets/LottieAnimation/uploadImage.svg";

// Extend the Window interface to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const API_KEY =
  "sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0";
const LANGUAGES = [
  { sourceLanguage: "bn", name: "Bengali" },
  { sourceLanguage: "en", name: "English" },
  { sourceLanguage: "gu", name: "Gujarati" },
  { sourceLanguage: "hi", name: "Hindi" },
  { sourceLanguage: "kn", name: "Kannada" },
  { sourceLanguage: "ml", name: "Malayalam" },
  { sourceLanguage: "mr", name: "Marathi" },
  { sourceLanguage: "or", name: "Odia" },
  { sourceLanguage: "pa", name: "Punjabi" },
  { sourceLanguage: "ta", name: "Tamil" },
  { sourceLanguage: "te", name: "Telugu" },
];

// const ttsServiceIds = {
//   as: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   bn: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   en: "ai4bharat/indic-tts-coqui-misc-gpu--t4",
//   gu: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   hi: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   kn: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
//   ml: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
//   mr: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   or: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   pa: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
//   ta: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
// };

const ttsServiceIds = {
  as: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  bn: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  en: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",

  gu: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  hi: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  kn: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  ml: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  // kn: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
  // ml: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
  mr: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  or: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  pa: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  ta: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
  // ta: "ai4bharat/indic-tts-coqui-dravidian-gpu--t4",
};

// const QUESTIONS: string[] = [
//   "Hello, I'm Vyapar Sathi! 👋 Welcome to Vyapar Launchpad. Let's list your product.",
//   "What is the shop name?",
//   "What is the seller state?",
//   "What is the product language?",
//   "What is the product category?",
//   "What is the product name?",
//   "What is the price of the product?",
//   "What is the product description?",
//   "What are the product variations?",
//   "Please upload the company logo.",
//   "Please upload the product images.",
// ];


const QUESTIONS: string[] = [
  "नमस्कार, मैं व्यापार साथी हूँ! 👋 व्यापार लॉन्चपैड में आपका स्वागत है। आइए आपके उत्पाद को सूचीबद्ध करें।",
  "दुकान का नाम क्या है?",
  "विक्रेता का राज्य कौन सा है?",
  "उत्पाद की भाषा क्या है?",
  "उत्पाद की श्रेणी क्या है?",
  "उत्पाद का नाम क्या है?",
  "उत्पाद की कीमत क्या है?",
  "उत्पाद का विवरण क्या है?",
  "उत्पाद के प्रकार/विविधताएँ क्या हैं?",
  "कृपया कंपनी का लोगो अपलोड करें।",
  "कृपया उत्पाद की छवियाँ अपलोड करें।",
];
// const aiUrl = (import.meta as any).env.VITE_BASE_AI_API;
const aiUrl = "http://127.0.0.1:8000/"
const backendUrl = (import.meta as any).env.VITE_BASE_API;
const photAiApiKey = "667bd78dc03bdd1cb404e7a0_3668c766b56f00a1de05_apyhitools";
const photoroomApi = "sandbox_bf94ab81f439e8cc7c75b8e42607c85d9d4345d5";

const postData = async (
  productTitle: string,
  productDescription: string,
  productVariation: string,
  pricing: string
) => {
  try {
    const response = await axios.post(
      `${aiUrl}process/`,
      {
        prompt: productTitle,
        description: productDescription,
        variation: productVariation,
        pricing: pricing,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in postData:", error.response?.data || error.message);
    throw error;
  }
};

const changeBackgroundImages = async (imageUrls: string[], prompt: string) => {
  const newImages = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        const apiUrl = `https://image-api.photoroom.com/v2/edit?background.prompt=${encodeURIComponent(
          prompt
        )}&maxHeight=500&maxWidth=500&imageUrl=${encodeURIComponent(url)}`;

        const response = await axios.get(apiUrl, {
          headers: {
            "x-api-key": photoroomApi,
          },
          responseType: "arraybuffer",
        });

        // Convert binary data to base64
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        const imageUrl = `data:image/png;base64,${base64Image}`;

        return imageUrl; // Return the base64 image URL
      } catch (error) {
        console.error("Error changing background image:", error);
        return null;
      }
    })
  );
  return newImages.filter((img) => img !== null);
};

const Voice: React.FC = () => {
  const { selectedLanguage } = useContext(AppContext);

  const [questionsHistory, setQuestionsHistory] = useState<string[]>([]);
  const [responsesHistory, setResponsesHistory] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("hi");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [responses, setResponses] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [nextAudio, setNextAudio] = useState<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);

  const [audioSpeed, setAudioSpeed] = useState<number>(1.1);
  const [personSpeech, setPersonSpeech] = useState<boolean>(true);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const startConversation = () => {
    setCurrentQuestionIndex(0);
    askQuestion(0);
  };

  const askQuestion = async (index: number) => {
    const question = QUESTIONS[index];
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
                  targetLanguage: language,
                },
                serviceId: "ai4bharat/indictrans-v2-all-gpu--t4",
              },
            },
          ],
          inputData: {
            input: [{ source: question }],
          },
        },
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      // const translatedText =
      //   translationResponse.data.pipelineResponse[0].output[0].target;

      // console.log("translatedText", translatedText);
      // console.log("language", ttsServiceIds[language], language, personSpeech);

      //   "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      //   {
      //     pipelineTasks: [
      //       {
      //         taskType: "tts",
      //         config: {
      //           language: {
      //             sourceLanguage: language,
      //           },
      //           serviceId: ttsServiceIds[language],
      //           gender: personSpeech,
      //           samplingRate: 88000,
      //         },
      //       },
      //     ],
      //     inputData: {
      //       input: [{ source: translatedText }],
      //     },
      //   },
      //   {
      //     headers: {
      //       Authorization: API_KEY,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const ttsResponse = await axios.post(
        "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
        {
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: {
                  sourceLanguage: language,
                },
                serviceId: "ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4",
                gender: "male",
                samplingRate: 8000,
              },
            },
          ],
          inputData: {
            input: [{ source: question }],
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
        const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
        audioRef.current = audio;
        audio.playbackRate = audioSpeed; // 1.5 times faster

        audio.play();

        // Preload the next question's audio
        if (index < QUESTIONS.length - 1) {
          preloadNextQuestion(index + 1);
        }
      } else {
        console.error("No audio content found in the response");
      }
    } catch (error) {
      console.error("Error in TTS:", error);
    }
  };

  const preloadNextQuestion = async (index: number) => {
    const question = QUESTIONS[index];
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
                  targetLanguage: language,
                },
                serviceId: "ai4bharat/indictrans-v2-all-gpu--t4",
              },
            },
          ],
          inputData: {
            input: [{ source: question }],
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

      console.log(
        "next questions language",
        ttsServiceIds[language],
        language,
        personSpeech
      );

      const ttsResponse = await axios.post(
        "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
        {
          pipelineTasks: [
            {
              taskType: "tts",
              config: {
                language: {
                  sourceLanguage: language,
                },
                serviceId: ttsServiceIds[language],
                gender: personSpeech,
                samplingRate: 48000,
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

      const audioContent =
        ttsResponse.data.pipelineResponse[0].audio[0].audioContent;
      if (audioContent) {
        const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
        audio.playbackRate = audioSpeed; // 1.5 times faster

        setNextAudio(audio);
      } else {
        console.error("No audio content found in the response");
      }
    } catch (error) {
      console.error("Error in preloading TTS:", error);
    }
  };

  const handleNext = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (isRecording) {
      stopRecording();
    }

    if (currentQuestionIndex >= 0 && responses[currentQuestionIndex]) {
      setQuestionsHistory((prev) => [...prev, QUESTIONS[currentQuestionIndex]]);
      setResponsesHistory((prev) => [...prev, responses[currentQuestionIndex]]);
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      if (nextAudio) {
        audioRef.current = nextAudio;
        audioRef.current.play();

        if (nextIndex < QUESTIONS.length - 1) {
          preloadNextQuestion(nextIndex + 1);
        }
      } else {
        askQuestion(nextIndex);
      }
    } else {
      console.log("Collected Data:", JSON.stringify(responses));
      const productTitle = responses[5];
      const productDescription = responses[7];
      const productVariation = responses[8];
      const pricing = responses[6];

      if (
        !productTitle ||
        !productDescription ||
        !productVariation ||
        !pricing
      ) {
        console.error("Required data is missing.");
        return;
      }

      // Upload the company logo
      let companyLogoUrl = "";
      if (companyLogoFile) {
        const formData = new FormData();
        formData.append("file", companyLogoFile);
        try {
          const response = await axios.post(
            `${backendUrl}upload/s3`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          companyLogoUrl = response.data.s3_link;
        } catch (error) {
          console.error("Error uploading company logo:", error);
        }
      }

      // Upload product images
      let productImageUrls = [];
      if (productImageFiles.length > 0) {
        const formData = new FormData();
        productImageFiles.forEach((file) => {
          formData.append("files", file);
        });
        try {
          const response = await axios.post(
            `${backendUrl}upload/s3/multiple`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          productImageUrls = response.data.s3_links;
        } catch (error) {
          console.error("Error uploading product images:", error);
        }
      }

      setLoading(true);
      try {
        const response = await postData(
          productTitle,
          productDescription,
          productVariation,
          pricing
        );
        console.log("Post response:", response);

        // Process the images using PhotAi API
        const prompt = `Please change the background of the input Image such that they are Ecommerce ready. The product is called ${productTitle}`;
        const newImages = await changeBackgroundImages(
          productImageUrls,
          prompt
        );

        navigate("/product-page", {
          state: {
            productData: {
              inputLanguage: language,
              shopName: responses[1],
              sellerState: responses[2],
              productLanguage: responses[3],
              productCategory: responses[4],
              productTitle,
              pricing,
              productDescription,
              productVariation,
              response: { ...response, newImages },
              companyLogo: companyLogoUrl,
              images: productImageUrls,
              prompt,
            },
          },
        });
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[currentQuestionIndex] = transcript;
        return updatedResponses;
      });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCompanyLogoFile(e.target.files[0]);
    }
  };

  const handleProductImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setProductImageFiles(Array.from(e.target.files));
    }
  };

  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        // <div className="max-w-5xl bg-white shadow-lg rounded-lg p-4 w-full h-3/4 flex">
        //   <h1>
        //     this is lang code {selectedLanguage} {language}
        //   </h1>
        //   <div className="w-3/4 flex flex-col">
        //     <div className="chat-box flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg">
        //       {currentQuestionIndex < 0 ? (
        //         <div className="chat-message">
        //           <div className="chat-question">
        //             <p>Please select a language to start the conversation.</p>
        //           </div>
        //         </div>
        //       ) : (
        //         <>
        //           {questionsHistory.map((question, index) => (
        //             <div
        //               key={`history-question-${index}`}
        //               className="chat-message"
        //             >
        //               <div className="chat-question">
        //                 <p>{question}</p>
        //               </div>
        //               <div className="chat-response ml-4">
        //                 <p>{responsesHistory[index]}</p>
        //               </div>
        //             </div>
        //           ))}

        //           {currentQuestionIndex < QUESTIONS.length && (
        //             <div className="chat-message">
        //               <div className="chat-question">
        //                 <p>{QUESTIONS[currentQuestionIndex]}</p>
        //               </div>
        //               {responses[currentQuestionIndex] && (
        //                 <div className="chat-response ml-4">
        //                   <p>{responses[currentQuestionIndex]}</p>
        //                 </div>
        //               )}
        //             </div>
        //           )}

        //           {currentQuestionIndex === 9 && (
        //             <div className="chat-message">
        //               <div className="chat-question">
        //                 <p>{QUESTIONS[9]}</p>
        //               </div>
        //               <div className="chat-response ml-4">
        //                 <input
        //                   type="file"
        //                   accept="image/*"
        //                   onChange={handleCompanyLogoChange}
        //                 />
        //               </div>
        //             </div>
        //           )}

        //           {currentQuestionIndex === 10 && (
        //             <div className="chat-message">
        //               <div className="chat-question">
        //                 <p>{QUESTIONS[10]}</p>
        //               </div>
        //               <div className="chat-response ml-4">
        //                 <input
        //                   type="file"
        //                   accept="image/*"
        //                   multiple
        //                   onChange={handleProductImagesChange}
        //                 />
        //               </div>
        //             </div>
        //           )}
        //         </>
        //       )}
        //     </div>

        //     {currentQuestionIndex >= 0 && (
        //       <div className="chat-input mt-4">
        //         <div className="flex">
        //           <button
        //             onClick={startRecording}
        //             className="bg-primary text-white px-4 py-2 rounded mr-2"
        //           >
        //             Record
        //           </button>
        //           <button
        //             onClick={handleNext}
        //             className="bg-secondary text-white px-4 py-2 rounded"
        //           >
        //             Next
        //           </button>
        //         </div>
        //       </div>
        //     )}
        //   </div>

        //   <div className="w-1/3 ml-4 flex flex-col justify-between">
        //     <div className="flex items-center mb-4">
        //       <label className="mr-2">Select Language:</label>
        //       <select
        //         value={language}
        //         onChange={handleLanguageChange}
        //         className="border border-gray-300 rounded px-3 py-1 mr-2"
        //       >
        //         <option value="">Select Language</option>
        //         {LANGUAGES.map((lang) => (
        //           <option key={lang.sourceLanguage} value={lang.sourceLanguage}>
        //             {lang.name}
        //           </option>
        //         ))}
        //       </select>
        //       <button
        //         onClick={startConversation}
        //         disabled={!language}
        //         className={`bg-primary text-white px-4 py-1 rounded ${
        //           !language
        //             ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
        //             : "hover:bg-blue-700 hover:cursor-pointer"
        //         }`}
        //       >
        //         Start
        //       </button>
        //     </div>
        //   </div>
        // </div>

        <div
          className="voiceCont"
          style={{
            backgroundImage: `url(${voiceBg})`,
          }}
        >
          <div className="voiceHeader">
            <img src={logo} alt="vyapar" />
          </div>

          <div className="chatCont shadow">
            <p className="chat-time">Mon 14:21 AM</p>
            {currentQuestionIndex < 0 ? (
              <>
                <div className="message question">
                  <img src={botLogo} alt="Vyapar Sathi" className="botIcon" />
                  <p>Please select a language to start the conversation.</p>
                </div>
              </>
            ) : (
              <div ref={transcriptRef} className="chat-scrollview">
                <>
                  {questionsHistory.map((question, index) => (
                    <div
                      key={`history-question-${index}`}
                      className="chat-message"
                    >
                      <div className="message question">
                        <img
                          src={botLogo}
                          alt="Vyapar Sathi"
                          className="botIcon"
                        />
                        <p>{question}</p>
                      </div>

                      <div className="message answer">
                        <p>{responsesHistory[index]}</p>
                      </div>
                    </div>
                  ))}

                  {currentQuestionIndex < QUESTIONS.length && (
                    <div className="chat-message">
                      <div className="message question">
                        <img
                          src={botLogo}
                          alt="Vyapar Sathi"
                          className="botIcon"
                        />
                        <p>{QUESTIONS[currentQuestionIndex]}</p>
                      </div>
                      {responses[currentQuestionIndex] && (
                        <div className="message answer">
                          <p>{responses[currentQuestionIndex]}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* {currentQuestionIndex === 9 && (
                    <div className="chat-message">
                      <div className="chat-question">
                        <p>{QUESTIONS[9]}</p>
                      </div>
                      <div className="chat-response ml-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCompanyLogoChange}
                        />
                      </div>
                    </div>
                  )} */}

                  {currentQuestionIndex === 9 && (
                    <div className="chat-message">
                      {/* <div className="message question">
                        <img
                          src={botLogo}
                          alt="Vyapar Sathi"
                          className="botIcon"
                        />
                        <p>{QUESTIONS[9]}</p>
                      </div> */}
                      <div className="imageUploaderCont">
                        <>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleProductImagesChange}
                            className="hidden"
                            id="fileInput"
                            style={{ backgroundColor: "red" }}
                          />
                          <label htmlFor="fileInput" className="imageUpCont">
                            <div className="imageupcont">
                              <img
                                src={imageUpload}
                                alt="Upload Icon"
                                className="image-upload-chat"
                              />
                            </div>
                            <h1 style={{ textAlign: "center" }}>
                              Upload company logo image
                            </h1>
                          </label>
                        </>
                      </div>
                    </div>
                  )}

                  {currentQuestionIndex === 10 && (
                    <div className="chat-message">
                      <div className="imageUploaderCont">
                        <>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleProductImagesChange}
                            className="hidden"
                            id="fileInput"
                            style={{ backgroundColor: "red" }}
                          />
                          <label htmlFor="fileInput" className="imageUpCont">
                            <div className="imageupcont">
                              <img
                                src={imageUpload}
                                alt="Upload Icon"
                                className="image-upload-chat"
                              />
                            </div>
                            <h1 style={{ textAlign: "center" }}>
                              Upload product images
                            </h1>
                          </label>
                        </>
                      </div>
                    </div>
                  )}
                </>
              </div>
            )}
          </div>

          <div className="instruments">
            <button
              onClick={startConversation}
              disabled={!language}
              className={`startConvBtn`}
            >
              Start
            </button>

            <button
              onClick={startRecording}
              className={`startConvBtn ${
                currentQuestionIndex >= 0 ? "enabled" : "disabled"
              }`}
            >
              Record
            </button>

            <button
              onClick={handleNext}
              className={`startConvBtn ${
                currentQuestionIndex >= 0 ? "enabled" : "disabled"
              }`}
            >
              Next
            </button>
          </div>

        </div>
      )}
    </div>
  );

  // return (
  //   <div className="h-screen flex justify-center items-center bg-[#FDE7A8]">
  //     {loading ? (
  //       <Loader />
  //     ) : (
  //       <div className="max-w-5xl bg-white shadow-lg rounded-lg p-4 w-full h-3/4 flex">
  //         <div className="w-3/4 flex flex-col">
  //           <div className="chat-box flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg">
  //             {currentQuestionIndex < 0 ? (
  //               <div className="chat-message">
  //                 <div className="chat-question">
  //                   <p>Please select a language to start the conversation.</p>
  //                 </div>
  //               </div>
  //             ) : (
  //               <>
  //                 {questionsHistory.map((question, index) => (
  //                   <div
  //                     key={`history-question-${index}`}
  //                     className="chat-message"
  //                   >
  //                     <div className="chat-question">
  //                       <p>{question}</p>
  //                     </div>
  //                     <div className="chat-response ml-4">
  //                       <p>{responsesHistory[index]}</p>
  //                     </div>
  //                   </div>
  //                 ))}

  //                 {currentQuestionIndex < QUESTIONS.length && (
  //                   <div className="chat-message">
  //                     <div className="chat-question">
  //                       <p>{QUESTIONS[currentQuestionIndex]}</p>
  //                     </div>
  //                     {responses[currentQuestionIndex] && (
  //                       <div className="chat-response ml-4">
  //                         <p>{responses[currentQuestionIndex]}</p>
  //                       </div>
  //                     )}
  //                   </div>
  //                 )}

  //                 {currentQuestionIndex === 9 && (
  //                   <div className="chat-message">
  //                     <div className="chat-question">
  //                       <p>{QUESTIONS[9]}</p>
  //                     </div>
  //                     <div className="chat-response ml-4">
  //                       <input
  //                         type="file"
  //                         accept="image/*"
  //                         onChange={handleCompanyLogoChange}
  //                       />
  //                     </div>
  //                   </div>
  //                 )}

  //                 {currentQuestionIndex === 10 && (
  //                   <div className="chat-message">
  //                     <div className="chat-question">
  //                       <p>{QUESTIONS[10]}</p>
  //                     </div>
  //                     <div className="chat-response ml-4">
  //                       <input
  //                         type="file"
  //                         accept="image/*"
  //                         multiple
  //                         onChange={handleProductImagesChange}
  //                       />
  //                     </div>
  //                   </div>
  //                 )}
  //               </>
  //             )}
  //           </div>

  //           {currentQuestionIndex >= 0 && (
  //             <div className="chat-input mt-4">
  //               <div className="flex">
  //                 <button
  //                   onClick={startRecording}
  //                   className="bg-primary text-white px-4 py-2 rounded mr-2"
  //                 >
  //                   Record
  //                 </button>
  //                 <button
  //                   onClick={handleNext}
  //                   className="bg-secondary text-white px-4 py-2 rounded"
  //                 >
  //                   Next
  //                 </button>
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         <div className="w-1/3 ml-4 flex flex-col justify-between">
  //           <div className="flex items-center mb-4">
  //             <label className="mr-2">Select Language:</label>
  //             <select
  //               value={language}
  //               onChange={handleLanguageChange}
  //               className="border border-gray-300 rounded px-3 py-1 mr-2"
  //             >
  //               <option value="">Select Language</option>
  //               {LANGUAGES.map((lang) => (
  //                 <option key={lang.sourceLanguage} value={lang.sourceLanguage}>
  //                   {lang.name}
  //                 </option>
  //               ))}
  //             </select>
  //             <button
  //               onClick={startConversation}
  //               disabled={!language}
  //               className={`bg-primary text-white px-4 py-1 rounded ${
  //                 !language
  //                   ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
  //                   : "hover:bg-blue-700 hover:cursor-pointer"
  //               }`}
  //             >
  //               Start
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Voice;
