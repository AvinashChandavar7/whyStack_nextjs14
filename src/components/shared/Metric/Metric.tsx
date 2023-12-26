"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface MetricProps {
  title: string;
  value: string | number;
  imgUrl: string;
  alt: string;
  href?: string;
  isAuthor?: boolean;
  textStyles?: string;
}



const Metric = (
  {
    imgUrl, alt, value, title, href, textStyles, isAuthor
  }: MetricProps
) => {

  const metricContent = (
    <>
      <Image
        src={imgUrl} alt={alt} width={16} height={16}
        className={`object-contain ${href ? 'rounded-full' : ''}`}
      />

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
          {title}
        </span>

      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className='flex-center gap-1'>
        {metricContent}
      </Link>
    )
  }

  return (
    <div className='flex-center flex-wrap gap-1'>
      {metricContent}
    </div>
  )
}

export default Metric