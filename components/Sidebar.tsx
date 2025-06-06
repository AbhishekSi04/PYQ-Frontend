'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Atom,
  Flask,
  Function,
  CaretRight,
  ArrowLeft,
} from '@phosphor-icons/react';
import nta_logo from '@/public/nta_logo.webp';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const subjects = [
  {
    name: 'Physics PYQs',
    name1: 'Phy',
    path: '/physics',
    icon: (
      <Atom  weight="duotone" className="inline p-1 md:w-7 md:h-7 w-6 h-6 rounded-md text-white bg-orange-500" />
    ),
  },
  {
    name: 'Chemistry PYQs',
    name1: 'Chem',
    path: '/chemistry',
    icon: (
      <Flask  weight="duotone" className="inline p-1 md:w-7 md:h-7 w-6 h-6 rounded-md text-white bg-green-500" />
    ),
  },
  {
    name: 'Mathematics PYQs',
    name1: 'Math',
    path: '/mathematics',
    icon: (
      <Function  weight="duotone" className="inline p-1 md:w-7 md:h-7 w-6 h-6 rounded-md text-white bg-blue-500" />
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <nav>
      {/* ------------------ DESKTOP SIDEBAR ------------------ */}
      <div className="hidden md:flex flex-col w-full min-h-screen bg-white border-r shadow-sm dark:bg-[#181F2A] dark:border-[#2D3748]">
        <div className="px-4 py-6 flex flex-col gap-2 items-center">
          <div className="text-xl font-bold text-black flex items-center gap-3 dark:text-[#E2E8F0]">
            <img src={nta_logo.src} alt="NTA Logo" className="w-8 h-8" />
            <h1>JEE Main</h1>
          </div>
          <div className="font-semibold text-sm text-gray-600 text-center dark:text-[#E2E8F0]">
            2025 - 2009 | 173 Papers | 15825 Qs
          </div>
        </div>

        <ul className="mt-2 w-64 mx-auto">
          {subjects.map((subj) => (
            <li key={subj.path}>
              <Link
                href={subj.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm rounded-md transition dark:text-white ${
                  pathname === subj.path
                    ? 'bg-gray-900 text-white font-semibold dark:bg-[#232B3B] dark:text-[#FB923C]'
                    : 'hover:bg-gray-100 text-gray-700 font-semibold dark:hover:bg-[#232B3B] dark:text-[#E2E8F0]'
                }`}
              >
                {subj.icon}
                {subj.name}
                {pathname === subj.path && (
                  <CaretRight className="ml-auto text-white dark:text-white" size={20} />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className="flex justify-center gap-2 items-end px-9 pb-4 mb-10">
          <div className="w-full max-w-xs px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-[#181F2A] border-gray-300 dark:border-[#2D3748] flex items-center gap-2">
            <ThemeToggle />
            <div className='text-sm font-semibold text-gray-800 dark:text-[#E2E8F0]'>
              {mounted ? (theme === "dark" ? "Turn On Light Mode" : "Turn On Dark Mode") : null}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ MOBILE TOPBAR ------------------ */}
      <div className="md:hidden bg-white dark:bg-[#181F2A] border-b dark:border-[#2D3748]">
        {/* Back and title */}
        <div className="flex items-center justify-between px-3 pb-2 pt-3">
          <button className="p-1">
            <ArrowLeft size={22} weight="bold" className="dark:text-[#E2E8F0]" />
          </button>
          <div className="flex-1 text-center font-bold text-base flex items-center justify-center gap-2 dark:text-[#E2E8F0]">
            <img src={nta_logo.src} alt="NTA" className="w-5 h-5 hidden md:block" />
            <span>JEE Main</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Subject tabs */}
        <div className="flex justify-between  px-2">
          {subjects.map((subj) => (
            <Link
              key={subj.path}
              href={subj.path}
              className={`flex-1 py-2 text-center transition dark:text-[#3B82F6] ${
                pathname === subj.path
                  ? 'border-b-2 border-blue-500 font-semibold text-blue-500 dark:border-[#3B82F6] dark:text-[#3B82F6]'
                  : 'text-gray-600 hover:text-black dark:text-[#E2E8F0] dark:hover:text-[#FB923C]'
              }`}
            >
              <div className="flex flex-col items-center gap-1 text-xs">
                {subj.icon}
                <span>{subj.name1}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
