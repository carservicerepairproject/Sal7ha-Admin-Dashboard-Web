import React from "react";
import styles from "./TextareaField.module.css";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  span?: number;
};

export default function TextareaField({
  span = 12,
  className = "",
  ...props
}: Props) {
  return (
    <textarea
      {...props}
      className={`${styles.textarea} ${styles[`span${span}`]} ${className}`}
    />
  );
}