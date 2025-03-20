interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header>
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-200">{subtitle}</p>
        </div>
      </section>
    </header>
  );
}
