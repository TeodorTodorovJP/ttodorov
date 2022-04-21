import { useEffect, useState } from 'react';
import './Test.css';
import { BASE_URL, FILE_URL } from "../../common/constants.js";

const Test = () => {

    const [dbData, setDbData] = useState(false);
    const [uniqueUserName, setUniqueUserName] = useState('Teodor');

    useEffect(()=>{
        fetch(`${BASE_URL}/admins/user/${uniqueUserName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidW5pcXVlVXNlck5hbWUiOiJUZW9kb3JBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzQmFubmVkIjowLCJpc0RlbGV0ZWQiOjEsImlhdCI6MTY0ODI4OTUxMX0.rbWOzwdi5pvFLvWWDs_rokoKmyfmbmxl2t4QSZkfvRM`,
            }
        }).then(res => res.json())
        .then(res => {
            setDbData(res)
        })
    }, [])

    return (
        <>
            <p>The current user is {dbData.uniqueUserName} new</p>
        </>
    )
}

export default Test;
