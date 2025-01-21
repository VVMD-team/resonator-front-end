import { MAX_FILE_SIZE_MB } from "@/config/upload";

export default function ErrorSizePopup({ popupName, onClose }) {
  return (
    <div data-popup={popupName} className="popup_component">
      <div
        data-popup-overlay={popupName}
        className="popup_overlay"
        onClick={onClose}
      ></div>
      <div data-popup-content={popupName} className="popup_content">
        <div className="error_component">
          <div className="error_icon"></div>
          <div className="text-style-muted">
            Currently, a maximum file size is limited to {MAX_FILE_SIZE_MB} MB.
          </div>
          <div className="text-style-muted">Please try a smaller file.</div>
        </div>
      </div>
    </div>
  );
}
