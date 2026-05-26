import { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites")
      if (!saved || saved === "undefined") return []
      return JSON.parse(saved)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isFavorite = (id) => favorites.some((item) => item.id === id)

  const clearFavorites = () => setFavorites([])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      totalFavorites: favorites.length,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)