import React from "react";
import styles from "./SelectField.module.css";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  span?: number;
};

export default function SelectField({
  span = 12,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <select
      {...props}
      className={`${styles.select} ${styles[`span${span}`]} ${className}`}
    >
      {children}
    </select>
  );
}
