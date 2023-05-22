import {  useState } from 'react'

import Products from '../components/Products'
import axios from 'axios'
import { useQuery } from 'react-query'
import LoadingPage from '../components/LoadingPage'



function ProductPage() {
  const [categoryFilter, setCategoryFilter] = useState()
  const [sizeFilter, setSizeFilter] = useState()
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const fetchCategories = async () => {
    const res = await axios.get("https://whale-app-952oz.ondigitalocean.app/api/category");
    return res.data;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery("categories", fetchCategories);

  const hundleCategory = (category) => {
    if (categoryFilter == null) {
      setCategoryFilter(category)
    } else {
      setCategoryFilter(null)
    }
  }


  const handleToggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleResetFilter = () => {
    setMinPrice(null),
    setMaxPrice(null),
    setCategoryFilter(null)


  };

  const productsData = [
    { id: 1, name: 'Product 1', category: 'Category 1' },
    { id: 2, name: 'Product 2', category: 'Category 2' },
    { id: 3, name: 'Product 3', category: 'Category 1' },
    // Add more product data as needed
  ];

  if (isLoading) return <LoadingPage/>;
  if (isError) return 'An error has occurred: '


  console.log(categories);
  return (
    <div className="bg-white shadow-xl border-2 lg:m-8 xl:m-8 rounded-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className={`lg:w-1/5 pr-4 `}>
            <summary
              className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden"
              onClick={handleToggleFilters}
            >
              <span className="text-sm font-medium">Toggle Filters</span>
              <svg
                className={`h-5 w-5 transform ${isFilterVisible ? 'rotate-0' : 'rotate-180'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>

            <div className={`lg:flex flex-col border-t border-gray-200 lg:border-t-0 ${!isFilterVisible ? 'flex' : 'hidden'}`}  >
              <div className="w-full">
                <div className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Type</div>


                <div className="p-4 space-y-4">
                  <div className="flex items-center">
                    <label htmlFor="minPrice" className="mr-2">
                      Min:
                    </label>
                    <input
                      type="range"
                      id="minPrice"
                      min={0}
                      max={100}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-60 mr-2"
                    />
                    <span>{minPrice}</span>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="maxPrice" className="mr-2">
                      Max:
                    </label>
                    <input
                      type="range"
                      id="maxPrice"
                      min={0}
                      max={100}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-60 mr-2"
                    />
                    <span>{maxPrice}</span>
                  </div>

                </div>



              </div>
              <div className="w-full">
                <div className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Category</div>
                <div className="space-y-2 px-5 py-6">
                  {
                    categories.map((category) => (
                      <div key={category.id} className="flex items-center">

                        <input
                          id={category.id}
                          type="checkbox"
                          name={category.name}
                          defaultValue={category.id}
                          onClick={(e) => hundleCategory(e.target.value)}
                          value={category.id}
                          className="h-5 w-5 rounded border-gray-300" />
                        <label for={category.id} className="ml-3 text-sm font-medium">{category.name}</label>
                      </div>
                    ))
                  }

                  <div className="pt-2">
                    <button onClick={handleResetFilter} type="button" className="text-xs p-2 text-gray-500 hover:text-green-600 ">Reset Price</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-4/5">
            <Products categoryId={categoryFilter} size={sizeFilter} minPrice={minPrice} maxPrice={maxPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

