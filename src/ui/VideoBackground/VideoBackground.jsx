"use client";

import styles from "./VideoBackground.module.css";
import { useEffect, useState } from "react";

const VideoBackground = () => {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(() => {
      return window.innerWidth <= 768
        ? "/videos/background-mobile.mp4"
        : "/videos/background.mp4";
    });
  }, []);

  return (
    <div className={styles.videoContainer}>
      {videoSrc && (
        <video
          width="100%"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
