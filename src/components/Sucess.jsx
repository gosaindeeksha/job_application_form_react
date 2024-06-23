import React from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function Success() {
  const location = useLocation();
  if (location.state) {
    const formData = location.state.formData;
    const additionInfo = formData.additionalSkills;
    const formattedInterviewTime = dayjs(formData.interviewTime.$d).format(
      "MMMM D YYYY, h:mm A"
    );

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Welcome {formData.name}!
        </Typography>
        <Typography variant="h6" component="h2">
          Your Name: {formData.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Your email: {formData.email}
        </Typography>
        <Typography variant="h6" component="h2">
          Your phone number: {formData.phoneNumber}
        </Typography>
        <Typography variant="h6" component="h2">
          Applying for position : {formData.position}
        </Typography>
        <Typography variant="h6" component="h2">
          {["Manager"].includes(formData.position)
            ? "Your Management Experience"
            : "Your Relevant experience"}{" "}
          : {formData.relevantExperience}
        </Typography>
        {formData.position === "Designer" ? (
          <Typography variant="h6" component="h2">
            Your Portfolio URL : {formData.portfolioURL}
          </Typography>
        ) : null}
        <Typography variant="h6" component="h2">
          Additional Skills :
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            {Object.keys(additionInfo).map((key) => {
              const value = additionInfo[key];
              return value ? (
                <li key={key}>
                  <Typography variant="body1" component="span">
                    {key}
                  </Typography>
                </li>
              ) : null;
            })}
          </ul>
        </Typography>
        <Typography variant="h6" component="h2">
          Preffered Interview Date and Time:{formattedInterviewTime}
        </Typography>
      </ThemeProvider>
    );
  } else {
    return <div></div>;
  }
}
export default Success;
