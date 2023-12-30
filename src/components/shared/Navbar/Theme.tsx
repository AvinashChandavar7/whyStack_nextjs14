"use client"

import React from 'react';
import { useTheme } from '@/context/ThemeProvider';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Image from 'next/image';
import { themes } from '@/constants';


const Theme = () => {


  const { mode, setMode } = useTheme();
  // console.log('Theme Mode:', mode);

  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger
          className='
          focus:bg-light-900 data-[state=open]:bg-light-900
          dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200
          '
        >
          {
            mode === 'light'
              ? (<Image src="/assets/icons/sun.svg" alt="light-logo-icon" width={20} height={20} className='active-theme' loading='eager' />)
              : (<Image src="/assets/icons/moon.svg" alt="dark-logo-icon" width={20} height={20} className='active-theme' loading='eager' />)
          }
        </MenubarTrigger>

        <MenubarContent className='absolute
        right-[-3rem] mt-3 min-w-[120px] rounded border py-2 data-[state=open]:bg-light-800
        dark:border-dark-400 dark:bg-dark-300 dark:data-[state=open]:bg-dark-200
        '>

          {
            themes.map((theme) => (
              <MenubarItem key={theme.value}
                onClick={
                  () => {
                    setMode(theme.value);

                    if (theme.value !== 'system') {
                      localStorage.theme = theme.value;
                    } else {
                      localStorage.removeItem('theme')
                    }
                  }
                }
                className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'
              >
                <Image src={theme.icon} alt={theme.value} width={16} height={16}
                  className={`${mode === theme.value && 'active-theme'}`}
                />
                <p className={`body-semibold text-light-500 ${mode === theme.value ? 'text-primary-500' : 'text-dark100_light900'}`}>
                  {theme.label}
                </p>
              </MenubarItem>
            ))
          }

          {/* {
            themes.map(({ value, label, icon }) => (
              <MenubarItem key={value}
                onClick={
                  () => {
                    setMode(value);

                    if (value !== 'system') {
                      localStorage.theme = value;
                    } else {
                      localStorage.removeItem('theme')
                    }
                  }
                }
                className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'
              >
                <Image
                  src={icon} alt={value} width={16} height={16} loading='eager'
                  className={`${mode === value && 'active-theme'}`}
                />
                <p
                  className={`body-semibold text-light-500
                  ${mode === value ? 'text-primary-500' : 'text-dark100_light900'}`
                  }
                >
                  {label}
                </p>
              </MenubarItem>
            ))
          } */}



        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default Theme;