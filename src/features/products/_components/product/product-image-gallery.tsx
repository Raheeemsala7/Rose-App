'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../types/product';



export default function ProductImageGallery({ product }: {product:Product}) {
  const [selectedImage, setSelectedImage] = useState(product.cover);
  const images = [
    product.cover,
    ...(() => {
      try {
        return JSON.parse(product.gallery || '[]') 
      } catch {
        return [];
      }
    })(),
  ];

  return (
    <div className="space-y-2.5">
      {/* Main Image */}
      <div className="relative w-full max-w-full md:max-w-152 aspect-3/2 rounded-lg overflow-hidden bg-zinc-100">
        <Image
          src={selectedImage}
          alt={product.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto w-full pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative shrink-0 w-1/3 md:w-1/6 h-16 md:h-28 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === image ? 'border-maroon-600 border-2' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} - view ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {selectedImage !== image && (
                <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
