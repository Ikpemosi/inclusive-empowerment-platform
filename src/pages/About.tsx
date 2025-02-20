import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img src="/hero-background.jpg" alt="Background" className="w-full h-full object-cover opacity-10" />
          </motion.div>
          <div className="container mx-auto px-4">
            <motion.div className="max-w-4xl mx-auto text-center" {...fadeIn}>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                About IDEA
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Empowering communities through inclusive development and advocacy
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-3xl font-heading font-bold mb-6 text-secondary">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  IDEA was founded with a vision to create a more inclusive and equitable society. Our journey began
                  with a simple yet powerful belief: everyone deserves equal opportunities to thrive and participate
                  fully in society.
                </p>
                <p className="text-gray-600">
                  Today, we continue to work tirelessly towards this vision, partnering with communities, organizations,
                  and stakeholders to create lasting positive change.
                </p>
              </motion.div>
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img src="/about-hero.jpg" alt="Our Story" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div className="max-w-4xl mx-auto text-center mb-12" {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-secondary">Our Vision & Mission</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div {...fadeIn}>
                <Card className="h-full bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">Vision</h3>
                    <p className="text-gray-600">
                      A future characterized by universal access, equal opportunities, and unfettered empowerment of
                      women, youth, and persons with disability.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <Card className="h-full bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-accent">Mission</h3>
                    <p className="text-gray-600">
                      To advance the social, economic, and political inclusion of women, youth and persons with
                      disability through strategic advocacy, capacity enhancement and community engagement, thereby
                      advancing social justice, equality, human rights, and a world of inclusive opportunities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div className="max-w-4xl mx-auto text-center mb-12" {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary">Our Aims & Targets</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div {...fadeIn}>
                <h3 className="text-2xl font-heading font-semibold mb-6 text-secondary">Aims</h3>
                <ul className="space-y-4">
                  {[
                    "Promote inclusivity and empowerment for women, youth, and persons living with disabilities",
                    "Advance social justice and human rights for marginalized groups",
                    "Foster a culture of diversity and equity in society",
                  ].map((aim, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{aim}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <h3 className="text-2xl font-heading font-semibold mb-6 text-accent">Specific Targets</h3>
                <ul className="space-y-4">
                  {[
                    "Establish 6 community centers in the next 2 years for skill acquisition, empowerment and climate literacy",
                    "Provide specialised curriculum in inclusive education practices to teachers in Nigeria",
                    "Provide 500 persons with disabilities with access to healthcare services",
                    "Advocate for the passage of policy reforms in the coming year based on identified needs",
                    "Support 20 entrepreneurs from marginalized groups in accessing funding and resources",
                  ].map((target, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="text-accent mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{target}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div className="max-w-4xl mx-auto text-center mb-12" {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-accent">Our Objectives</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Provide education and training programs to enhance skills and knowledge",
                "Advocate for policy reforms and legal protections",
                "Build capacity and empower marginalized communities",
                "Provide access to resources and support services",
                "Promote awareness and challenge harmful stereotypes and stigma",
                "Foster partnerships and collaborations with stakeholders",
                "Develop and implement inclusive education programs for schools",
                "Establish a network of community centers for marginalized groups",
                "Advocate for accessible infrastructure and transportation",
              ].map((objective, index) => (
                <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full bg-white/80 backdrop-blur hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <p className="text-gray-600">{objective}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About

