"use client";

import Link from "next/link";

import { byteToMegabyte } from "@/lib/helpers";

import { useUser } from "@/modules/user/context/UserContext";

import DisconnectButton from "@/modules/wallet/components/DisconnectButton";

export default function AccountPage() {
  const { user } = useUser();
  console.log(user);
  const filesStore = user.numberOfFiles;
  const spaceUsed = byteToMegabyte(user.totalSize);

  return (
    <div className="board_component">
      <h1 className="board_heading">Account</h1>
      <div className="account_component">
        <div className="account_header">
          <div className="account_header_top">
            <div className="account_header_item">
              <div className="account_header_caption">
                <span id="total-size">{spaceUsed}</span>
                <span className="text-weight-light">mb</span>
              </div>
              <div>Space used</div>
            </div>
            <div className="account_header_item">
              <div id="number-of-files" className="account_header_caption">
                {filesStore}
              </div>
              <div>Files stored</div>
            </div>
          </div>
          <DisconnectButton />
        </div>
        <div className="account_content">
          <div className="account_item">
            <div className="account_item_caption">
              <div className="account_item_caption_text">Support</div>
              <div className="account_item_caption_line"></div>
            </div>
            <div className="account_item_text">
              <div>
                <Link
                  href="http://t.me/resonator_help"
                  rel="nofollow"
                  target="_blank"
                >
                  Get help
                </Link>
              </div>
              <div>
                <Link
                  href="http://t.me/resonator_portal"
                  rel="nofollow"
                  target="_blank"
                >
                  Send feedback
                </Link>
              </div>
            </div>
          </div>
          <div className="account_item">
            <div className="account_item_caption">
              <div className="account_item_caption_text">Resonator</div>
              <div className="account_item_caption_line"></div>
            </div>
            <div className="account_item_text">
              <div>dApp version 1.0a (changelog is coming soon)</div>
              <div>
                <a href="https://www.rsntr.io/dapp-policy" target="_blank">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          <div className="account_item">
            <div className="account_item_caption">
              <div className="account_item_caption_text">Support</div>
              <div className="account_item_caption_line"></div>
            </div>
            <div className="account_item_text">
              <div>
                <div>Manual</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
