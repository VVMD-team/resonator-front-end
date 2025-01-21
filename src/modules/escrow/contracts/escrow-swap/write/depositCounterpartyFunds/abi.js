export const functionName = "depositCounterpartyFunds";

const depositCounterpartyFundsABI = [
  {
    name: functionName,
    inputs: [{ internalType: "uint256", name: "_orderId", type: "uint256" }],
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default depositCounterpartyFundsABI;
