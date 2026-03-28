import React from "react";

const Navigation = ({ sections, onClick, active }) => {
  return (
    <section>
      {/* Header */}
      <h1 className="text-6xl font-bold mb-3">Yash Bharadwaj</h1>
      <h2 className="text-lg font-semibold mt-1">Senior Software Engineer</h2>
      <p className="text-gray-500 mt-2 max-w-xs">
        I build scalable digital systems with clarity and performance. Leading
        scalable systems and complex digital platform builds
      </p>

      {/* Navigation */}
      <nav className="mt-10 relative">
        <ul className="space-y-5">
          {sections.map((item) => {
            const isActive = active === item.id;

            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => onClick(item.id)}
                  className="group flex items-center gap-3 w-full text-left"
                >
                  {/* Animated line indicator */}
                  <span
                    className={`inline-block h-0.5 transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-[#fff]"
                        : "w-0 bg-gray-500 group-hover:w-6"
                    }`}
                  />

                  {/* Text */}
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default Navigation;
