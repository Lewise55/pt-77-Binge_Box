import React, { useEffect, useState } from "react";

export const Comments = ({ reviewId, itemType, itemId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const[refresh, setRefresh] = useState(false);
  const [startPoint, setStartPoint] = useState(0);

  useEffect(() => {
    const pullRequest = async() => {
    setRefresh(true);
    fetchComment();
  }
  pullRequest();
  },[refresh])
  
  const handleTouchStart = () => {}

  const handleTocuhEnd = () => {}

  useEffect(() => {
    const fetchComment = async() => {
       await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews/${itemType}/${itemId}/comments?review_id=${reviewId}`)
        .then(res => res.json())
        .then(data => setComments(data));
    }
    fetchComment();
    setRefresh(false);
  }, [reviewId, itemType, itemId]);

  const submitComment = async () => {
    const token = sessionStorage.getItem("access_token");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/reviews/${itemType}/${itemId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ review_id: reviewId, text }),
      }
    );
    if (response.ok) {
      const newComment = await response.json();
      setComments(prev => [...prev, newComment]);
      setText("");
    }
  };

  return (
    <div className="comments mt-2 mb-2">
      <div>
        {comments.map((c, idx) => (
          <div key={c.id || idx} style={{ fontSize: "0.9rem", marginLeft: 20 }}>
            <strong>{c.user || "Anonymous"}:</strong> {c.text}
          </div>
        ))}
      </div>
      <div className="input-group mt-1">
        <input
          className="form-control"
          placeholder="Write a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={submitComment} disabled={!text.trim()}>
          Reply
        </button>
      </div>
    </div>
  );
}