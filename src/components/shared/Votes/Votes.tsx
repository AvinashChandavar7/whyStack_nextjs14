"use client"

import React from 'react'
import Image from 'next/image';
import { getFormatValue } from '@/lib/utils';

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type, itemId, userId, upvotes, downvotes, hasupVoted,
  hasdownVoted, hasSaved,
}: VotesProps) => {


  const handleVote = (action: string) => { };

  const handleSave = () => { };


  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>

        {/* up votes */}
        <div className='flex-center gap-1.5'>
          <Image
            src={hasupVoted
              ? '/assets/icons/upvoted.svg'
              : '/assets/icons/upvote.svg'
            }
            alt='UpVote' width={18} height={18}
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-md p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {getFormatValue(upvotes)}
            </p>
          </div>
        </div>

        {/* down votes */}
        <div className='flex-center gap-1.5'>
          <Image
            src={hasdownVoted
              ? '/assets/icons/downvoted.svg'
              : '/assets/icons/downvote.svg'
            }
            alt='downVote' width={18} height={18}
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-md p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {getFormatValue(downvotes)}
            </p>
          </div>
        </div>

      </div>

      {/* saved */}
      <Image
        src={hasdownVoted
          ? '/assets/icons/star-filled.svg'
          : '/assets/icons/star-red.svg'
        }
        alt='saved' width={18} height={18}
        className='cursor-pointer'
        onClick={handleSave}
      />


    </div>
  )
}

export default Votes;