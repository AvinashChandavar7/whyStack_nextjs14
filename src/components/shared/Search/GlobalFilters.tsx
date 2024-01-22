"use client"

import { Button } from '@/components/ui/button'
import { GlobalSearchFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const GlobalFilters = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get('type');

  const [active, setActive] = useState(typeParams || "");


  const handleTypeClick = (type: string) => {
    if (active === type) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: null,
      });

      router.push(newUrl, { scroll: false });

    } else {
      setActive(type);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: type.toLowerCase(),
      })

      router.push(newUrl, { scroll: false });

    }
  }


  return (
    <div className='flex items-center gap-5 px-5'>
      <p className='text-dark400_light900 body-medium'>
        Type:
      </p>

      <div className='flex gap-3'>
        {
          GlobalSearchFilters.map((item) => (
            <Button
              type='button'
              key={item.value}
              className={`light-border-2 small-medium 
              rounded-2xl px-5 py-2 capitalize
              ${active === item.value
                  ? `bg-primary-500 text-light-900`
                  : `bg-light-700 font-semibold text-dark-500
                  hover:text-primary-500 dark:bg-light-500
                    `
                }
              `}

              onClick={() => handleTypeClick(item.value)}
            >
              {item.name}
            </Button>
          ))
        }
      </div>

    </div>
  )
}

export default GlobalFilters



// Approach 1st
// 1. Build out the entire UI/UX  --> FrontEnd
// 2. Build out the backend

// Approach 2nd
// Build out some features of the FrontEnd
// Connect with the backend....

// 2nd frontend and 2nd backend