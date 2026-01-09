import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PdfUpload from "@/components/PdfUpload";
import Pricing from "@/components/Pricing";

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
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
