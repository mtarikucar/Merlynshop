import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

import CustomPagination from "./CustomPagination";
import { useQuery } from "react-query";
import Loading from "../Loading";

function getProduct(categoryId, minPrice, maxPrice, page, limit, sort) {
  let base = `${import.meta.env.VITE_BASE_URL}/product`;
  let queryParams = [];

  if (categoryId) {
    queryParams.push(`categoryId=${categoryId}`);
  }
  if (minPrice) {
    queryParams.push(`minPrice=${minPrice}`);
  }
  if (maxPrice) {
    queryParams.push(`maxPrice=${maxPrice}`);
  }
  if (page && limit) {
    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);
  }
  if (sort) {
    queryParams.push(`sort=${sort}`);
  }

  if (queryParams.length > 0) {
    base += `?${queryParams.join("&")}`;
  }

  return axios.get(base).then((res) => res.data);
}

function Products({
  categoryId,
  minPrice,
  maxPrice,
  maxProduct,
  sort,
  pagination = true,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(maxProduct ? maxProduct: 12);

  const {
    isLoading,
    isError,
    data: products,
    error,
  } = useQuery(
    [
      "products",
      {
        categoryId,
        minPrice,
        maxPrice,
        page: currentPage,
        limit: pageLimit,
        sort,
      },
    ],
    ({ queryKey }) =>
      getProduct(
        queryKey[1].categoryId,
        queryKey[1].minPrice,
        queryKey[1].maxPrice,
        queryKey[1].page,
        queryKey[1].limit,
        queryKey[1].sort
      )
  );

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when filters change
  }, [categoryId, minPrice, maxPrice]);

  if (isLoading) return <Loading />;
  if (isError) return "An error has occurred: " + error.message;

  return (
    <>
      {products &&
        products.map((product, key) => <Product product={product} key={key} />)}

      {pagination && (
        <CustomPagination
          isEmpty={products.length < 1}
          current={currentPage}
          limit={pageLimit}
          total={maxProduct}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default Products;
