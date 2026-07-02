import '../../styles/Card.css'

type Props = {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return (
    <div className='card__container'>
      {children}
    </div>
  )
}

export default Card