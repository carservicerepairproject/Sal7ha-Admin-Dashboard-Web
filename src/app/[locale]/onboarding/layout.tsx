"use client";

import React from "react";
import styles from "./FormLayout.module.css";
import ProgressBar from "@/components/form/ProgressBar/ProgressBar";
import { usePathname } from "next/navigation";
import { getStepIndex } from "./steps";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = getStepIndex(pathname);

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <ProgressBar currentStep={currentStep} />
        <div className={styles.right}>{children}</div>
      </div>
    </section>
  );
}
