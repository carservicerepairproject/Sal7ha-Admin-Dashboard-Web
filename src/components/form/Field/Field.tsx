import React from "react";
import styles from "./Field.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  span?: number;
};

export default function Field({ span = 12, className = "", ...props }: Props) {
  return (
    <input
      {...props}
      className={`${styles.input} ${styles[`span${span}`]} ${className}`}
    />
  );
}