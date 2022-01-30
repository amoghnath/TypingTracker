import {memo, useRef} from 'react'
import Typography from './Typography'

const nextCharStyling = {
	background: "#fff",
	borderStyle:"none none solid none",
	display: "inline-block",
	whiteSpace: "pre",
	margin: "0px",
	color: "gray"
}

const NextCharTypography = memo(({children, ...props}) => {
	let nextCharRef = useRef();
	return (
		<Typography ref={nextCharRef} id="cursor" style={nextCharStyling}>{children}</Typography>
	)
})

export default NextCharTypography;