"use client"

import React from 'react';

import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'

const HomeFilters = () => {

  const active = 'newest';

  return (
    <div className='text-dark500_light700 mt-6 hidden flex-wrap gap-4 md:flex'>
      {
        HomePageFilters.map((item) => (
          <Button key={item.value}
            onClick={() => { }}
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