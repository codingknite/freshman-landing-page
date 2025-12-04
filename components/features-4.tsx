import { Brain, Library, ShieldCheck, Target, Trophy, Zap } from 'lucide-react';

export default function Features() {
  return (
    <section className='py-12 md:py-2'>
      <div className='mx-auto max-w-5xl space-y-8 px-6 md:space-y-16'>
        <div className='relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-12'>
          <h2 className='text-balance text-4xl md:text-4xl lg:text-5xl font-bold'>
            Unlock your full learning potential.
          </h2>
          <p className='text-lg md:text-xl'>
            Stop studying harder. Start studying smarter. Our science backed
            approach ensures you spend less time memorizing and more time
            mastering your subjects.
          </p>
        </div>

        <div className='relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Trophy className='size-4' />
              <h3 className='text-base font-medium'>Ace Your Exams</h3>
            </div>
            <p className='text-base'>
              ctive Recall is scientifically proven to outperform passive
              review, leading to significantly higher test scores and better
              GPAs.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Zap className='size-4' />
              <h3 className='text-base font-medium'>Save Hours Studying</h3>
            </div>
            <p className='text-base'>
              Stop wasting time making manual flashcards. Let Freshman generate
              your materials instantly so you can focus 100% on learning.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Brain className='size-4' />

              <h3 className='text-base font-medium'>Retain Information</h3>
            </div>
            <p className='text-base'>
              Our Spaced Repetition algorithms schedule reviews at the perfect
              moment to move knowledge into your long-term memory.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='size-4' />

              <h3 className='text-base font-medium'>Eliminate Exam Anxiety</h3>
            </div>
            <p className='text-base'>
              Walk into every test with total confidence, knowing you’ve already
              mastered the material through simulated active testing.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Target className='size-4' />

              <h3 className='text-base font-medium'>Target Your Weak Spots</h3>
            </div>
            <p className='text-base'>
              Intelligent analytics identify exactly which concepts you are
              struggling with so you can fix knowledge gaps before the exam.
            </p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Library className='size-4' />

              <h3 className='text-base font-medium'>Streamlined Workflow</h3>
            </div>
            <p className='text-base'>
              Keep all your notes, textbooks, and revision schedules in one
              organized, distraction-free hub that fits in your pocket.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
