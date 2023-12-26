"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { SignedOut } from '@clerk/nextjs';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from '@/components/ui/button';

import { sidebarLinks } from '@/constants';


const MoblieNavContent = () => {

  const pathname = usePathname();

  return (
    <section className='flex h-full flex-col gap-6 pt-16'>
      {
        sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
          return (
            <SheetClose asChild key={item.route}>
              <Link href={item.route} className={
                `${isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
                } flex items-center justify-start gap-4 bg-transparent p-4`
              }>
                <Image src={item.imgUrl} alt={item.label} width={20} height={20} loading="lazy" className={`${isActive ? "" : "invert-colors"}`} />
                <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                  {item.label}
                </p>
              </Link>
            </SheetClose>
          )
        })
      }
    </section>
  );
}

const MoblieNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/assets/icons/hamburger.svg" alt="Menu" width={36} height={36} loading='eager' className='invert-colors sm:hidden' />
      </SheetTrigger>

      <SheetContent side="left" className='background-light900_dark200 border-none '>
        <Link href="/" className='flex items-center'>
          <Image
            src={'/assets/images/site-logo.svg'}
            alt='logo' width={23} height={23} loading='eager'
          />

          <p className='h2-bold text-dark100_light900 pl-1
        font-spaceGrotesk'
          >
            Why
            <span className='text-primary-500'>
              Stack
            </span>
          </p>
        </Link>

        <div className='flex flex-col'>

          <SheetClose asChild>
            <MoblieNavContent />
          </SheetClose>

          <SignedOut>
            <div className='flex flex-col gap-3'>
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className='small-medium btn-secondary 
                  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
                  >
                    <span className='primary-text-gradient'>
                      Log In
                    </span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className='small-medium light-border-2 btn-tertiary
                  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>

        </div>

      </SheetContent>
    </Sheet >

  )
}

export default MoblieNavbar;




