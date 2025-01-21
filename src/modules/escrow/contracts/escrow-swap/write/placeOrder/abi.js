export const functionName = "placeOrder";

const placeOrderABI = [
  {
    name: functionName,
    inputs: [
      { internalType: "address", name: "_counterparty", type: "address" },
      {
        internalType: "enum EscrowSwap.OrderType",
        name: "_orderType",
        type: "uint8",
      },
      { internalType: "address", name: "_currency", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      {
        internalType: "address",
        name: "_counterpartyCurrency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_counterpartyAmount",
        type: "uint256",
      },
      { internalType: "uint256", name: "_fileId", type: "uint256" },
      {
        internalType: "uint256",
        name: "_counterpartyFileId",
        type: "uint256",
      },
    ],
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

export default placeOrderABI;
