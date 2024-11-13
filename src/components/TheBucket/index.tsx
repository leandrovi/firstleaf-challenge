import React, {useState} from "react";
import * as styles from './index.module.scss';
import Countdown from "../Countdown";

const Bucket = ({batchSize, onBatchFull, ...rest}) => {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        const batchFull = count % batchSize === 0 && count > 1;
        setCount(count + 1);
        if (batchFull) {
            onBatchFull(batchSize);
        }
    }

    return (
        <button type="button" onClick={updateCount} className={styles.button} {...rest}>
            {count} glasses poured
        </button>
    );
};

const ThreeButtons = (): JSX.Element => {
    const [batchCount, setBatchCount] = useState(0);
    const [timeIsUp, setTimeIsUp] = useState(false);


    const handleFullBatch = () => {
        setBatchCount(batchCount + 1);
    }

    return (
        <>
            {timeIsUp && <h1>Total {batchCount}</h1>}
            {!timeIsUp && !!batchCount && <Countdown key={(new Date()).toISOString()} seconds={5} label="" onFinish={() => setTimeIsUp(true)} />}
            <Bucket onBatchFull={handleFullBatch} batchSize={3} disabled={timeIsUp} />
        </>
    );
};

export default ThreeButtons;
