export default function generateFileSignatureMessage(publicKey) {
  return `We use this message to securely encrypt and decrypt your files.\nWallet address: ${publicKey}`;
}
