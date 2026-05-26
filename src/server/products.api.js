const BASE_URL = "https://dummyjson.com"

export const fetchProducts = async () => {
  const res  = await fetch(`${BASE_URL}/products?limit=100`)
  const data = await res.json()
  return data.products
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  return res.json()
}

export const fetchByCategory = async (category) => {
  const res  = await fetch(`${BASE_URL}/products/category/${category}`)
  const data = await res.json()
  return data.products
}