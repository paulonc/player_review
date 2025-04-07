interface SectionTitleProps {
    title: string;
    colorClass: string;
}

const SectionTitle = ({ title, colorClass }: SectionTitleProps) => (
    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
      <span className={`h-6 w-1.5 ${colorClass} rounded-full`}></span>
      {title}
    </h2>
  );
  
  export default SectionTitle;
  