import { LoginLayoutBody } from 'components/Login';
import { RegistrationLayout } from 'layouts';
import { FORMDATA } from 'constants/Data';
import { loginAction } from 'redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from 'redux/slice/companySlice';
import { useState } from 'react';
import { fetchProfileAction } from 'redux/action/profileAction';

// Register page
const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (values: any) => {
		setIsLoading(true);
		dispatch(loginAction(values) as any)
			.unwrap()
			.then((res: any) => {
				dispatch(fetchProfileAction() as any).then(() => {
					setIsLoading(false);
					dispatch(getCompanies(res));
					navigate('/');
				});
			})
			.catch(() => {
				setIsLoading(false);
				navigate('/login');
			});
	};
	// JSX
	return (
		<RegistrationLayout>
			<LoginLayoutBody
				title="Register"
				description="<p>
							Welcome to <strong> Animal Planet! </strong>Please Enter your
							Details.
						</p>"
				formData={FORMDATA.registerFields}
				buttonTitle={'Register Now!'}
				action={loginAction}
				redirectUrl="/forgot-password"
				redirectText="Forgot password?"
				btnIntuit={'Sign in with Intuit'}
				btnXero={'Sign in with Xero'}
				onSubmit={onSubmit}
				isLoading={isLoading}
				accountText={"Already have an account?"}
				accountUrl={'Login Now!'}
			></LoginLayoutBody>
		</RegistrationLayout>
	);
};

export default Register;
