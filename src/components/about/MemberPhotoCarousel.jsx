import React, { memo } from 'react';
import Slider from 'react-slick';

export const MemberPhotoCarousel = memo(({ photos, currentPhotoIndex, setCurrentPhotoIndex }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (current, next) => setCurrentPhotoIndex(next),
    accessibility: true,
    fade: true,
    cssEase: 'linear'
  };

  return (
    <div className="member-photo-carousel">
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index} className="carousel-slide">
            <div className="image-wrapper">
              <img
                src={photo}
                alt={`Team Member - Photo ${index + 1}`}
                className="carousel-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${photo}`);
                  e.target.src = '/assets/images/person-1.png';
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}); 