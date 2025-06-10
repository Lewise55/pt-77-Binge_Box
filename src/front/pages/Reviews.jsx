import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faReply, faStar } from "@fortawesome/free-solid-svg-icons";
import { getMoviesPlayingNow } from "../hooks/actions.js";

export const Reviews = () => {
    const { store, dispatch } = useGlobalReducer();
    const {type, id} = useParams();
    const [liked, setLiked] = useState(false);
    const [itemType, setItemType] = useState('');
    const [itemId, setItemId] = useState('');
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState({
        itemId: itemId, 
        itemType: itemType, 
        text: "",
        rating: 0, 
    })    

    useEffect(() => {
        if (type === 'movie' || type === 'series') {
            setItemType(type);
            setItemId(id);
            setReview(prev => ({ ...prev, itemId: id, itemType: type }));
        }
    },[type, id])    

    useEffect(() => {
        if(itemType && itemId){
            const fetchReviews = async() => {
                 await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews/${itemType}/${itemId}`)
                    .then(res => res.json())
                    .then(data => setReviews(data));
            }
           fetchReviews();
        }        
    }, [itemType, itemId]);    
    
    const submitReview = async () => {
    const token = sessionStorage.getItem('access_token');    
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/reviews/${itemType}/${itemId}`, 
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({...review, itemType: itemType, itemId: itemId}),
        }
    );

    if (!response.ok) {
        const err = await response.json();
        console.error("Error submitting review:", err);
        return;
    }
    const data = await response.json();
    console.log("Review submitted:", data);
    setReviews(prev => [data, ...prev]);
    setReview({ ...review, text: "" });
    };
        
    const toggleLiked = () => {
        setLiked(!liked);
        if(liked){
            handleLiked();
        }  
    };

    const handleLiked = async () => {
        const token = sessionStorage.getItem('access_token');
        try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/favorites', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ favorites: review})
        });
        const data = await response.json();
        console.log(data.message);
        } catch (error) {
        console.error("Failed to update favs", error);
        }
    };  

    return (
        <div className="text-start mt-5">
            <div className="card text-bg-dark">
                <div className="card-header">
                    Reviews
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="rating mx-2 text-secondary">
                            {[...Array(10)].map((_, index) => {
                                const starValue = index +1;
                                return(
                                    <span
                                        key={starValue}
                                        onClick={() => setReview(prev => ({ ...prev, rating: starValue }))}
                                        style={{
                                            cursor: "pointer", 
                                            color: starValue <= review.rating ? "gold" : "", 
                                            fontSize: "2rem" }}
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                    </span>
                                )
                            })}                                
                        </div>
                    </h5>
                    <textarea
                        className="form-control"
                        placeholder="Leave a review..."
                        value={review.text}
                        onChange={e => setReview({ ...review, text: e.target.value, itemType, itemId })}
                    />
                    <div className=" d-flex p-1">
                        <div className="d-flex ">                               
                            <span>
                                <span style={{color: 'darkgray'}}><FontAwesomeIcon icon={faReply} /></span>
                            </span>                
                            <span
                                onClick={() => toggleLiked()}
                                style={{ color: liked ? 'red' : 'darkgray'}} 
                                className="icon mx-3">
                                    <FontAwesomeIcon icon={faHeart} />
                            </span>                             
                        </div>
                    </div>                    
                </div>
                <div className="card-footer text-body-light">
                    <div className="d-flex justify-content-around">
                        <button 
                            type="submit" 
                            className="btn btn-success"
                            onClick={() => submitReview()}>
                                Post
                        </button>
                        <button className="btn btn-danger">delete</button>
                    </div>
                    
                </div>
            </div>
            {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        <p>{review.text}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
}; 