import MainArea from "@/components/MainArea/MainArea";
import Navbar from "@/components/Nav/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main >
      <Navbar />
      <MainArea />
    </main>
  );
}
