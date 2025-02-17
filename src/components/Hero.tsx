
const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full animate-fade-in">
          Empowering Change Together
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight animate-fade-up bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Inclusive Development and <br className="hidden md:block" />
          Empowerment Advocacy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-up">
          Advancing social, economic, and political inclusion through strategic advocacy,
          capacity enhancement and community engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up relative z-10">
          <a
            href="#contact"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto hover:shadow-lg"
          >
            Get Involved
          </a>
          <a
            href="#about"
            className="px-8 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto hover:shadow-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
