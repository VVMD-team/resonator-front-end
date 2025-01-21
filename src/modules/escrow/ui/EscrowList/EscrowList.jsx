import styles from "./EscrowList.module.css";

import EscrowItem from "./EscrowItem";

const EscrowList = ({ list = [], title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <p className={styles.container__title}>{title}</p>
        <p className={styles.container__divider}>
          -----------------------------------------
        </p>
      </div>
      <div className={styles.container__list}>
        {list.length > 0 ? (
          list.map((item) => <EscrowItem {...item} key={item.id} />)
        ) : (
          <p style={{ color: "#808080" }}>Empty</p>
        )}
      </div>
    </div>
  );
};

export default EscrowList;
