import React, { useEffect, useState } from "react";
import { getProduct, clearErrors } from "../../actions/productAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import ProductCard from "../Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, currentPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <div className="container">
            <div className="row">
              {products.length === 0 ? (
                <>
                  <h3 style={{ color: "black", textAlign: "center",margin:"30px 0px 30px 0px"}}>
                    Sorry no products found ....
                  </h3>
                </>
              ) : (
                <>
                  {products &&
                    products.map((product) => (
                      <div className=" col-lg-2 col-md-3 col-6">
                        <ProductCard key={product._id} product={product} />
                      </div>
                    ))}
                </>
              )}
            </div>

            {products.length === 0 ? (
              ""
            ) : (
              <>
                <div className="mainpagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
