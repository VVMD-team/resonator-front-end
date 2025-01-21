import { authTokenStorageKey } from "@/lib/constants";

const getAuthToken = () => {
  const token = localStorage.getItem(authTokenStorageKey) || "";
  if (!token) {
    return "";
  }
  return token;
};

export default getAuthToken;
