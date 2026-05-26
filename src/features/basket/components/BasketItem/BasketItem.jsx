import { DeleteOutlined } from "@ant-design/icons"
import styles from "./BasketItem.module.css"

const BasketItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <img src={item.thumbnail} alt={item.title} className={styles.img} />
      </div>

      <div className={styles.info}>
        <p className={styles.category}>{item.category}</p>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>${item.price}</p>

        <div className={styles.controls}>
          <button className={styles.qtyBtn} onClick={() => onDecrease(item.id)}>−</button>
          <span className={styles.qty}>{item.quantity}</span>
          <button className={styles.qtyBtn} onClick={() => onIncrease(item)}>+</button>
          <span className={styles.sum}>
            Cəm: ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button className={styles.deleteBtn} onClick={() => onDelete(item)}>
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BasketItem