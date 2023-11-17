import React, { useEffect } from "react";
import axios from "axios";

const AIDetect = () => {
    const [similarityScore, setSimilarityScore] = useState(0);

  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/ai_detection",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmJhZWQyMGItYjZiMy00YmFmLWFlYWItMjZhNDk3ZTFlYWE3IiwidHlwZSI6ImFwaV90b2tlbiJ9.kZgwrRsF8fLDv7sSNQpmMa4wuEDL7Qdvcpak1EB3L3E",
        "Content-Type": "application/json",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "originalityai",
        text:
          "In a thesis, the abstract is a concise summary that provides an overview of the entire document. It typically appears at the beginning, before the main body of the thesis.",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        const score = response.data.similarity_score; // Adjust this based on the actual response key
        setSimilarityScore(score);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here
      });
  }, []);

  return <div>AIDetect Component</div>;
};

export default AIDetect;
