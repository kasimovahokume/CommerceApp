import { useApp }   from "@/app/context/AppContext"
import ProductCard  from "@/features/products/components/ProductCard"
import Loader       from "@/shared/ui/Loader/Loader"
import { Select }   from "antd"
import styles       from "./ProductsPage.module.css"

const ProductsPage = () => {
  const {
    products,
    loading,
    sortBy,           setSortBy,
    selectedCategory, setSelectedCategory,
  } = useApp()

  return (
    <div className={styles.page}>

      {/* Üst bar */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          {selectedCategory && (
            <button
              className={styles.clearBtn}
              onClick={() => setSelectedCategory("")}
            >
              × Hamısı
            </button>
          )}
          <span className={styles.count}>{products.length} products</span>
        </div>

        <div className={styles.topRight}>
          <span className={styles.sortLabel}>Sort By</span>
          <Select
            value={sortBy || undefined}
            placeholder="Default"
            allowClear
            style={{ width: 180 }}
            onChange={(val) => setSortBy(val ?? "")}
            options={[
              { value: "az",   label: "A — Z" },
              { value: "za",   label: "Z — A" },
              { value: "low",  label: "Price: Low to High" },
              { value: "high", label: "Price: High to Low" },
            ]}
          />
        </div>
      </div>

      {/* Məzmun */}
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.content}>

          {/* Məhsullar */}
          <div className={styles.list}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage