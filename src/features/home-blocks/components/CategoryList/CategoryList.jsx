import { useApp }      from "@/app/context/AppContext"
import { useNavigate } from "react-router-dom"
import { ROUTER }      from "@/constants/Router"
import styles from "./CategoryList.module.css"

// Hər kateqoriyanın rəngi
const categoryColors = {
  beauty:           { bg: "#fbbf24", text: "#000" },
  fragrances:       { bg: "#3b82f6", text: "#fff" },
  furniture:        { bg: "#10b981", text: "#fff" },
  groceries:        { bg: "#ef4444", text: "#fff" },
  smartphones:      { bg: "#8b5cf6", text: "#fff" },
  laptops:          { bg: "#f97316", text: "#fff" },
  "skin-care":      { bg: "#ec4899", text: "#fff" },
  "home-decoration":{ bg: "#14b8a6", text: "#fff" },
}

const CategoryList = () => {
  const { products }           = useApp()
  const navigate               = useNavigate()
  const { setSelectedCategory } = useApp()

  // Hər kateqoriyadan 1 məhsul götür
  const categoryMap = {}
  products.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = p
    }
  })

  const categories = Object.entries(categoryMap).slice(0, 6)

  const goToCategory = (key) => {
    setSelectedCategory(key)
    navigate(ROUTER.PRODUCTS)
  }

  return (
    <>
      {/* Pills */}
      <div className={styles.pillsWrapper}>
        <div className={styles.pills}>
          {categories.map(([key]) => (
            <button
              key={key}
              className={styles.pill}
              onClick={() => goToCategory(key)}
            >
              {key.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Kart grid */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Collection</h2>

        {/* Böyük 2 kart */}
        <div className={styles.featuredGrid}>
          {categories.slice(0, 2).map(([key, product], i) => {
            const colors = categoryColors[key] || { bg: "#111", text: "#fff" }
            return (
              <div
                key={key}
                className={`${styles.card} ${i === 0 ? styles.cardLarge : styles.cardSmall}`}
                onClick={() => goToCategory(key)}
              >
                <img
                  src={product.thumbnail}
                  alt={key}
                  className={styles.cardImg}
                />
                <div className={styles.cardBanner} style={{ background: colors.bg }}>
                  <span className={styles.cardNum} style={{ color: colors.text }}>
                    0{i + 1}
                  </span>
                  <span className={styles.cardLabel} style={{ color: colors.text }}>
                    {key.replace(/-/g, " ")}
                  </span>
                  <button
                    className={styles.shopBtn}
                    style={{ color: colors.text, border: `2px solid ${colors.text}` }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Kiçik 4 kart */}
        <div className={styles.smallGrid}>
          {categories.slice(2).map(([key, product], i) => {
            const colors = categoryColors[key] || { bg: "#111", text: "#fff" }
            return (
              <div
                key={key}
                className={styles.card}
                onClick={() => goToCategory(key)}
              >
                <img
                  src={product.thumbnail}
                  alt={key}
                  className={styles.cardImg}
                />
                <div className={styles.cardBanner} style={{ background: colors.bg }}>
                  <span className={styles.cardNum} style={{ color: colors.text }}>
                    0{i + 3}
                  </span>
                  <span className={styles.cardLabel} style={{ color: colors.text }}>
                    {key.replace(/-/g, " ")}
                  </span>
                  <button
                    className={styles.shopBtn}
                    style={{ color: colors.text, border: `2px solid ${colors.text}` }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CategoryList