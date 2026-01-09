import TestimonialsAvatars from "./TestimonialsAvatars";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Turn any PDF into a fillable form
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Upload your PDF and our AI instantly detects text fields, checkboxes, and signature areas. Fill them in your browser and download the completed form.
        </p>
        <a href="#upload" className="btn btn-primary btn-wide">
          Convert Your PDF
        </a>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full flex items-center justify-center">
        <HeroAnimation />
      </div>
    </section>
  );
};

export default Hero;
