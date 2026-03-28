const SectionContent = ({ type }) => {
  switch (type) {
    case "home":
      return (
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-primary-soft mb-6">
            Building scalable digital systems with clarity and performance
          </h2>

          <p className="text-text-muted leading-relaxed mb-8">
            Senior Frontend Engineer with 6+ years of experience delivering
            high-performance applications, leading architecture decisions, and
            building production systems used across enterprise environments.
          </p>

          <div className="flex flex-wrap gap-3">
            {["React", "TypeScript", "System Design"].map((tag) => (
              <span className="px-3 py-1 bg-card border border-border rounded-full text-sm text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      );

    case "about":
      return (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-primary mb-6 tracking-tight">
            About
          </h2>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              I’m a Senior Software Engineer and Tech Lead focused on building
              scalable frontend systems and leading high-performing teams.
            </p>

            <p>
              My work combines performance optimization, clean architecture, and
              strong product thinking to deliver meaningful user experiences.
            </p>
          </div>
        </div>
      );

    case "experience":
      return (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-primary mb-8 tracking-tight">
            Experience
          </h2>

          <div className="relative border-l border-border pl-6 space-y-10">
            <div className="relative">
              <h3 className="text-lg font-semibold text-text">
                Senior Software Developer
              </h3>

              <p className="text-sm text-text-subtle mb-3">
                Innoraft Solutions • 2020 — Present
              </p>

              <ul className="space-y-2 text-text-muted">
                <li>Improved FCP from 3.8s → 1.6s</li>
                <li>Increased engagement by 25% and conversions by 17%</li>
                <li>Led team of 8+ engineers and architecture decisions</li>
                <li>Built real-time multi-screen systems using WebSockets</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-primary mb-8 tracking-tight">
            Selected Work
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "HCLTech Experience Center",
                desc: "Real-time multi-screen platform enabling synchronized digital experiences across large displays.",
              },
              {
                title: "O2E Booking Platforms",
                desc: "Scalable SPA booking systems built with React, TypeScript, and decoupled CMS architecture.",
              },
            ].map((project) => (
              <div className="glass p-6 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-text transition group-hover:text-primary">
                  {project.title}
                </h3>

                <p className="text-text-muted mt-2 leading-relaxed">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "skills":
      return (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-primary mb-8 tracking-tight">
            Skills
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              "React / Next.js",
              "TypeScript",
              "Redux",
              "Tailwind",
              "Node.js",
              "CI/CD",
              "WebSockets",
              "System Design",
            ].map((skill) => (
              <div className="glass inline-flex items-center rounded-full px-4 py-2 text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-primary mb-6 tracking-tight">
            Contact
          </h2>

          <p className="text-text-muted mb-6 leading-relaxed">
            Open to impactful frontend roles, collaborations, and building
            meaningful digital products.
          </p>

          <div className="space-y-3 text-text">
            <p className="hover:text-primary transition">
              📧 yashbharadwajsuper@gmail.com
            </p>
            <p className="text-text-subtle">📍 Jaipur, India</p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default SectionContent;
