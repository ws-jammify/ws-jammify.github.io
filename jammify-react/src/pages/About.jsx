import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  const teamMembers = [
    {
      id: 1,
      name: "Janzen Go",
      role: "Programmer",
      description: "The innovative and tech enthusiast behind Jammify's development",
      image: "/assets/images/about-images/janzen/formal.png",
      socials: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Katrina Dela Cruz",
      role: "Assistant Programmer",
      description: "Creative mind behind Jammify's concept and interface",
      image: "/assets/images/about-images/katrina/formal.png",
      socials: {
        behance: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Angel Gonzales",
      role: "Lead Researcher",
      description: "Documentation expert and data researcher",
      image: "/assets/images/about-images/angel/formal.png",
      socials: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 4,
      name: "Rasul Ampato",
      role: "Project Manager",
      description: "Active leader ensuring project progress and success",
      image: "/assets/images/about-images/rasul/formal.png",
      socials: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      id: 5,
      name: "Renz Fernando",
      role: "UI/UX Assistant Designer",
      description: "Innovative mind for interface design and interactions",
      image: "/assets/images/about-images/renz/formal.png",
      socials: {
        dribbble: "#",
        behance: "#"
      }
    },
    {
      id: 6,
      name: "Ajy Garcia",
      role: "UI/UX Designer",
      description: "Lead designer for visual experience pleasant the eyes",
      image: "/assets/images/about-images/ajy/formal.png",
      socials: {
        dribbble: "#",
        behance: "#"
      }
    }
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
            About Jammify
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">
            We're on a mission to revolutionize the way people experience and share music. Our platform brings together music lovers, artists, and technology to create a unique streaming experience.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="glass-card p-8 rounded-2xl" data-aos="fade-right" data-aos-duration="1000">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed font-light">
              To create a world where music connects people across boundaries, cultures, and genres. We believe in the power of music to inspire, unite, and transform lives.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed font-light">
              To provide the most innovative and user-friendly music streaming platform that empowers both listeners and artists, fostering a vibrant musical ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent" data-aos="fade-up" data-aos-duration="800">
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="team-card p-6 relative group cursor-pointer"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={member.id * 100}
              onClick={() => setSelectedMember(member)}
            >
              <div className="text-center">
                <div className="member-image mx-auto mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-jammify-teal text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm font-light mb-4">{member.description}</p>
                <div className="flex justify-center space-x-3">
                  {Object.entries(member.socials).map(([platform, link]) => (
                    <a 
                      key={platform}
                      href={link}
                      className="social-icon w-8 h-8 rounded-full flex items-center justify-center bg-[#152238]/70 text-jammify-teal hover:text-white transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fab fa-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="modal-backdrop absolute inset-0 bg-[#00000080] backdrop-blur-sm" onClick={() => setSelectedMember(null)}></div>
          <div className="team-modal-content relative z-10 max-w-full mx-auto my-4 md:my-8">
            <div className="modal-content relative">
              {/* Modal content will be dynamically loaded */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-jammify-dark-blue/80 text-jammify-teal hover:text-white hover:bg-jammify-dark-blue transition duration-300 border border-jammify-teal/30"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="p-6">
                <div className="member-image mx-auto mb-4 w-32 h-32">
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-2xl font-semibold text-center mb-2">{selectedMember.name}</h3>
                <p className="text-jammify-teal text-center mb-4">{selectedMember.role}</p>
                <p className="text-gray-300 text-center">{selectedMember.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default About 