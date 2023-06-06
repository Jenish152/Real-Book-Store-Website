import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import categoryservices from "../../../sevices/category.service";
import Shared from "../../../utils/shared";
import {Input} from "@material-ui/core";
import {
  TextField,
  Button,
  Container,
  Stack,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const EditCategory = () => {
    const navigate = useNavigate();
    const initialValues = { name: "" };
    const [initialValueState, setInitialValueState] = useState(initialValues);
    const { id } = useParams();
  
    useEffect(() => {
      if (id) getCategoryById();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Category Name is required"),
    });
  
    const getCategoryById = () => {
      categoryservices.getById(Number(id)).then((res) => {
        setInitialValueState({
          id: res.result.id,
          name: res.result.name,
        });
      });
    };
  
    const onSubmit = (values) => {
      categoryservices
        .save(values)
        .then((res) => {
          toast.success("Successfully updated Category");
          navigate("/category");
        })
        .catch((e) => toast.error("Some error Occured"));
    };
  return (
    <React.Fragment>
      <Container>
      <Typography className="heading" variant="h1">{id ? "Edit" : "Add"} Category</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setValues,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
             
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label=" Name"
                  onChange={handleChange}
                  value={values.name}
                  fullWidth
                  name="name"
                  sx={{mb: 4}}
                />
                
               <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                  sx={{mr: 1}}
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
                    navigate("/category");
                  }}
                >
                  Cancel
                </Button>
            </form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default EditCategory;
