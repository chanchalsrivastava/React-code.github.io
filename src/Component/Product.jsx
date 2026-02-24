import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "./Home.css"
import { NavLink } from "react-router-dom";

export default function Product() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    // =========================
    // FETCH PRODUCTS
    // =========================
    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                const products = await response.json();

                setData(products);
                setFilter(products);
                setLoading(false);

            } catch (error) {
                console.log("Error fetching products:", error);
                setLoading(false);
            }
        };

        getProducts();
    }, []);


    // =========================
    // SCROLL ANIMATION EFFECT
    // =========================
    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.5 }
        );

        const title = document.querySelector(".section-title");

        if (title) {
            observer.observe(title);
        }

        return () => {
            if (title) observer.unobserve(title);
        };

    }, []);


    // =========================
    // LOADING UI
    // =========================
    const Loading = () => {
        return (
            <>
                <div className="col-md-3"><Skeleton height={350} /></div>
                <div className="col-md-3"><Skeleton height={350} /></div>
                <div className="col-md-3"><Skeleton height={350} /></div>
                <div className="col-md-3"><Skeleton height={350} /></div>
            </>
        )
    };


    // =========================
    // FILTER FUNCTION
    // =========================
    const filterProducts = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }


    // =========================
    // SHOW PRODUCTS
    // =========================
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("electronics")}>Electronic</button>
                </div>

                {filter.map((products) => {
                    return (
                        <div className="col-md-3 mb-4" key={products.id}>
                            <div className="card h-100 text-center p-4">
                                <img src={products.image} className="card-img-top" alt={products.title} height={"250px"} />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{products.title.substring(0, 12)}...</h5>
                                    <p className="card-text lead fw-bold">${products.price}</p>
                                    <NavLink to={`/product/${products.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }


    // =========================
    // RETURN UI
    // =========================
    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center section-title">
                            LATEST PRODUCTS
                        </h1>
                        <hr />
                    </div>
                </div>

                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}