import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchProfileAction } from 'redux/action/profileAction';
import { getCompanies } from 'redux/slice/companySlice';
import { AppDispatch } from 'redux/store';

export const AuthLayout = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	console.log('navigate: ', navigate);

	// 
	const path = window.location.pathname;
	useEffect(() => {
		dispatch(fetchProfileAction())
			.unwrap()
			.then((res) => {
				dispatch(getCompanies(res));
				// navigate(path);  because it is redirecting to the reset password page directly without token
			})
			.catch(() => {
				if (!(path === '/forgot-password' || path === '/reset-password')) {
					// navigate('/login');  //For Verify Email
				}
			});
	}, []);

	return <Outlet />;
};
