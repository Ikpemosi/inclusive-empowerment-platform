
interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ id, className = "", children }: SectionProps) => {
  return (
    <section
      id={id}
      className={`py-20 px-4 scroll-mt-20 ${className}`}
    >
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
