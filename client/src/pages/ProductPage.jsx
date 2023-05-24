import { useState } from 'react'

import Products from '../components/products/Products'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../components/Loading'



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

  const handleCategory = (category) => {
 
      setCategoryFilter(category)
  
  }


  const handleToggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleResetFilter = () => {
    setMinPrice(null),
      setMaxPrice(null),
      setCategoryFilter(null)


  };


  if (isLoading) return <Loading />;
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                      max={1000}
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
                      max={1000}
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
                      <div key={category.id} className="flex c items-center">
                        <input
                        
                          id={category.id}
                          type="radio" 
                          name="category"
                          value={category.id}
                          className="h-5 w-5 rounded checked:text-green-500 border-gray-300"
                          onChange={(e) => handleCategory(e.target.value)}
                        />
                        <label htmlFor={category.id} className="ml-3 text-sm font-medium">{category.name}</label> 
                      </div>
                    ))
                  }

                  <div className="pt-2">
                    <button onClick={handleResetFilter} type="button" className="text-xs p-2 text-gray-500 hover:text-green-600">Reset Price</button>
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

