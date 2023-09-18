import FantastyData from '@components/FantasyData'
import Header from '@components/Header'
import ThemeSwitch from '@components/ThemeSwitch'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mx-4 mt-5 flex">
        <FantastyData />
      </div>
    </div>
  )
}
