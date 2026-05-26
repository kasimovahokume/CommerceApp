import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBasket }    from "@/app/context/BasketContext"
import { useFavorites } from "@/app/context/FavoritesContext"
import { fetchProductById } from "@/server/products.api"
import { ROUTER } from "@/constants/Router"
import { Rate } from "antd"
import {
  ShoppingCartOutlined,
  HeartFilled,
  HeartOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons"
import Loader from "@/shared/ui/Loader/Loader"
import styles from "./ProductDetailPage.module.css"

const ProductDetailPage = () => {
  const { id }                         = useParams()
  const navigate                       = useNavigate()
  const { addToBasket }                = useBasket()
  const { toggleFavorite, isFavorite } = useFavorites()

  const [product,      setProduct]      = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [activeImg,    setActiveImg]    = useState(0)
  const [added,        setAdded]        = useState(false)

  const liked = product ? isFavorite(product.id) : false

  useEffect(() => {
    setLoading(true)
    fetchProductById(id)
      .then((data) => {
        setProduct(data)
        setActiveImg(0)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToBasket = () => {
    addToBasket(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <Loader />

  if (!product) return (
    <div className={styles.notFound}>
      <h2>Məhsul tapılmadı</h2>
      <button onClick={() => navigate(ROUTER.PRODUCTS)}>
        Geri qayıt
      </button>
    </div>
  )

  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <div className={styles.page}>

      {/* Geri düyməsi */}
      <button
        className={styles.backBtn}
        onClick={() => navigate(ROUTER.PRODUCTS)}
      >
        <ArrowLeftOutlined /> Məhsullara qayıt
      </button>

      <div className={styles.container}>

        {/* Sol — Şəkillər */}
        <div className={styles.gallery}>

          {/* Böyük şəkil */}
          <div className={styles.mainImgBox}>
            <img
              src={images[activeImg]}
              alt={product.title}
              className={styles.mainImg}
            />
          </div>

          {/* Kiçik şəkillər */}
          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ — Məlumat */}
        <div className={styles.details}>

          {/* Kateqoriya */}
          <span className={styles.category}>{product.category}</span>

          {/* Başlıq */}
          <h1 className={styles.title}>{product.title}</h1>

          {/* Reytinq */}
          <div className={styles.ratingRow}>
            <Rate
              disabled
              allowHalf
              defaultValue={product.rating}
              style={{ fontSize: 14, color: "#f59e0b" }}
            />
            <span className={styles.ratingNum}>{product.rating} / 5</span>
          </div>

          {/* Qiymət */}
          <div className={styles.priceBox}>
            <span className={styles.price}>${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className={styles.discount}>
                -{product.discountPercentage?.toFixed(0)}%
              </span>
            )}
          </div>

          {/* Stok */}
          <div className={styles.stockRow}>
            <CheckCircleFilled style={{ color: "#10b981", fontSize: 14 }} />
            <span className={styles.stock}>
              {product.stock > 0 ? `${product.stock} ədəd stokda` : "Stokda yoxdur"}
            </span>
          </div>

          {/* Açıqlama */}
          <p className={styles.desc}>{product.description}</p>

          {/* Brend */}
          {product.brand && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Brend:</span>
              <span className={styles.infoValue}>{product.brand}</span>
            </div>
          )}

          {/* Zəmanət */}
          {product.warrantyInformation && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Zəmanət:</span>
              <span className={styles.infoValue}>{product.warrantyInformation}</span>
            </div>
          )}

          {/* Çatdırılma */}
          {product.shippingInformation && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Çatdırılma:</span>
              <span className={styles.infoValue}>{product.shippingInformation}</span>
            </div>
          )}

          {/* Düymələr */}
          <div className={styles.btnRow}>
            <button
              className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
              onClick={handleAddToBasket}
              disabled={product.stock === 0}
            >
              {added
                ? <><CheckCircleFilled /> Əlavə edildi!</>
                : <><ShoppingCartOutlined /> Səbətə əlavə et</>
              }
            </button>

            <button
              className={styles.heartBtn}
              onClick={() => toggleFavorite(product)}
            >
              {liked
                ? <HeartFilled   style={{ color: "#ef4444", fontSize: 20 }} />
                : <HeartOutlined style={{ color: "#6b7280", fontSize: 20 }} />
              }
            </button>
          </div>

          {/* Səbətə get */}
          {added && (
            <button
              className={styles.goBasketBtn}
              onClick={() => navigate(ROUTER.BASKET)}
            >
              Səbətə bax →
            </button>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage