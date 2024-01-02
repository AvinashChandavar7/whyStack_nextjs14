import React from 'react';

import { getAllTags } from '@/lib/actions/tag.action';

import LocalSearchbar from '@/components/shared/Search/LocalSearchbar';
import Filter from '@/components/shared/Filter/Filter';

import { TagFilters } from '@/constants/filters';
import TagCard from '@/components/shared/Cards/TagCard';


const Page = async () => {

  const result = await getAllTags({});
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
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds..."
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
              <div className='h1-bold text-dark200_light800
              mx-auto mt-8 max-w-4xl text-center'
              >
                <p>No Tags Yet</p>
              </div>
            )
        }
      </section>
    </>
  )
}

export default Page;