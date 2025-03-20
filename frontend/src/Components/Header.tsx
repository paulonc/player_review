interface HeaderProps {
    title: string
    subtitle: string
  }
  
  export default function Header({
    title,
    subtitle,
  }: HeaderProps) {
    return (
      <header>
        <section className={`bg-gradient-to-r from-blue-600 to-gray-900 text-white py-10`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl">{subtitle}</p>
          </div>
        </section>
      </header>
    )
  }