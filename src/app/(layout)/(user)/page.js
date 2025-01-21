"use client";

import Link from "next/link";

import { getAllFiles, getLasUploadedFiles } from "@/modules/files/api";
import { getAllBoxes } from "@/modules/box/api";

import Search from "@/ui/Search/Search";
import UploadFile from "@/components/UploadFile";

import createItemsContext from "@/context/ItemsContext";
import { SearchProvider } from "@/context/SearchContext";
import ItemsList from "@/components/ItemsList";

const requestFiles = async () => {
  let files = [];

  try {
    if (window.innerWidth < 767) {
      files = await getLasUploadedFiles();
    } else {
      files = await getAllFiles();
    }

    return files.map((file) => ({ item: file, id: file.id, type: "file" }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const [FilesItemsProvider, useFilesItems, FilesItemsConsumer] =
  createItemsContext();

const requestBoxes = async () => {
  if (window.innerWidth < 767) {
    return [];
  }

  try {
    const { boxes } = await getAllBoxes();

    return boxes
      .filter(({ type }) => type !== "default")
      .map((box) => ({ item: box, id: box.id, type: "box" }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const [BoxesItemsProvider, useBoxesItems] = createItemsContext();

const useItems = () => {
  const { items: boxesItems } = useBoxesItems();
  const { items: filesItems } = useFilesItems();

  return [...boxesItems, ...filesItems];
};

export default function Home() {
  return (
    <SearchProvider>
      <div className="board_component">
        <h1 className="board_heading">Home</h1>
        <div className="board_content">
          <FilesItemsProvider requestItems={requestFiles}>
            <BoxesItemsProvider requestItems={requestBoxes}>
              <div className="board_controls">
                <Search />
                <FilesItemsConsumer>
                  {({ addItem }) => (
                    <UploadFile
                      onUpload={(file) => {
                        addItem({
                          item: file,
                          id: file.id,
                          type: "file",
                        });
                      }}
                    />
                  )}
                </FilesItemsConsumer>
              </div>
              <div className="board_files">
                <div className="board_files_header">
                  <h2 className="board_files_heading">
                    <span className="board_files_heading_text is-desktop">
                      All files
                    </span>
                    <span className="board_files_heading_text is-mobile">
                      Recent
                    </span>
                  </h2>
                  <div className="board_files_header_line"></div>
                  <Link href="files/all" className="board_files_see-all">
                    See all
                  </Link>
                </div>

                <ItemsList useItems={useItems} />
              </div>
            </BoxesItemsProvider>
          </FilesItemsProvider>
        </div>
      </div>
    </SearchProvider>
  );
}
