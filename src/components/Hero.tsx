
const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover opacity-10"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/videos/team-of-people-having-a-meeting-5971529" type="video/mp4" />
        </video>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <img 
          src="/lovable-uploads/13c4e31b-41b4-4ff8-87b4-155c0f8a2cef.png"
          alt="IDEA Logo"
          className="w-32 h-32 mx-auto mb-8 animate-fade-in"
        />
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
            className="px-8 py-3 bg-white/80 backdrop-blur border border-gray-200 rounded-lg hover:bg-white transition-all duration-300 w-full sm:w-auto hover:shadow-lg"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
