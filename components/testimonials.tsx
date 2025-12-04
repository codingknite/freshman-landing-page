import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Sarah Chen',
        role: 'Product Manager, TechCorp',
        quote: 'Cal AI has completely transformed how I manage my schedule. The AI-powered suggestions save me hours each week, and I never miss important meetings anymore.',
    },
    {
        name: 'Michael Rodriguez',
        role: 'Software Engineer, StartupXYZ',
        quote: 'The smart time blocking feature is a game-changer. Cal AI helps me maintain a perfect work-life balance by automatically allocating time for focused work and personal activities.',
    },
    {
        name: 'Emily Johnson',
        role: 'Freelance Designer',
        quote: "As someone who juggles multiple projects, Cal AI's predictive event planning is incredible. It learns my habits and suggests optimal meeting times, reducing conflicts significantly.",
    },
    {
        name: 'David Kim',
        role: 'Consultant, Business Solutions Inc',
        quote: 'The AI-driven insights have increased my productivity by 40%. Cal AI doesn\'t just schedule my time—it optimizes it. This is the future of calendar management.',
    },
    {
        name: 'Jessica Martinez',
        role: 'Marketing Director, GrowthCo',
        quote: 'Cal AI has eliminated all my scheduling headaches. The intelligent conflict detection and resolution features are absolutely brilliant. I can\'t imagine going back to manual scheduling.',
    },
    {
        name: 'Robert Thompson',
        role: 'CEO, InnovateLabs',
        quote: 'The time management insights from Cal AI have been eye-opening. It helps me understand my work patterns better and make more informed decisions about how I allocate my time.',
    },
    {
        name: 'Amanda Lee',
        role: 'Project Manager, DesignStudio',
        quote: 'Cal AI seamlessly integrates with all my calendar accounts and provides intelligent suggestions across platforms. It\'s like having a personal scheduling assistant that never sleeps.',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Loved by the Community</h2>
                        <p className="mt-6">Cal AI is helping professionals worldwide optimize their schedules and reclaim their time. See what our users have to say.</p>
                    </div>
                    <div className="mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                className="space-y-3 *:border-none *:shadow-none">
                                {chunk.map(({ name, role, quote }, index) => (
                                    <Card key={index}>
                                        <CardContent className="pt-6">
                                            <div>
                                                <h3 className="font-medium">{name}</h3>

                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
