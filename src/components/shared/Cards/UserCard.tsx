import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  }
}


const UserCard = ({ user }: UserProps) => {
  return (
    <Link href={`/profile/${user.clerkId}`}
      className='shadow-light100_darknone w-full 
      max-xs:min-w-full xs:w-[260px]'
    >
      <article className='background-light900_dark200 light-border 
      flex w-full flex-col items-center justify-center rounded-2xl border p-8
      '>
        <Image
          src={user.picture ? "/assets/icons/user.svg" : user.picture} alt="user profile picture"
          width={125} height={125}
          className='rounded-full border border-neutral-700 p-2'
        />

        <div className='mt-4 w-full text-center'>
          <h3 className='h3-bold text-dark200_light900  line-clamp-1'>
            {user.name}
          </h3>
          <p className='body-regular text-dark500_light500 mt-2 '>
            @{user.username}
          </p>
        </div>
      </article>

    </Link>
  )
}

export default UserCard;