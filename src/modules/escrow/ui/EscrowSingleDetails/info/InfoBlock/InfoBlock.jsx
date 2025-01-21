import styles from "./InfoBlock.module.css";
import cn from "classnames";

const formatText = (name) => {
  if (name.length > 14) {
    return name.slice(0, 7) + " ... " + name.slice(-7);
  }

  return name;
};

export default function InfoBlock({
  title,
  text,
  isSmallMobile = false,
  isPlaceholder,
  isPaddingBottomWeb,
}) {
  return (
    <div
      className={cn(styles.container, {
        [styles.mobSmall]: isSmallMobile,
        [styles.paddingBottomWeb]: isPaddingBottomWeb,
      })}
    >
      <p className={styles.container__title}>{title}</p>

      <div className={styles.container__item}>
        <span
          className={cn(styles.container__item_text, {
            [styles.placeholder]: isPlaceholder,
          })}
        >
          {text ? formatText(text) : ""}
        </span>
      </div>
    </div>
  );
}
