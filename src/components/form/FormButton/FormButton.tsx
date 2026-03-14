import React from "react";
import styles from "./FormButton.module.css";

interface FormButtonProps {
  onClick: () => void;
}

export default function FormButton({ onClick }: FormButtonProps) {
  return (
    <button className={styles.formButton} onClick={onClick}>
      Continue
    </button>
  );
}
