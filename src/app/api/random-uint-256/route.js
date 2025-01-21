import crypto from "crypto";
import { NextResponse } from "next/server";

export const GET = function () {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  const uint256 =
    "0x" +
    Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");

  return NextResponse.json({ uint256 }, { status: 200 });
};
