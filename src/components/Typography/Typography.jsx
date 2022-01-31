import React from "react";

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
};

const CorrectTypographyStyling = {
	color: "#006eff",
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
