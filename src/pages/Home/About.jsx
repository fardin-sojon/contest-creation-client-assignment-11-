import { FaRocket, FaUsers, FaTrophy } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-base-100 pb-10">
            {/* Hero Section */}
            <div className="hero min-h-[40vh]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">About ContestHub</h1>
                        <p className="py-6 text-lg">
                            Empowering creative minds to showcase their talents, compete with global participants, and win exciting rewards.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-10 px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all hover:-translate-y-2">
                        <figure className="px-10 pt-10 text-primary">
                            <FaRocket className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Participate</h2>
                            <p>Browse through diverse categories ranging from coding, design, to gaming. Find your niche and jump right in!</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all hover:-translate-y-2">
                        <figure className="px-10 pt-10 text-secondary">
                            <FaUsers className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Compete</h2>
                            <p>Challenge yourself against the best talent out there. Push your limits and prove your skills in fair competitions.</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all hover:-translate-y-2">
                        <figure className="px-10 pt-10 text-accent">
                            <FaTrophy className="text-6xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">Win & Earn</h2>
                            <p>Get recognized for your hard work. Win cash prizes, exclusive rewards, and a spot on our prestigious leaderboard.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Trust Section */}
            <div className="bg-primary text-primary-content py-12">
                <div className="flex flex-col md:flex-row justify-around items-center gap-8 max-w-6xl mx-auto text-center">
                    <div>
                        <div className="text-4xl font-bold">100+</div>
                        <div className="text-lg opacity-80">Active Contests</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold">500+</div>
                        <div className="text-lg opacity-80">Happy Winners</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold">Secure</div>
                        <div className="text-lg opacity-80">Stripe Payments</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
