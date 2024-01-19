import React from 'react';

import { TagFilters } from '@/constants/filters';

import { getAllTags } from '@/lib/actions/tag.action';

import Filter from '@/components/shared/Filter/Filter';
import TagCard from '@/components/shared/Cards/TagCard';
import NoResult from '@/components/shared/NoResult/NoResult';
import LocalSearchbar from '@/components/shared/Search/LocalSearchbar';
import { SearchParamsProps } from '@/types';


const Page = async ({ searchParams }: SearchParamsProps) => {

  const result = await getAllTags({
    searchQuery: searchParams.q,
  });
  // console.log(result.tags);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        All Tags
      </h1>

      <div className="mt-8 flex justify-between gap-5
      max-sm:flex-col sm:items-center "
      >
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags..."
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className='mt-12 flex flex-wrap gap-4'>
        {
          result.tags.length > 0 ?
            (result.tags.map((tag) => (
              <TagCard
                key={tag._id.toString()}
                tag={tag}
              />
            ))
            ) : (
              <NoResult
                title="No Tags Found"
                description="It looks like there are no tags found."
                link="/ask-question"
                linkTitle="Ask a Question"
              />
            )
        }
      </section>
    </>
  )
}

export default Page;