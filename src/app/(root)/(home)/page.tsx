import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";

import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import HomeFilters from "@/components/shared/Filter/HomeFilters";
import NoResult from "@/components/shared/NoResult/NoResult";
import QuestionCard from "@/components/shared/Cards/QuestionCard";

import { getQuestions } from "@/lib/actions/question.action";

import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination/Pagination";


export default async function Home({ searchParams }: SearchParamsProps) {


  // const result = await getQuestions({});

  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,

  });

  const results = JSON.parse(JSON.stringify(result));

  // console.log(results.questions);

  return (
    <>
      <div className="flex w-full flex-col-reverse 
      justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">
          All Questions
        </h1>

        <Link href='/ask-question'
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] 
          px-4 py-3 !text-light-900"
          >
            Ask a Questions
          </Button>
        </Link>
      </div>

      <div className="mt-8 flex justify-between gap-5
      max-sm:flex-col sm:items-center "
      >
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search ..."
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      {/* mt-10 flex w-full flex-col g6 */}
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
              title="There&apos;s no question to show"
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
  );
}