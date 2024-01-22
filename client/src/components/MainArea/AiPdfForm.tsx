"use client";
import React, { ChangeEvent, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LoadingSign } from "../utils";
import axios from "axios";
import { useAiPdfContext } from "@/hooks/AiPdfContext";
const AiPdfForm = () => {
  const [deleteId, setDeleteId] = useState<any>([]);

  const {
    setShowModel,
    setIsLoading,
    isLoading,
    setModalMessage,
    file,
    setFile,
    fileTitle,
    setFileTitle,
    questions,
    dispatch,
  } = useAiPdfContext();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileTitle(selectedFile.name);
      setDeleteId(selectedFile.name);

      console.log("TItle3", selectedFile.name);
      console.log(deleteId);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setShowModel(true);
      setModalMessage("Please select a file and upload!");
      return;
    }
    setIsLoading(true);

    console.log("TItle4", fileTitle);
    console.log("title", file);

    const res = await axios.post(
      "https://ai-pdf-mm52.onrender.com/api/ai",
      { file: file },

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          // "Access-Control-Allow-Origin": "https://ai-pdf-eight.vercel.app",
        },
      }
    );
    if (res.data === "err") {
      setShowModel(true);
      setModalMessage(
        "There was an error uploading your file please try again!"
      );
      return;
    }
    setIsLoading(false);
    console.log(res);
  };
  const deleteChats = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("delet id heree", deleteId);
    const res = await axios.delete(`https://ai-pdf-mm52.onrender.com/api/ai/${deleteId}`);
    const response = res.data;

    dispatch({ type: "DELETE_QUESTIONS", payload: response });
  
  };
  return (
    <div className=" flex-2 flex flex-col justify-start items-center p-10 border h-full  bg-gray-400 max-lg:h-[auto] max-lg:w-full max-md:p-1 max-md:border-b-2">
      <form
        onSubmit={handleUpload}
        className="flex flex-col justify-center items-center border  rounded-md p-4 "
      >
        <div className="flex mt-4 flex-col justify-center items-center">
          <input
            className=" mb-4 flex justify-center items-center"
            type="file"
            id="myFile"
            name="filename"
            onChange={handleFile}
          />
          <div className="flex items-center justify-between w-full">
            <input
              className="border border-gray-400 p-3 rounded-md bg-blue-300 text-gray-700 cursor-pointer w-[100px]"
              type="submit"
            />
            {isLoading ? (
              <LoadingSign />
            ) : (
              <div className="mt-10 max-md:mt-3">
                {/* <button className="border border-gray-400 p-3 rounded-md bg-red-300 text-gray-700 cursor-pointer w-[100px]">
                     PREVIEW
                      </button> */}
              </div>
            )}
            {questions ? (
              <div onClick={deleteChats} className="cursor-pointer ">
                <AiFillDelete size={40} style={{ color: "#FF2B2B" }} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AiPdfForm;
