import { useBasket }         from "@/app/context/BasketContext"
import { useNavigate }       from "react-router-dom"
import { ROUTER }            from "@/constants/Router"
import { ShoppingOutlined }  from "@ant-design/icons"
import { useState }          from "react"
import DeleteConfirmModal    from "@/shared/ui/DeleteConfirmModal"
import BasketItem            from "@/features/basket/components/BasketItem"
import BasketSummary         from "@/features/basket/components/BasketSummary"
import styles                from "./BasketPage.module.css"

const BasketPage = () => {
  const {
    basket,
    removeFromBasket,
    addToBasket,
    decreaseQuantity,
    clearBasket,
    totalPrice,
    totalCount,
  } = useBasket()

  const navigate = useNavigate()

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null,
    productName: "",
  })

  const handleDeleteClick = (item) => {
    setDeleteModal({
      open: true,
      productId: item.id,
      productName: item.title,
    })
  }

  const handleConfirmDelete = () => {
    removeFromBasket(deleteModal.productId)
    setDeleteModal({ open: false, productId: null, productName: "" })
  }

  const handleCancelDelete = () => {
    setDeleteModal({ open: false, productId: null, productName: "" })
  }

  if (basket.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingOutlined className={styles.emptyIcon} />
        <h2>Səbət boşdur</h2>
        <p>Məhsul əlavə etmək üçün mağazaya qayıt</p>
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

      {/* Üst bar */}
      <div className={styles.topBar}>
        <div className={styles.totalBox}>
          <span className={styles.totalLabel}>Səbət</span>
          <span className={styles.totalCount}>({totalCount} məhsul)</span>
        </div>
        <button className={styles.clearBtn} onClick={clearBasket}>
          Hamısını sil
        </button>
      </div>

      {/* Əsas məzmun */}
      <div className={styles.content}>

        {/* Məhsullar */}
        <div className={styles.list}>
          {basket.map((item) => (
            <BasketItem
              key={item.id}
              item={item}
              onIncrease={addToBasket}
              onDecrease={decreaseQuantity}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>

        {/* Sağ — Cəmi */}
        <div className={styles.summaryBox}>
          <BasketSummary
            totalPrice={totalPrice}
            totalCount={totalCount}
          />
        </div>

      </div>

      {/* Silmə modalı */}
      <DeleteConfirmModal
        open={deleteModal.open}
        productName={deleteModal.productName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    </div>
  )
}

export default BasketPage