// AiPdfContext.tsx
"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
interface QuestionProps {
  aiQuestion: string;
  aiAnswers: string;
  _id:any
}

export interface AiPdfContextType {
  file: any;
  setFile: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  modalMessage: string;
  setModalMessage: Dispatch<SetStateAction<string>>;
  state: any;
  dispatch: any;
  questions: QuestionProps[];
  fileTitle: string;
  setFileTitle: Dispatch<SetStateAction<string>>;
}

const AiPdfContext = createContext<AiPdfContextType | undefined>(undefined);

export const useAiPdfContext:any = () => {
  const context = useContext(AiPdfContext);
  if (!context) {
    throw new Error("useAiPdfContext must be used within AiPdfProvider");
  }
  return context;
};

export default AiPdfContext;
