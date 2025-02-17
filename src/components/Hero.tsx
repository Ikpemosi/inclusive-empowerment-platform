
const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full animate-fade-in">
          Empowering Change Together
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight animate-fade-up">
          Inclusive Development and <br className="hidden md:block" />
          Empowerment Advocacy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-up">
          Advancing social, economic, and political inclusion through strategic advocacy,
          capacity enhancement and community engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
          <a
            href="#contact"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Get Involved
          </a>
          <a
            href="#about"
            className="px-8 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
