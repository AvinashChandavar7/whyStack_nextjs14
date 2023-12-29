import React from 'react';

import { redirect } from 'next/navigation';

// import { auth } from '@clerk/nextjs';

import QuestionForm from '@/components/forms/QuestionForm';

import { getUserById } from '@/lib/actions/user.action';

const Page = async () => {

  // const { userId } = auth();

  const userId = '123456789';

  if (!userId) {
    redirect('/sign-in');
  }

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>

      <h1 className='h1-bold text-dark100_light900'>
        Ask a Question
      </h1>

      <div className='text-dark400_light800 mt-9'>
        <QuestionForm
          mongoUserId={JSON.stringify(mongoUser?._id)}
        />
      </div>

    </div>
  )
}

export default Page;