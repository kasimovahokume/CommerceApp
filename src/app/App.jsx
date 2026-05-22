import '../styles/reset.css'
import '../styles/global.css'
import AppRoutes from './routes/AppRoutes'
import { BasketProvider } from './context/BasketContext'
function App() {

  return (
    <>
    <BasketProvider>
      <AppRoutes />
    </BasketProvider>
    </>
  )
}

export default App
