import { shareOrTransferBox, getBoxFiles } from "@/modules/box/api";

import { recryptFile, generateCryptionSignature } from "@/lib/util/cryption";

import { useUser } from "@/modules/user/context/UserContext";
import { useSignMessage } from "wagmi";

import { validateWalletAdress } from "@/lib/helpers";

import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";
import useLoading from "@/lib/hooks/useLoading";

const ShareTransferBoxForm = ({
  action,
  box,
  onActionComplete = () => {},
  onActionError = () => {},
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const { user } = useUser();
  const { signMessageAsync } = useSignMessage();

  const handleShareTransferBox = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const shareTransferWalletPublicKey = formData.get("adress");

    if (!shareTransferWalletPublicKey) return;

    if (!validateWalletAdress(shareTransferWalletPublicKey)) {
      alert("Invalid wallet address");
      return;
    }

    startLoading();

    if (!box.fileIds) {
      e.target.reset();
      stopLoading();
      onActionError({ message: "You can not share empty box." });

      return;
    }

    const boxFiles = await getBoxFiles(box.id, true);

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

    const boxFilesToRecrypt = boxFiles.filter(({ sharedKey }) => !sharedKey);

    const recryptedBoxFilesPromises = boxFilesToRecrypt.map(
      async ({ mimetype, name, id }) => {
        const { recryptedBlob, sharedKey } = await recryptFile(
          id,
          signature,
          mimetype,
          name
        );

        return {
          id,
          recryptedBlob,
          sharedKey,
        };
      }
    );

    const recryptedBoxFiles = await Promise.all(recryptedBoxFilesPromises);

    shareOrTransferBox(
      action,
      shareTransferWalletPublicKey,
      box.id,
      recryptedBoxFiles
    )
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
    <form className="popup_transfer" onSubmit={handleShareTransferBox}>
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
};

export default ShareTransferBoxForm;
