import React from 'react'
import './styles/Row.css'
interface Props {
  title: string
  value: string | number
}
export const Row = (props: Props) => {
  return (
    <div className="snake-row">
      <span className="snake-row-title">{props.title}</span>
      <span className="snake-row-value">{props.value}</span>
    </div>
  )
}
