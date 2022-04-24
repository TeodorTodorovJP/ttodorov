import "./Register.css";
import { BASE_URL, FILE_URL } from "../../common/constants.js";
import { useState, useEffect, useContext } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = ({ history, location, match }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    fetch(`/users`, {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  };

  if (error) {
    setError(null);
    setPopUpMessage(error);
    setModalShow(true);
  }

  if (loading) {
    return <div></div>;
  }
  return (
    <>
      <p>This is Register</p>
    </>
  );
};

export default Register;
