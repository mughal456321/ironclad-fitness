import React, { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export default function ImageWithFallback({ src, alt, className = '', wrapperClassName = '' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <div className="h-6 w-6 border border-neutral-700 border-t-neutral-500 rounded-full animate-spin" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-neutral-700 text-2xl font-black">?</div>
            <div className="text-[8px] text-neutral-600 font-mono tracking-widest uppercase mt-1">NO SIGNAL</div>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  );
}
