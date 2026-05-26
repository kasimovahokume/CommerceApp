import { useApp } from "@/app/context/AppContext"
import { Select } from "antd"
import styles from "./ProductFilters.module.css"

const categories = [
  "beauty", "fragrances", "furniture", "groceries",
  "smartphones", "laptops", "skin-care", "home-decoration"
]

const ProductFilters = () => {
  const { sortBy, setSortBy, selectedCategory, setSelectedCategory } = useApp()

  return (
    <div className={styles.filters}>
      <Select
        value={selectedCategory || undefined}
        placeholder="Kateqoriya"
        allowClear
        style={{ width: 180 }}
        onChange={(val) => setSelectedCategory(val ?? "")}
        options={categories.map((c) => ({
          value: c,
          label: c.replace(/-/g, " "),
        }))}
      />

      <Select
        value={sortBy || undefined}
        placeholder="Sort by"
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
  )
}

export default ProductFilters