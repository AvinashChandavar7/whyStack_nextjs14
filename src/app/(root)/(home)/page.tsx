import Link from "next/link";

import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";

import LocalSearchbar from "@/components/shared/Search/LocalSearchbar";
import Filter from "@/components/shared/Filter/Filter";
import HomeFilters from "@/components/shared/Filter/HomeFilters";
import NoResult from "@/components/shared/NoResult/NoResult";
import QuestionCard from "@/components/shared/Cards/QuestionCard";




const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: 'python' },
      { _id: "2", name: 'sql' },
      { _id: "3", name: 'database' }
    ],
    author: {
      _id: "authorId1",
      name: "John Doe",
      picture: "url/to/picture1"
    },
    upvotes: 900000000,
    views: 15000,
    answers: [
      {}, {}
    ],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "4", name: 'css' },
      { _id: "5", name: 'html' },
    ],
    author: {
      _id: "authorId2",
      name: "John Doe",
      picture: "url/to/picture2"
    },
    upvotes: 1056156545,
    views: 100000000000,
    answers: [
      {}, {}
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

export default function Home() {
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
          questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
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
    </>
  );
}