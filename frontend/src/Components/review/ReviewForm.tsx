import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { useState } from "react"

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void
  onCancel: () => void
}

export interface ReviewFormData {
  title: string
  rating: number
  review: string
  recommended: boolean | null
  hoursPlayed: number | null
}

export default function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    title: "",
    rating: 0,
    review: "",
    recommended: null,
    hoursPlayed: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleRecommendClick = (recommended: boolean) => {
    setFormData(prev => ({ ...prev, recommended }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Review Title</Label>
        <Input
          id="title"
          placeholder="Summarize your experience in a few words"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Overall Rating</Label>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Button
              key={i}
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white"
              onClick={() => handleRatingClick(i + 1)}
            >
              <Star
                className="h-5 w-5"
                fill={formData.rating >= i + 1 ? '#FFDF00' : 'gray'}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Your Review</Label>
        <Textarea
          id="review"
          placeholder="Share your experience with the game. What did you like or dislike? Would you recommend it to others?"
          className="min-h-[200px]"
          value={formData.review}
          onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Would you recommend this game?</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={formData.recommended === true ? "default" : "outline"}
            onClick={() => handleRecommendClick(true)}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant={formData.recommended === false ? "default" : "outline"}
            onClick={() => handleRecommendClick(false)}
          >
            No
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursPlayed">How many hours have you played?</Label>
        <Input
          id="hoursPlayed"
          type="number"
          placeholder="e.g. 50"
          value={formData.hoursPlayed ?? ""}
          onChange={(e) => setFormData(prev => ({ ...prev, hoursPlayed: Number(e.target.value) }))}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Review
        </Button>
      </div>
    </form>
  )
} 