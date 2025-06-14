import React, { useRef } from 'react';
import type { ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode;
  length: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, length }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesToShow = length;

  const nextSlide = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / slidesToShow;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-x-auto scrollbar-hide">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/3 w-10 h-10 rounded-full text-gray-800 bg-gray-200/70 border-none hover:bg-gray-200 z-10"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/3 w-10 h-10 rounded-full text-gray-800 bg-gray-200/70 border-none hover:bg-gray-200 z-10"
      >
        &gt;
      </button>
      <div
        className="w-[90%] flex items-center justify-start gap-12 overflow-x-auto scroll-smooth scrollbar-hide h-fit"
        ref={carouselRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
