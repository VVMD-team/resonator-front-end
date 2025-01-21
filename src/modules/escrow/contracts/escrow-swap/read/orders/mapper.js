const mapOrderData = (data) => ({
  id: data[0],
  creator: data[1],
  counterparty: data[2],
  orderType: data[3],
  currency: data[4],
  amount: data[5],
  counterpartyCurrency: data[6],
  counterpartyAmount: data[7],
  fileId: data[8],
  counterpartyFileId: data[9],
  expiration: data[10],
  status: data[11],
  msgvalue: data[12],
});

export default mapOrderData;
