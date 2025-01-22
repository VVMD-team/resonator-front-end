import { solanaAddressRegex, ethereumAddressRegex } from "@/lib/regex";
import * as yup from "yup";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export function arrayBufferToFile(arrayBuffer, fileName, mimeType) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}

export function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      resolve(event.target.result);
    };
    reader.onerror = function (event) {
      reject(new Error("Failed to read file: " + event.target.error.message));
    };
    reader.readAsArrayBuffer(file);
  });
}

export const byteToMegabyte = (num) => {
  if (!num) return 0;
  const result = num / (1024 * 1024);
  return result > 1 ? result.toFixed(2) : result.toFixed(6);
};

export const timestampToDate = (timestamp, dateFormat) => {
  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  );

  if (dateFormat) {
    try {
      return dayjs(date).format(dateFormat);
    } catch (error) {
      console.error("Invalid date format:", error);
      return date.toLocaleString();
    }
  }

  return date.toLocaleString();
};

export const formatStringShorter = (
  str,
  { separator = "...", start = 4, end = 3 } = {}
) => `${str.substr(0, start)}${separator}${str.substr(str.length - end)}`;

export const validateWalletAdress = (address) =>
  solanaAddressRegex.test(address) || ethereumAddressRegex.test(address);

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const formatMimetype = (mimeType, limit = 12) => {
  if (typeof mimeType !== "string" || !mimeType.includes("/")) {
    return "other";
  }

  const parts = mimeType.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return "other";
  }

  const subtype = parts[1].slice(0, limit);
  if (!subtype) {
    return "other";
  }

  return subtype;
};

export const Timer = {
  startTime: null,
  endTime: null,

  start() {
    this.startTime = Date.now();
    this.endTime = null;
  },

  end() {
    if (!this.startTime) {
      console.error("Timer has not been started");
      return;
    }
    this.endTime = Date.now();
  },

  getElapsedTime() {
    if (!this.startTime) {
      console.error("Timer has not been started");
      return null;
    }
    if (!this.endTime) {
      console.error("Timer has not been ended");
      return null;
    }
    return this.endTime - this.startTime;
  },
};

export const enumsValidator = (enumObject) => {
  return yup
    .mixed()
    .oneOf(
      Object.values(enumObject),
      `Allowed values: ${Object.values(enumObject).join(", ")}`
    );
};

export const converBytesToMB = (bytes) => bytes / (1024 * 1024);

export const sumStringIntegers = (values, maxIntegers) => {
  if (!values || !maxIntegers) {
    throw new Error("values, maxIntegers are required");
  }

  const scaleFactor = Math.pow(10, maxIntegers);
  const scaledSum = values
    .map((value) => parseFloat(value.replace(",", ".")))
    .filter((num) => !isNaN(num))
    .reduce((sum, num) => sum + Math.round(num * scaleFactor), 0);
  return scaledSum / scaleFactor;
};

export const countdownToTimestampErrorMessage = "Time has already passed!";
export const countdownToTimestamp = (timestamp) => {
  const targetTimestamp =
    typeof timestamp === "bigint" ? Number(timestamp) : timestamp;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  let timeRemaining = targetTimestamp - currentTimestamp;

  if (timeRemaining <= 0) {
    throw new Error(countdownToTimestampErrorMessage);
  }

  const days = Math.floor(timeRemaining / (24 * 3600));
  timeRemaining %= 24 * 3600;
  const hours = Math.floor(timeRemaining / 3600);
  timeRemaining %= 3600;
  const minutes = Math.floor(timeRemaining / 60);
  //   const seconds = timeRemaining % 60;

  const daysStr = days ? `${days}d` : "";
  const hoursStr = hours ? `${hours}h` : "";
  const minutesStr = minutes ? `${minutes}m` : "";

  return `${daysStr} ${hoursStr} ${minutesStr}`.trim();
};

export const convertBigIntToDecimal = (bigIntValue, decimals) => {
  const strValue = bigIntValue.toString();

  if (strValue.length <= decimals) {
    return "0." + strValue.padStart(decimals, "0");
  }

  const integerPart = strValue.slice(0, -decimals);
  const decimalPart = strValue.slice(-decimals);

  return parseFloat(`${integerPart}.${decimalPart}`);
};
