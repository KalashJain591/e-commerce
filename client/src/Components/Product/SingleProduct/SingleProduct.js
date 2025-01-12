import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { useProductContext } from '../../../Context/ProductContext';
import Star from "./Star"
import axios from "axios"
import "./SinglePage.css"
import { useCartContext } from "../../../Context/cart_context";
import CartAmountToggler from '../../Cart/CartAmountToggler';
import AuthContext from '../../../Context/auth_context';
const API = "/product";
const SingleProduct = () => {
    const { userId, loggedIn } = useContext(AuthContext);
    const { addToCart } = useCartContext();
    const { getSingleProduct, singleProduct, isLoading } = useProductContext();
    if (isLoading) {
        <div className='Loading-page'>Loading...</div>
    }
    const { id } = useParams();
    const {
        id: alice,
        name,
        category,
        description,
        images,
        price,
        rating,
        stock,
        reviews,
        quantity,
        unit
    } = singleProduct
    const [img, setImg] = useState(images && images[0].imgUrl)
    // console.log("hello", name)
    useEffect(() => {
        // product();
        getSingleProduct(`${API}/${id}`);
    }, [])

    useEffect(() => {
        var cnt = 0;
        {
            images && images.map((item) => {
                if (cnt === 0) {
                    setImg(item.imgUrl);
                }
                cnt++;
            })
        }

    }, [singleProduct])


    return (
        <section className='single-product-page'>
            <div className="single-product-info">
                <div className="single-product-image-section">
                    <div className="parent-image">
                        <img src={img} alt={name} />
                    </div>
                    <div className="child-sec2-img">
                        <div className="child-images">
                            {images && images.map((item) => {
                                return (
                                    <div className="child-single-img" key={item.id}>
                                        <img src={item.imgUrl} alt="Loading..." onClick={() => setImg(item.imgUrl)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="single-product-Content">
                    <p className="singlePage-product-heading">{name}</p>
                    <div className="customer-info">
                        <Star rating={rating} reviews={reviews} />
                        {/* <p>{rating}</p>
                        <p>{reviews} customer reviews</p> */}
                    </div>
                    <div className="product-info">
                        <div className="product-price">MRP : ₹{price}</div>
                        <div className="product-Weight">{quantity} {unit}</div>
                    </div>
                    <div className="product-description">
                        <p>{description}</p>
                    </div>
                    <div className="product-data-warranty">
                        <div className="warranty-img">
                            <div className="feature-img-contain">
                                <img src="/images/pure.png" alt="" srcset="" className="warranty-icon" />
                                <p>100% pure products</p>
                            </div>
                        </div>
                        <div className="warranty-img">
                            <div className="feature-img-contain">
                                <img src="/images/NoAdulteration.png" alt="" className="warranty-icon" />
                                <p>No adulteration</p>
                            </div>
                        </div>
                        <div className="warranty-img">
                            <div className="feature-img-contain">
                                <img src="/images/preservativesMain.png" alt="" className="warranty-icon" />
                                <p>No preservatives</p>
                            </div>
                        </div>
                        <div className="warranty-img">
                            <div className="feature-img-contain">
                                <img src="/images/no-pesticides.png" alt="" className="warranty-icon" />
                                <p>Chemical free</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-details">
                        <p>Available : <span>{stock ? "Yes" : "Out of stock"}</span></p>
                        <p>Weight : <span>{quantity} {unit}</span></p>
                    </div>
                    <hr />
                    <div className="order-btns">
                        {/* Note:-here quantity is Weight */}
                        <NavLink to="/cart" onClick={() => addToCart(id, price, images, name,userId,quantity,unit)}>
                            <div className="single-addTocart">
                                <button class="add-single-cart">Add To Cart</button>
                            </div>
                        </NavLink>
                        {loggedIn ?
                            <NavLink to="/cart/checkout">
                                <div className="single-buyNow">
                                    <button onClick={() => { localStorage.setItem("Buynow", "u:" + id); }} class="buy-now">Buy Now</button>
                                </div>
                            </NavLink>
                            :
                            price >= 500 ?(
                            <NavLink to="/login">
                                <div className="single-buyNow">
                                    <button onClick={() => { localStorage.setItem("Buynow", "u:" + id); }} class="buy-now">Buy Now</button>
                                </div>
                            </NavLink>
                            ):(<></>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct
