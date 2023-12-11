import React, { PropsWithChildren } from 'react'
interface Props extends PropsWithChildren {
  onClick: () => void
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="snake-start-button" onClick={onClick}>
      {children}
    </button>
  )
}
