import styles from "./LoaderSmall.module.css";

export default function LoaderSmall({
  thickness = 8,
  width = 60,
  height = 60,
  className = "",
}) {
  return (
    <div
      className={`${styles.loader} ${className}`}
      style={{
        "--thickness": `${thickness}px`,
        "--width": `${width}px`,
        "--height": `${height}px`,
      }}
    ></div>
  );
}
