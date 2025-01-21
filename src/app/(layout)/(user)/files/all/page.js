"use client";

import { getAllBoxes } from "@/modules/box/api";
import { getAllFiles } from "@/modules/files/api";

import Search from "@/ui/Search/Search";

import UploadFile from "@/components/UploadFile";

import { PlusIcon } from "@/components/icons";

import { useEffect, useRef, useState } from "react";

import { createOpenPopupTl } from "@/lib/util/animations";

import createItemsContext from "@/context/ItemsContext";
import { SearchProvider } from "@/context/SearchContext";
import ItemsList from "@/components/ItemsList";

import CreateBoxPopup from "@/modules/box/components/CreateBoxPopup";

const createBoxPopupName = "create-box";

const requestFiles = async () => {
  try {
    const files = await getAllFiles();

    return files.map((file) => ({ item: file, id: file.id, type: "file" }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const [FilesItemsProvider, useFilesItems, FilesItemsConsumer] =
  createItemsContext();

const requestBoxes = async () => {
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

const [BoxesItemsProvider, useBoxesItems, BoxesItemsConsumer] =
  createItemsContext();

const useItems = () => {
  const { items: boxesItems } = useBoxesItems();
  const { items: filesItems } = useFilesItems();

  return [...boxesItems, ...filesItems];
};

export default function AllFilesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const createBoxOpenTlRef = useRef(null);

  const openBoxPopup = () => {
    setIsOpen(true);
  };

  const closeBoxPopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (!createBoxOpenTlRef.current) {
      createBoxOpenTlRef.current = createOpenPopupTl(createBoxPopupName);
    }

    createBoxOpenTlRef.current.restart();
  }, [isOpen]);

  return (
    <SearchProvider>
      <BoxesItemsProvider requestItems={requestBoxes}>
        <FilesItemsProvider requestItems={requestFiles}>
          <div className="board_component">
            <h1 className="board_heading">All files</h1>
            <div className="board_content">
              <div className="board_controls is-small-gap-on-mobile">
                <Search />
                <div className="board_controls_row">
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
                  <button
                    type="button"
                    className="add-box_component"
                    onClick={openBoxPopup}
                  >
                    <PlusIcon />
                    <div>+ Box</div>
                  </button>
                </div>
              </div>
              <div className="board_files">
                {/* <div className="board_files_header">
                  <h2 className="board_files_heading">
                    <span className="board_files_heading_text">Name</span>
                  </h2>
                </div> */}

                <ItemsList useItems={useItems} />
              </div>
            </div>
          </div>
        </FilesItemsProvider>

        <BoxesItemsConsumer>
          {({ addItem }) => (
            <CreateBoxPopup
              popupName={createBoxPopupName}
              onAddBox={addItem}
              onClose={closeBoxPopup}
            />
          )}
        </BoxesItemsConsumer>
      </BoxesItemsProvider>
    </SearchProvider>
  );
}
