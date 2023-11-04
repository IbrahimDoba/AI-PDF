"use client";
import React, { FormEvent } from "react";
import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function MainArea() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any | null>(null);
  const [userText, setUserText] = useState<String>("");
  const [aITexts, setAITexts] = useState<any>([]);
  const [aiQestion, setAiQuestion] = useState<String>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const res = await axios.post("http://localhost:5001/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
  };
  const submitQuestion = async (e: React.MouseEvent<HTMLElement>) => {
    console.log(aiQestion);

    e.preventDefault();

    const res = await axios.post("http://localhost:5001/question", {
      question: aiQestion,
    });

    console.log(res);

    setAiQuestion("");
    getAiChats();
  };
  const getAiChats = async () => {
    const res = await axios.get("http://localhost:5001/getChats");
    console.log(res);
    // setUserText(res.data.aiAnswer.Q);
    setAITexts(res.data);
  };
  return (
    <div className="flex  justify-center items-center h-[93.4%] w-full   ">
      <div className="flex-2 flex flex-col justify-start items-center p-10 border h-full  bg-gray-400 ">
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
            <input
              className="border border-gray-400 p-3 rounded-md bg-blue-300 text-gray-700 cursor-pointer w-[100px]"
              type="submit"
            />
          </div>
        </form>
        <div className="mt-10">
          <button>PREVIEW</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col text-white justify-between items-center p-10 border  h-full bg-gray-700 ">
        {aITexts.map((aiText: any) => (
          <div
            key={aiText._id}
            className="flex flex-col w-[80%]  justify-center "
          >
            <div className="flex mb-5 justify-end items-end">
              <div className="border rounded-md p-2 w-[50%] ">
                USER TEXT HERE: {aiText.aiAnswer.Q}
              </div>
            </div>
            <div className="  mt-5 flex justify-start items-end">
              <div className="border rounded-md p-2 w-[50%] ">
                AI REPLY HERE: {aiText.aiAnswer.A}
              </div>
            </div>
          </div>
        ))}

        <div className="flex h-[70px] w-[80%] mt-10">
          <input
            className="w-full border border-red-400 rounded-lg focus:outline-none  text-black text-lg p-3"
            placeholder="Write a Question Here!"
            onChange={(e) => setAiQuestion(e.target.value)}
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
