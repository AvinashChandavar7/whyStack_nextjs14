import React from 'react';

import QuestionForm from '@/components/forms/QuestionForm';

const Page = async () => {


  return (
    <div>

      <h1 className='h1-bold text-dark100_light900'>
        Ask a Question
      </h1>

      <div className='text-dark400_light800 mt-9'>
        <QuestionForm />
      </div>

    </div>
  )
}

export default Page;