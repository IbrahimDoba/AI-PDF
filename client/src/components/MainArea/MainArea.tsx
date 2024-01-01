"use client";
import React, { FormEvent, HtmlHTMLAttributes } from "react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { AiFillDelete } from "react-icons/ai";
import { AlertModel, LoadingSign } from "../utils";

export default function MainArea() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any | null>(null);
  const [fileTitle, setFileTitle] = useState<String>("");
  const [aITexts, setAITexts] = useState<any>([]);
  const [aiQestion, setAiQuestion] = useState<string>("");
  const [isLoadingText, SetIsLoadingText] = useState<boolean>(false);
  const [textIsPres, setTextIsPres] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>([]);

  const [showModel, setShowModel] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const closeModel = () => {
    setShowModel(false);
    setModalMessage("");
    setAiQuestion("");
    setIsLoading(false);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileTitle(selectedFile.name);
      console.log(fileTitle);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file === null) {
      setShowModel(true);
      setModalMessage("Please select a file and upload!");

      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const res = await axios.post(
      "https://ai-pdf-mm52.onrender.com/upload",
      { file: file, title: title },
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
    getAiChats();
  };
  // const handlePreview = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   if (file === null) {
  //     setShowModel(true);
  //     setModalMessage("Please Upload a file before you can Preview it");
  //     return;
  //   }
  //   window.open(`http://localhost:5001/files/${file}`, "_blank", "noreferrer");
  // };
  const submitQuestion = async (e: React.MouseEvent<HTMLElement>) => {
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

    console.log(aiQestion);

    const res = await axios.post("https://ai-pdf-mm52.onrender.com/question", {
      question: aiQestion,
      file: fileTitle,
    },);

    console.log(fileTitle);
    console.log(res);

    setAiQuestion("");

    SetIsLoadingText(false);
    setDeleteId(res.data[0].fileName);
    setTextIsPres(true);
    await getAiChats();
  };

  const getAiChats = async () => {
    SetIsLoadingText(true);
    const res = await axios.get("https://ai-pdf-mm52.onrender.com/getChats",);
    console.log(res);
    if (res.data.length > 0) {
      setTextIsPres(true);
      setDeleteId(res.data[0].fileName);
    } else {
      setTextIsPres(false);
    }
    // setUserText(res.data.aiAnswer.Q);
    setAITexts(res.data);
    SetIsLoadingText(false);
  };
  const deleteChats = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("delet id heree", deleteId);

    const res = await axios.delete(
      `https://ai-pdf-mm52.onrender.com/deleteChat/${deleteId}`,
      {
        params: { name: deleteId },
      },
    );
    console.log(res);
    getAiChats();
    setTextIsPres(false);
  };
  return (
    <div className="flex   justify-start items-start h-[93.4vh]   w-full bg-gray-400 max-lg:flex-col ">
      <div className=" flex-2 flex flex-col justify-start items-center p-10 border h-full  bg-gray-400 max-lg:h-[auto] max-lg:w-full max-md:p-1 max-md:border-b-2">
        <form
          onSubmit={handleUpload}
          className="flex flex-col justify-center items-center border  rounded-md p-4 "
        >
          <input
            className="w-full px-3 py-2 border-b rounded-lg focus:outline-none  focus:border-b-gray-300"
            type="text"
            placeholder="PDF Title Here"
            onChange={(e) => setTitle(e.target.value)}
          />
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
              {textIsPres ? (
                <div onClick={deleteChats} className="cursor-pointer ">
                  <AiFillDelete size={40} style={{ color: "#FF2B2B" }} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
        {isLoading ? (
          <LoadingSign />
        ) : (
          <div className="mt-10 max-md:mt-3">
            {/* <button className="border border-gray-400 p-3 rounded-md bg-red-300 text-gray-700 cursor-pointer w-[100px]">
              PREVIEW
            </button> */}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col text-white justify-between items-center p-10 border  h-full bg-gray-700 overflow-auto max-lg:w-full max-md:p-2">
        {!aITexts ? (
          ""
        ) : (
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
        )}

        {showModel && (
          <AlertModel message={modalMessage} onClose={closeModel} />
        )}

        {isLoadingText ? (
          <LoadingSign />
        ) : (
          aITexts.map((aiText: any) => (
            <div
              key={aiText._id}
              className="flex flex-col w-[80%]  justify-center text-gray-200 mb-8 "
            >
              <div className="flex mb-3 justify-end items-end ">
                <div className=" border-b-2 rounded-md p-2 w-[50%] max-md:w-[90%] ">
                  <p className="text-blue-400 mb-2">USER:</p>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(30)
                        .typeString(aiText.aiQuestion)
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
                        .typeString(aiText.aiAnswer)
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
            onClick={submitQuestion}
            className="border border-gray-400 p-3 rounded-md bg-blue-300 text-gray-700 cursor-pointer w-[100px] "
          >
            {" "}
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
