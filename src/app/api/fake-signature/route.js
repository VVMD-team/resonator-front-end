import crypto from "crypto";
import { NextResponse } from "next/server";

export const GET = function () {
  const randomBytes = crypto.randomBytes(64);

  const hexSignature = randomBytes.toString("hex");

  return NextResponse.json({ signature: `0x${hexSignature}` }, { status: 200 });
};
