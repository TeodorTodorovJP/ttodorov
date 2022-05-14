import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  // incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";
import styles from "./Counter.module.css";
import { useGetSignTokenMutation } from "./counterAPI";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;
  const [getToken, { data, error, isLoading }] = useGetSignTokenMutation();

  const getTokenFn = async () => {
      try {
        await getToken({
          uniqueUserName: "TeodorAdmin",
          password: "myPass23*",
        }).unwrap()
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <p>Fetched Token by RTK {data ? data.token : 'waiting'}</p>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => getTokenFn()}
        >
          Fetch
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          // onClick={() => dispatch(incrementAsync(incrementValue)).unwrap()
          //   .then((originalPromiseResult) => {
          //     // handle result here
          //   })
          //   .catch((rejectedValueOrSerializedError) => {
          //     console.log(rejectedValueOrSerializedError)
          //   })}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
