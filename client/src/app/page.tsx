import { AiPdfProvider } from "@/context/AiPdfProvider";
// import MainArea from "@/components/MainArea/MainArea";
import Navbar from "@/components/Nav/Navbar";
import HomePage from "@/pages/HomePage";
import AiPdfForm from "@/components/MainArea/AiPdfForm";
import AiPdfDetails from "@/components/MainArea/AiPdfDetails";

export default function Home() {
  return (
    <AiPdfProvider>
      <Navbar />
      <div className="flex justify-start items-start h-[93.4vh] w-full bg-gray-400 max-lg:flex-col">
        <AiPdfForm />
        <AiPdfDetails />
      </div>
    </AiPdfProvider>
  );
}
