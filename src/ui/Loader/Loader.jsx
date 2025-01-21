import gsap from "gsap";
import LoaderText from "@/modules/files/components/icons/LoaderText";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    const loaderStartTl = gsap.timeline();

    loaderStartTl
      .to("#loader-icon", {
        "--loader--blur": 0,
        "--loader--mask-0": "0%",
        "--loader--mask-100": "100%",
        duration: 0.75,
        ease: "sine.in",
      })
      .to(
        "#loader-text [data-letter]",
        {
          opacity: 1,
          stagger: {
            each: 0.05,
            from: "random",
          },
        },
        "< 90%"
      )
      .to(
        "#loader-text",
        {
          opacity: 1,
          repeat: 5,
          duration: 0.1,
          ease: "none",
        },
        "<"
      )
      .to("#loader", {
        delay: 2,
        duration: 0.5,
        opacity: 0,
      })
      .set("#loader", {
        display: "none",
      });
  }, []);

  return (
    <div id="loader" className="loader_component">
      <div className="loader_image">
        <img
          src="/images/logo-square.svg"
          loading="lazy"
          id="loader-icon"
          alt="Resonator logotype"
          className="loader_image_icon"
        />
        <LoaderText />
      </div>
    </div>
  );
}
