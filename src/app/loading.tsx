"use client";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import styles from "../styles/Home.module.css";

export default function Loading(): JSX.Element {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div>
          <h1 className={styles.title}>Guess the Player</h1>
        </div>
        <h2></h2>
        <div className={styles.transfersContainer}>
          <div className={styles.circleWithArrowLoader}>
            <div className={styles.clubs}>
              <div className={styles.club}>
                <div className={styles.circle}></div>
                <div className={styles.year}></div>
              </div>
            </div>
            <CircleWithArrowLoader />
            <CircleWithArrowLoader />
            <CircleWithArrowLoader />
          </div>
        </div>
        <div className={styles.inputContainerLoader}>
          <div className={styles.inputloader} />
        </div>

        <h3>Want to play more?</h3>
        <div className={styles.buttonLoader}></div>
      </div>
    </div>
  );
}

function CircleWithArrowLoader(): JSX.Element {
  return (
    <div className={styles.circleWithArrowLoader}>
      <DoubleArrowIcon className={styles.arrow} />
      <div className={styles.club}>
        <div className={styles.circle}></div>
        <div className={styles.year}></div>
      </div>
    </div>
  );
}
