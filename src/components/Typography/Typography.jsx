import React from "react";

const CorrectTypographyStyling = {
	color: "#D0B3FA",
}

const IncorrectTypographyStyling = {
	color: "#eb5757",
	textDecoration: "underline",
	textDecorationColor: "rgba(235, 87, 87, 0.35)"
}

const Typography = ({children, ...props }) => {
  return (
    <p
      {...props}
    >
      {children}
    </p>
  );
};

export const CorrectTypography = ({ children }) => {
  return <Typography style={CorrectTypographyStyling}>{children}</Typography>;
};

export const IncorrectTypography = ({ children }) => {
  return <Typography color="error" style={IncorrectTypographyStyling}>{children}</Typography>;
};

export default Typography;
