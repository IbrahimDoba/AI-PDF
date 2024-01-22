import { AiPdfProvider } from "@/context/AiPdfProvider";
// import MainArea from "@/components/MainArea/MainArea";
import Navbar from "@/components/Nav/Navbar";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <AiPdfProvider>
        <Navbar />
        <HomePage />
    </AiPdfProvider>
  );
}
