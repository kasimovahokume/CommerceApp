import { createContext, useContext, useState, useEffect } from "react"

const BasketContext = createContext()

export const BasketProvider = ({ children }) => {

  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem("basket")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket))
  }, [basket])

  const addToBasket = (product) => {
    setBasket((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const decreaseQuantity = (id) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id))
  }

  const clearBasket = () => setBasket([])

  const totalPrice = basket.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        decreaseQuantity,
        removeFromBasket,
        clearBasket,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => useContext(BasketContext)