"use client"

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { Editor } from '@tinymce/tinymce-react';

import { AnswerSchema } from '@/lib/validations';

import { useTheme } from '@/context/ThemeProvider';

import {
  Form, FormControl,
  FormField, FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from '../ui/button';

const AnswerForm = () => {

  const { mode } = useTheme();

  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState();

  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    }
  });

  const handleCreateAnswer = () => { };

  return (
    <div className='mt-4'>
      <div className='flex flex-col justify-between gap-5
      sm:flex-row sm:items-center sm:gap-2'
      >
        <h4 className='paragraph-semibold text-dark400_light800'>
          Write your answers here
        </h4>

        <Button className='btn light-border-2 gap-1.5 rounded-md 
        px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500
        '>
          <Image
            src="/assets/icons/stars.svg"
            alt='star'
            width={12}
            height={12}
            className='object-contain'
          />

          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>

        <form
          className='mt-6 flex w-full flex-col gap-10'
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>

                <FormControl className='mt-3.5'>
                  {/* TODO: Add on Editor Component */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}

                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'preview', 'anchor', 'searchreplace', 'visualblocks',
                        'codesample', 'fullscreen', 'insertdatetime', 'media',
                        'table', 'paste', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'codesample | bold italic forecolor backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist | ',
                      content_style: 'body {font - family:Inter,sans-serif; font-size:16px }',
                      skin: (mode === 'dark' ? 'oxide-dark' : 'oxide'),
                      content_css: (mode === 'dark' ? 'dark' : 'light'),
                    }}
                  />
                </FormControl>


                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />

          <div className='flex w-full'>
            <Button
              type="submit" disabled={isSubmitting}
              className='primary-gradient w-full !text-light-900'
            >
              {
                isSubmitting ? 'Submitting...' : 'Submit'

              }
            </Button>
          </div>

        </form>

      </Form>
    </div>
  )
}

export default AnswerForm