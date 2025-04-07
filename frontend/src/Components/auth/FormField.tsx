import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  helpText?: string
}

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  helpText
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-muted/50 border-muted focus-visible:ring-primary"
        required={required}
      />
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
} 