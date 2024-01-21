import { AiPdfProvider } from "@/context/AiPdfProvider";
// import MainArea from "@/components/MainArea/MainArea";
import Navbar from "@/components/Nav/Navbar";
import Image from "next/image";
import Link from "next/link";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <AiPdfProvider>
      <main>
        <Navbar />
        <HomePage />
      </main>
    </AiPdfProvider>
  );
}
