"use client";

import { useEffect, useRef } from "react";

import { defaultDuration } from "@/lib/constants";

import gsap from "gsap";

import SplitType from "split-type";

import LoginPopup from "@/modules/wallet/components/LoginPopup";

const loginPopupId = "login-popup";

export default function LoginPage() {
  const popupInTlRef = useRef(null);

  const handlePlay = () => {
    if (!popupInTlRef.current) return;
    popupInTlRef.current.play();
  };

  useEffect(() => {
    document.getElementById("connect-text").style.display = "block";
    gsap.defaults({
      duration: defaultDuration,
    });

    const elements = document.querySelectorAll("[data-split-text]");
    elements.forEach((el) => {
      const elTypes = el.getAttribute("data-types") || "lines, words, chars";
      const elTagName = el.getAttribute("data-tag") || "span";
      new SplitType(el, {
        types: elTypes,
        tagName: elTagName,
      });
    });

    gsap.to("#connect-dash", {
      opacity: 0,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    gsap.set("#connect-text .char", { display: "none" });
    gsap.set("#connect-text", { display: "block" });
    gsap.to("#connect-text .char", {
      delay: 0.25,
      display: "inline-block",
      stagger: {
        delay: 0.075,
        each: 0.075,
      },
    });

    popupInTlRef.current = gsap
      .timeline({ paused: true })
      .to("#connect-text .char", {
        display: "none",
        stagger: {
          delay: 0.075,
          each: 0.075,
          from: "end",
        },
      })
      .to("#connect-button", {
        opacity: 0,
      })
      .set(`#${loginPopupId}`, { zIndex: 2 })
      .to(`#${loginPopupId}`, {
        delay: 0.25,
        opacity: 1,
      });
  }, []);

  return (
    <div className="login_component">
      <div className="login_content">
        <div className="login_connect">
          <div className="login_connect_background"></div>
          <button
            type="button"
            id="connect-button"
            className="login_connect_button"
            onClick={handlePlay}
          >
            <div className="login_connect_button_inner">
              <div
                id="connect-text"
                data-split-text=""
                data-types="chars"
                style={{ display: "none" }}
              >
                Connect
              </div>
              <div id="connect-dash">_</div>
            </div>
          </button>
        </div>
        <LoginPopup id={loginPopupId} />

        <video
          loop={true}
          autoPlay={true}
          playsInline={true}
          muted={true}
          className="login_background"
        >
          <source
            src="https://s3.us-east-1.amazonaws.com/assets.vvmd.team/resonator/assets/login-background%40compressed.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
