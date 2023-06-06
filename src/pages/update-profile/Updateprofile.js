import React, { useContext, useState } from "react";
import { TextField, Button, Stack } from '@mui/material';
import { authContext, useAuthContext } from "../../context/auth.context";
import { Formik } from "formik";
import * as Yup from "yup";

import userService from "../../sevices/user.service";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    
    const navigate = useNavigate();
    const { user,setUser } = useContext(authContext);
     

  const initialValueState = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    newPassword: "",
    confirmPassword: "",
  };

  // const [initialValueState, setinitialValueState] = useState({
  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     newPassword: "",
  //     confirmPassword: ""
  //   }
  // );
  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 charactor is required"),
    confirmPassword: updatePassword
      ? Yup.string()
          .required("Must required")
          .oneOf([Yup.ref("newPassword")], "Passwords is not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
  });

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : user.password;
    delete values.confirmPassword;
    delete values.newPassword;

    const data = Object.assign(user, { ...values, password });
    delete data._id;
    delete data.__v;
    const res = await userService.updateProfile(data);
    if (res) {
      setUser(res);
      toast.success("Update Profile Successfully...");
      navigate("/");
    }
  };

  return (
      <div className="container">
        <h1 className="heading">Update-Profile</h1>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <form action="" onSubmit={handleSubmit}>
              <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="First Name"
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Last Name"
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='primary'
                    label="Email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='primary'
                    label="Password"
                    value={values.newPassword}
                    onChange={(e) => {
                      e.target.value !== ""
                        ? setUpdatePassword(true)
                        : setUpdatePassword(false);
                      handleChange(e);
                    }}
                    fullWidth
                    sx={{mb: 4}}
                    name="newPassword"
                />
                 <TextField
                    type="password"
                    variant='outlined'
                    color='primary'
                    label="Password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    
                    fullWidth
                    sx={{mb: 4}}
                    name="confirmPassword"
                />
                <div className="btn-wrapper">
                  <Button
                    className="green-btn btn"
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button
                    className="pink-btn btn"
                    variant="contained"
                    type="submit"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
  );
};

export default UpdateProfile;