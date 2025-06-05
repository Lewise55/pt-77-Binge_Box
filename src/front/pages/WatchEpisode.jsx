import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom"; // Only if you need URL params

export const WatchEpisode = (props) => {
  // If you need episode info from the URL:
  // const { episodeId } = useParams();

  // If video source comes from props:
  const videoSrc = props.video; // or fetch via episodeId, etc.

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Example: add play/pause event, cleanup on unmount
    const handlePlay = () => { /* ... */ };
    video.addEventListener("play", handlePlay);
    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <div className="text-center mt-5">
      {/* ...controls and other elements... */}
      <video
        ref={videoRef}
        className="video-element"
        id="video-element"
        preload="auto"
        controls
      >
        <source src={videoSrc} />
      </video>
    </div>
  );
};