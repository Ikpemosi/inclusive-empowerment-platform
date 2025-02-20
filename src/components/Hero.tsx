"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: "Inclusive Development and Empowerment Advocacy",
      subtitle:
        "Advancing social, economic, and political inclusion through strategic advocacy, capacity enhancement and community engagement.",
    },
    {
      title: "Empowering Change Together",
      subtitle:
        "Building a future of equal opportunities and unfettered empowerment for women, youth, and persons with disability.",
    },
    {
      title: "Creating Lasting Impact",
      subtitle: "Fostering partnerships and driving policy reforms to create a more inclusive and equitable society.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <video className="w-full h-full object-cover opacity-10" autoPlay muted loop playsInline>
          <source src="https://videos.pexels.com/videos/team-of-people-having-a-meeting-5971529" type="video/mp4" />
        </video>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
        >
          Empowering Change Together
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            {slides[currentSlide].title}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up relative z-10">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto hover:shadow-lg flex items-center justify-center"
          >
            Get Involved <ChevronRight className="ml-2" />
          </motion.a>
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all duration-300 w-full sm:w-auto hover:shadow-lg"
          >
            Learn More
          </motion.a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

export default Hero

