import styles from "./DisconnectButton.module.css";

import { useDisconnect } from "wagmi";

import { useRouter } from "next/navigation";

const DisconnectButton = () => {
  const router = useRouter();

  const { disconnectAsync } = useDisconnect();

  const handleDisconnect = async () => {
    await disconnectAsync();

    localStorage.clear();
    router.replace("/login");
  };

  return (
    <div className={styles.container}>
      <button type="button" className="button" onClick={handleDisconnect}>
        Disconnect
      </button>
    </div>
  );
};

export default DisconnectButton;
