import { default as React } from 'react';
import { ThemeProvider } from '@material-ui/styles';



const BackofficeLayout = ({children}) => {
	return (
		<ThemeProvider>
			{children}
		</ThemeProvider>

	);
};

export default BackofficeLayout;