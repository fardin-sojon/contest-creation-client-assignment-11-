const HelpSupport = () => {
    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                <div className="flex justify-center mb-12">
                    <input type="text" placeholder="Search for answers..." className="input input-bordered w-full max-w-lg" />
                    <button className="btn btn-primary ml-2">Search</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body">
                            <h3 className="text-xl font-bold mb-2">Getting Started</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-primary">How to create an account?</a></li>
                                <li><a href="#" className="hover:text-primary">Verifying your email</a></li>
                                <li><a href="#" className="hover:text-primary">Setting up your profile</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body">
                            <h3 className="text-xl font-bold mb-2">Contests & Prizes</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-primary">Winning a contest</a></li>
                                <li><a href="#" className="hover:text-primary">Prize withdrawal policiy</a></li>
                                <li><a href="#" className="hover:text-primary">Dispute resolution</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <div className="card-body">
                            <h3 className="text-xl font-bold mb-2">Account & Security</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-primary">Resetting your password</a></li>
                                <li><a href="#" className="hover:text-primary">Two-factor authentication</a></li>
                                <li><a href="#" className="hover:text-primary">Privacy settings</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-lg">Still need help?</p>
                    <button className="btn btn-secondary mt-4">Contact Support Team</button>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;
