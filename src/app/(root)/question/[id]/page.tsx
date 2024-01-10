import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';

import { getQuestionById } from '@/lib/actions/question.action';

import { getFormatValue, getTimeStamp } from '@/lib/utils';

import { getUserById } from '@/lib/actions/user.action';

import AnswerForm from '@/components/forms/AnswerForm';
import Metric from '@/components/shared/Metric/Metric';
import RenderTag from '@/components/shared/Tags/RenderTag';
import ParseHTML from '@/components/shared/ParseHTML/ParseHTML';
import AllAnswers from '@/components/shared/AllAnswers/AllAnswers';
import Votes from '@/components/shared/Votes/Votes';


const Page = async ({ params, searchParams }: any) => {

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getQuestionById({ questionId: params.id })

  // console.log(result.title);
  // console.log(result.author.clerkId);
  // console.log(result.author.picture);
  // console.log(result.author.name);

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between  gap-5 
        sm:flex-row sm:items-center sm:gap-2'
        >
          <Link href={`/profile/${result.author.clerkId}`}
            className='flex items-center justify-start gap-1'
          >
            <Image
              src={result.author.picture ? "/assets/icons/avatar.svg" : result.author.picture}
              alt='profile picture'
              width={22} height={22}
              className="rounded-full"
            />

            <p className='paragraph-semibold text-dark300_light700'>
              {result.author.name}
            </p>
          </Link>

          <div className='text-dark300_light700 flex justify-end'>
            VOTING <Votes />
          </div>

        </div>

        <h2 className=' h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
          {result.title}
        </h2>

      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          title="Asked"
          value={` asked ${getTimeStamp(result.createdAt)}`}
          imgUrl={"/assets/icons/clock.svg"}
          alt="clock icon"
          textStyles="small-medium text-dark400_light700"
        />

        <Metric
          title="Answers"
          value={getFormatValue(result.answers.length)}
          imgUrl="/assets/icons/message.svg"
          alt="message"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          title="Views"
          value={getFormatValue(result.views)}
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          textStyles="small-medium text-dark400_light800"
        />

      </div>


      <ParseHTML data={result.content} />

      <div className='mt-8 flex flex-wrap gap-2'>
        {
          result.tags.map((tag: any) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          ))
        }
      </div>

      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers.length}
      />


      <AnswerForm
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  )
}

export default Page;