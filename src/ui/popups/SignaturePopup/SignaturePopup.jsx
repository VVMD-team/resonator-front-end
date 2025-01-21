export default function SignaturePopup({ popupName }) {
  return (
    <div data-popup={popupName} className="popup_component">
      <div data-popup-overlay={popupName} className="popup_overlay"></div>
      <div data-popup-content={popupName} className="popup_content">
        <div className="error_component">
          <div className="text-style-muted text-wrap">
            Please, subscribe message with your wallet to encrypt file
          </div>
        </div>
      </div>
    </div>
  );
}
