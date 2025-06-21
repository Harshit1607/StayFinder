import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full text-black">
      {/* Image */}
      <img
        src={images[currentIndex] || 'https://via.placeholder.com/500'}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded"
      />

      {/* Prev Button */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full px-2 hover:bg-opacity-90 transition"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-60 rounded-full px-2 hover:bg-opacity-90 transition"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            } bg-opacity-80`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
