import React from 'react'
import { auth } from '@clerk/nextjs';

import { ParamsProps } from '@/types';

import { getUserById } from '@/lib/actions/user.action';

import ProfileForm from '@/components/forms/ProfileForm';

const Page = async ({ params }: ParamsProps) => {

  const { userId } = auth();

  // console.log(userId)
  // console.log(JSON.stringify(userId))
  // console.log(JSON.parse(JSON.stringify(userId)))

  if (!userId) {
    return null;
  }

  const mongoUser = await getUserById({ userId });

  const parsedClerkId = JSON.parse(JSON.stringify(mongoUser._id));

  // console.log(mongoUser)
  // console.log(JSON.stringify(mongoUser))
  // console.log(JSON.parse(JSON.stringify(mongoUser._id)))

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>
        Edit Profile
      </h1>

      <div className='mt-9'>
        <ProfileForm
          clerkId={parsedClerkId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  )
}

export default Page;