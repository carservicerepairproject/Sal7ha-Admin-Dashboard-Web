import React from "react";
import styles from "./ColumnSelectionBar.module.css";

interface SelectionColumn {
  label: string;
  isSelected: boolean;
}

const selectionColumns: SelectionColumn[] = [
  { label: "Owner name", isSelected: false },
  { label: "Price", isSelected: false },
  { label: "Car Owner", isSelected: false },
  { label: "Car Owner", isSelected: false },
];

export default function ColumnSelectionBar() {
  return (
    <div className={styles.bar}>
      {selectionColumns.map((selection, index) => (
        <div key={index} className={styles.item}>
          <input
            className={styles.checkBox}
            type="checkbox"
            defaultChecked={selection.isSelected}
          />
          <span>{selection.label}</span>
        </div>
      ))}
    </div>
  );
}
