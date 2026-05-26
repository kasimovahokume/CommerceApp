import { App } from "antd"
import styles from "./BasketSummary.module.css"

const BasketSummary = ({ totalPrice, totalCount }) => {
  const { message } = App.useApp()   // ← belə çağır

  const handleCheckout = () => {
    message.success("Ödəniş uğurla tamamlandı! Sifarişiniz qəbul edildi.")
  }

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Məhsulların sayı:</span>
        <strong>{totalCount} ədəd</strong>
      </div>
      <div className={styles.row}>
        <span>Çatdırılma:</span>
        <strong className={styles.free}>Pulsuz</strong>
      </div>
      <div className={styles.divider} />
      <div className={styles.totalRow}>
        <span>Ümumi:</span>
        <strong className={styles.total}>${totalPrice.toFixed(2)}</strong>
      </div>
      <button className={styles.checkoutBtn} onClick={handleCheckout}>
        Ödənişə keç →
      </button>
    </div>
  )
}

export default BasketSummary