"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import React, { useRef } from 'react';
import { useForm } from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react';


import {
  Form, FormControl, FormDescription, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { QuestionsSchema } from '@/lib/validations';


const QuestionForm = () => {

  const editorRef = useRef(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10">

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Question Title
                <span className='text-primary-500'> *</span>
              </FormLabel>

              <FormControl className='mt-3.5'>
                <Input
                  className='no-focus paragraph-regular background-light900_dark300
                  light-border-2  text-dark300_light700 min-h-[56px] border
                  '
                  placeholder="Question title"
                  {...field}
                />
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question to another person.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        {/* Explanation */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Detailed explanation of your problem?
                <span className='text-primary-500'> *</span>
              </FormLabel>

              <FormControl className='mt-3.5'>
                {/* TODO: Add on Editor Component */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor
                  }}
                  initialValue=""
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
                  }}
                />
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />


        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Tags
                <span className='text-primary-500'> *</span>
              </FormLabel>

              <FormControl className='mt-3.5'>
                <Input
                  className='no-focus paragraph-regular background-light900_dark300
                  light-border-2  text-dark300_light700 min-h-[56px] border
                  '
                  placeholder="Add tags..."
                  {...field}
                />
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Add up to 3 tags to describe what your question is
                about. You need to press enter to add a tag.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className='bg-rose-500'
        >
          Submit
        </Button>

      </form>
    </Form>
  )
}

export default QuestionForm;