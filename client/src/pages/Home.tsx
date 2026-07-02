import { CalendarPanel } from "../components/CalendarPanel"
import Card from "../components/cards/Card"
import NextCard from "../components/cards/NextCard"

import '../styles/pages/Home.css'

const Home = () => {

  const tasks = [
    {
      time: "08:00",
      tite: "Rédaction d'une tache",
      priority: "high",
    },
    {
      time: "08:00",
      tite: "Rédaction d'une tache",
      priority: "high",
    },
    {
      time: "08:00",
      tite: "Rédaction d'une tache",
      priority: "high",
    },
    {
      time: "08:00",
      tite: "Rédaction d'une tache",
      priority: "high",
    },
  ]

  return (
    <div className="home__container">
      <div className="home__header">
        <div className="home__header_text">
          <h1>Bonjour USER</h1>
          <span>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="home__header_progression">
          <div className="home__header_progression_text">
            <p>Progression du jour</p>
            <p>3/9 tâches</p>
          </div>
          <div className="home__header_progression_bar_container">
            <div className="home__header_progression_bar" style={{ width: "50%" }} />
          </div>
        </div>
      </div>
      <div className="home__next_grid">
        <Card>
          <NextCard type="task" data={{ title: "Rédaction d'une tache", description: "Travail . Haut . 1 h 30" }} />
        </Card>
        <Card>
          <NextCard type="task" data={{ title: "Déjeuner . Pâtes aux beurres, steak", description: "12h30 . 480kcal . 15 mins" }} />
        </Card>
        <Card>
          <NextCard type="task" data={{ title: "Séance haut du corps -- Push", description: "18h . Intermédiaire . 45 mins" }} />
        </Card>
      </div>
      <div className="home__recap_grid">
        <div className="home__recap_calendar">
          <div className="home__recap_calendar_header">
            <p>Aujourd'hui</p>
            <p>
              {new Date().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
          </div>
          <div className="home__recap_calendar_task_container">
            {tasks.map((task, index) => (
              <div key={index} className="home__recap_calendar_task">
                <p className="home__recap_calendar_task_time">{task.time}</p>
                <span className="home__recap_calendar_task_priority" style={{ background: "red" }} />
                <p className="home__recap_calendar_task_title">
                  {task.tite}
                </p>
                <span className="home__recap_calendar_task_chevron">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="home__recap_week">
          <p className="home__recap_week_title">Cette semaine</p>
          <div className="home__recap_tile_container">

          </div>
        </div>
      </div>
    </div >
  )
}

export default Home