import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState("");
    const [name, setName] = useState("");

    const post_review = async (e) => {
        e.preventDefault();
        console.log("Submitting review:", { name, review, dealership: id });
        
        try {
            const res = await fetch("/djangoapp/add_review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    dealership: parseInt(id),
                    name: name || "Anonymous",
                    review: review,
                    purchase: true,
                    sentiment: "positive"
                })
            });
            const json = await res.json();
            console.log("Response received:", json);
            if (json.status === 200) {
                navigate(`/dealer/${id}`);
            }
        } catch (err) {
            console.error("Error posting review:", err);
        }
    };

    return (
        <div>
            <Header />
            <div style={{ margin: "5%" }}>
                <h2>Write a Review for Holden Dealership</h2>
                <form onSubmit={post_review}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Review</label>
                        <textarea 
                            className="form-control" 
                            rows="4" 
                            value={review}
                            onChange={(e) => setReview(e.target.value)} 
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default PostReview;
