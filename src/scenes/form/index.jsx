import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const Navigate = useNavigate()
  const handleFormSubmit = async (values) => {

    values.preventDefault();
    const email = values.email
    const name = values.firstName + values.lastName
    const password = values.EnterPassword;

    if (!email && !password && !name) {
      window.alert("all fields are need to be not filled")
    }
    else {
      const formdata = new FormData();
      formdata.append('email', `${values.email}`);
      formdata.append('name', `${values.firstName}`);
      formdata.append('password', `${password}`);

      console.log(formdata, "lllllllllllllllllllllll");

      await axios.post("http://localhost:3001/admin/signup", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(function (response) {
        console.log(response.status, "KKDedE@D#DD#")
        if (response.data.status === true) {

          Navigate("/Dashboard/addroles");
        }

      }).catch((err) => {


        window.alert(err)
        return Promise.reject(err)
      })


    }


  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Enter Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.EnterPassword}
                name="EnterPassword"
                error={!!touched.EnterPassword && !!errors.EnterPassword}
                helperText={touched.EnterPassword && errors.EnterPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Zipcode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Zipcode}
                name="Zipcode"
                error={!!touched.Zipcode && !!errors.Zipcode}
                helperText={touched.Zipcode && errors.Zipcode}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.City}
                name="City"
                error={!!touched.City && !!errors.City}
                helperText={touched.City && errors.City}
                sx={{ gridColumn: "span 4" }}
              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  address1: yup.string().required("required"),

  EnterPassword: yup.string().required("required"),
  Zipcode: yup.string().required("required"),
  City: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  EnterPassword: "",
  Zipcode: "",
  City: "",
};

export default Form;
