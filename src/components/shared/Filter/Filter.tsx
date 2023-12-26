"use client"

import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup } from '@radix-ui/react-select';


interface FilterProps {
  filters: {
    name: string,
    value: string
  }[];
  containerClasses?: string;
  otherClasses?: string;
}

const Filter = ({ filters, containerClasses, otherClasses }: FilterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>

      <Select >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border
          background-light800_dark300 text-dark500_light700
          border px-5 py-2.5`}
        >
          <div className='line-clamp-1 flex-1 text-left'>
            <SelectValue placeholder="Select a Filter" />

          </div>
        </SelectTrigger>
        <SelectContent className='background-light800_dark300 text-dark500_light700'>

          <SelectGroup>
            {
              filters.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}

export default Filter;