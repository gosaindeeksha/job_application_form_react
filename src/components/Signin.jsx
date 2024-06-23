import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Signin Component
function Signin() {
  const navigate = useNavigate();

  // State Definitions
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    interviewTime: null,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    position: false,
    relevantExperience: false,
    portfolioURL: false,
    managementExperience: false,
    additionalSkills: false,
    interviewTime: false,
  });

  // Touched State Handler
  const handleTouchedState = (event) => {
    const name = event.target.name || event.target.getAttribute("name");
    setTouched((prevTouch) => ({
      ...prevTouch,
      [name]: true,
    }));
  };

  // Field Validation
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value && touched.name) error = "Full Name is required";
        break;
      case "email":
        if ((!value || !/\S+@\S+\.\S+/.test(value)) && touched.email)
          error = "A valid email is required";
        break;
      case "phoneNumber":
        if (
          (!value ||
            !/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s]{7,14}$/.test(
              value,
            )) &&
          touched.phoneNumber
        ) {
          error = "A valid phone number is required";
        }
        break;
      case "position":
        if (!value && touched.position) error = "Position is required";
        break;
      case "relevantExperience":
        if (
          (formData.position === "Developer" ||
            formData.position === "Designer") &&
          !value &&
          touched.relevantExperience
        )
          error = "Please fill your Relevent experience";
        break;
      case "portfolioURL":
        if (
          formData.position === "Designer" &&
          (!value || !/^https?:\/\/.*$/.test(value)) &&
          touched.portfolioURL
        )
          error = "A valid Portfolio URL is required";
        break;
      case "managementExperience":
        if (
          formData.position === "Manager" &&
          !value &&
          touched.managementExperience
        )
          error = "Please fill your Management experience";
        break;
      case "additionalSkills":
        if (
          Object.values(formData.additionalSkills).every((skill) => !skill) &&
          touched.additionalSkills
        )
          error = "At least one skill must be selected";
        break;
      case "interviewTime":
        if (!value && touched.interviewTime)
          error = "Preferred Interview Time is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // useEffect to handle validation
  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      validateField(key, value);
    });
  }, [
    formData.name,
    formData.email,
    formData.phoneNumber,
    formData.position,
    formData.relevantExperience,
    formData.portfolioURL,
    formData.managementExperience,
    formData.additionalSkills,
    formData.interviewTime,
    touched,
  ]);

  // Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // DateTime Change Handler
  const handleDateTimeChange = (newValue) => {
    setFormData({
      ...formData,
      interviewTime: newValue,
    });
    setTouched((prevTouch) => ({
      ...prevTouch,
      interviewTime: true,
    }));
  };

  // Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasError = true;
      }
    });

    if (hasError) {
      setErrorMessage("Form has errors. Please fix them before submitting.");
    } else {
      navigate("/success", { replace: true, state: { formData: formData } });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              position: "fixed",
              top: 0,
              zIndex: 9999,
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Job Application
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
                onBlur={handleTouchedState}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email}
                onBlur={handleTouchedState}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                onBlur={handleTouchedState}
              />
              <TextField
                label="Applying for Position"
                variant="outlined"
                fullWidth
                margin="normal"
                name="position"
                value={formData.position}
                onChange={handleChange}
                select
                required
                error={!!errors.position}
                helperText={errors.position}
                onBlur={handleTouchedState}
              >
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </TextField>
              {["Developer", "Designer"].includes(formData.position) && (
                <TextField
                  label="Relevant Experience "
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                  type="text"
                  required
                  error={!!errors.relevantExperience}
                  helperText={errors.relevantExperience}
                  onBlur={handleTouchedState}
                />
              )}
              {formData.position === "Designer" && (
                <TextField
                  label="Portfolio URL"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="portfolioURL"
                  value={formData.portfolioURL}
                  onChange={handleChange}
                  required
                  error={!!errors.portfolioURL}
                  helperText={errors.portfolioURL}
                  onBlur={handleTouchedState}
                />
              )}
              {formData.position === "Manager" && (
                <TextField
                  label="Management Experience"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                  required
                  error={!!errors.managementExperience}
                  helperText={errors.managementExperience}
                  onBlur={handleTouchedState}
                />
              )}

              <Typography variant="body1" component="div">
                Additional Skills:
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="JavaScript"
                      checked={formData.additionalSkills.JavaScript}
                      onChange={handleChange}
                    />
                  }
                  label="JavaScript"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="CSS"
                      checked={formData.additionalSkills.CSS}
                      onChange={handleChange}
                    />
                  }
                  label="CSS"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Python"
                      checked={formData.additionalSkills.Python}
                      onChange={handleChange}
                    />
                  }
                  label="Python"
                />
              </FormGroup>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDateTimePicker
                  label="Preferred Interview Date and Time"
                  value={formData.interviewTime}
                  onChange={handleDateTimeChange}
                  textField={(props) => (
                    <TextField
                      {...props}
                      fullWidth
                      margin="normal"
                      required
                      error={!!errors.interviewTime}
                      helperText={errors.interviewTime}
                      onBlur={handleTouchedState}
                    />
                  )}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button fullWidth size="large" type="submit" variant="outlined">
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default Signin;
