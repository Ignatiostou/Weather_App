import React from 'react'
import ThemeProvider from './components/ThemeProvider'
import NavBar from './components/NavBar'
import { WeatherProvider } from './components/WeatherProvider'
import { PageHeader } from './components/PageHeader'
import { CurrentWeatherCard } from './components/CurrentWeatherCard'
import { Map } from './components/Map'
import { HourlyWeatherTabs } from './components/HourlyWeatherTabs'

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        {<NavBar />}
        <main className='py-4'>
          <div className="container">
            <PageHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CurrentWeatherCard />
              <Map />
              </div>
              <HourlyWeatherTabs />
          </div>
        </main>
        <footer className='text-center py-4 text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Weather App. All rights reserved.
        </footer>
      </WeatherProvider>
    </ThemeProvider>
  )
}

export default App