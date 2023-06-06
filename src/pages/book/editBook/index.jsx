import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import bookServices from "../../../sevices/book.service";
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

const EditBook = () => {
  const [categories, setCategories] = useState([]);
 
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getBookById();
    categoryservices.getAll().then((res) => {
      setCategories(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    bookServices.getById(Number(id)).then((res) => {
      console.log("fetch",res);
      setInitialValueState({
        id: res.id,
        name: res.name,
        price: res.price,
        categoryId: res.categoryId,
        description: res.description,
        base64image: res.base64image,
      });
    });
  };

  const onSubmit = (values) => {
    bookServices
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? "Record Updated successfully"
            : "Record created successfully"
        );
        navigate("/book");
      })
      .catch((e) => toast.error("Some Error Occure"));
  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 500000) {
          toast.error("File size must be less then 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };
  return (
    <React.Fragment>
      <Container>
      <Typography className="heading" variant="h1">{id ? "Edit" : "Add"} Book</Typography>
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
                  label="Book Name"
                  onChange={handleChange}
                  value={values.name}
                  fullWidth
                  name="name"
                  sx={{mb: 4}}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Book price"
                  onChange={handleChange}
                  value={values.price}
                  fullWidth
                  required
                  name="price"
                  sx={{mb: 4}}
                />
                <FormControl
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 4 }}
                  required
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={values.categoryId}
                    label="categories"
                    name="categoryId"
                    onChange={handleChange}
                  >
                    {categories.map((rl) => (
                      <MenuItem value={rl.id} key={"category" + rl.id}>
                        {rl.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Description"
                  onChange={handleChange}
                  value={values.description}
                  fullWidth
                  required
                  name="description"
                  sx={{mb: 4}}
                />
                  {!values.base64image && (<TextField
                    name="base64image"
                    type="file"
                    label="upload"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onChange={(e) => {
                      onSelectFile(e, setFieldValue, setFieldError);
                    } }
                    sx={{mb: 4}}
                    />)
                 } 
                  {values.base64image && (
                    <div className="uploaded-file-name mb-2">
                      <em>
                        <img src={values.base64image} alt="" height={"50px"} width={"50px"}/>
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("base64image", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                
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
                    navigate("/book");
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

export default EditBook;
