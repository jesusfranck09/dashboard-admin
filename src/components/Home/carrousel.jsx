import React, { useState } from 'react';
import './style.css'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    caption: 'Nuestros Servicios te Convencerán',
    src: 'https://cdn.pixabay.com/photo/2017/08/23/11/12/notebook-2672467_960_720.jpg',
    altText: 'Modelo1'
   
  },
  {
    src: 'https://cdn.pixabay.com/photo/2018/02/27/10/49/training-3185170_960_720.jpg',
    altText: 'Módulo 2',
    caption: 'Tenemos la solución que buscas '
  },
  {
    src: 'https://cdn.pixabay.com/photo/2017/09/05/10/19/business-2717063_960_720.jpg',
    altText: 'Módulo 3',
    caption: 'Traemos tecnología para resolver tus necesidades 3'
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem

        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel className="carousel"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Example;