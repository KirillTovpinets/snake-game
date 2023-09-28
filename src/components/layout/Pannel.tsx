import { PropsWithChildren } from 'react'
import './styles/Pannel.css'
interface Props extends PropsWithChildren {}

export const Pannel = (props: Props) => {
  return <div className="snake-pannel">{props.children}</div>
}
