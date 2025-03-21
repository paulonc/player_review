interface GameInfoProps {
  description: string
  releaseDate: string
  category: string
  company: string
}

export default function GameInfo({ description, releaseDate, category, company }: GameInfoProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="h-5 w-1 bg-primary rounded-full"></span>
        About
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="grid grid-cols-2 gap-6 mb-6 p-6 rounded-lg border bg-muted/10">
        <div>
          <h3 className="font-medium text-primary">Release Date</h3>
          <p className="text-muted-foreground">{releaseDate}</p>
        </div>
        <div>
          <h3 className="font-medium text-primary">Category</h3>
          <p className="text-muted-foreground">{category}</p>
        </div>
        <div>
          <h3 className="font-medium text-primary">Publisher</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>
      </div>
    </div>
  )
} 