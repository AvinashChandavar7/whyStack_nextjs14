"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SignedOut } from '@clerk/nextjs';

import { Button } from '../../ui/button';

import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {

  const pathname = usePathname();

  return (
    <section className='background-light900_dark200 light-border
    custom-scrollbar sticky left-0 top-0 flex h-screen flex-col
    justify-between overflow-y-auto border-r p-2 pt-36 
    shadow-light-300 max-sm:hidden lg:w-[280px] dark:shadow-none
    '>

      <div className='flex flex-1 flex-col gap-3'>
        {
          sidebarLinks.map((item) => {
            const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
            return (

              <Link href={item.route} key={item.route} className={
                `${isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
                } flex items-center justify-start gap-4 bg-transparent p-4`
              }>
                <Image src={item.imgUrl} alt={item.label} width={20} height={20} loading="lazy" className={`${isActive ? "" : "invert-colors"}`} />
                <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>
                  {item.label}
                </p>
              </Link>
            )
          })
        }
      </div>


      <SignedOut>
        <div className='flex flex-col gap-3'>

          <Link href="/sign-in">
            <Button className='small-medium btn-secondary 
                  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
            >
              <Image src="/assets/icons/account.svg" alt="sign-in" width={20} height={20} loading="lazy" className="invert-colors lg:hidden" />

              <span className='primary-text-gradient max-lg:hidden'>
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className='small-medium light-border-2 btn-tertiary
                  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
            >
              <Image src="/assets/icons/sign-up.svg" alt="sign-up" width={20} height={20} loading="lazy" className="invert-colors lg:hidden" />
              <span className='max-lg:hidden' >
                Sign Up
              </span>
            </Button>
          </Link>

        </div>
      </SignedOut>



    </section>
  )
}

export default LeftSidebar;