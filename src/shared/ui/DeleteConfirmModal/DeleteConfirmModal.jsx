import { Modal } from "antd"
import { DeleteOutlined, WarningFilled } from "@ant-design/icons"
import styles from "./DeleteConfirmModal.module.css"

const DeleteConfirmModal = ({ open, onConfirm, onCancel, productName }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closable={false}
    >
      <div className={styles.content}>

        {/* İkon */}
        <div className={styles.iconBox}>
          <WarningFilled className={styles.icon} />
        </div>

        {/* Mətn */}
        <h3 className={styles.title}>Silmək istədiyinizdən əminsiniz?</h3>
        <p className={styles.desc}>
          <strong>{productName}</strong> məhsulu silinəcək.
          Bu əməliyyat geri alına bilməz.
        </p>

        {/* Düymələr */}
        <div className={styles.btnRow}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Ləğv et
          </button>
          <button
            className={styles.deleteBtn}
            onClick={onConfirm}
          >
            <DeleteOutlined /> Sil
          </button>
        </div>

      </div>
    </Modal>
  )
}

export default DeleteConfirmModal