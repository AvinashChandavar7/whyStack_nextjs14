"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });
        router.push(newUrl, { scroll: false });

      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          })
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn);

  }, [search, pathname, route, router, searchParams, query]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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