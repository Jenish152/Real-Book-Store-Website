import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { TextField, Button, Container, Stack,FormControl,Select , InputLabel, MenuItem } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../../sevices/user.service";
import { Formik } from "formik";

import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/auth.context";
import Shared from "../../../utils/shared";

const EditUser = () => {
  const authContext = useAuthContext();
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const initialValues = {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    roleId: 3,
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getUserById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (user && roles.length) {
      const roleId = roles.find((role) => role.name === user?.role)?.id;
      setInitialValueState({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        roleId,
        password: user.password,
      });
    }
  }, [user, roles]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    roleId: Yup.number().required("Role is required"),
  });

  const getRoles = () => {
    userService.getAllRoles().then((res) => {
      if (res) {
        setRoles(res);
      }
    });
  };

  const getUserById = () => {
    userService.getById(Number(id)).then((res) => {
      if (res) {
        setUser(res);
      }
    });
  };

  const onSubmit = (values) => {
    const updatedValue = {
      ...values,
      role: roles.find((r) => r.id === values.roleId).name,
    };
    userService
      .update(updatedValue)
      .then((res) => {
        if (res) {
          toast.success("User Updated...");
          navigate("/user");
        }
      })
      .catch((e) => toast.error("User NOT UPDATED!!!"));
  };
  return (
      <div className="container">
        <h1 classname="heading">Edit User</h1>
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
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
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
                        fullWidth
                        required
                        name="lastName"
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
                {values.id !== authContext.user.id && (
                   <FormControl color='primary' variant='outlined' sx={{mb: 4}}
                   disabled={values.id === authContext.user.id}
                   required fullWidth>
                         <InputLabel id="demo-simple-select-label">Role</InputLabel>   
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant='outlined'
                                    value={values.roleId}
                                    disabled={values.id === authContext.user.id}
                                    label="role"
                                    name="roleId"
                                    onChange={handleChange}
                                >
                                  {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                                </Select>
                </FormControl>
                  
                )}
              </div>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
  );
};

export default EditUser;