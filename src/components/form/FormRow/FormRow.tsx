import React from "react";
import styles from "./FormRow.module.css";

type Props = {
  label: React.ReactNode;
  children: React.ReactNode;
  layout?: "grid" | "horizontal";
};

export default function FormRow({ label, children, layout = "grid" }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>

      <div
        className={`${styles.fields} ${
          layout === "horizontal" ? styles.horizontal : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
