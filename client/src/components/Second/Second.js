import { useEffect, useState } from "react";
import "./Second.css";
import { BASE_URL, FILE_URL } from "../../common/constants.js";

const Second = () => {
  const [dbData, setDbData] = useState({});
  const [uniqueUserName, setUniqueUserName] = useState("Teodor");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`/admins/user/${uniqueUserName}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidW5pcXVlVXNlck5hbWUiOiJUZW9kb3JBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzQmFubmVkIjowLCJpc0RlbGV0ZWQiOjEsImlhdCI6MTY0ODI4OTUxMX0.rbWOzwdi5pvFLvWWDs_rokoKmyfmbmxl2t4QSZkfvRM`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDbData({ ...res });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  }

  if (Object.keys(dbData).length !== 0) {
    return (
      <>
        <p>{dbData.user.uniqueUserName}</p>
        <p>Second</p>
        {dbData.roles.map((role, index) => {
          return <p key={index}>{role.role_name}</p>;
        })}
      </>
    );
  }
};

export default Second;
