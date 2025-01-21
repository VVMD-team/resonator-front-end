import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";

import UploadFileButton from "@/ui/UploadFileButton";

import gsap from "gsap";
import $ from "jquery";

import { useUser } from "@/modules/user/context/UserContext";

import { useSignMessage } from "wagmi";

import { uploadFiles } from "@/modules/files/api";

import { Timer, converBytesToMB } from "@/lib/helpers";

import { encryptFile, generateCryptionSignature } from "@/lib/util/cryption";

import { memo, useEffect, useRef, useState } from "react";

import { ErrorSizePopup, SignaturePopup } from "@/ui/popups";

import { MAX_FILE_SIZE_MB } from "@/config/upload";

const errorSizePopupName = "error-size";

const formatFileName = (name) => {
  let finalFileName;

  if (name.length > 32) {
    finalFileName = name.slice(0, 9) + " ... " + name.slice(-9);
  }

  return finalFileName;
};

const signaturePopupName = "signature-popup";

export default memo(function UploadFile({ onUpload, boxId = "" }) {
  const { user } = useUser();
  const [error, setError] = useState(null);

  const errorSizeOpenTlRef = useRef();
  const errorSizeCloseTlRef = useRef();

  const signaturePopupOpenTlRef = useRef();
  const signaturePopupCloseTlRef = useRef();

  const { signMessageAsync } = useSignMessage();

  const onError = (error) => {
    setError(error);
  };

  const onCloseError = () => {
    setError(null);
  };
  const handleCloseSignaturePopup = () => {
    if (!signaturePopupCloseTlRef.current.isActive()) {
      signaturePopupCloseTlRef.current.restart();
    }
  };

  const handleCloseErrorPopup = () => {
    if (!errorSizeCloseTlRef.current.isActive()) {
      errorSizeCloseTlRef.current.restart();
    }
  };

  const handleChange = async (event) => {
    const files = event.target.files;

    const file = files[0];

    let successCloseTl = createClosePopupTl("success");

    let uploadProgressResetTl = gsap.timeline({ paused: true });
    uploadProgressResetTl.to(
      [
        "[data-upload-item]",
        "[data-upload-caption]",
        "[data-upload-dot]",
        "[data-upload-icon]",
      ],
      {
        opacity: 0,
        duration: 0.1,
      }
    );

    errorSizeOpenTlRef.current = createOpenPopupTl(
      errorSizePopupName,
      uploadProgressResetTl
    );

    const fileSizeMb = converBytesToMB(file.size);

    if (fileSizeMb >= MAX_FILE_SIZE_MB) {
      errorSizeOpenTlRef.current.restart();
    } else {
      let successOpenTl = createOpenPopupTl("success", uploadProgressResetTl);
      let uploadCloseTl = createClosePopupTl("upload");
      let uploadProgressTl = gsap.timeline({ paused: true });
      let uploadItems = $("[data-upload-item]");
      let durations = [0.2, 0.25, 0.4, 0.5];
      uploadItems.each((index, _item) => {
        let randomIndex = Math.floor(Math.random() * durations.length);
        let curDuration = durations[randomIndex];
        let item = $(_item);
        let caption = item.find("[data-upload-caption]");
        let dots = item.find("[data-upload-dot]");
        let icon = item.find("[data-upload-icon]");
        uploadProgressTl
          .to(item, {
            opacity: 1,
            duration: curDuration,
          })
          .to(caption, {
            opacity: 0.5,
            duration: curDuration / 2,
          })
          .set(caption, {
            opacity: 1,
            delay: curDuration / 2,
          })
          .set(dots, {
            opacity: 1,
            stagger: {
              each: 0.1,
            },
          })
          .to(dots, {
            opacity: 0,
            delay: 0.15,
            duration: 0.05,
          })
          .to(
            icon,
            {
              opacity: 1,
              duration: curDuration,
            },
            "<"
          );
      });
      let uploadOpenTl = createOpenPopupTl("upload", uploadProgressTl);

      let errorOpenTl = createOpenPopupTl("error", uploadProgressResetTl);
      let errorCloseTl = createClosePopupTl("error");

      $('[data-popup-overlay="error"]').on("click", function (e) {
        if (!errorCloseTl.isActive()) {
          errorCloseTl.restart();
        }
      });
      $('[data-popup-overlay="success"]').on("click", function (e) {
        if (!successCloseTl.isActive()) {
          successCloseTl.restart();
        }
      });

      $("[data-file-size]").each(function (i, _el) {
        $(_el).text(
          fileSizeMb > 1 ? fileSizeMb.toFixed(2) : fileSizeMb.toFixed(6)
        );
      });

      $("[data-file-name]").each(function (i, _el) {
        $(_el).text(formatFileName(file.name));
      });

      const formData = new FormData();

      signaturePopupOpenTlRef.current.restart();

      let signature;

      try {
        signature = await generateCryptionSignature(
          user.wallet.publicKey,
          signMessageAsync
        );
      } catch (error) {
        handleCloseSignaturePopup();
        alert("Error generating signature");
        return;
      }

      handleCloseSignaturePopup();

      Timer.start();

      uploadOpenTl.restart();

      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        const encryptedBlob = await encryptFile(file, signature);

        formData.append(`files[${index}][encryptedBlob]`, encryptedBlob);
        formData.append(`files[${index}][originalName]`, file.name);
        formData.append(`files[${index}][mimeType]`, file.type);
      }

      if (boxId) {
        formData.append("boxId", boxId);
      }

      try {
        const uploadedFiles = await uploadFiles(formData);

        const tlDuration =
          uploadProgressTl.totalDuration() * 1000 +
          uploadOpenTl.totalDuration() * 1000;

        Timer.end();
        const requestDuration = Timer.getElapsedTime();

        let timeoutDelay = 0;
        if (tlDuration > requestDuration) {
          timeoutDelay = tlDuration - requestDuration;
        }

        setTimeout(async () => {
          uploadCloseTl.restart();
          successOpenTl.restart();

          onUpload(uploadedFiles[0]);

          setTimeout(() => {
            if (!successCloseTl.isActive()) {
              successCloseTl.restart();
            }
          }, 2000);
        }, timeoutDelay);
      } catch (error) {
        onError(error);
        uploadCloseTl.restart();
        errorOpenTl.restart();
        console.error("Error uploading file: ", error);
      }
    }

    event.target.value = null;
  };

  useEffect(() => {
    signaturePopupOpenTlRef.current = createOpenPopupTl(signaturePopupName);
    signaturePopupCloseTlRef.current = createClosePopupTl(signaturePopupName);

    errorSizeCloseTlRef.current = createClosePopupTl(errorSizePopupName);
  }, []);

  return (
    <>
      <UploadFileButton onChange={handleChange} />

      <div data-popup="upload" className="popup_component">
        <div data-popup-overlay="upload" className="popup_overlay"></div>
        <div data-popup-content="upload" className="popup_content">
          <div className="upload-progress_component">
            <div data-upload-item="" className="upload-progress_item">
              <div
                data-upload-caption=""
                className="upload-progress_item_caption"
              >
                Encrypting
              </div>
              <div className="upload-progress_item_dots">
                <span data-upload-dot="1" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="2" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="3" className="upload-progress_item_dot">
                  .
                </span>
              </div>
              <div
                data-upload-icon=""
                className="upload-progress_item_icon"
              ></div>
            </div>
            <div data-upload-item="" className="upload-progress_item">
              <div
                data-upload-caption=""
                className="upload-progress_item_caption"
              >
                Sharding
              </div>
              <div className="upload-progress_item_dots">
                <span data-upload-dot="1" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="2" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="3" className="upload-progress_item_dot">
                  .
                </span>
              </div>
              <div
                data-upload-icon=""
                className="upload-progress_item_icon"
              ></div>
            </div>
            <div data-upload-item="" className="upload-progress_item">
              <div
                data-upload-caption=""
                className="upload-progress_item_caption"
              >
                Sign transaction
              </div>
              <div className="upload-progress_item_dots">
                <span data-upload-dot="1" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="2" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="3" className="upload-progress_item_dot">
                  .
                </span>
              </div>
              <div
                data-upload-icon=""
                className="upload-progress_item_icon"
              ></div>
            </div>
            <div data-upload-item="" className="upload-progress_item">
              <div
                data-upload-caption=""
                className="upload-progress_item_caption"
              >
                Uploading
              </div>
              <div className="upload-progress_item_dots">
                <span data-upload-dot="1" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="2" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="3" className="upload-progress_item_dot">
                  .
                </span>
              </div>
              <div
                data-upload-icon=""
                className="upload-progress_item_icon"
              ></div>
            </div>
            <div data-upload-item="" className="upload-progress_item">
              <div
                data-upload-caption=""
                className="upload-progress_item_caption"
              >
                Hash received
              </div>
              <div className="upload-progress_item_dots">
                <span data-upload-dot="1" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="2" className="upload-progress_item_dot">
                  .
                </span>
                <span data-upload-dot="3" className="upload-progress_item_dot">
                  .
                </span>
              </div>
              <div
                data-upload-icon=""
                className="upload-progress_item_icon"
              ></div>
            </div>
          </div>
          <div className="popup_content_footer">
            <div data-file-name="">File.png</div>
            <div className="text-style-muted">
              <span data-file-size="upload">0</span>
              <span>mb</span>
            </div>
          </div>
        </div>
      </div>

      <div data-popup="success" className="popup_component">
        <div data-popup-overlay="success" className="popup_overlay"></div>
        <div data-popup-content="success" className="popup_content">
          <div className="success_component">
            <div className="success_icon"></div>
            <div
              data-field-content="file-name"
              data-file-name=""
              className="text-style-muted"
            >
              file-name.png
            </div>
            <div className="text-style-muted">Successfully uploaded</div>
          </div>
        </div>
      </div>

      <SignaturePopup popupName={signaturePopupName} />

      <ErrorSizePopup
        popupName={errorSizePopupName}
        onClick={handleCloseErrorPopup}
      />

      <div data-popup="error" className="popup_component">
        <div
          data-popup-overlay="error"
          className="popup_overlay"
          onClick={onCloseError}
        ></div>
        <div data-popup-content="error" className="popup_content">
          <div className="error_component">
            <div className="error_icon"></div>
            <div className="text-style-muted">{error?.message}</div>
          </div>
        </div>
      </div>
    </>
  );
});
