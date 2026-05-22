import { ROUTER } from "@/constants/Router"
import BasketPage from "@/pages/Basket/BasketPage"
import FavoritePage from "@/pages/Favorites/FavoritePage"
import HomePage from "@/pages/Home/HomePage"
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage"
import ProductsPage from "@/pages/Products/ProductsPage"
import { Route, Routes } from "react-router-dom"


const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path={ROUTER.HOME} element={<HomePage/>}/>
            <Route path={ROUTER.PRODUCTS} element={<ProductsPage/>}/>
            <Route path={ROUTER.PRODUCT_DETAIL} element={<ProductDetailPage/>}/>
            <Route path={ROUTER.BASKET} element={<BasketPage/>}/>
            <Route path={ROUTER.FAVORITES} element={<FavoritePage/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes