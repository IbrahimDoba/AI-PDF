"use client";
import React from "react";
import AiPdfForm from "@/components/MainArea/AiPdfForm";
import AiPdfDetails from "@/components/MainArea/AiPdfDetails";
import { useAiPdfContext } from "@/hooks/AiPdfContext";

export interface QuestionProps {
  aiQuestion: string;
  aiAnswer: string;
  _id: string;
  index: number;
}
const HomePage = () => {
  const { questions, dispatch, fileTitle } = useAiPdfContext();

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const res = await axios.get("http://localhost:5001/api/ai/", {
  //       params: { fileNameTitle: fileTitle },
  //     });
  //     const response = await res.data;
  //     if(!res){
  //       return
  //     }
  //     if (res) {
  //       dispatch({ type: "GET_QUESTIONS", payload: response });
  //     }
  //   };
  //   fetchQuestions();
  //   console.log(questions)
  // }, [dispatch, fileTitle]);

  return (
    <div className="flex justify-start items-start h-[93.4vh] w-full bg-gray-400 max-lg:flex-col">
      <AiPdfForm />
      <AiPdfDetails />
    </div>
  );
};

export default HomePage;
