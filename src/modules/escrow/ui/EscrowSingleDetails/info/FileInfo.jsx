import InfoBlock from "./InfoBlock";

export default function FileInfo({ fileName, isPlaceholder }) {
  return (
    <InfoBlock
      title="File"
      text={fileName}
      isPlaceholder={isPlaceholder}
      isPaddingBottomWeb={true}
    />
  );
}
