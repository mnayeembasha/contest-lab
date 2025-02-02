import Link from "next/link";

const Footer = () => {
    return (
      <footer className="py-4 px-10 flex items-center justify-between w-full absolute bottom-0 z-50">

<div>
          <p className="text-gray-400 font-medium">
            <Link
              href="https://gfgsc-rguktn.vercel.app"
              target="_blank"
              className="hover:text-white transition-colors duration-200"
            >
              GFG Student Chapter - RGUKT Nuzvid
            </Link>
          </p>
        </div>

        {/* Right-aligned Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://chat.whatsapp.com/LbP4VJ7V0E1ERD0YwGJuv3"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-whatsapp text-xl"></i>
          </a>
          <a
            href="https://www.instagram.com/gfgsc_rguktn"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/geeksforgeeks-rgukt-nuzvid-854270325/"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin text-xl"></i>
          </a>
        </div>

      </footer>
    );
  };

  export default Footer;
