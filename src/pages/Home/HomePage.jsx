
import HomeCarousel from "@/features/home-blocks/components/HomeCarousel"
import styles from "./HomePage.module.css"
import CategoryList from "@/features/home-blocks/components/CategoryList"

const HomePage = () => {
  return (
    <div className={styles.page}>
      <HomeCarousel/>
      <CategoryList/>
    </div>
  )
}

export default HomePage