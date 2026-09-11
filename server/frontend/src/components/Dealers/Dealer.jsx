import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import review_icon from "../assets/reviewbutton.png";

const Dealer = () => {
    const [dealer, setDealer] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const get_dealer = async () => {
        const res = await fetch(`/djangoapp/dealer/${id}`);
        const retobj = await res.json();
        if (retobj.status === 200) {
            setDealer(retobj.dealer || {});
        }
    };

    const get_reviews = async () => {
        const res = await fetch(`/djangoapp/reviews/dealer/${id}`);
        const retobj = await res.json();
        if (retobj.status === 200) {
            setReviews(retobj.reviews || []);
        }
    };

    useEffect(() => {
        get_dealer();
        get_reviews();
    }, [id]);

    return (
        <div style={{ margin: "0px" }}>
            <Header />
            <div style={{ margin: "20px" }}>
                <h1 style={{ color: "grey" }}>{dealer.full_name}</h1>
                <h4 style={{ color: "grey" }}>
                    {dealer['city']},{dealer['address']},{dealer['zip']},{dealer['state']}
                </h4>
                <Link to={`/postreview/${id}`}>
                    <img src={review_icon} style={{ width: "10%", float: "right" }} alt="Post Review" />
                </Link>
            </div>
            <div className="reviews_panel" style={{ margin: "20px" }}>
                {reviews.length === 0 ? (
                    <p>No reviews yet!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="card" style={{ width: "18rem", margin: "10px", display: "inline-block" }}>
                            <div className="card-body">
                                <h5 className="card-title">{review.name}</h5>
                                <p className="card-text">{review.review}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dealer;
