import { shareOrTransferFile } from "@/modules/files/api";

import { useUser } from "@/modules/user/context/UserContext";
import { useSignMessage } from "wagmi";

import { validateWalletAdress } from "@/lib/helpers";

import { recryptFile, generateCryptionSignature } from "@/lib/util/cryption";

import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";

import useLoading from "@/lib/hooks/useLoading";

export default function ShareTransferForm({
  action,
  file,
  onActionComplete = () => {},
  onActionError = () => {},
}) {
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const { user } = useUser();
  const { signMessageAsync } = useSignMessage();

  const handleShareTransferFile = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const walletPublicKey = formData.get("adress");

    if (!walletPublicKey) return;

    if (!validateWalletAdress(walletPublicKey)) {
      alert("Invalid wallet address");
      return;
    }

    startLoading();

    if (file.sharedKey) {
      shareOrTransferFile({
        action,
        walletPublicKey,
        fileId: file.id,
      })
        .then(() => {
          e.target.reset();
          onActionComplete();
        })
        .catch((error) => {
          onActionError(error);
        })
        .finally(stopLoading);

      return;
    }

    let signature;

    try {
      signature = await generateCryptionSignature(
        user.wallet.publicKey,
        signMessageAsync
      );
    } catch (error) {
      if (error.code === 4001) {
        onActionError({ message: "You rejected the request to wallet" });
      } else {
        onActionError({ message: error.message });
      }

      stopLoading();
      return;
    }

    const { recryptedBlob, sharedKey } = await recryptFile(
      file.id,
      signature,
      file.mimetype,
      file.name
    );

    shareOrTransferFile({
      action,
      walletPublicKey,
      fileId: file.id,
      recryptedBlob,
      sharedKey,
    })
      .then(() => {
        e.target.reset();
        onActionComplete();
      })
      .catch((error) => {
        onActionError(error);
      })
      .finally(stopLoading);
  };
  return (
    <form className="popup_transfer" onSubmit={handleShareTransferFile}>
      {isLoading ? (
        <LoaderSmall />
      ) : (
        <>
          <input
            type="text"
            placeholder="Contact address"
            name="adress"
            className="form_input"
          />
          <button button="submit" className="button">
            {action === "share" ? "Share" : "Transfer"}
          </button>
        </>
      )}
    </form>
  );
}
