import ArrowBack from "../ArrowBack"

interface ReviewHeaderProps {
  title: string
  subtitle: string
}

export default function ReviewHeader({ title, subtitle }: ReviewHeaderProps) {
  return (
    <>
    <ArrowBack />
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </>
  )
} 