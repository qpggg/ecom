import './SectionLabel.css'

type SectionLabelProps = {
  index: string
  children: React.ReactNode
}

export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <p className="section-label">
      <span className="section-label__index">{index}</span>
      {children}
    </p>
  )
}
