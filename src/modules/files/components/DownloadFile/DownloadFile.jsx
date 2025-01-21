"use client";

import { downloadFile } from "@/lib/util/downloadFile";
import gsap from "gsap";

import { useRef, useEffect } from "react";

import { decryptFile, generateCryptionSignature } from "@/lib/util/cryption";
import { createOpenPopupTl, createClosePopupTl } from "@/lib/util/animations";
import ButtonIcon from "@/modules/files/components/icons/ButtonIcon";

import { useUser } from "@/modules/user/context/UserContext";
import { useSignMessage } from "wagmi";

import Button from "@/ui/Button";

export default function DownloadFile({ file }) {
  const { signMessageAsync } = useSignMessage();
  const { user } = useUser();

  const resetDownloadProgressTlRef = useRef();
  const downloadProgressTlRef = useRef();
  const downloadFilePopupOpenTlRef = useRef();
  const downloadFilePopupCloseTlRef = useRef();

  const closeDownloadFilePopup = async () => {
    if (!downloadFilePopupCloseTlRef.current.isActive()) {
      downloadFilePopupCloseTlRef.current.restart();
    }
  };

  const openDownloadFilePopup = async () => {
    downloadFilePopupOpenTlRef.current.restart();
  };

  const handleDownloadFile = async () => {
    const decryptKey =
      file.sharedKey ||
      (await generateCryptionSignature(
        user.wallet.publicKey,
        signMessageAsync
      ));

    openDownloadFilePopup();

    const decryptedBlob = await decryptFile(file.id, decryptKey, file.mimetype);

    downloadFile(decryptedBlob, file.name);
  };

  useEffect(() => {
    resetDownloadProgressTlRef.current = gsap
      .timeline({ paused: true })
      .to("#download-progress", {
        duration: 0.1,
        width: "0%",
        onComplete: () => {
          const el = document.getElementById("download-percentage");
          el.textContent = "01";
        },
      });

    downloadFilePopupCloseTlRef.current = createClosePopupTl(
      "download",
      resetDownloadProgressTlRef.current
    );
  }, []);

  useEffect(() => {
    let percentageCounter = {
      value: 0,
    };

    let firstSteps = [15, 27, 33, 42]; // percentage
    let randomFirstStepIndex = Math.floor(Math.random() * firstSteps.length);
    let firstStep = firstSteps[randomFirstStepIndex];
    let secondSteps = [63, 75, 83, 89]; // percentage
    let randomSecondStepIndex = Math.floor(Math.random() * secondSteps.length);
    let secondStep = secondSteps[randomSecondStepIndex];
    let downloadDurations = [0.3, 0.4, 0.5, 0.6, 0.7]; // seconds
    let randomFirsStepDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );
    let randomSecondStDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );
    let randomThirdStepDurationIndex = Math.floor(
      Math.random() * downloadDurations.length
    );

    let firsStepDuration = downloadDurations[randomFirsStepDurationIndex];
    let secondStepDuration = downloadDurations[randomSecondStDurationIndex];
    let thirdStepDuration = downloadDurations[randomThirdStepDurationIndex];

    downloadProgressTlRef.current = gsap
      .timeline({
        paused: true,
        ease: "none",
        onComplete: () => {
          closeDownloadFilePopup();
        },
      })
      .to("#download-progress", {
        duration: firsStepDuration,
        width: `${firstStep}%`,
      })
      .to(
        percentageCounter,
        {
          duration: firsStepDuration,
          value: firstStep,
          onUpdate: () => {
            const el = document.getElementById("download-percentage");
            el.textContent = percentageCounter.value.toFixed(0);
          },
        },
        "<"
      )
      .to("#download-progress", {
        delay: secondStepDuration / 3,
        duration: secondStepDuration,
        width: `${secondStep}%`,
      })
      .to(
        percentageCounter,
        {
          duration: secondStepDuration,
          value: secondStep,
          onUpdate: () => {
            const el = document.getElementById("download-percentage");
            el.textContent = percentageCounter.value.toFixed(0);
          },
        },
        "<"
      )
      .to("#download-progress", {
        delay: thirdStepDuration / 3,
        duration: thirdStepDuration,
        width: "100%",
      })
      .to(
        percentageCounter,
        {
          duration: thirdStepDuration,
          value: 100,
          onUpdate: () => {
            const el = document.getElementById("download-percentage");
            el.textContent = percentageCounter.value.toFixed(0);
          },
        },
        "<"
      );

    downloadFilePopupOpenTlRef.current = createOpenPopupTl(
      "download",
      downloadProgressTlRef.current
    );
  }, []);

  return (
    <>
      <Button
        onClick={handleDownloadFile}
        type="button"
        variant={["primary", "small"]}
        className="inspector-button"
      >
        <ButtonIcon />
      </Button>

      <div data-popup="download" className="popup_component">
        <div data-popup-overlay="download" className="popup_overlay"></div>
        <div data-popup-content="download" className="popup_content">
          <h2 className="popup_heading is-download">
            <span>Saving</span>
            <span> </span>
            <span data-field-content="file-name"></span>
          </h2>
          <div className="popup_download">
            <div className="popup_download_progress">
              <div
                id="download-progress"
                className="popup_download_progress_inner"
              ></div>
            </div>
            <div className="text-style-muted">
              <span id="download-percentage">00</span>
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
