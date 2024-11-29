import React from 'react';
import Image from 'next/image';

type ImageBlockProps = {
  content: { src: string; alt: string };
};

const ImageBlock: React.FC<ImageBlockProps> = ({ content }) => {
  return (
    <div className="my-8">
      <Image
        src={content.src}
        alt={content.alt}
        width={800}
        height={400}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default ImageBlock;

