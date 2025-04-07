interface GameCardProps {
  title: string
  image: string
  developer: string
  category: string
}

export default function GameCard({ title, image, developer, category }: GameCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 object-cover rounded"
      />
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{developer} • {category}</p>
      </div>
    </div>
  )
} 