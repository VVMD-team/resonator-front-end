export const functionName = "declineOrder";

const declineOrderABI = [
  {
    name: functionName,
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default declineOrderABI;
