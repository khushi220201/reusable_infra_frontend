import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchProfileAction } from 'redux/action/profileAction';
import { getCompanies } from 'redux/slice/companySlice';
import { AppDispatch } from 'redux/store';

export const AuthLayout = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	// 
	const path = window.location.pathname;
	console.log("🚀 ~ file: index.tsx:13 ~ AuthLayout ~ window.location:", window.location)

	useEffect(() => {
		dispatch(fetchProfileAction())
			.unwrap()
			.then((res) => {
				dispatch(getCompanies(res));
				// navigate(path);  because it is redirecting to the reset password page directly without token
			})
			.catch(() => {
				if (!(path === '/forgot-password' || path === '/reset-password')) {
					navigate('/login');
				}
			});
	}, []);

	return <Outlet />;
};
