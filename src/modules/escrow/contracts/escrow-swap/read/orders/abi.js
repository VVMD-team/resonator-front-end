export const functionName = "orders";

const ordersABI = [
  {
    name: functionName,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "counterparty", type: "address" },
      {
        internalType: "enum EscrowSwap.OrderType",
        name: "orderType",
        type: "uint8",
      },
      { internalType: "address", name: "currency", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      {
        internalType: "address",
        name: "counterpartyCurrency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "counterpartyAmount",
        type: "uint256",
      },
      { internalType: "uint256", name: "fileId", type: "uint256" },
      {
        internalType: "uint256",
        name: "counterpartyFileId",
        type: "uint256",
      },
      { internalType: "uint256", name: "expiration", type: "uint256" },
      {
        internalType: "enum EscrowSwap.OrderStatus",
        name: "status",
        type: "uint8",
      },
      { internalType: "uint256", name: "msgvalue", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default ordersABI;
