import React, { useEffect, useState } from "react";

export const ReviewBackground = ({ itemType, itemId, children }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!itemId) return;

    const fetchItem = async () => {
        try {
        const endpoint =
            itemType === "movie" ?(
                `https://api.themoviedb.org/3/movie/${itemId}?append_to_response=videos,images}`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
            }) : (
                `https://api.themoviedb.org/3/tv/${itemId}?append_to_response=videos,images}`, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
            })
        
        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.ok) {
            setImageUrl(data.results);
        }
        console.log(`Fetched: ${data.results}`);
        } catch (error) {
        console.error("Error fetching item:", error);
        }
    };    
    fetchItem();
    }, [itemType, itemId]);

    console.log(itemId);
    

  return (
    <div
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1
      }}/>
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}