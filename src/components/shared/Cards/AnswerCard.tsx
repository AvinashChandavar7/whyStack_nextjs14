"use client"

import React from 'react';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';

import { getFormatValue, getTimeStamp } from '@/lib/utils';

import Metric from '../Metric/Metric';
import EditDeleteAction from '../Profile/EditDeleteAction';


interface QuestionCardProps {
  _id: string;
  clerkId?: string | null | undefined;
  question: {
    _id: string,
    title: string
  };
  author: {
    _id: string,
    clerkId: string
    name: string,
    picture: string
  };
  upvotes: number[];
  createdAt: Date;
}

const AnswerCard = (
  {
    _id,
    clerkId, question,
    author, upvotes, createdAt,
  }: QuestionCardProps
) => {


  const showActionButtons = clerkId && clerkId === author?.clerkId;


  return (
    <Link href={`/question/${question?._id}/#${_id}`}
      className='card-wrapper rounded-[10px] px-11 py-9'>


      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>

        <div>

          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {getTimeStamp(createdAt)}
          </span>


          <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
            {question.title}
          </h3>

        </div>

        {/* if signed-in [Add, Edit, Delete Actions] */}

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="Answer"
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>

      </div>



      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          title={`- asked ${getTimeStamp(createdAt)}`}
          value={author?.name}
          imgUrl={"/assets/icons/avatar.svg" || author.picture}
          alt="user"
          href={`/profile/${author?._id.toString()}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className='flex-between gap-2'>

          <Metric
            title="Votes"
            value={getFormatValue(upvotes.length)}
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            textStyles="small-medium text-dark400_light800"
          />

        </div>
      </div>

    </Link>
  )
}

export default AnswerCard;