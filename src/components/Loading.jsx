const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/30 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-4 bg-base-200 rounded-full flex items-center justify-center">
                    <span className="loading loading-ring loading-md text-primary"></span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
