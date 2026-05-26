import { Carousel } from "antd"
import { useApp }   from "@/app/context/AppContext"
import { useNavigate } from "react-router-dom"
import { ROUTER }   from "@/constants/Router"
import styles from "./HomeCarousel.module.css"

const HomeCarousel = () => {
  const { products } = useApp()
  const navigate     = useNavigate()

  // API-dan ilk 5 məhsulu carousel üçün götür
  const slides = products.slice(0, 5)

  if (!slides.length) return null

  return (
    <Carousel autoplay autoplaySpeed={4000} effect="fade" dots>
      {slides.map((product) => (
        <div key={product.id}>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${product.images?.[0] || product.thumbnail})` }}
          >
            <div className={styles.slideContent}>
              <span className={styles.slideTag}>{product.category}</span>
              <h1 className={styles.slideTitle}>{product.title}</h1>
              <p className={styles.slidePrice}>${product.price}</p>
              <button
                className={styles.slideBtn}
                tabIndex={-1}
                onClick={() => navigate(`${ROUTER.PRODUCTS}/${product.id}`)}
              >
                İndi Al →
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default HomeCarousel