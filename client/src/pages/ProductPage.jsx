import { useState } from "react";

import Products from "../components/products/Products";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

function ProductPage() {
  const [categoryFilter, setCategoryFilter] = useState();
  const [sizeFilter, setSizeFilter] = useState();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sort, setSort] = useState("desc"); // Default sort order is ascending

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`);
    return res.data;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery("categories", fetchCategories);

  const handleCategory = (category) => {
    setCategoryFilter(category);
  };

  const handleToggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleResetFilter = () => {
    setMinPrice(null), setMaxPrice(null), setCategoryFilter();
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setCurrentPage(1); // Reset the current page when sort order changes
  };

  if (isLoading) return <Loading />;
  if (isError) return "An error has occurred: ";

  console.log(categories);
  return (
    <div className="bg-white shadow-xl border-2 lg:my-4 xl:my-6 rounded-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className={`lg:w-1/5 pr-4 `}>
            <summary
              className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden"
              onClick={handleToggleFilters}
            >
              <span className="text-sm font-medium">Toggle Filters</span>
              <svg
                className={`h-5 w-5 transform ${
                  isFilterVisible ? "rotate-0" : "rotate-180"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>

            <div
              className={`lg:flex flex-col border-t border-gray-200 lg:border-t-0 ${
                !isFilterVisible ? "flex" : "hidden"
              }`}
            >
              <div className="w-full">
                <div className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                  Fiyat
                </div>

                <div className="p-4 space-y-4">
                  
                  <div className="flex items-center">
                    <label htmlFor="minPrice" className="mr-2">
                      Min:
                    </label>
                    <input
                      type="text"
                      id="minPrice"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full mr-2 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="maxPrice" className="mr-2">
                      Max:
                    </label>
                    <input
                      type="text"
                      id="maxPrice"
                      placeholder="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full mr-2 rounded-md"
                    />
                  </div>
                  <div className="relative  w-full flex items-center">
                    <select
                      value={sort}
                      onChange={handleSortChange}
                      className="block w-full px-4 py-2 pr-8 rounded-md border-gray-300 bg-white text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="asc">düşükten yükseğe</option>
                      <option value="desc">yüksekten düşüğe</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="w-full">
                <div className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                  Kategori
                </div>
                <div className="space-y-2 px-5 py-6">
                  <input
                    id={"Hepsi"}
                    type="radio"
                    name="category"
                    value={""}
                    className="h-5 w-5 rounded checked:text-green-500  border-gray-300"
                    onChange={(e) => handleCategory(e.target.value)}
                  />
                  <label htmlFor={"Hepsi"} className="ml-3 text-sm font-medium">
                    Hepsi
                  </label>
                  {categories.map((category) => (
                    <div key={category.id} className="flex  items-center">
                      <input
                        id={category.id}
                        type="radio"
                        name="category"
                        value={category.id}
                        className="h-5 w-5 rounded checked:text-green-500  border-gray-300"
                        onChange={(e) => handleCategory(e.target.value)}
                      />
                      <label
                        htmlFor={category.id}
                        className="ml-3 text-sm font-medium"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      onClick={handleResetFilter}
                      type="button"
                      className="text-xs p-2 text-gray-500 hover:text-green-600"
                    >
                      Filtreyi temizle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-4/5">
            <div
              className={`grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3  `}
            >
              <Products
                categoryId={categoryFilter}
                size={sizeFilter}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sort={sort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
