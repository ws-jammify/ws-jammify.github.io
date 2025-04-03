import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { MemberPhotoCarousel } from './MemberPhotoCarousel';
import '../../styles/TeamMemberModal.css';

const getSocialIcons = (memberName) => {
  switch (memberName) {
    case "Janneil Janzen R. Go":
      return (
        <>
          <a 
            href="https://github.com/janzengo" 
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
          <a 
            href="https://linkedin.com/in/janzengo" 
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
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
            href="https://www.instagram.com/zeleinaaa?igsh=MXM4MGV1dDhucjB5NA==" 
            className="social-icon"
            aria-label="Instagram profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i>
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
    default:
      return null;
  }
};

const TeamMemberModal = ({ member, isOpen, onClose, currentPhotoIndex, setCurrentPhotoIndex }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Focus the modal when it opens
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !member) return null;
  
  const memberPhotos = [
    member['formal-image'],
    member['casual-image'],
    member['casual-image-2']
  ].filter(Boolean); // Remove any undefined/null photos

  return (
    <div 
      className="team-modal fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={modalRef}
        className="modal-content"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>

        <div className="modal-header-image">
          <img 
            src="/assets/images/cover-image.jpg" 
            alt="" 
            aria-hidden="true"
          />
        </div>
        
        <div className="modal-content-inner">
          <MemberPhotoCarousel 
            photos={memberPhotos} 
            currentPhotoIndex={currentPhotoIndex}
            setCurrentPhotoIndex={setCurrentPhotoIndex}
          />
          
          <h3 id="modal-title" className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
          
          <div className="social-icons-container">
            {getSocialIcons(member.name)}
          </div>
          
          <div className="member-description">
            {member.description}
          </div>
          
          <div className="skills-section">
            <h4 className="skills-title">Skills</h4>
            <div className="skills-container">
              {member.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal; 