import {StepConnector, stepConnectorClasses, styled} from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			width: 10,
			marginLeft: 7,
			marginTop: -20,
			height: '32vh',
			transition: 'all 500ms',
			backgroundImage:
				'linear-gradient( 85deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			width: 10,
			marginLeft: 7,
			marginTop: -20,
			transition: 'all 500ms',
			height: '32vh',
			backgroundImage:
				'linear-gradient( 85deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		marginLeft: 9,

		width: 5,
		height: '28vh',
		maxHeight: '1000px',
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#ffffff',

		borderRadius: 7,
	},
}));

export default ColorlibConnector