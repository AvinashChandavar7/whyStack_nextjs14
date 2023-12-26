"use client"

import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string
}

const LocalSearchbar = (
  { route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps
) => {
  return (
    <div className='relative w-full'>
      <div className={`background-light800_darkgradient 
      flex min-h-[56px] grow items-center gap-1 rounded-xl px-4
      ${otherClasses}`}
      >

        {iconPosition === 'left' && (
          <Image src={imgSrc} alt='search icons' width={24} height={24}
            className='cursor-pointer' loading='lazy'
          />
        )}

        <Input
          type='search'
          placeholder={placeholder}
          value=""
          onChange={() => { }}
          className='paragraph-regular no-focus placeholder text-dark400_light700 
          border-none bg-transparent shadow-none outline-none'
        />

        {iconPosition === 'right' && (
          <Image src={imgSrc} alt='search icons' width={24} height={24}
            className='cursor-pointer' loading='lazy'
          />
        )}
      </div>
    </div>
  )
}

export default LocalSearchbar