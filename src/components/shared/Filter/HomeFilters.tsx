"use client"

import React, { useState } from 'react';

import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { useRouter, useSearchParams } from 'next/navigation';

import { formUrlQuery } from '@/lib/utils';

const HomeFilters = () => {

  // const active = 'newest';

  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState('');


  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });

      router.push(newUrl, { scroll: false });

    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      })

      router.push(newUrl, { scroll: false });

    }
  }


  return (
    <div className='text-dark500_light700 mt-6 hidden flex-wrap gap-4 md:flex'>
      {
        HomePageFilters.map((item) => (
          <Button key={item.value}
            onClick={() => handleTypeClick(item.value)}
            className={`body-medium rounded-lg px-6 py-3 capitalize 
            ${active === item.value
                ? 'bg-primary-100  text-primary-500 dark:bg-dark-300'
                : 'text-dark500_light700 bg-light-800 text-light-500 dark:bg-dark-300 '
              }`
            }
          >
            {item.name}
          </Button>
        ))
      }
    </div>
  )
}

export default HomeFilters