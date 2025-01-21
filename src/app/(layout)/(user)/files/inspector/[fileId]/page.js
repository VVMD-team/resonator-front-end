"use client";

import { getFileById, deleteFile } from "@/modules/files/api";

import { useRouter } from "next/navigation";

import { byteToMegabyte, timestampToDate, formatMimetype } from "@/lib/helpers";

import { useParams } from "next/navigation";

import { useEffect, useState, useRef } from "react";
import { useOpenPopupTl } from "@/lib/hooks";

import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";

import { PopupCloseIcon } from "@/components/icons";

import BurnPopup from "@/components/BurnPopup";
import ShortMobName from "@/components/ShortMobName";
import ShareTransferForm from "@/modules/files/components/ShareTransferForm/ShareTransferForm";

import DownloadFile from "@/modules/files/components/DownloadFile/DownloadFile";

import { escrowFileStatuses } from "@/modules/files/constants";
import BurnButton from "@/modules/files/components/BurnButton";
import Button from "@/ui/Button";

const burnPopupId = "burn";

export default function FileInspectorPage() {
  const params = useParams();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const openBurnPopupTl = useOpenPopupTl(burnPopupId);

  let stepOneShareFileOpenTlRef = useRef();
  let stepOneShareFileCloseTlRef = useRef();
  let stepTwoTransferFileOpenTlRef = useRef();
  let stepTwoTransferFileCloseTlRef = useRef();

  let stepOneTransferFileOpenTlRef = useRef();
  let stepOneTransferFileCloseTlRef = useRef();
  let stepTwoShareFileOpenTlRef = useRef();
  let stepTwoShareFileCloseTlRef = useRef();
  let successSharedOpenTlRef = useRef();
  let successSharedCloseTlRef = useRef();

  let errorPopupOpenTlRef = useRef();
  let errorPopupCloseTlRef = useRef();

  const openStepOneShareFilePopup = async () => {
    stepOneShareFileOpenTlRef.current.restart();
  };

  const closeStepOneShareFilePopup = async () => {
    if (!stepOneShareFileCloseTlRef.current.isActive()) {
      stepOneShareFileCloseTlRef.current.restart();
    }
  };

  const openStepTwoShareFilePopup = async () => {
    stepTwoShareFileOpenTlRef.current.restart();
  };

  const closeStepTwoShareFilePopup = async () => {
    if (!stepTwoShareFileCloseTlRef.current.isActive()) {
      stepTwoShareFileCloseTlRef.current.restart();
    }
  };

  const openStepOneTransferFilePopup = async () => {
    stepOneTransferFileOpenTlRef.current.restart();
  };

  const closeStepOneTransferFilePopup = async () => {
    if (!stepOneTransferFileCloseTlRef.current.isActive()) {
      stepOneTransferFileCloseTlRef.current.restart();
    }
  };

  const openStepTwoTransferFilePopup = async () => {
    stepTwoTransferFileOpenTlRef.current.restart();
  };

  const closeStepTwoTransferFilePopup = async () => {
    if (!stepTwoTransferFileCloseTlRef.current.isActive()) {
      stepTwoTransferFileCloseTlRef.current.restart();
    }
  };

  const openBurnFilePopup = async () => {
    openBurnPopupTl.restart();
  };

  const openSuccessSharedPopup = async () => {
    successSharedOpenTlRef.current.restart();
  };

  const closeSuccessSharedPopup = async () => {
    if (!successSharedCloseTlRef.current.isActive()) {
      successSharedCloseTlRef.current.restart();
    }
  };

  const onError = (error) => {
    setError(error);
  };

  const onCloseError = () => {
    setError(null);
  };

  const handleDeleteFile = async () => {
    deleteFile(file.id)
      .then((result) => {
        if (!result) {
          console.error("Error deleting file");
          return;
        }

        router.replace("/files/all");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFileById(params.fileId)
      .then((file) => {
        setFile(file);
      })
      .catch((error) => {
        console.log(error);
      });

    stepTwoTransferFileOpenTlRef.current = createOpenPopupTl("step-2-transfer");
    stepTwoTransferFileCloseTlRef.current =
      createClosePopupTl("step-2-transfer");
    stepOneTransferFileOpenTlRef.current = createOpenPopupTl("step-1-transfer");
    stepOneTransferFileCloseTlRef.current =
      createClosePopupTl("step-1-transfer");
    stepTwoShareFileOpenTlRef.current = createOpenPopupTl("step-2-share");
    stepTwoShareFileCloseTlRef.current = createClosePopupTl("step-2-share");
    successSharedOpenTlRef.current = createOpenPopupTl("success-shared");
    successSharedCloseTlRef.current = createClosePopupTl("success-shared");

    errorPopupOpenTlRef.current = createOpenPopupTl("error");
    errorPopupCloseTlRef.current = createClosePopupTl("error");

    stepOneShareFileOpenTlRef.current = createOpenPopupTl("step-1-share");
    stepOneShareFileCloseTlRef.current = createClosePopupTl("step-1-share");
  }, []);

  useEffect(() => {
    if (error) {
      errorPopupOpenTlRef.current.restart();
    } else {
      errorPopupCloseTlRef.current.restart();
    }
  }, [error]);

  return (
    <>
      <div className="inspector_component">
        <div className="inspector_content">
          <div data-field-content="file-icon" className="inspector_icon"></div>

          <h1 className="inspector_heading text-wrap">
            {file?.name ? (
              <ShortMobName
                formatShorterParams={{ start: 8 }}
                name={file.name}
              />
            ) : (
              "-"
            )}
          </h1>
          <div className="inspector_info">
            <div className="inspector_info_row">
              <span>Kind: </span>
              <span> </span>
              <span data-field-content="file-type">
                {file?.mimetype ? formatMimetype(file.mimetype) : "other"}
              </span>
            </div>
            <div className="inspector_info_row">
              <span>Size: </span>
              <span> </span>
              <span data-field-content="file-size">
                {file?.size ? byteToMegabyte(file.size) : "0"}
              </span>
              <span> Mb</span>
            </div>
            <div className="inspector_info_row">
              <span>Uploaded: </span>
              <span> </span>
              <span data-field-content="file-date">
                {file?.createdAt ? timestampToDate(file.createdAt) : "-"}
              </span>
            </div>
          </div>
        </div>
        <div id="action-buttons" className="inspector_buttons">
          {file && (
            <>
              {!file.escrowFileStatus && (
                <>
                  <Button
                    type="button"
                    className="inspector-button"
                    variant={["primary", "small"]}
                    onClick={openStepOneShareFilePopup}
                  >
                    Share
                  </Button>
                  <Button
                    type="button"
                    className="inspector-button"
                    variant={["primary", "small"]}
                    onClick={openStepOneTransferFilePopup}
                  >
                    Transfer
                  </Button>
                </>
              )}
              <BurnButton
                onClick={openBurnFilePopup}
                isDisabled={
                  file.escrowFileStatus === escrowFileStatuses.on_sell
                }
              />
            </>
          )}
          {file && <DownloadFile file={file} />}
        </div>
      </div>

      <div data-popup="step-1-share" className="popup_component">
        <div
          data-popup-overlay="step-1-share"
          className="popup_overlay"
          onClick={closeStepOneShareFilePopup}
        ></div>
        <div data-popup-content="step-1-share" className="popup_content">
          <h2 className="popup_heading">
            <span>Share </span>
          </h2>
          <div className="popup_share">
            <div
              data-field-content="file-icon"
              className="popup_share_icon"
            ></div>
            <div className="text-weight-medium text-wrap">
              {file?.name ? file.name : "-"}
            </div>
            <div className="popup_share_button">
              <button
                type="button"
                className="button"
                onClick={() => {
                  openStepTwoShareFilePopup();
                  closeStepOneShareFilePopup();
                }}
              >
                Share to...
              </button>
            </div>
          </div>
          <button
            type="button"
            className="popup_close"
            onClick={closeStepOneShareFilePopup}
          >
            <PopupCloseIcon />
          </button>
        </div>
      </div>
      <div data-popup="step-1-transfer" className="popup_component">
        <div
          data-popup-overlay="step-1-transfer"
          className="popup_overlay"
          onClick={closeStepOneTransferFilePopup}
        ></div>
        <div data-popup-content="step-1-transfer" className="popup_content">
          <h2 className="popup_heading">
            <span>Transfer </span>
          </h2>
          <div className="popup_share">
            <div
              data-field-content="file-icon"
              className="popup_share_icon"
            ></div>
            <div className="text-weight-medium text-wrap">
              {file?.name ? file.name : "-"}
            </div>
            <div className="popup_share_button">
              <button
                type="button"
                className="button"
                onClick={() => {
                  openStepTwoTransferFilePopup();
                  closeStepOneTransferFilePopup();
                }}
              >
                Transfer to...
              </button>
            </div>
          </div>
          <button
            type="button"
            className="popup_close"
            onClick={closeStepOneTransferFilePopup}
          >
            <PopupCloseIcon />
          </button>
        </div>
      </div>
      <div data-popup="step-2-share" className="popup_component">
        <div
          data-popup-overlay="step-2-share"
          className="popup_overlay"
          onClick={closeStepTwoShareFilePopup}
        ></div>
        <div data-popup-content="step-2-share" className="popup_content">
          <div className="popup_heading">
            <span>Share</span>
          </div>
          <div className="popup_share">
            <div
              data-field-content="file-icon"
              className="popup_share_icon"
            ></div>
            <div className="text-weight-medium text-wrap">
              {file?.name ? file.name : "-"}
            </div>
            <ShareTransferForm
              action={"share"}
              file={file}
              onActionComplete={() => {
                closeStepTwoShareFilePopup();
                openSuccessSharedPopup();
              }}
              onActionError={onError}
            />
          </div>
          <button
            type="button"
            className="popup_close"
            onClick={closeStepTwoShareFilePopup}
          >
            <PopupCloseIcon />
          </button>
        </div>
      </div>
      <div data-popup="step-2-transfer" className="popup_component">
        <div
          data-popup-overlay="step-2-transfer"
          className="popup_overlay"
          onClick={closeStepTwoTransferFilePopup}
        ></div>
        <div data-popup-content="step-2-transfer" className="popup_content">
          <div className="popup_heading">
            <span>Transfer</span>
          </div>
          <div className="popup_share">
            <div
              data-field-content="file-icon"
              className="popup_share_icon"
            ></div>
            <div className="text-weight-medium text-wrap">
              {file?.name ? file.name : "-"}
            </div>
            <ShareTransferForm
              action={"transfer"}
              file={file}
              onActionComplete={() => {
                closeStepTwoTransferFilePopup();
                router.replace("/files/all");
              }}
              onActionError={onError}
            />
          </div>
          <button
            type="button"
            className="popup_close"
            onClick={closeStepTwoTransferFilePopup}
          >
            <PopupCloseIcon />
          </button>
        </div>
      </div>

      <BurnPopup
        title={file?.name ? file.name : "-"}
        onClickConfirm={handleDeleteFile}
        id={burnPopupId}
      />

      <div data-popup="success-shared" className="popup_component">
        <div
          data-popup-overlay="success-shared"
          className="popup_overlay"
          onClick={closeSuccessSharedPopup}
        ></div>
        <div data-popup-content="success-shared" className="popup_content">
          <div className="success_component">
            <div className="success_icon"></div>
            <div className="text-style-muted text-wrap">
              {file?.name ? file.name : "-"}
            </div>
            <div className="text-style-muted">Successfully shared</div>
          </div>
        </div>
      </div>
      <div data-popup="error" className="popup_component">
        <div
          data-popup-overlay="error"
          className="popup_overlay"
          onClick={onCloseError}
        ></div>
        <div data-popup-content="error" className="popup_content">
          <div className="error_component">
            <div className="error_icon"></div>
            <div className="text-style-muted">Oops, something went wrong</div>
            <div className="text-style-muted">{error?.message}</div>
          </div>
        </div>
      </div>
    </>
  );
}
