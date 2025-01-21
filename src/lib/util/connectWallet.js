const checkSolanaWalletInsalled = (walletType) => {
  const isPhantom = window.solana && window.solana.isPhantom;
  if (walletType === window.walletTypes.PHANTOM && !isPhantom) {
    throw new Error("Phantom wallet is not installed or not detected.");
  }
};
const checkEtheriumWalletInstalled = (walletType) => {
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask;
  const isRabby = window.ethereum && window.ethereum.isRabby;
  const isTrust = window.ethereum && window.ethereum.isTrust;
  if (walletType === window.walletTypes.METAMASK && !isMetaMask) {
    throw new Error("MetaMask is not installed or not detected.");
  }
  if (walletType === window.walletTypes.RABBY_WALLET && !isRabby) {
    throw new Error("Rabby Wallet is not installed or not detected.");
  }
  if (walletType === window.walletTypes.TRUST_WALLET && !isTrust) {
    throw new Error("Trust Wallet is not installed or not detected.");
  }
};
export default async function connectWallet(walletType, message) {
  try {
    if (window.etheriumWallets.includes(walletType)) {
      checkEtheriumWalletInstalled();
      const { etheriumPublicKey, signature } = await window.signMessageEthereum(
        message
      );
      return {
        publicKey: etheriumPublicKey.address,
        signature,
        walletType,
      };
    } else if (window.solanaWallets.includes(walletType)) {
      checkSolanaWalletInsalled();
      const { solanaPublicKey, signature } = await window.signMessageSolana(
        message
      );
      return {
        publicKey: solanaPublicKey,
        signature: window.bs58.encode(signature.signature),
        walletType,
      };
    } else {
      throw new Error("Unsupported wallet type");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
}
