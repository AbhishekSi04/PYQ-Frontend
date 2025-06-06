'use client';

import d2d from '../../data/d2d.json';
import {
  Atom,
  ArrowsDownUp,
  ArrowUp,
  ArrowDown,
  Function as FuncIcon,
  Ruler,
  ChartLine,
  Magnet,
  WaveSine,
  Cube,
  CaretRight,
  LineVertical,
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useMemo, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// Icons to assign to chapters (looped using modulo)
const iconList = [
  <Atom key="atom" size={18} className="text-orange-500 " />,
  <FuncIcon key="func" size={18} className="text-indigo-500" />,
  <Ruler key="ruler" size={18} className="text-blue-500" />,
  <ChartLine key="chart" size={18} className="text-pink-500" />,
  <Magnet key="magnet" size={18} className="text-green-500" />,
  <WaveSine key="wave" size={18} className="text-cyan-600" />,
  <Cube key="cube" size={18} className="text-red-400" />,
];

const chemistryChapters = d2d.filter((item) => item.subject === 'Chemistry');

// Get unique values for filters
const classes = [...new Set(chemistryChapters.map((chapter) => chapter.class))];
const units = [...new Set(chemistryChapters.map((chapter) => chapter.unit))];
// const statuses = [...new Set(chemistryChapters.map((chapter) => chapter.status))];

export default function ChemistryPage() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showWeakChapters, setShowWeakChapters] = useState(false);
  const [sortOption, setSortOption] = useState<'mostAsked' | 'lessPracticed' | 'more2025' | null>(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  // const scrollFilterBar = () => {
  //   if (filterBarRef.current) {
  //     filterBarRef.current.scrollBy({ left: 120, behavior: 'smooth' });
  //   }
  // };

  // const scrollFilterBarLeft = () => {
  //   if (filterBarRef.current) {
  //     filterBarRef.current.scrollBy({ left: -120, behavior: 'smooth' });
  //   }
  // };

  const scrollFilterBarRight = () => {
    if (filterBarRef.current) {
      filterBarRef.current.scrollBy({ left: 120, behavior: 'smooth' });
    }
  };

  // Filter and sort chapters based on selected filters and sort option
  const filteredChapters = useMemo(() => {
    let chapters = chemistryChapters.filter((chapter) => {
      if (selectedClass !== 'all' && chapter.class !== selectedClass) return false;
      if (selectedUnit !== 'all' && chapter.unit !== selectedUnit) return false;
      if (selectedStatus && chapter.status !== selectedStatus) return false;
      if (showWeakChapters && !chapter.isWeakChapter) return false;
      return true;
    });
    if (sortOption === 'mostAsked') {
      chapters = [...chapters].sort((a, b) => {
        const totalA = Object.values(a.yearWiseQuestionCount).reduce((x, y) => x + y, 0);
        const totalB = Object.values(b.yearWiseQuestionCount).reduce((x, y) => x + y, 0);
        return totalB - totalA;
      });
    } else if (sortOption === 'lessPracticed') {
      chapters = [...chapters].sort((a, b) => a.questionSolved - b.questionSolved);
    } else if (sortOption === 'more2025') {
      chapters = [...chapters].sort((a, b) => {
        const aMore = (a.yearWiseQuestionCount['2025'] || 0) > (a.yearWiseQuestionCount['2024'] || 0) ? 1 : 0;
        const bMore = (b.yearWiseQuestionCount['2025'] || 0) > (b.yearWiseQuestionCount['2024'] || 0) ? 1 : 0;
        return bMore - aMore;
      });
    }
    return chapters;
  }, [selectedClass, selectedUnit, selectedStatus, showWeakChapters, sortOption]);

  return (
    <div className="overflow-y-auto bg-white dark:bg-[#181F2A] min-h-screen w-full px-2 py-2 md:px-8 md:py-6 m-0">
      {/* Header */}
      <div className="hidden md:flex md:items-center md:justify-center md:mb-1 w-full">
        <div className="flex items-center gap-4">
          <Atom weight="duotone" className="bg-orange-500 mt-1 p-1 md:w-6 md:h-6 rounded-md text-white" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-[#E2E8F0]">Chemistry PYQs</h1>
        </div>
      </div>
      <p className="md:text-sm md:text-center md:text-gray-500 md:mt-3 md:mb-5 hidden md:block dark:text-[#E2E8F0]">Chapter-wise Collection of Chemistry PYQs</p>

      {/* Filters with scroll button */}
      <div className="relative flex items-center md:mb-4 mb-2">
        <div
          ref={filterBarRef}
          className="hide-scrollbar flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide w-full dark:bg-[#181F2A]  rounded-md"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="shrink-0">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[90px] md:w-[90px] font-medium md:text-[16px] border border-gray-300 focus:border-orange-500 dark:border-[#2D3748] dark:bg-[#181F2A] dark:text-[#E2E8F0]">
                <SelectValue className='text-black dark:text-[#E2E8F0]' placeholder="Class" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#181F2A] dark:text-[#E2E8F0]">
                <SelectItem className='text-black dark:text-[#E2E8F0]' value="all">Class</SelectItem>
                {classes.map((cls) => (
                  <SelectItem className='text-black dark:text-[#E2E8F0]' key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="shrink-0">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="w-[90px] md:w-[90px] font-[500] md:text-[16px] border border-gray-300 focus:border-orange-500 dark:border-[#2D3748] dark:bg-[#181F2A] dark:text-[#E2E8F0]">
                <SelectValue className='dark:text-[#E2E8F0]' placeholder="Units" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#181F2A] dark:text-[#E2E8F0]">
                <SelectItem value="all" className='dark:text-[#E2E8F0]'>Units</SelectItem>
                {units.map((unit) => (
                  <SelectItem className='text-black dark:text-[#E2E8F0]' key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <LineVertical size={28} className='mt-1 -ml-3 text-gray-300 dark:text-[#2D3748]' />
          </div>
          <Button
            variant={selectedStatus === 'Not Started' ? 'default' : 'outline'}
            className="-ml-3 py-1 md:text-[16px] h-auto shrink-0 border border-gray-300 focus:border-orange-500 dark:border-[#2D3748] dark:bg-[#181F2A] dark:text-[#E2E8F0]"
            onClick={() =>
              setSelectedStatus(selectedStatus === 'Not Started' ? null : 'Not Started')
            }
          >
            Not Started
          </Button>
          <Button
            variant={showWeakChapters ? 'default' : 'outline'}
            className={`px-3 py-1 md:text-[16px] border-orange-400 cursor-pointer shrink-0 border dark:border-[#FB923C] dark:bg-[#181F2A] dark:text-[#E2E8F0] ${
              showWeakChapters
                ? ' text-white border border-orange-500 dark:bg-[#181F2A] dark:text-[#FB923C] dark:border-[#FB923C]'
                : 'text-black dark:text-[#E2E8F0]'
            }`}
            onClick={() => setShowWeakChapters(!showWeakChapters)}
          >
            Weak Chapters
          </Button>
        </div>
        {/* Right scroll button (mobile only) */}
        <button
          type="button"
          className="absolute -right-[2px] top-1/2 -translate-y-1/2 bg-white dark:bg-[#181F2A] rounded-full pl-2 py-3 z-10 md:hidden  border-gray-300 dark:border-[#2D3748]"
          onClick={scrollFilterBarRight}
          style={{ alignItems: 'center' }}
        >
          <CaretRight size={20} className="dark:text-[#E2E8F0]" />
        </button>
      </div>
      <div className='flex flex-row justify-between gap-4 pb-4 pt-2 md:mb-2 m'>
        <div className="text-[13px] md:text-sm text-gray-500 dark:text-[#E2E8F0]">
          Showing {filteredChapters.length} of {chemistryChapters.length} chapters
        </div>
        {/* Sort dropdown  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-blue-500 dark:text-[#2563eb] flex flex-row items-center gap-1 text-sm md:text-base font-medium focus:outline-none cursor-pointer">
              <ArrowsDownUp size={18} className="mr-1" />
              <span>Sort</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 dark:bg-[#181F2A] dark:text-[#E2E8F0] border border-gray-300 dark:border-[#2D3748]">
            <DropdownMenuItem
              onClick={() => setSortOption('mostAsked')}
              className={sortOption === 'mostAsked' ? 'font-semibold text-blue-600 dark:text-[#FB923C]' : ''}
            >
              Most Asked Chapters
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortOption('lessPracticed')}
              className={sortOption === 'lessPracticed' ? 'font-semibold text-blue-600 dark:text-[#FB923C]' : ''}
            >
              Less Practiced Chapters
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortOption('more2025')}
              className={sortOption === 'more2025' ? 'font-semibold text-blue-600 dark:text-[#FB923C]' : ''}
            >
              More Questions Chapter in 2025
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      

      {/* Chapters List */}
      <div className="space-y-3">
        {filteredChapters.map((chapter, i) => {
          const icon = iconList[i % iconList.length];
          const q2025 = chapter.yearWiseQuestionCount['2025'] || 0;
          const q2024 = chapter.yearWiseQuestionCount['2024'] || 0;
          const totalQs = Object.values(chapter.yearWiseQuestionCount).reduce((a, b) => a + b, 0);

          return (
            <Card
              key={i}
              className={`px-4 py-3 md:border md:rounded-md hover:shadow-sm transition bg-white dark:bg-[#181F2A] md:border-gray-300 md:dark:border-[#2D3748] ${
                chapter.isWeakChapter ? '' : ''
              }`}
            >
              {/* --- Mobile View --- */}
              <div className='flex flex-row md:hidden'>
                <div className='w-[10%] flex items-start pt-3'>
                  <span className="opacity-100 dark:text-[#FB923C]">{icon}</span>
                </div>
                <div className="flex flex-col gap-1 md:hidden w-full">
                  {/* Row 1: Chapter Name, Qs */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="font-base text-base text-gray-900 leading-tight dark:text-[#E2E8F0]">{chapter.chapter}</span>
                    </div>
                    <span className=" text-[12px] text-gray-500 dark:text-[	#6B7280]">{chapter.questionSolved}/{totalQs} Qs</span>
                  </div>
                  {/* Row 2: Yearwise Qs */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="text-gray-500 text-xs dark:text-[#6B7280]">2025: <span className='text-gray-500 font-base dark:text-[#9CA3AF]'>{q2025}Qs</span></div>
                    {q2025 > q2024 && <ArrowUp size={12} weight="bold" className="text-green-600 mt-1 dark:text-green-400" style={{marginBottom: 2}} />}
                    {q2025 < q2024 && <ArrowDown size={12} weight="bold" className="text-red-500 mt-1 dark:text-red-400" style={{marginBottom: 2}} />}
                    <span className="text-gray-500 text-xs ml-1 dark:text-[#6B7280]"><span className='mr-1'>|</span>  2024: <span className='text-gray-500 font-base dark:text-[#9CA3AF]'>{q2024}Qs</span></span>
                  </div>
                </div>
              </div>
              
              

              {/* --- Desktop View (unchanged) --- */}
              <div className="hidden md:flex flex-row justify-between w-full py-1">
                <div className='w-[85%] md:px-2 flex flex-col md:flex-row md:justify-between'>
                  <div className="font-medium text-[17px] text-gray-800 flex items-center gap-4 dark:text-[#E2E8F0]">
                    {icon}
                    {chapter.chapter}
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                      <span className="text-gray-600 flex items-center gap-1 dark:text-[#6B7280]">
                        2025: <span className='text-gray-600 font-base dark:text-[#9CA3AF]'>{q2025}Qs</span>
                        {q2025 > q2024 && <ArrowUp size={12} weight="bold" className="text-green-600 mt-1 dark:text-green-400" />}
                        {q2025 < q2024 && <ArrowDown size={12} weight="bold" className="text-red-500 mt-1 dark:text-red-400" />}
                      </span>
                      <span className="text-gray-500 dark:text-[#6B7280]">|</span>
                      <span className="text-gray-500 dark:text-[#6B7280]">2024: <span className='text-gray-600 font-base dark:text-[#9CA3AF]'>{q2024}Qs</span></span>
                  </div>
                </div>
                <div className="w-[15%] flex flex-row items-center gap-4 md:gap-8 px-2 md:px-6 text-gray-600 whitespace-nowrap dark:text-[#9CA3AF]">
                  <span className="text-gray-300 dark:text-[#6B7280]">|</span>
                  <span className="text-gray-500 md:text-base dark:text-[#6B7280]">
                    {chapter.questionSolved}/{totalQs} Qs
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
