import React from "react";
import styles from "./ChoiceBox.module.css";

type Option = {
  value: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  span?: number;
};

export default function ChoiceBox({
  options,
  value,
  onChange,
  span = 12,
}: Props) {
  return (
    <div className={`${styles.container} ${styles[`span${span}`]}`}>
      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={`${styles.box} ${
              selected ? styles.selected : ""
            } ${opt.disabled ? styles.disabled : ""}`}
          >
            <div className={styles.icon}>{opt.icon}</div>
            <div className={styles.label}>{opt.label}</div>
          </button>
        );
      })}
    </div>
  );
}