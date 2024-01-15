import React from 'react'

import { getUserAnswer } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from '../Cards/AnswerCard';


interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null | undefined;
}


const AnswersTab = async (
  { searchParams, userId, clerkId }: AnswerTabProps) => {

  const result = await getUserAnswer({ userId, page: 1 })

  const results = JSON.parse(JSON.stringify(result));


  return (
    <>
      <div className='flex flex-col gap-5'>
        {
          results.answers.map((answer: any) => (
            <AnswerCard
              key={answer._id}
              _id={answer._id}
              clerkId={clerkId}
              question={answer.question}
              author={answer.author}
              upvotes={answer.upvotes}
              createdAt={answer.createdAt}
            />
          ))
        }
      </div>
    </>
  )
}

export default AnswersTab