import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PdfUpload from "@/components/PdfUpload";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <section id="upload" className="py-16 bg-base-200">
          <PdfUpload />
        </section>
      </main>
      <Footer />
    </>
  );
}
