import * as Collapsible from '@radix-ui/react-collapsible';

import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useStore } from '../zuztand-store';

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { lessons, currentLessonIndex, currentModuleIndex, isLoading, play } = useStore(store => {
    return {
      lessons: store.course?.modules[moduleIndex].lessons,
      currentLessonIndex: store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      isLoading: store.isLoading,
      play: store.play,
    }
  })

  return (
    <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
      { isLoading ? (
        <>
          <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
            <div className='animate-pulse flex h-10 w-10 rounded-full items-center justify-center bg-zinc-700 text-xs'></div>

            <div className='animate-pulse flex flex-col gap-2'>
              <div className='h-3 w-36 bg-zinc-700 rounded-full'></div>
              <div className='h-3 w-10 bg-zinc-700 rounded-full'></div>
            </div>

            <ChevronDown className='w-5 h-5 ml-auto group-data-[state=open]:rotate-180 transition-transform'/>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <nav className='animate-pulse relative flex flex-col gap-4 p-6'>
              <div className='flex gap-3 items-center'>
                <div className='w-5 h-5 bg-zinc-700 rounded-full'></div>
                <div className='flex justify-between w-full'>
                  <div className='w-36 h-3 bg-zinc-700 rounded-full'></div>
                  <div className='w-8 h-3 bg-zinc-700 rounded-full'></div>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-5 h-5 bg-zinc-700 rounded-full'></div>
                <div className='flex justify-between w-full'>
                  <div className='w-36 h-3 bg-zinc-700 rounded-full'></div>
                  <div className='w-8 h-3 bg-zinc-700 rounded-full'></div>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-5 h-5 bg-zinc-700 rounded-full'></div>
                <div className='flex justify-between w-full'>
                  <div className='w-36 h-3 bg-zinc-700 rounded-full'></div>
                  <div className='w-8 h-3 bg-zinc-700 rounded-full'></div>
                </div>
              </div>
            </nav>
          </Collapsible.Content>
        </>
      ) : ( 
         <>
          <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
          <div className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
            {moduleIndex + 1}
          </div>

          <div className='flex flex-col gap-1 text-left'>
            <strong className='text-sm'>{title}</strong>
            <span className='text-xs text-zinc-400'>{amountOfLessons} aulas</span>
          </div>

          <ChevronDown className='w-5 h-5 ml-auto group-data-[state=open]:rotate-180 transition-transform'/>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <nav className='relative flex flex-col gap-4 p-6'>
            {lessons && lessons.map((lesson, lessonIndex) => {
              const isCurrent = currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex

              return (
                <Lesson 
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                  isCurrent={isCurrent}  
                />
              )
            })}
          </nav>
        </Collapsible.Content>
      </> 
      )}
    </Collapsible.Root>
  )
}