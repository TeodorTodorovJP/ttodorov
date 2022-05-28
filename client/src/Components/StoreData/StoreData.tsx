import "./StoreData.css";
import { Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectState, updateCurrentData } from "./storeDataSlice";
import { useStoreDataMutation, useGetDataQuery } from "./storeDataAPI";
import { useEffect, useState } from "react";

export default function StoreData() {
  const { inputType, inputDescription } = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const [submitError, setSubmitError] = useState(false);

  const [storeData] = useStoreDataMutation();

  const [queryTrigger, setQueryTrigger] = useState(1);
  const { data: dbData } = useGetDataQuery(queryTrigger);

  const [showDbData, setShowDbData] = useState(false);
  const showData = () => {
    setShowDbData(!showDbData);
  };
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:5000/users/getData`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       console.log("Called from fetch");
  //       return res;
  //     });
  // }, []);

  const storeDataFn = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string,
    data: string
  ) => {
    e.preventDefault();
    if (type === "" || data === "") {
      console.log("Enter some data");
      setSubmitError(!submitError);
      return;
    }
    try {
      await storeData({
        type: type,
        data: data,
      }).unwrap();

      //dispatch(updateCurrentData({ type: "type", value: "" }));
      //dispatch(updateCurrentData({ type: "data", value: "" }));
      setQueryTrigger(queryTrigger + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updateCurrentData({ type: name, value: value }));
  };

  return (
    <>
      <div className="StoreData">
        <h1>Insert Data</h1>
        <span className="close-btn"></span>
        <form onSubmit={(e) => storeDataFn(e, inputType, inputDescription)}>
          <div>
            <input
              onChange={(e) => handleInputChange(e)}
              name="type"
              defaultValue="Type of data"
              value={inputType}
            />
          </div>
          <div>
            <input
              onChange={(e) => handleInputChange(e)}
              name="data"
              defaultValue="Data"
              value={inputDescription}
            />
          </div>
          <div className="submitBtn">
            {submitError ? <p>Enter data in both fields</p> : null}
            <button type="submit" name="submit">
              Submit Data
            </button>
          </div>
        </form>
        <button type="button" className="showBtn" onClick={() => showData()}>
          Show data
        </button>
        {showDbData ? (
          dbData && dbData.length !== 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {dbData.map((x: any, index: number) => (
                  <tr key={index + x.idstore_data}>
                    <td>{x.type}</td>
                    <td>{x.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data</p>
          )
        ) : null}
      </div>
      <Outlet />
    </>
  );
}
