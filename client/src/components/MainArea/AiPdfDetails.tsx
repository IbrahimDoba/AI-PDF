"use client";
import Typewriter from "typewriter-effect";
import { AlertModel, LoadingSign } from "../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import AiPdfForm from "@/components/MainArea/AiPdfForm";
import { useAiPdfContext } from "@/hooks/AiPdfContext";
import { QuestionProps } from "@/pages/HomePage";

const AiPdfDetails = () => {
  const [aITexts, setAITexts] = useState<any[]>([]);
  const [aiQestion, setAiQuestion] = useState<string>("");
  const [isLoadingText, SetIsLoadingText] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>([]);
  const [textIsPres, setTextIsPres] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const {
    file,
    setFile,
    setModalMessage,
    setShowModel,
    questions,
    dispatch,
    fileTitle,
  } = useAiPdfContext();

   const fetchQuestions = async () => {
    
    const res = await axios.get("https://ai-pdf-mm52.onrender.com/api/ai/", {
      params: { fileNameTitle: fileTitle },
    });
    const response = await res.data;
    if (!res) {
      return;
    }
    if (res) {
      dispatch({ type: "GET_QUESTIONS", payload: response });

      setRefreshFlag((prev) => !prev);
      console.log(res)

    }
  };

  useEffect(() => {
   
    fetchQuestions();
  }, [fileTitle]);

  const handleQuestion = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    SetIsLoadingText(true);

    if (file === null) {
      setShowModel(true);
      setModalMessage("Please Upload a File before asking a Question!");
      return;
    }
    if (aiQestion === "") {
      setShowModel(true);
      setModalMessage("Cannot send an empty message!");
      return;
    }

    console.log(questions);

    const res = await axios.post("https://ai-pdf-mm52.onrender.com/api/ai/question", {
      question: aiQestion,
      file: fileTitle,
    });
    const response = res.data;
    if (!res) {
      setShowModel(true);
      setModalMessage("error");
    }
    if (res) {
      setAiQuestion("");
      SetIsLoadingText(false);
   
      console.log("response", response);
      
      dispatch({ type: "CREATE_QUESTION", payload: response });
      fetchQuestions()
    }
  };

  return (
    
    <div className="flex-1 flex flex-col text-white justify-between items-center p-10 border  h-full bg-gray-700 overflow-auto max-lg:w-full max-md:p-2"
      key={questions}
    >
     
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Upload a Document or Pdf and ask any question related to it!"
              )
              .deleteAll()
              .start();
          }}
        />
    

      {/* {showModel && (
      <AlertModel message={modalMessage} onClose={closeModel} />
    )}  */}

      {isLoadingText ? (
        <LoadingSign />
      ) : (
        questions && questions.map((question: QuestionProps) => (
          <div
            key={question.index}
            
            className="flex flex-col w-[80%]  justify-center text-gray-200 mb-8 "
          >
            <div className="flex mb-3 justify-end items-end ">
              <div className=" border-b-2 rounded-md p-2 w-[50%] max-md:w-[90%] ">
                <p className="text-blue-400 mb-2">USER:</p>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(30)
                      .typeString(question.aiQuestion)
                      .start();
                  }}
                />
              </div>
            </div>
            <div className="  mt-5 flex justify-start items-end">
              <div className="border-b-2 rounded-md p-2 w-[50%] max-md:w-[90%]">
                <p className="text-red-400 mb-2">AI REPLY HERE:</p>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(30)
                      .pauseFor(3500)
                      .typeString(question.aiAnswer)
                      .start();
                  }}
                />
              </div>
            </div>
          </div>
        ))
      )}

      <div className="flex h-[70px] w-[80%] mt-10 max-md:w-[95%] max-md:mt-3 max-md:h-[50px]">
        <input
          className="w-full border border-red-400 rounded-lg focus:outline-none  text-black text-lg p-3"
          placeholder="Write a Question Here!"
          onChange={(e) => {
            setAiQuestion(e.target.value);
          }}
          value={aiQestion}
        />
        <button
          onClick={handleQuestion}
          className="border border-gray-400 p-3 rounded-md bg-blue-300 text-gray-700 cursor-pointer w-[100px] "
        >
          {" "}
          submit
        </button>
      </div>
    </div>
  );
};

export default AiPdfDetails ;
