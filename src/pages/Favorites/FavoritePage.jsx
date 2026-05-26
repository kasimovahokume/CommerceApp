import { useFavorites } from "@/app/context/FavoritesContext"
import { useBasket }    from "@/app/context/BasketContext"
import { useNavigate }  from "react-router-dom"
import { ROUTER }       from "@/constants/Router"
import { HeartFilled, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import styles from "./FavoritePage.module.css"
import DeleteConfirmModal from "@/shared/ui/DeleteConfirmModal" 
import { useState } from "react" 

const FavoritesPage = () => {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites()
  const { addToBasket }                               = useBasket()
  const navigate                                      = useNavigate()


  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null,
  })


  const handleDeleteClick = (item) => {
    setDeleteModal({
      open: true,
      product: item,
    })
  }


  const handleConfirmDelete = () => {
    toggleFavorite(deleteModal.product)
    setDeleteModal({ open: false, product: null }) 
  }

 
  const handleCancelDelete = () => {
    setDeleteModal({ open: false, product: null }) 
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <HeartFilled className={styles.emptyIcon} />
        <h2>Sevimlilər boşdur</h2>
        <p>Bəyəndiyiniz məhsulları buraya əlavə edin</p>
        <button
          className={styles.goShopBtn}
          onClick={() => navigate(ROUTER.PRODUCTS)}
        >
          Məhsullara bax
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>


      <div className={styles.topBar}>
        <div className={styles.titleBox}>
          <HeartFilled style={{ color: "#ef4444", fontSize: 24 }} />
          <h2 className={styles.pageTitle}>Sevimlilər</h2>
          <span className={styles.count}>{favorites.length} məhsul</span>
        </div>
        <button
          className={styles.clearBtn}
          onClick={clearFavorites}
        >
          <DeleteOutlined /> Hamısını sil
        </button>
      </div>

   
      <DeleteConfirmModal
        open={deleteModal.open}
        productName={deleteModal.product?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    
      <div className={styles.list}>
        {favorites.map((item) => (
          <div key={item.id} className={styles.card}>


            <div
              className={styles.imgBox}
              onClick={() => navigate(`${ROUTER.PRODUCTS}/${item.id}`)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className={styles.img}
              />
            </div>

         
            <div className={styles.info}>
              <p className={styles.category}>{item.category}</p>
              <h3
                className={styles.title}
                onClick={() => navigate(`${ROUTER.PRODUCTS}/${item.id}`)}
              >
                {item.title}
              </h3>
              <p className={styles.price}>${item.price} USD</p>

          
              <div className={styles.btnRow}>
                <button
                  className={styles.addBtn}
                  onClick={() => addToBasket(item)}
                >
                  <ShoppingCartOutlined /> Səbətə əlavə et
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleDeleteClick(item)} 
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default FavoritesPage