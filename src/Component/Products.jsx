import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/action';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Products() {
    const { id } = useParams();
    const [Product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const addProduct = (product) =>
    {
        dispatch(addItem(product));
    }
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProducts();

    }, []);
    const Loading = () => {
        return (
            <>

  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Skeleton height={400} />
          </div>

          <div className="col-md-6">
            <Skeleton height={40} width={250} />
            <Skeleton height={20} width={150} className="my-3" />
            <Skeleton height={80} />
            <Skeleton height={30} width={120} className="my-3" />

            <div className="d-flex">
              <Skeleton height={40} width={120} />
              <Skeleton
                height={40}
                width={120}
                style={{ marginLeft: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
            </>
        )
    }
    const ShowProduct = () => {
        return (
            <>
                <div className='col-md-6'>
                    <img src={Product.image} alt={Product.title} height="400px" width={"400px"} />
                </div>
                <div className='col-md-6'>
                    <h4 className='text-uppercase text-black-50'>
                        {Product.category}
                    </h4>
                    <h1 className='display-5'>{Product.title}</h1>
                    <p className='lead fw-bolder'>Rating {Product.rating && Product.rating.rate}
                        <i className='fa fa-star'></i>
                    </p>
                    <h3 className='display-6 fw-bold my-4'>
                        $ {Product.price}
                    </h3>
                    <p className='lead'>{Product.description}</p>
                    <button className='btn btn-outline-dark px-4 py-2' onClick={()=>addProduct(Product)}>Add to Cart</button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">Go To Cart</NavLink>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className='container py-5'>
                <div className='row py-4'>
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
