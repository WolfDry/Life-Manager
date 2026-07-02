import React from 'react'

import '../../styles/cards/NextCard.css'

type Props = {
  type: string
  data: {
    title: string
    description: string
  }
}

const NextCard = ({ type, data }: Props) => {
  return (
    <>
      <div className="nextCard__title_container">
        <div className="nextCard__icon_container">
          <span>{type === "task" ? "task_alt" : type === "meal" ? "Repas" : type === "sport" ? "Sport" : "Aucun type"}</span>
        </div>
        <p>Prochaine {type === "task" ? "Tâche" : type === "meal" ? "Repas" : type === "sport" ? "Sport" : "Aucun type"}</p>
      </div>
      <p className="nextCard__description_title">{data.title}</p>
      <p className="nextCard__description">{data.description}</p>
    </>
  )
}

export default NextCard