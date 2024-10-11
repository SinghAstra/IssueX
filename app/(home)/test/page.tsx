export default function Home() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">PR Review AI</div>
          <div>
            <a href="#" className="text-gray-800 hover:text-gray-600 mx-3">
              Features
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600 mx-3">
              Pricing
            </a>
            <a
              href="#"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
            Revolutionize Your Code Reviews
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Automate your GitHub PR reviews with AI-powered insights
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300">
            Connect GitHub
          </button>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              How It Works
            </h2>
            <div className="flex flex-wrap justify-center items-center">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="text-center">
                  <div className="mb-4">
                    {/* <lottie-player
                      src="https://assets3.lottiefiles.com/packages/lf20_yysibrof.json"
                      background="transparent"
                      speed="1"
                      style="width: 200px; height: 200px;"
                      loop
                      autoplay
                    ></lottie-player> */}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Connect</h3>
                  <p className="text-gray-600">
                    Securely connect your GitHub account with OAuth
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="text-center">
                  <div className="mb-4">
                    {/* <lottie-player
                      src="https://assets3.lottiefiles.com/packages/lf20_4kx2q1lx.json"
                      background="transparent"
                      speed="1"
                      style="width: 200px; height: 200px;"
                      loop
                      autoplay
                    ></lottie-player> */}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. Analyze</h3>
                  <p className="text-gray-600">
                    AI automatically reviews new pull requests
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="text-center">
                  <div className="mb-4">
                    {/* <lottie-player
                      src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"
                      background="transparent"
                      speed="1"
                      style="width: 200px; height: 200px;"
                      loop
                      autoplay
                    ></lottie-player> */}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Improve</h3>
                  <p className="text-gray-600">
                    Receive insightful comments on your PRs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Automated Reviews
                </h3>
                <p className="text-gray-600">
                  AI-powered code analysis for every pull request
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  GitHub Integration
                </h3>
                <p className="text-gray-600">
                  Seamless connection with your GitHub repositories
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
                <p className="text-gray-600">
                  Receive comments directly on your pull requests
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Customizable Rules
                </h3>
                <p className="text-gray-600">
                  Set your own code quality standards
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Team Collaboration
                </h3>
                <p className="text-gray-600">
                  Improve code quality across your entire team
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Performance Metrics
                </h3>
                <p className="text-gray-600">
                  Track and improve your code review process
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-500 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to streamline your code reviews?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of developers using PR Review AI today
            </p>
            <button className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">PR Review AI</h3>
              <p className="text-gray-400">Automating code reviews with AI</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PR Review AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
