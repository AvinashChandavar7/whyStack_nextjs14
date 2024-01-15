"use client"

import React from 'react';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';

import { getFormatValue, getTimeStamp } from '@/lib/utils';

import RenderTag from '../Tags/RenderTag';
import Metric from '../Metric/Metric';
import EditDeleteAction from '../Profile/EditDeleteAction';



interface QuestionCardProps {
  _id: string;
  clerkId?: string | null | undefined;
  title: string;
  tags: {
    _id: string,
    name: string
  }[];
  author: {
    _id: string,
    clerkId?: string | null | undefined;
    name: string,
    picture: string
  };
  upvotes: number[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = (
  { _id, clerkId, title, tags, author,
    upvotes, views, answers, createdAt,
  }: QuestionCardProps
) => {


  const showActionButtons = clerkId && clerkId === author?.clerkId;


  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>

        <div>

          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {getTimeStamp(createdAt)}
          </span>

          <Link href={`/question/${_id}`}>
            <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
              {title}
            </h3>
          </Link>

        </div>

        {/* if signed-in [Add, Edit, Delete Actions] */}

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="Question"
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>



      </div>

      <div className='mt-3.5 flex flex-wrap gap-2'>
        {
          tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
            />
          ))
        }
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
            alt="Upvotes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            title="Answers"
            value={getFormatValue(answers.length)}
            imgUrl="/assets/icons/message.svg"
            alt="message"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            title="Views"
            value={getFormatValue(views)}
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

    </div>
  )
}

export default QuestionCard;