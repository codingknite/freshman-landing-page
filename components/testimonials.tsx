import Image from 'next/image'

type Testimonial = {
    name: string
    role: string
    quote: string
    avatar: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Alice',
        role: 'Pre-Med Student',
        quote: 'Freshman has revolutionized how I study for anatomy. Having my notes automatically turned into active recall questions is like having a personal tutor.',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
    {
        name: 'George',
        role: 'Law Student',
        quote: 'The AI-driven insights breaking down complex cases into Key Concepts have helped me optimize my daily study schedule significantly.',
        avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    },
    {
        name: 'Natalie',
        role: 'High School Senior',
        quote: 'Freshman\'s flashcard generation feature has helped me build better study routines and finally ace my AP exams.',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
        name: 'Ulysses',
        role: 'Computer Science Major',
        quote: 'The AI-powered note summerizer has saved me hours of manual note-taking. I just upload my lecture slides and start revising immediately.',
        avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    },
    {
        name: 'Bob',
        role: 'Engineering Student',
        quote: 'The Feynman Technique-inspired recall tests have significantly improved my deep understanding of complex thermodynamics concepts.',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d',
    },
    {
        name: 'Hannah',
        role: 'Medical Resident',
        quote: 'Freshman\'s spaced repetition schedule integrated with my clinical rotations has created a lifesaver of a seamless workflow.',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    },
    {
        name: 'Oscar',
        role: 'History Major',
        quote: 'Practicing past papers interactively instead of just reading old PDFs has massively improved my exam strategy and essay structure.',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    },
    {
        name: 'Victoria',
        role: 'Business Analyst',
        quote: 'Even for professional certifications, Freshman\'s personalized active recall insights have been eye-opening and deeply effective.',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708d',
    },
    {
        name: 'Charlie',
        role: 'Nursing Student',
        quote: 'The mock exams feature has helped me maintain a better track of my weak points before I step into the real testing center.',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026709d',
    },
    {
        name: 'Ian',
        role: 'Economics Major',
        quote: 'The smart revision reminders have drastically reduced my cramming sessions before midterms. Highly recommended.',
        avatar: 'https://i.pravatar.cc/150?u=33',
    },
    {
        name: 'Patricia',
        role: 'Literature Student',
        quote: 'Freshman\'s ability to parse through hundreds of pages of text and extract the themes has streamlined my essay preparations.',
        avatar: 'https://i.pravatar.cc/150?u=44',
    },
    {
        name: 'William',
        role: 'MBA Candidate',
        quote: 'The AI-suggested quizzes based on my uploaded case studies have expanded my analytical thinking and recall speed.',
        avatar: 'https://i.pravatar.cc/150?u=55',
    },
]

export default function TestimonialsSection() {
    return (
        <section className="bg-background pb-16 md:pb-24">
            <div className="mx-auto max-w-7xl px-6">
                
                {/* Header */}
                <div className="text-center mt-6 mb-16 md:mb-20">
                    <p className="text-sm md:text-sm text-[#6366f1] mb-4 uppercase tracking-[0.2em] font-bold">
                        TESTIMONIALS
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white lowercase">
                        students love freshman
                    </h2>
                </div>

                {/* Masonry Grid Layout */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                    {testimonials.map((testimonial, idx) => (
                        <div 
                            key={idx}
                            className="break-inside-avoid bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] p-6 md:p-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300 border border-zinc-200/50 dark:border-zinc-800/50"
                        >
                            <div className="flex items-center gap-4 mb-4 md:mb-5">
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-zinc-900 dark:text-white text-base leading-tight">
                                        {testimonial.name}
                                    </h3>
                                    <span className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-0.5">
                                        {testimonial.role}
                                    </span>
                                </div>
                            </div>
                            <blockquote className="text-sm md:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                                {testimonial.quote}
                            </blockquote>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
