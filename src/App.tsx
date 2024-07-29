import { BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import { AppRouter } from './router/Router'
import Spinner from './components/statics/Spinner/Spinner'
import Navbar from './components/shared/Navbar/Navbar'
import Footer from './components/shared/Footer/Footer'
import { ThemeProvider } from './components/context/ThemeContext'

const App = () => {

  return (
    <>
      
      <Router>

        <ThemeProvider>

          <Navbar/>  

            <Suspense fallback={<Spinner/>}>

              <AppRouter />

            </Suspense>

          <Footer/>

        </ThemeProvider>


      </Router>
    </>
  )
}

export default App
