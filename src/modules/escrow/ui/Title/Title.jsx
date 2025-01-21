import styles from "./Title.module.css";

import cn from "classnames";

const Title = ({ text, className }) => (
  <h1 className={cn(styles.title, className)}>{text}</h1>
);

export default Title;
