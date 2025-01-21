import { PopupCloseIcon } from "@/components/icons";

import { useClosePopupTl } from "@/lib/hooks";

export default function BurnPopup({ title, onClickConfirm, id = "burn" }) {
  const closePopupTl = useClosePopupTl(id);

  const closeBurnFilePopup = async () => {
    if (!closePopupTl.isActive()) {
      closePopupTl.restart();
    }
  };

  return (
    <div data-popup={id} className="popup_component">
      <div
        data-popup-overlay={id}
        className="popup_overlay"
        onClick={closeBurnFilePopup}
      ></div>
      <div data-popup-content={id} className="popup_content">
        <h2 className="popup_heading text-wrap">
          <span>Burn </span>
          <span>{title}?</span>
        </h2>
        <div className="popup_burn_text">This action cannot be undone.</div>
        <div className="popup_burn">
          <button type="button" className="button" onClick={onClickConfirm}>
            Confirm
          </button>
        </div>
        <button
          type="button"
          className="popup_close"
          onClick={closeBurnFilePopup}
        >
          <PopupCloseIcon />
        </button>
      </div>
    </div>
  );
}
