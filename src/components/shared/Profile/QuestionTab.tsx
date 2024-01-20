import React from 'react';


import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import QuestionCard from '../Cards/QuestionCard';
import Pagination from '../Pagination/Pagination';


interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null | undefined;
}

const QuestionTab = async (
  { searchParams, userId, clerkId }: QuestionTabProps) => {

  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  })

  const results = JSON.parse(JSON.stringify(result));


  return (
    <>
      <div className='flex flex-col gap-5'>
        {
          results.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id.toString()}
              clerkId={clerkId}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        }
      </div>

      <div className="m-6">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={results.isNext}
        />
      </div>
    </>
  )
}

export default QuestionTab