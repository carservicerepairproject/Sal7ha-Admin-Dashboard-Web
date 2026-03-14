import React from "react";
import styles from "./ProgressBar.module.css";
import { STEPS } from "@/app/[locale]/onboarding/steps";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className={styles.stepper}>
      {STEPS.map((step, index) => {
        const completed = index === 0 || index < currentStep;
        const active = index !== 0 && index === currentStep;

        return (
          <div
            key={step.key}
            className={`${styles.stepItem} ${active ? styles.stepItemActive : ""}`}
          >
            <div className={styles.stepTrack}>
              <div
                className={`${styles.progressCircle} ${
                  completed ? styles.completed : ""
                } ${active ? styles.active : ""}`}
              >
                {completed && (
                  <svg width="20" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={`${styles.connector} ${
                    completed ? styles.connectorFilled : ""
                  }`}
                />
              )}
            </div>
            <span
              className={`${styles.stepLabel} ${
                active ? styles.stepLabelActive : ""
              } ${completed ? styles.stepLabelCompleted : ""}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
