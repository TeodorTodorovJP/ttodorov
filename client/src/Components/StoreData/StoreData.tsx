import "./StoreData.css";
import { Outlet } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectState, updateCurrentData } from "./storeDataSlice";
import { useStoreDataMutation } from "./storeDataAPI";

export default function StoreData() {
  const { inputValue, inputDescription } = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const [storeData, { data, error, isLoading }] = useStoreDataMutation();

  const storeDataFn = async (type: string, data: string) => {
    try {
      await storeData({
        uniqueUserName: "TeodorAdmin",
        password: "myPass23*",
        type: type,
        data: data,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "type")
      dispatch(updateCurrentData({ type: "type", value: inputValue }));
    if (name === "data")
      dispatch(updateCurrentData({ type: "data", value: inputDescription }));
  };

  return (
    <>
      <div className="StoreData">
        <h1>Insert Data</h1>
        <span className="close-btn"></span>
        <form onSubmit={() => storeDataFn(inputValue, inputDescription)}>
          <div>
            <input
              onChange={handleInputChange}
              name="type"
              defaultValue="Type of data"
            />
          </div>
          <div>
            <input
              onChange={handleInputChange}
              name="data"
              defaultValue="Your data"
            />
          </div>
          <div>
            <button type="submit">Submit Data</button>
          </div>
        </form>
      </div>
      <Outlet />
    </>
  );
}
