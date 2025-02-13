import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import {Button} from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[90vh]">
      <div className="container flex-1 h-full flex items-center mx-auto px-4 relative z-10">
        <div className="mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl bg-gradient-to-b from-gray-300 to-gray-500 bg-clip-text text-transparent font-bold mb-6">
            Code Beyond Limits!
          </h1>
          <p
            className="text-lg md:text-xl mb-8 animate-fade-up font-medium text-gray-400"
            style={{ animationDelay: "0.2s" }}
          >
            Showcase your skills and compete with the best minds at RGUKT
            Nuzvid&apos;s Coding Contest.
          </p>
          <div
            className="space-x-4"
          >
            <Link
              href="#"
              className=""
            >
              <Button className="px-6 py-6 bg-green-600 bg-gradient-to-b from-amber-500 to-amber-800  hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200">Register Now</Button>
            </Link>
            <Link
              href="/problems"
              className=""
            >
             <Button className="px-6 py-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-200"> Practice Problems</Button>
            </Link>
          </div>
        </div>
      </div>
	  <div>
	  </div>
		<Footer/>
    </div>
  );
}
