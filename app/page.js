import { Suspense } from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PdfUpload from "@/components/PdfUpload";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="min-h-screen flex items-center justify-center">
        <PdfUpload />
      </main>
      <Footer />
    </>
  );
}
