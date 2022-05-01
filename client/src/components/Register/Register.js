import "./Register.css";
import { BASE_URL, FILE_URL } from "../../common/constants.js";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { validateRegistrationField } from "../../providers/Validations.js";
import { Outlet } from "react-router-dom";

const Register = ({ history, location, match }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState(null);

  const [validFormFields, setValidFormFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clik");
    // setLoading(true);

    // fetch(`/users`, {
    //   method: "POST",
    //   body: JSON.stringify(),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.error) {
    //       throw new Error(res.error);
    //     }
    //   })
    //   .catch((err) => setError(err.message))
    //   .finally(() => setLoading(false));
  };;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let fields = { ...validFormFields };
    fields[name] = !validateRegistrationField(name, value);

    setValidFormFields(fields);

    let areFieldsValid = false;
    Object.keys(validFormFields).forEach((field) => {
      if (validFormFields[field] === true) {
        areFieldsValid = false;
      }
    });
    setIsFormValid(areFieldsValid);
  };

  if (error) {
    setError(null);
    setPopUpMessage(error);
    setModalShow(true);
  }

  // if (loading) {
  //   return <div></div>;
  // }
  return (
    <>
      <div className="form-container">
        <h1>Log In</h1>
        <span className="close-btn">
          <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"></img>
        </span>
        <form>
          <div>
            <input
              id="outlined-error-helper-text"
              label="Your name"
              onChange={handleInputChange}
              name="name"
              defaultValue="Teodor Todorov"
            />
          </div>
          <div>
            <input
              id="outlined-error-helper-text"
              label="Your email"
              onChange={handleInputChange}
              name="email"
              defaultValue="ttodorov.jp@gmail.com"
            />
          </div>
          <div>
            <input
              id="outlined-error-helper-text"
              label="Your password"
              onChange={handleInputChange}
              name="password"
              defaultValue="Your password"
            />
          </div>
          <div>
            <button variant="contained" type="submit" disabled={!isFormValid}>
              Register
            </button>
          </div>
        </form>
      </div>
      <Outlet />
    </>
  );
};

export default Register;
