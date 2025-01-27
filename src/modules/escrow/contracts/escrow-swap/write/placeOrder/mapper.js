import {
  escrowSwapOrderTypesMap,
  currencyAddressesMap,
  etheriumCurrencyAddress,
} from "../../constants";
import { formatAmount } from "../../helpers";

const mapInputData = ({
  dealType, // escrowDealTypes
  counterpartyAddress,
  providedPayment, // currency: escrowCurrencies, amount: string
  requestedPayment, // currency: escrowCurrencies, amount: string
  fileContractId,
  counterpartyFileContractId,
}) => {
  const data = {
    counterparty: counterpartyAddress,
    orderType: escrowSwapOrderTypesMap[dealType],

    ...(providedPayment && {
      currency: currencyAddressesMap[providedPayment.currency],
      amount: formatAmount(providedPayment.amount, providedPayment.currency),
    }),

    ...(requestedPayment && {
      counterpartyCurrency: currencyAddressesMap[requestedPayment.currency],
      counterpartyAmount: formatAmount(
        requestedPayment.amount,
        requestedPayment.currency
      ),
    }),

    ...(fileContractId && { fileContractId }),
    ...(counterpartyFileContractId && { counterpartyFileContractId }),
  };

  // Note: In contract logic counterpartyFileContractId is fileContractId, fileContractId is counterpartyFileContractId
  const dataArray = [
    data.counterparty,
    data.orderType,
    data.currency || etheriumCurrencyAddress,
    data.amount || 0,
    data.counterpartyCurrency || etheriumCurrencyAddress,
    data.counterpartyAmount || 0,
    data.counterpartyFileContractId || 0,
    data.fileContractId || 0,
  ];

  console.log("data to contract: ", {
    _counterparty: data.counterparty,
    _orderType: data.orderType,
    _currency: data.currency || etheriumCurrencyAddress,
    _amount: data.amount || 0,
    _counterpartyCurrency: data.counterpartyCurrency || etheriumCurrencyAddress,
    _counterpartyAmount: data.counterpartyAmount || 0,
    _fileId: data.counterpartyFileContractId || 0,
    _counterpartyFileId: data.fileContractId || 0,
  });

  return dataArray;
};

export default mapInputData;
