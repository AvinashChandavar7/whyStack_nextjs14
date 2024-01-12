"use client"

import React, { useEffect } from 'react'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { getFormatValue } from '@/lib/utils';

import { downVoteQuestion, upVoteQuestion } from '@/lib/actions/question.action';
import { downVoteAnswer, upVoteAnswer } from '@/lib/actions/answer.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { viewQuestion } from '@/lib/actions/interaction.action';

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

  const pathname = usePathname();

  const router = useRouter();

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if (type === 'Answer') {
        await upVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      // TODO: Show a Toast
      // return;
    }



    if (action === 'downvote') {
      if (type === 'Question') {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if (type === 'Answer') {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      // TODO: Show a Toast
      // return;
    }


  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    })

  };


  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });


  }, [itemId, userId, pathname, router]);


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
      {
        type === 'Question' && (
          <Image
            src={hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
            }
            alt='saved' width={18} height={18}
            className='cursor-pointer'
            onClick={handleSave}
          />
        )
      }

    </div>
  )
}

export default Votes;