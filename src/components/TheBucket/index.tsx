import React, { memo, useCallback, useEffect, useState } from "react";

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

  const updateCount = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  useEffect(() => {
    const batchFull = count % batchSize === 0 && count > 1;

    if (batchFull) {
      onBatchFull();
    }

    if (count > 0) {
      track("bucketCount", { challenge: "Bucket", count });
    }
  }, [count, batchSize, onBatchFull, track]);

  return (
    <button type="button" onClick={updateCount} className={styles.button} {...rest}>
        {count} glasses poured
    </button>
);
});

const ThreeButtons = (): JSX.Element => {
  const [batchCount, setBatchCount] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const handleFullBatch = useCallback(() => {
    setBatchCount((current) => current + 1);
  }, []);

  return (
    <>
        {timeIsUp && <h1>Total {batchCount}</h1>}
        {!timeIsUp && !!batchCount && <Countdown key={(new Date()).toISOString()} seconds={5} label="" onFinish={() => setTimeIsUp(true)} />}
        <Bucket onBatchFull={handleFullBatch} batchSize={3} disabled={timeIsUp} />
    </>
  );
};

export default ThreeButtons;
