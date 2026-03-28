import SectionContent from "./SectionContent";

const RightSection = ({ sections, refs }) => {
  return (
    <div className="space-y-32">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          ref={refs[section.id]}
          className="scroll-mt-32 flex items-center"
        >
          {/* Content Wrapper */}
          <div className="w-full max-w-2xl">
            <SectionContent type={section.id} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default RightSection;