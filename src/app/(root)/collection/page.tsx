import { auth } from "@clerk/nextjs";

import { QuestionFilters } from "@/constants/filters";

import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import HomeFilters from "@/components/shared/Filter/HomeFilters";
import NoResult from "@/components/shared/NoResult/NoResult";
import QuestionCard from "@/components/shared/Cards/QuestionCard";

import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination/Pagination";


export default async function Home({ searchParams }: SearchParamsProps) {

  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const results = JSON.parse(JSON.stringify(result));

  // console.log(results.questions);

  return (
    <>

      <h1 className="h1-bold text-dark100_light900">
        Saved Questions
      </h1>

      <div className="mt-8 flex justify-between gap-5
      max-sm:flex-col sm:items-center "
      >
        <LocalSearchbar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search ..."
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <HomeFilters />

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
  );
}