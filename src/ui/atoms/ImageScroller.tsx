import React from 'react';

type Routine = {
  [key: string]: {
    item: string;
    link: string;
    img: string;
    price: number;
  };
};

type ImageScrollerProps = {
  routine: Routine;
};

const ImageScroller: React.FC<ImageScrollerProps> = ({ routine }) => {
  return (
    <div className="overflow-x-auto" style={{ whiteSpace: 'nowrap', width: '100%', maxWidth: '100vw' }}>
      <div className="flex">
        {Object.values(routine).map((item, index) => (
          <div key={index} className="inline-block mx-2" style={{ width: '256px', height: '256px' }}>
            <div className="relative bg-neutral-50 overflow-hidden" style={{ width: '256px', height: '256px' }}>
              <img
                src={item.img}
                alt={item.item}
                style={{ maxWidth: '256px', maxHeight: '256px' }}
                className="object-contain object-center p-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
