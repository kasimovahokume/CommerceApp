import { createContext, useContext, useState, useEffect } from "react"
import { fetchProducts } from "@/server/products.api"
import useDebounce from "@/hooks/UseDebounce"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [products,         setProducts]         = useState([])
  const [loading,          setLoading]          = useState(false)
  const [search,           setSearch]           = useState("")
  const [sortBy,           setSortBy]           = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const debouncedSearch = useDebounce(search, 400)
  useEffect(() => {
    const loadData = async () => {        // ← adı dəyişdik: loadData
      setLoading(true)
      try {
        const data = await fetchProducts() // ← indi import-u çağırır
        setProducts(data)
      } catch (err) {
        console.error("Xəta:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()                            // ← loadData çağırırıq
  }, [])

  const filtered = products
    .filter((p) => selectedCategory ? p.category === selectedCategory : true)
    .filter((p) => debouncedSearch
      ? p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true
    )
    .sort((a, b) => {
      if (sortBy === "az")   return a.title.localeCompare(b.title)
      if (sortBy === "za")   return b.title.localeCompare(a.title)
      if (sortBy === "low")  return a.price - b.price
      if (sortBy === "high") return b.price - a.price
      return 0
    })

  return (
    <AppContext.Provider value={{
      products: filtered,
      loading,
      search,           setSearch,
      sortBy,           setSortBy,
      selectedCategory, setSelectedCategory,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)