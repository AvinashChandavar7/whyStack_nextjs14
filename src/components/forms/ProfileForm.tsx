"use client"

import * as z from "zod"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter } from 'next/navigation'

import { ProfileSchema } from '@/lib/validations'

import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { updateUser } from '@/lib/actions/user.action'

interface ProfileFromProps {
  clerkId: string;
  user: string;
}

const ProfileForm = ({ clerkId, user }: ProfileFromProps) => {

  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedUser = JSON.parse(user);
  // const parsedClerkId = JSON.parse(JSON.stringify(clerkId))

  // console.log(parsedUser);
  // console.log(JSON.parse(JSON.stringify(clerkId)));


  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    console.table(values)


    setIsSubmitting(true);

    try {

      await updateUser({
        // clerkId: parsedClerkId,
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.back();

    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="mt-9 flex w-full flex-col gap-9 text-white">


          {/* Name */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Name <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="enter your name"
                    className='no-focus paragraph-regular light-border-2 
                  background-light700_dark300 text-dark300_light700 min-h-[56px] border
                  ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username */}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Username <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="enter your username"
                    className='no-focus paragraph-regular light-border-2 
                  background-light700_dark300 text-dark300_light700 min-h-[56px] border
                  ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Portfolio Website */}

          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Portfolio link
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='url'
                    placeholder="Your Portfolio URL"
                    className='no-focus paragraph-regular light-border-2 
                  background-light700_dark300 text-dark300_light700 min-h-[56px] border
                  ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}

                    placeholder="Where are you from?"
                    className='no-focus paragraph-regular light-border-2 
                  background-light700_dark300 text-dark300_light700 min-h-[56px] border
                  ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="what's special about you?"
                    className='no-focus paragraph-regular light-border-2 
                  background-light700_dark300 text-dark300_light700 min-h-[56px] border
                  ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className='mt-7 flex justify-end'>
            <Button type="submit" className='primary-gradient w-fit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submit" : "Save"}
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}

export default ProfileForm