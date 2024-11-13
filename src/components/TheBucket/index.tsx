import React, { memo, useCallback, useState } from "react";

import { useAnalytics } from "@/hooks/useAnalytics";
import * as styles from "./index.module.scss";
import Countdown from "../Countdown";

type BucketProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  batchSize: number;
  onBatchFull: () => void;
};

const Bucket = memo(({ batchSize, onBatchFull, ...rest }: BucketProps) => {
  const { track } = useAnalytics();
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const newCount = count + 1;
    const isBatchFull = newCount % batchSize === 0;
    track("bucketCount", { challenge: "Bucket", count: newCount });
    setCount(prev => prev + 1);
    if (isBatchFull) onBatchFull();
  }

  return (
    <button type="button" onClick={updateCount} className={styles.button} {...rest}>
        {count} glasses poured
    </button>
  );
});

const ThreeButtons = (): JSX.Element => {
  const { track } = useAnalytics();

  const [batchCount, setBatchCount] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const handleFullBatch = () => {
    const newBatchCount = batchCount + 1;
    track("bucketBatchCount", { challenge: "Bucket", batchCount: newBatchCount });
    setBatchCount((current) => current + 1);
  }

  return (
    <>
    {timeIsUp && <h1>Total {batchCount}</h1>}
    {!timeIsUp && !!batchCount && <Countdown key={(new Date()).toISOString()} seconds={5} label="" onFinish={() => setTimeIsUp(true)} challenge="Bucket" />}
    <Bucket onBatchFull={handleFullBatch} batchSize={3} disabled={timeIsUp} />
    </>
  );
};

export default ThreeButtons;
