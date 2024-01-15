"use client"

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteQuestion } from '@/lib/actions/question.action';
import { deleteAnswer } from '@/lib/actions/answer.action';


interface EditDeleteProps {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: EditDeleteProps) => {

  const router = useRouter();

  const pathname = usePathname();



  const handleEdit = () => {
    router.push(`questions/edit/${JSON.parse(itemId)}`)
  };

  const handleDelete = async () => {
    if (type === 'Question') {
      // Delete Question
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname
      });

    } else if (type === 'Answer') {
      // Delete Answer
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname
      });
    }
  };


  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
      {
        type === 'Question' && (
          <Image src="/assets/icons/edit.svg" alt="Edit"
            width={16} height={16}
            className='cursor-pointer object-contain'
            onClick={handleEdit}
          />
        )
      }

      <Image src="/assets/icons/trash.svg" alt="Edit"
        width={16} height={16}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />

    </div>
  )
}

export default EditDeleteAction