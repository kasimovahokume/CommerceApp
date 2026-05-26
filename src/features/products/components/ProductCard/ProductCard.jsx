import { useBasket }    from "@/app/context/BasketContext"
import { useFavorites } from "@/app/context/FavoritesContext"
import { useNavigate }  from "react-router-dom"
import { ROUTER }       from "@/constants/Router"
import { ShoppingCartOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons"
import styles from "./ProductCard.module.css"

const ProductCard = ({ product }) => {
  const { addToBasket }                = useBasket()
  const { toggleFavorite, isFavorite } = useFavorites()
  const navigate                       = useNavigate()
  const liked                          = isFavorite(product.id)

  return (
    <div className={styles.card}>

      {/* Ürək */}
      <button
        className={styles.heartBtn}
        onClick={() => toggleFavorite(product)}
      >
        {liked
          ? <HeartFilled   style={{ color: "#ef4444", fontSize: 16 }} />
          : <HeartOutlined style={{ color: "#9ca3af", fontSize: 16 }} />
        }
      </button>

      {/* Şəkil */}
      <div
        className={styles.imgBox}
        onClick={() => navigate(`${ROUTER.PRODUCTS}/${product.id}`)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.img}
        />
      </div>

      {/* Məlumat */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3
          className={styles.title}
          onClick={() => navigate(`${ROUTER.PRODUCTS}/${product.id}`)}
        >
          {product.title}
        </h3>
        <p className={styles.price}>${product.price} USD</p>

        <button
          className={styles.addBtn}
          onClick={() => addToBasket(product)}
        >
          <ShoppingCartOutlined /> Add
        </button>
      </div>

    </div>
  )
}

export default ProductCard