import axios from "axios";

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

const translateText = async (text: string): Promise<string> => {
  const reqObj = {
    pipelineTasks: [
      {
        taskType: "translation",
        config: {
          language: {
            sourceLanguage: "en",
            targetLanguage: "hi",
          },
          serviceId: "ai4bharat/indictrans-v2-all-gpu--t4",
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
      audio: [{ audioContent: null }],
    },
  };

  try {
    const responseData = await request("POST", reqObj);
    return "fewjhfjw";
    // return responseData?.pipelineResponse[0]?.output[0]?.target || text;
  } catch (error) {
    //console.log("translateText error:", error);
    return text;
  }
};

export default translateText;
