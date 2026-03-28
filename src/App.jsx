import { useRef, useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import RightSection from "./components/RightSection";
import "./index.css";

const sections = [
  { id: "home", label: "Overview" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [active, setActive] = useState("home");

  const refs = {};
  sections.forEach((s) => {
    refs[s.id] = useRef(null);
  });

  const scrollToSection = (id) => {
    setActive(id);
    refs[id].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => {
      if (refs[s.id].current) {
        observer.observe(refs[s.id].current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Navigation */}
          <aside className="
            w-full 
            lg:w-1/3 
            lg:sticky lg:top-20 
            h-fit
          ">
            <Navigation
              sections={sections}
              onClick={scrollToSection}
              active={active}
            />
          </aside>

          {/* Content */}
          <main className="w-full lg:w-2/3">
            <RightSection sections={sections} refs={refs} />
          </main>

        </div>
      </div>
    </div>
  );
}

export default App;