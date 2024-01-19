import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import RenderTag from '../Tags/RenderTag';

import { getHotQuestions } from '@/lib/actions/question.action';



const popularTags = [
  { _id: "1", name: "javaScript", totalQuestion: 5 },
  { _id: "2", name: "react", totalQuestion: 4 },
  { _id: "3", name: "nextjs", totalQuestion: 3 },
  { _id: "4", name: "nodejs", totalQuestion: 2 },
  { _id: "5", name: "vue-js", totalQuestion: 1 },
];


const RightSidebar = async () => {

  const hotQuestions = await getHotQuestions();

  return (
    <section className='background-light900_dark200 light-border
    custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px]
    flex-col overflow-y-auto border-l p-6 pt-36
    shadow-light-300 max-xl:hidden  dark:shadow-none'
    >

      <div>
        <h3 className='h3-bold text-dark200_light900'>
          Top Questions
        </h3>

        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {
            hotQuestions.map((question) => (
              <Link
                href={`question/${question._id}`} key={question._id}
                className='flex cursor-pointer items-center justify-between gap-7'
              >
                <p className='body-medium text-dark500_light700'>
                  {question.title}
                </p>

                <Image src="/assets/icons/chevron-right.svg" alt="sign-in"
                  width={20} height={20} loading="lazy" className="invert-colors "
                />

              </Link>
            ))
          }
        </div>
      </div>

      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>
          Popular Tags
        </h3>

        <div className='mt-3 flex w-full flex-col gap-4'>
          {
            popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestion={tag.totalQuestion}
                showCount
              />
            ))
          }
        </div>
      </div>

    </section>
  )
}

export default RightSidebar;