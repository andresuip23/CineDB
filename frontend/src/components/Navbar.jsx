import { useState, useEffect } from "react";

const NavBar = () => {
  const sections = ["Home", "About", "Services", "Contact"];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);

      } else {
        setIsScrolled(false);

      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full  p-4 flex justify-between fixed transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm bg-gray-600/75" : "bg-gray-600"
      }`}
    >
      <div>
        <p className="text-white px-4 py-2 rounded-md">CineDB</p>
      </div>
      <div>
        <ul className="flex justify-center">
          {sections.map((section, index) => (
            <li key={index}>
              <button className="text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none">
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none">
          Login
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
