import { useEffect, useState, useCallback, memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/TeamSection.css';
import TeamMemberModal from './TeamMemberModal';
import { MemberPhotoCarousel } from './MemberPhotoCarousel';

// Custom arrow components for React Slick
const CustomNextArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    className={`${className} custom-slick-arrow next-arrow`}
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={onClick}
    aria-label="Next slide"
  >
    <i className="fas fa-chevron-right" aria-hidden="true"></i>
  </button>
);

const CustomPrevArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    className={`${className} custom-slick-arrow prev-arrow`}
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={onClick}
    aria-label="Previous slide"
  >
    <i className="fas fa-chevron-left" aria-hidden="true"></i>
  </button>
);

// Team Member Card Component
const TeamMemberCard = ({ member, onClick }) => (
  <div 
    className="team-card"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
    aria-label={`View details for ${member.name}, ${member.role}`}
  >
    <div className="text-center">
      <div className="member-image-container">
        <div className="member-image">
          <img
            src={member['formal-image']}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            onError={(e) => {
              console.error(`Failed to load image: ${member['formal-image']}`);
              e.target.src = '/assets/images/person-1.png'; // Fallback image
            }}
          />
          <div className="member-image-overlay" aria-hidden="true"></div>
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{member.name}</h3>
      <p className="text-jammify-teal text-sm font-medium mb-3">{member.role}</p>
      <p className="text-gray-300 text-sm font-light mb-4 line-clamp-3">{member.description}</p>
      <div className="flex justify-center space-x-3">
        {getSocialIcons(member.name)}
      </div>
    </div>
  </div>
);

// Social Icons Helper Function
const getSocialIcons = (memberName) => {
  switch(memberName) {
    case "Janneil Janzen R. Go":
      return (
        <>
          <a 
            href="https://github.com/janzengo" 
            className="social-icon"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/janzengo/" 
            className="social-icon"
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
          </a>
        </>
      );
    case "Katrina Dela Cruz":
      return (
        <>
          <a 
            href="https://www.facebook.com/profile.php?id=100071857873377" 
            className="social-icon"
            aria-label="Facebook profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a 
            href="https://github.com/katrinadc" 
            className="social-icon"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </>
      );
    case "Angel Gonzales":
      return (
        <>
          <a 
            href="https://www.facebook.com/Angel19Gonzales" 
            className="social-icon"
            aria-label="Facebook profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a 
            href="https://www.instagram.com/zeleinaaa" 
            className="social-icon"
            aria-label="Instagram profile"
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </>
      );
    case "Rasul Ampato":
      return (
        <>
          <a 
            href="https://www.facebook.com/rasul.ampato.2024/" 
            className="social-icon"
            aria-label="Facebook profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a 
            href="https://github.com/Sulraa" 
            className="social-icon"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
            >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
        </>
      );
    case "Renz Fernando":
      return (
        <>
          <a 
            href="https://www.facebook.com/aryiendzi" 
            className="social-icon"
            aria-label="Facebook profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a 
            href="https://www.instagram.com/aryiendzi_/" 
            className="social-icon"
            aria-label="Instagram profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </>
      );
    case "Ajy Garcia":
      return (
        <>
          <a 
            href="https://www.facebook.com/share/1FM1u1p1E5/?mibextid=wwXIfr" 
            className="social-icon"
            aria-label="Facebook profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a 
            href="https://www.instagram.com/jygrxa" 
            className="social-icon"
            aria-label="Instagram profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </>
      );
    default:
      return null;
  }
};

const TeamSection = () => {
  const [teamData, setTeamData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    // Load team data
    fetch('/js/team.json')
      .then(response => response.json())
      .then(data => setTeamData(data))
      .catch(error => console.error('Failed to load team data:', error));
  }, []);

  const showTeamMemberModal = useCallback((member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    setCurrentPhotoIndex(0);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Ensure body scroll is restored when modal is closed
    document.body.style.overflow = '';
    setTimeout(() => setSelectedMember(null), 300); // Delay to allow animation
    setCurrentPhotoIndex(0);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && event.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = '';
    };
  }, [isModalOpen, closeModal]);

  // Close modal with ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = '';
    };
  }, [isModalOpen, closeModal]);

  // Sample team data if API fails
  const sampleTeamData = [
    {
      name: "Angel Gonzales",
      role: "Lead Researcher",
      description: "Responsible for data searching—Angel is the researcher of the team. She worked on the documentation of the project. She helps in gathering data to be put on the website and compiles the data collected.",
      'formal-image': "/assets/images/about-images/angel/formal.png",
      'casual-image': "/assets/images/about-images/angel/casual.jpg",
      'casual-image-2': "/assets/images/about-images/angel/casual-2.jpg",
      skills: ["Research", "Documentation", "Data Analysis"]
    },
    {
      name: "Janzen Go",
      role: "Programmer",
      description: "The innovative and tech enthusiast behind Jammify's development. Janzen is the lead programmer of the team. He is responsible for developing the website's functionality and ensuring that all features work properly. His expertise in web development has been instrumental in creating a seamless user experience.",
      'formal-image': "/assets/images/about-images/janzen/formal.png",
      'casual-image': "/assets/images/about-images/janzen/casual.jpg",
      'casual-image-2': "/assets/images/about-images/janzen/casual-2.jpg",
      skills: ["React", "JavaScript", "Node.js", "UI/UX Design"]
    },
    {
      name: "Renz Fernando",
      role: "UI/UX Assistant Designer",
      description: "Having an innovative and imaginative mind, Renz is the assistant UI/UX designer of the team. He contributed to designing some portions of Jammify's interface. He also assisted in collecting data to place on the website. He also contributed to creating the documentation of the project.",
      'formal-image': "/assets/images/about-images/renz/formal.png",
      'casual-image': "/assets/images/about-images/renz/casual.jpg",
      'casual-image-2': "/assets/images/about-images/renz/casual-2.jpg",
      skills: ["UI/UX Design", "Documentation", "Data Collection"]
    },
    {
      name: "Rasul Ampato",
      role: "Project Manager",
      description: "A hardworking and active leader, Rasul is the leader of the team. He ensures the team makes progress every day to meet the target date of finishing the project. He contributed to designing the interface of the website, particularly in the dropdown menu of the user profile, which includes settings and sign out.",
      'formal-image': "/assets/images/about-images/rasul/formal.png",
      'casual-image': "/assets/images/about-images/rasul/casual.jpg",
      'casual-image-2': "/assets/images/about-images/rasul/casual-2.jpg",
      skills: ["Project Management", "Leadership", "UI Design"]
    },
    {
      name: "Katrina Dela Cruz",
      role: "Assistant Programmer",
      description: "Creative mind behind Jammify's concept and interface. Katrina assists in programming various components of the website. Her attention to detail and creative approach to problem-solving have helped in developing unique features that enhance the user experience.",
      'formal-image': "/assets/images/about-images/katrina/formal.png",
      'casual-image': "/assets/images/about-images/katrina/casual.jpg",
      'casual-image-2': "/assets/images/about-images/katrina/casual-2.jpg",
      skills: ["UI Design", "Frontend Development", "User Research"]
    },
    {
      name: "Ajy Garcia",
      role: "UI/UX Designer",
      description: "Lead designer for visual experience pleasant to the eyes. Ajy is responsible for the overall look and feel of Jammify. His design philosophy focuses on creating intuitive interfaces that are both aesthetically pleasing and functional, ensuring users have an enjoyable experience on the platform.",
      'formal-image': "/assets/images/about-images/ajy/formal.png",
      'casual-image': "/assets/images/about-images/ajy/casual.jpg",
      'casual-image-2': "/assets/images/about-images/ajy/casual-2.jpg",
      skills: ["UI/UX Design", "Visual Design", "User Experience"]
    }
  ];

  // Use sample data if no data is loaded
  const displayTeamData = teamData.length > 0 ? teamData : sampleTeamData;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '30px'
        }
      }
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };

  return (
    <section className="team-section container mx-auto px-4 py-12 md:py-20">
      <h2 className="section-title text-center font-display text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-jammify-teal bg-clip-text text-transparent" data-aos="fade-up" data-aos-duration="800">
        Meet Our Team
      </h2>
      
      <div className="team-carousel-container max-w-6xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        <Slider {...sliderSettings} className="team-carousel">
          {displayTeamData.map((member, index) => (
            <div key={index} className="px-2">
              <TeamMemberCard 
                member={member} 
                onClick={() => showTeamMemberModal(member)} 
              />
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-400 font-light">
        Click on team members to learn more about them
      </div>

      <TeamMemberModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={closeModal}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={setCurrentPhotoIndex}
      />
    </section>
  );
};

export default TeamSection; 