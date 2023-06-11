
const Intro = () => {
  return (
    <div>
      <section className="py-10 sm:py-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10  lg:max-w-none lg:grid-cols-2">
            <section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 bg-white sm:mt-20">
              <h1 className="text-5xl text-start font-bold text-[#333]">
                Online Safety <br /> (Chainlink Hackathon)
              </h1>
              <p className="text-start my-3 text-base text-[#333]">
                Embark on a Digital Quest to Safeguard Your Online Kingdom
              </p>
              <div className="p-5 flex flex-row">
                <iframe
                  width="560"
                  height="315"
                  // src="https://www.youtube.com/embed/dFUYsbbf6U0" 
                  src={`https://www.youtube.com/embed/vwk8d62gPKQ`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                >

                </iframe>
              </div>
            </section>

            <section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 text-white">
              <div>
                <img src="/assets/Online.jpg" />
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;
