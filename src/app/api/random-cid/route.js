// import crypto from "crypto";
// import { NextResponse } from "next/server";

// export const GET = async function () {
//   const randomValues = new Uint8Array(32);
//   crypto.getRandomValues(randomValues);

//   const hashBuffer = await crypto.subtle.digest("SHA-256", randomValues);

//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");

//   const cidVersion = "1";
//   const codec = "01";

//   const cid = `${cidVersion}${codec}${hashHex}`;

//   return NextResponse.json({ cid }, { status: 200 });
// };
