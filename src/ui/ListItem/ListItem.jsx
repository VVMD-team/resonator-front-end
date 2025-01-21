import Link from "next/link";
import { memo } from "react";

import { formatMimetype } from "@/lib/helpers";

const formatName = (name, isFile) => {
  let itemName = name.split(".").slice(0, -1).join(".");

  if (isFile) {
    if (itemName.length > 32) {
      // Limit file name to 32 symbols
      itemName = itemName.slice(0, 9) + " ... " + itemName.slice(-9);
    }
  } else {
    itemName = name;
  }

  return itemName;
};

const formatItemSize = (size) => {
  const itemSize = size / (1024 * 1024); // Convert to Megabite
  const itemSizeRounded =
    itemSize > 1 ? itemSize.toFixed(2) : itemSize.toFixed(6);

  return itemSizeRounded;
};

export default memo(function ListItem({ item, id, type }) {
  const isFile = type === "file";

  const itemSizeRounded = item?.size ? formatItemSize(item.size) : "0";
  const itemName = item?.name ? formatName(item.name, isFile) : "";
  const fileMimetype = item?.mimetype ? formatMimetype(item.mimetype) : "other";

  return (
    <div
      data-search-field-wrapper=""
      className={`files-item_component ${isFile ? "is-file" : "is-box"}`}
    >
      <div className="file-item_content">
        <div
          className={`files-item_icon ${isFile ? "is-file" : "is-box"}`}
        ></div>
        <div className="files-item_text">
          {isFile ? (
            <div data-search-field="" className="files-item_caption text-wrap">
              {itemName}
            </div>
          ) : (
            <Link
              href={`/boxes/${id}`}
              data-search-field=""
              className="files-item_caption text-wrap"
            >
              {itemName}
            </Link>
          )}

          <div className="files-item_description">
            {isFile ? (
              <>
                <span>{fileMimetype}</span>
                <span>&nbsp;— </span>
                <span>{itemSizeRounded}mb</span>
              </>
            ) : (
              <>
                <span>
                  {item.fileIds.length}{" "}
                  {item.fileIds.length > 1 ? "files" : "file"}
                </span>
                <span>&nbsp;— </span>
                <span>{itemSizeRounded}mb</span>
              </>
            )}
          </div>
        </div>
      </div>

      <Link
        href={isFile ? `/files/inspector/${id}` : `/boxes/inspector/${id}`}
        className="files-item_more"
      ></Link>
    </div>
  );
});
