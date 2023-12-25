import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Theme from './Theme';
import MoblieNavbar from './MoblieNavbar';
import GlobalSearch from '../Search/GlobalSearch';

const Navbar = () => {
  return (
    <nav className='flex-between background-light900_dark200
    fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12
    dark:shadow-none'
    >
      <Link href="/" className='flex items-center'>
        <Image
          src={'/assets/images/site-logo.svg'}
          alt='logo' width={23} height={23} loading='eager'
        />

        <p className='h2-bold pl-1 font-spaceGrotesk
        text-dark-100 max-sm:hidden dark:text-light-900'
        >
          Why
          <span className='text-primary-500'>
            Stack
          </span>
        </p>
      </Link>

      <GlobalSearch />


      <div className='flex-between gap-5'>
        <Theme />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: 'h-10 w-10' },
              variables: { colorPrimary: "#ff7000" }
            }}
          />
        </SignedIn>

        <MoblieNavbar />
      </div>

    </nav>
  )
}

export default Navbar