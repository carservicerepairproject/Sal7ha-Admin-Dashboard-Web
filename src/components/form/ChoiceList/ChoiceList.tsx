import React from "react";
import styles from "./ChoiceList.module.css";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  span?: number;
  name?: string;
};

export default function ChoiceList({
  options,
  value,
  onChange,
  span = 12,
  name = "simple-choice",
}: Props) {
  return (
    <div className={`${styles.container} ${styles[`span${span}`]}`}>
      <div className={styles.list} role="radiogroup" aria-label={name}>
        {options.map((opt) => {
          const selected = opt.value === value;

          return (
            <label
              key={opt.value}
              className={`${styles.item} ${opt.disabled ? styles.disabled : ""}`}
            >
              <input
                className={styles.input}
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                disabled={opt.disabled}
                onChange={() => onChange(opt.value)}
              />
              <span
                className={`${styles.circle} ${selected ? styles.circleSelected : ""}`}
                aria-hidden="true"
              />
              <span className={styles.text}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
