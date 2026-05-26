import { useBasket }    from "@/app/context/BasketContext"
import { useFavorites } from "@/app/context/FavoritesContext"
import { ROUTER }       from "@/constants/Router"
import { useNavigate }  from "react-router-dom"
import { Badge, Drawer } from "antd"
import {
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import styles from "./Header.module.css"

const Header = () => {
  const { totalCount }     = useBasket()
  const { totalFavorites } = useFavorites()
  const navigate           = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Elan zolağı */}
      <div className={styles.announcement}>
        Unlock Special Bundle Pricing: Məhsul + Aksesuar.&nbsp;
        <span
          className={styles.announcementLink}
          onClick={() => navigate(ROUTER.PRODUCTS)}
        >
          İNDİ BAX
        </span>
        &nbsp;| Şərtlər tətbiq olunur
      </div>

      {/* Header */}
      <header className={styles.header}>

        {/* Sol: Hamburger + Search */}
        <div className={styles.left}>
          <MenuOutlined
            className={styles.icon}
            onClick={() => setDrawerOpen(true)}
          />
          <SearchOutlined
            className={styles.icon}
            onClick={() => navigate(ROUTER.PRODUCTS)}
          />
        </div>

        {/* Orta: Logo */}
        <div
          className={styles.logo}
          onClick={() => navigate(ROUTER.HOME)}
        >
          SHOPIFY
        </div>

        {/* Sağ: İkonlar */}
        <div className={styles.right}>
          <UserOutlined   className={styles.icon} />
          <GlobalOutlined className={styles.icon} />

          <Badge count={totalCount} color="#ef4444" size="small">
            <ShoppingCartOutlined
              className={styles.icon}
              onClick={() => navigate(ROUTER.BASKET)}
            />
          </Badge>

          <Badge count={totalFavorites} color="#ef4444" size="small">
            <HeartOutlined
              className={styles.icon}
              onClick={() => navigate(ROUTER.FAVORITES)}
            />
          </Badge>
        </div>

      </header>

      {/* Mobil menü (Drawer) */}
      <Drawer
        title="Menü"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        size="default"
      >
        <div className={styles.drawerMenu}>
          <span onClick={() => { navigate(ROUTER.HOME);     setDrawerOpen(false) }}>Home</span>
          <span onClick={() => { navigate(ROUTER.PRODUCTS); setDrawerOpen(false) }}>Products</span>
          <span onClick={() => { navigate(ROUTER.BASKET);   setDrawerOpen(false) }}>Basket</span>
          <span onClick={() => { navigate(ROUTER.FAVORITES);setDrawerOpen(false) }}>Favorites</span>
        </div>
      </Drawer>
    </>
  )
}

export default Header