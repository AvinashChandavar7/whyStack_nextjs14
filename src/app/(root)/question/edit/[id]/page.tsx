import React from 'react'
import { auth } from '@clerk/nextjs';

import { ParamsProps } from '@/types';

import { getUserById } from '@/lib/actions/user.action';
import { getQuestionById } from '@/lib/actions/question.action';

import QuestionForm from '@/components/forms/QuestionForm';

const Page = async ({ params }: ParamsProps) => {

  const { userId } = auth();

  if (!userId) {
    return null;
  }

  // console.log(userId);

  const mongoUser = await getUserById({ userId });

  // console.log("MongoUser", mongoUser._id);
  // console.log("MongoUser", mongoUser._id.toString());

  const result = await getQuestionById({ questionId: params.id });

  // console.log(result);

  // const results = JSON.parse(JSON.stringify(result));
  const results = (JSON.stringify(result));

  // console.log(results);

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>
        Edit Question
      </h1>

      <div className='mt-9'>
        <QuestionForm
          type='Edit'
          // mongoUserId={mongoUser?._id}
          mongoUserId={JSON.stringify(mongoUser?._id)}
          questionDetails={results}
        />
      </div>
    </>
  )
}

export default Page