import homePageBG from "../assets/homepageBG.svg";

function HomePage() {
    return (
        <div className="max-w-screen-xl mx-auto p-5 flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center from-top">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <h1 className="text-3xl font-bold">
                        Hey! I am <span className="text-cyan-700">Blazej</span>
                    </h1>
                    <p>
                        I'm constantly breaking stuff (on purpose) to figure out
                        how it works. Whether it's reverse engineering, learning
                        new frameworks, or building side-projects — I document
                        the process here. If you're into self-taught growth,
                        you'll feel right at home.
                    </p>
                </div>
                <div className="flex justify-center items-center p-5">
                    <img
                        src={homePageBG}
                        alt="Blog Photo"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div className="shadow p-4 rounded-lg shadow-cyan-900 from-left-fourth">
                    <h3 className="font-bold text-cyan-700 mb-2 ">
                        Data Security
                    </h3>
                    <p>
                        Best practices, real-world threats, secure-by-default
                        code.
                    </p>
                </div>
                <div className="shadow shadow-cyan-900 p-4 rounded-lg from-left-third">
                    <h3 className="font-bold text-cyan-700 mb-2">
                        Programming
                    </h3>
                    <p>Tips, deep dives, and building better architecture.</p>
                </div>
                <div className="shadow shadow-cyan-900 p-4 rounded-lg from-left-second">
                    <h3 className="font-bold text-cyan-700 mb-2">
                        Self-Learning
                    </h3>
                    <p>How to stay sharp and actually retain what you learn.</p>
                </div>
                <div className="shadow shadow-cyan-900 p-4 rounded-lg from-left-first">
                    <h3 className="font-bold text-cyan-700 mb-2">
                        Tech Trends
                    </h3>
                    <p>
                        Thoughts on tools, AI, languages, and where it's all
                        going.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
