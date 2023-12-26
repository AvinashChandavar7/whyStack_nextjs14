
import React from 'react';
import Link from 'next/link';

import { Badge } from "@/components/ui/badge";


interface TagProps {
  _id: string;
  name: string;
  totalQuestion?: number;
  showCount?: boolean;
}

const RenderTag = (
  { _id, name, totalQuestion, showCount }: TagProps
) => {
  return (
    <Link href={`/tags/${_id}`} className='flex justify-between gap-2'>
      <Badge
        className='subtle-medium 
        background-light800_dark300 text-light400_light500
        rounded-md border-none px-4 py-2 uppercase'
      >
        {name}
      </Badge>

      {showCount && (
        <p className='small-medium text-dark500_light700'>
          {totalQuestion}
        </p>
      )}


    </Link>
  )
}

export default RenderTag;


/* <Badge
      className='subtle-medium flex-center
      background-light800_dark300 text-light400_light500
      rounded-md border-none px-2 py-3 uppercase
      '
    >
      {name}

      {showCount && (
        <span className='small-medium text-dark500_light700 pl-2'>
          <p className='rounded-full bg-light-900 px-2 dark:bg-slate-500'>
            {totalQuestion}
          </p>
        </span>
      )}
    </Badge>
*/