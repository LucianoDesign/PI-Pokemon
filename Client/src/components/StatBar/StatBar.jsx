/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./StatBar.module.css";

const StatBar = ({ statValue, maxValue }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const percentage = (statValue / maxValue) * 100;
      setWidth(percentage);
    }, 100);
  }, [statValue, maxValue]);

  return (
    <div className={styles.statBar}>
      <div className={styles.progressBar} style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default StatBar;
