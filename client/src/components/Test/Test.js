import { useEffect, useState } from 'react';
import './Test.css';

const Test = () => {

    const [dbData, setDbData] = useState(false);

    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/admins/user/Teodor`, {
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
