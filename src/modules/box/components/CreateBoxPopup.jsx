import { useEffect, useCallback, useRef } from "react";
import useLoading from "@/lib/hooks/useLoading";

import { createBox } from "@/modules/box/api";

import { PopupCloseIcon } from "@/components/icons";
import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";

import { createClosePopupTl } from "@/lib/util/animations";

export default function CreateBoxPopup({ popupName, onAddBox, onClose }) {
  const createBoxCloseTlRef = useRef(null);

  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const closeBoxPopup = async () => {
    if (!createBoxCloseTlRef?.current) return;

    if (!createBoxCloseTlRef.current.isActive()) {
      onClose();
      createBoxCloseTlRef.current.restart();
    }
  };

  const createNewBox = useCallback(async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const boxName = formData.get("boxName");

    if (!boxName) return;

    startLoading();

    createBox(boxName)
      .then((res) => {
        const newBox = res?.data;

        if (!newBox?.id) return;

        onAddBox({ item: newBox, id: newBox.id, type: "box" });

        e.target.reset();
        closeBoxPopup();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(stopLoading);
  }, []);

  useEffect(() => {
    createBoxCloseTlRef.current = createClosePopupTl(popupName);
  }, []);

  return (
    <div data-popup={popupName} className="popup_component">
      <div
        data-popup-overlay={popupName}
        className="popup_overlay"
        onClick={closeBoxPopup}
      ></div>
      <div data-popup-content={popupName} className="popup_content">
        <h2 className="popup_heading">New Box</h2>
        <form className="create-box_component" onSubmit={createNewBox}>
          {isLoading ? (
            <LoaderSmall />
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                maxLength="50"
                className="form_input"
                name="boxName"
              />
              <button type="submit" className="button">
                Create
              </button>
            </>
          )}
        </form>
        <button
          type="button"
          data-popup-close={popupName}
          className="popup_close"
          onClick={closeBoxPopup}
        >
          <PopupCloseIcon />
        </button>
      </div>
    </div>
  );
}
