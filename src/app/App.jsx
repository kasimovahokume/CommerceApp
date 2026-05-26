import '../styles/reset.css'
import '../styles/global.css'
import { AppProvider }       from "@/app/context/AppContext"
import { BasketProvider }    from "@/app/context/BasketContext"
import { FavoritesProvider } from "@/app/context/FavoritesContext"
import AppRoutes             from "@/app/routes/AppRoutes"
import AntdProvider from './providers/AntdProvider'
function App() {

  return (
    <AntdProvider>
    <AppProvider>
      <BasketProvider>
        <FavoritesProvider>
          <AppRoutes />
        </FavoritesProvider>
      </BasketProvider>
    </AppProvider>
    </AntdProvider>
  )
}

export default App
