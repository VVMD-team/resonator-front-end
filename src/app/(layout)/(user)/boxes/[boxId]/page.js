"use client";

import { useEffect, useState } from "react";

import { getBoxById, getBoxFiles } from "@/modules/box/api";

import { useParams } from "next/navigation";

import UploadFile from "@/components/UploadFile";

import createItemsContext from "@/context/ItemsContext";
import { SearchProvider } from "@/context/SearchContext";
import ItemsList from "@/components/ItemsList";

import Search from "@/ui/Search/Search";

import { boxTypes } from "@/modules/box/constants";

const requestFiles = async (boxId) => {
  try {
    const files = await getBoxFiles(boxId);

    return files.map((file) => ({ item: file, id: file.id, type: "file" }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const [FilesItemsProvider, useFilesItems, FilesItemsConsumer] =
  createItemsContext();

const useItems = () => {
  const { items: filesItems } = useFilesItems();

  return filesItems;
};

export default function BoxPage() {
  const [box, setBox] = useState(null);

  const params = useParams();

  useEffect(() => {
    getBoxById(params.boxId)
      .then((box) => {
        setBox(box);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SearchProvider>
      <FilesItemsProvider requestItems={() => requestFiles(params.boxId)}>
        <div className="board_component">
          <h1 id="box-name" className="board_heading is-box-page">
            {box?.name}
          </h1>
          <FilesItemsConsumer>
            {({ items }) => (
              <div className="board_subheading">
                <span id="box-files-count">{items.length} </span>
                <span>{items.length > 1 ? "files" : "file"}</span>
              </div>
            )}
          </FilesItemsConsumer>
          <div className="board_content">
            <div className="board_controls is-small-gap-on-mobile">
              <Search />
              {box?.type === boxTypes.custom && (
                <div>
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
                        boxId={box?.id}
                      />
                    )}
                  </FilesItemsConsumer>
                </div>
              )}
            </div>
            <div className="board_files">
              <div className="board_files_header">
                <h2 className="board_files_heading">
                  <span className="board_files_heading_text">Name</span>
                </h2>
              </div>

              <ItemsList useItems={useItems} />
            </div>
          </div>
        </div>
      </FilesItemsProvider>
    </SearchProvider>
  );
}
