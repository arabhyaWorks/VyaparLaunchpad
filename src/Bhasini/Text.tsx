// Text.tsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext";

interface TextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ className, children, style }) => {
  const { selectedLanguage } = useContext(AppContext);
  const [translated, setTranslated] = useState<string | null>(null);

  const axiosApiInstance = axios.create({
    baseURL: "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
  });

  axiosApiInstance.interceptors.request.use(
    async (request) => {
      request.headers.Authorization =
        "ZZiuNxfnJBUTWXXZmxQ7Wm6xk-R7vBZaFIZjf7nse8UXe3Oc4r4B_YW9KMgwZI_M";
      return request;
    },
    (err) => Promise.reject(err)
  );

  const request = async (method: string, req: any) => {
    try {
      const response = await axiosApiInstance({
        method,
        url: "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
        headers: { Accept: "application/json" },
        data: req,
      });
      //console.log("response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("Oops, User session timed out");
      } else {
        throw error.response;
      }
    }
  };

  const textToTextTranslationNMT = async () => {
    const reqObj = {
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
        input: [{ source: children }],
        audio: [{ audioContent: null }],
      },
    };

    try {
      const responseData = await request("POST", reqObj);
      setTranslated(responseData?.pipelineResponse[0]?.output[0]?.target);
    } catch (error) {
      //console.log("textToTextTranslationNMT error:", error);
    }
  };

  useEffect(() => {
    textToTextTranslationNMT();
  }, [children, selectedLanguage]);

  return (
    <p style={style} className={className}>
      {translated ? translated : children}
    </p>
  );
};

export default Text;
