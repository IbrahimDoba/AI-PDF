// AiPdfProvider.tsx
"use client";
import React, { useState, ReactNode, useReducer } from "react";
import AiPdfContext, { AiPdfContextType } from "../hooks/AiPdfContext";

interface AiPdfProviderProps {
  children: ReactNode;
}

// export const aiPdfReducer = (state, action) => {
//   switch (action.type) {
//     case 'GET_QUESTIONS':
//       return {
//         questions: action.payload
//       }
//       case 'CREATE_QUESTION':
//         return {
//           questions: [action.payload, ...state.questions]
//         }
//         case 'DELETE_QUESTIONS':
//           return {
//             questions: state.questions.filter((w) => w._id !== action.payload._id)
//           }
//           default:
//           return state
//   }
// }
export const aiPdfReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      return {
        questions: action.payload,
      };
    case "CREATE_QUESTION":
      return {
        questions: [action.payload, ...state.questions],
      };
    case "DELETE_QUESTIONS":
      return {
        questions: state.questions.filter(
          (q: any) => q._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const AiPdfProvider: React.FC<AiPdfProviderProps> = ({ children }) => {
  // const [title, setTitle] = useState("");
  const [file, setFile] = useState<any | null>(null);
  const [fileTitle, setFileTitle] = useState<string>("");
  // const [aITexts, setAITexts] = useState<any[]>([]);
  // const [aiQestion, setAiQuestion] = useState<string>("");
  // const [isLoadingText, SetIsLoadingText] = useState<boolean>(false);
  // const [textIsPres, setTextIsPres] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [deleteId, setDeleteId] = useState<any>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const [state, dispatch] = useReducer(aiPdfReducer, {
    questions: null,
  });

  const contextValue: AiPdfContextType = {
    file,
    setFile,
    fileTitle,
    setFileTitle,

    isLoading,
    setIsLoading,

    showModel,
    setShowModel,
    modalMessage,
    setModalMessage,
    ...state,
    dispatch,
  };

  return (
    <AiPdfContext.Provider value={contextValue}>
      {children}
    </AiPdfContext.Provider>
  );
};
