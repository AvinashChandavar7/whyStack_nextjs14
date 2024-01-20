import React from 'react';

// import { IQuestion } from '@/database/question.model';

import { getQuestionsByTagId } from '@/lib/actions/tag.action'

import { URLProps } from '@/types';

import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import QuestionCard from "@/components/shared/Cards/QuestionCard";
import NoResult from "@/components/shared/NoResult/NoResult";
import Pagination from '@/components/shared/Pagination/Pagination';


const Page = async ({ params, searchParams }: URLProps) => {

  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q
  })

  const results = JSON.parse(JSON.stringify(result));

  // console.log(results);

  return (
    <>

      <h1 className="h1-bold text-dark100_light900">
        {results.tagTitle}
      </h1>

      <div className="mt-8 w-full"
      >
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tag questions"
          otherClasses="flex-1"
        />
      </div>


      <div className="mt-6 flex w-full flex-col gap-4">
        {
          results.questions.length > 0 ? (
            results.questions.map((question: any) => (
              <QuestionCard
                key={question._id}
                _id={question._id.toString()}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="There&apos;s no Saved question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion.our query could be the next big thing others learn from.Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )
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

export default Page