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



  return (
    <div className="flex justify-start items-start h-[93.4vh] w-full bg-gray-400 max-lg:flex-col">
      <AiPdfForm />
      <AiPdfDetails />
    </div>
  );
};

export default HomePage;
