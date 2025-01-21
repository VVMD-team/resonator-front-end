import gsap from "gsap";

export const createOpenPopupTl = function (
  _popupName,
  _onCompleteTl,
  _delay = 0,
  _onCompleteFund = false
) {
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      if (_onCompleteTl instanceof gsap.core.Timeline) {
        _onCompleteTl.restart();
      }
      if (typeof _onCompleteFund === "function") {
        _onCompleteFund();
      }
    },
  });
  timeline
    .set(`[data-popup="${_popupName}"]`, {
      display: "flex",
      delay: _delay,
    })
    .to(`[data-popup-overlay="${_popupName}"]`, {
      opacity: 0.8,
    })
    .to(
      `[data-popup-content="${_popupName}"]`,
      {
        opacity: 1,
        y: "0rem",
      },
      "<50%"
    );
  return timeline;
};
export const createClosePopupTl = function (
  _popupName,
  _onCompleteTl,
  _delay = 0
) {
  const timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      if (_onCompleteTl instanceof gsap.core.Timeline) {
        _onCompleteTl.restart();
      }
    },
  });
  timeline
    .to(`[data-popup-content="${_popupName}"]`, {
      opacity: 0,
      y: "-2.25rem",
      delay: _delay,
    })
    .to(
      `[data-popup-overlay="${_popupName}"]`,
      {
        opacity: 0,
      },
      "<50%"
    )
    .set(`[data-popup="${_popupName}"]`, {
      display: "none",
    })
    .set(`[data-popup-content="${_popupName}"]`, {
      y: "2.25rem",
    });
  return timeline;
};
