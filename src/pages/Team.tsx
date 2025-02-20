import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Info } from "lucide-react"

const Team = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState<(typeof teamMembers)[0] | null>(null)
  const teamMembers = [
    {
      name: "Blessing Anyiwe, HRM, RN, MPH",
      role: "Executive Director",
      image: "/MadamBlessing.jpg",
      bio: "Leading our organization with over 15 years of experience in healthcare and advocacy.",
      expandedBio: `Blessing Anyiwe, HRM, RN, MPH,  is a compassionate nurse and entrepreneur with a longstanding passion for serving individuals with disabilities. Holding a Master's degree in Public Health, Blessing brings a comprehensive understanding of healthcare systems and population health to her work. With 19 years of experience in home care settings, she has developed a unique expertise in holistic care assessments, resource coordination, and interdisciplinary collaboration to ensure comprehensive client support. Additionally, she has advocated for climate change awareness through various organizational partnerships. As a Queen, Blessing is dedicated to using her platform to promote healthcare access, equity, and empowerment for all. Beyond her professional endeavors, Blessing enjoys exploring her creative side through building new businesses and traveling, as well as nurturing meaningful relationships with friends and family through singing and social connections. Dedicated to empowering individuals to reach their full potential, Blessing is committed to delivering exceptional support and resources to those in need. She looks forward to connecting with like-minded professionals and individuals who share her passion for making a positive impact.`,
    },
    {
      name: "HRM Ayo Isinyemeze",
      role: "Executive Intergovernmental Lead",
      image: "/HRMAyo.jpg",
      bio: "Specializing in government relations and policy development.",
      expandedBio: `HRM  Ayo Isinyemeze is a visionary traditional ruler, multifaceted professional, and entrepreneur dedicated to social inclusion and equity. With a background in law and journalism, His Majesty leverages his expertise to protect the vulnerable, challenge injustice, dismantle systemic barriers, and promote equality. He frequently employs the mass media to ignite meaningful conversations, inspire action, and drive tangible change in his community and society at large.

As a king, His Majesty leads with compassion, guiding his people with kindness, empathy, and strength. As an entrepreneur, he creates opportunities for economic growth and empowerment, harnessing the power of innovation and collaboration to drive positive change. His leadership is marked by a commitment to fostering an environment where everyone has the chance to thrive and contribute meaningfully to the community.

Recently, His Majesty has focused on advocating for the empowerment of women, youth, and persons with disabilities, recognizing the inherent value and potential of every individual. As a co-founder of the Inclusive Development and Empowerment Advocacy Foundation, he champions inclusive development, gender equality, and disability rights through nuanced and intersectional collaborations. His Majesty's involvement is driven by his belief in a more just and equitable society, inspiring a new generation of leaders and change-makers.`,
    },
    {
      name: "Ikechukwu Edward, CNA, RN, BSN",
      role: "Director, Fin and Admin",
      image: "/MrIke.jpg",
      bio: "Managing our financial operations and administrative processes.",
      expandedBio: `Ikechukwu Edward, CNA, RN, BSN, is a dedicated healthcare professional with a passion for delivering exceptional patient care. Commencing his career in 2017 as a nursing assistant, he provided personalized support to senior citizens with diverse needs, including mental and physical challenges. Driven by his commitment to excellence, Ikechukwu pursued advanced education, becoming a Registered Nurse and currently practicing at the University of Minnesota's teaching hospital in Minneapolis as an Oncology Nurse.

In addition to his nursing expertise, Ikechukwu holds a Bachelor of Science in Business Administration from the University of Benin and an Associate Accounting certification (AAT) from the Institute of Chartered Accountants of Nigeria. Prior to his transition to healthcare, he worked as a Transaction Officer at Mansard Insurance.

Ikechukwu's diverse background and skills have equipped him to make a meaningful impact in the lives of others. He is enthusiastic about collaborating with like-minded professionals to drive positive change, particularly in supporting individuals with physical challenges. Outside of his professional endeavors, Ikechukwu enjoys exploring the outdoors, traveling, and celebrating African heritage through fashion.`,
    },
    {
      name: "Dr. Anita Adeyemi",
      role: "Director, Projects and Programs Development",
      image: "/DrAnita.jpg",
      bio: "Overseeing the development and implementation of our key programs.",
      expandedBio: `Dr. Anita Ehinome Adeyemi is a leader with over 30 years of experience in business, finance, environmental sustainability, and mental health advocacy. With a degree in Economics from Edo State University, she blends corporate expertise with impactful social initiatives. As Senior Vice President of Ecologistics Integrated Services, she has led Nigeria's participation in major climate conferences like COP 28 in Dubai and COP 27 in Egypt, focusing on climate investment and technology assessment.

Anita manages trade delegations and designs profitable financial instruments, demonstrating versatility across sectors. As Vice-President of the Women In Renewable Energy Association (WIRE-A) and the first female Vice President of the Renewable Energy & Energy Efficiency Associations Alliance (REEEA-A), she advocates for Nigeria's energy transition through capacity building and awareness.

Passionate about mental health, Anita leads initiatives with the Psychological & Emotional Wellbeing for Women and Youths (PEW-WY), creating campaigns to destigmatize mental illness. She has launched initiatives like the Mental Health Initiative at COP 28. With an honorary doctorate from El Roi London Academy, she is pursuing a Ph.D. in Transpersonal Mental Health. Her dedication to sustainable change and equitable access to mental healthcare makes her a significant force internationally.`,
    },
  ]

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
            <img src="/team-background.jpg" alt="Team Background" className="w-full h-full object-cover opacity-10" />
          </motion.div>
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Our Team
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Meet the dedicated professionals working to make a difference in our community
              </p>
              <p className="text-lg text-gray-500">
                Our team brings together a diverse range of skills and experiences, united by a shared passion for
                inclusive development and empowerment advocacy.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedTeamMember(member)}
                  >
                    <CardContent className="p-6 text-center relative overflow-hidden">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-gray-800">{member.name}</h3>
                      <p className="text-primary mb-4">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-accent flex items-center">
                          <Info className="w-4 h-4 mr-1" />
                          Click for more info
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-secondary">Join Our Team</h2>
              <p className="text-xl text-gray-600 mb-8">
                We're always looking for passionate individuals to join our mission
              </p>
              <p className="text-lg text-gray-500 mb-8">
                If you're committed to making a difference and have skills that align with our goals, we'd love to hear
                from you. Kindly fill our volunteer form and we will reach out to discuss how you can contribute to our cause.
              </p>
              <a
                href="/#contact"
                className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-300"
              >
                Volunteer form
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={!!selectedTeamMember} onOpenChange={() => setSelectedTeamMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading mb-2">{selectedTeamMember?.name}</DialogTitle>
            <DialogDescription className="text-primary font-medium">{selectedTeamMember?.role}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-gray-700 leading-relaxed">{selectedTeamMember?.expandedBio}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Team

