import { Col, Image, Row, Select } from 'antd';
import UserProfileModal from 'components/Profile';
// import { SettingsBody } from 'components/settings';
// import SettingsLayout from 'layouts/Settings';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from 'redux/slice/loginSlice';
import { clearRedux as clearReduxRole } from 'redux/slice/roleTableSlice';
import { clearRedux as clearReduxUser } from 'redux/slice/userSlice';
// import SideDrawerWrapper from '../SideDrawerWrapper';
import UserNameBox from '../UserNameBox';
import styles from './index.module.scss';
import './index.scss';

// Website header
const Header = () => {
	// Inits
	const [drawerAnimation, setDrawerAnimation] = useState<boolean>(false);
	console.log("🚀 ~ file: index.tsx:20 ~ Header ~ drawerAnimation:", drawerAnimation)
	const [isSideDrawerOpen, setSideDrawerOpen] = useState<boolean>(false);
	// const [selectedSidebar, setSelectedSidebar] = useState<string>('users');
	const [drawerInfo] = useState({
		drawerTitle: 'Settings',
	});
	console.log("🚀 ~ file: index.tsx:26 ~ Header ~ drawerInfo:", drawerInfo)
	const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
	const [organizationOptions, setOrganizationOptions] = useState<any>([]);
	const [selectedOrganization, setSelectedOrganization] = useState<any>(
		localStorage.getItem('companyId') || ''
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data: userData } = useSelector((state: any) => state?.userProfile);

	console.log(userData, "asasaaaaaaaaaa");
	useEffect(() => {
		const companies = userData?.companies?.map((company: any) => {
			return {
				companyId: company.company?.id,
				// companyId: company.company?.companyName,

				companyName: company.company?.companyName,
			};
		});
		console.log("🚀 ~ file: index.tsx:47 ~ companies ~ companies:", companies)
		setOrganizationOptions(companies);
	}, [userData]);

	// For remove from the dom
	// const removeDrawerFromDom = () => {
	// 	setSideDrawerOpen(false);
	// };
	// For open the sideDrawer with animation
	const openDrawerHandler = () => {
		setDrawerAnimation(true);
		setSideDrawerOpen(true);
	};
	console.log("🚀 ~ file: index.tsx:56 ~ openDrawerHandler ~ openDrawerHandler:", openDrawerHandler)

	// For perform the close animation
	// const closeDrawerByAnimation = () => {
	// 	setDrawerAnimation(false);
	// };

	// for handle the change of the sidebar
	// const sideBarChangeHandler = (selectedValue: any) => {
	// 	setSelectedSidebar(selectedValue.key);
	// };

	// Logout Handler

	const logoutHandler = () => {
		dispatch(logoutAction() as any)
			.unwrap()
			.then(() => {
				navigate('/login');
			})
			.catch((err: any) => {
				console.log(err);
				navigate('/');
			});
	};

	// My Profile Handler
	const myProfileHandler = () => {
		setProfileModalOpen(true);
	};

	const profileCancel = () => {
		setProfileModalOpen(false);
	};

	const organizationChangeHandler = (e: any, data: any) => {
		localStorage.setItem('companyId', e);
		localStorage.setItem('companyName', data?.children);
		setSelectedOrganization(e);
	};

	userData?.companies?.find(
		(singleCompany: any) => singleCompany.companyId === selectedOrganization
	);

	// clearing the redux when side drawer gets closed
	useEffect(() => {
		if (!isSideDrawerOpen) {
			dispatch(clearReduxUser());
			dispatch(clearReduxRole());
		}
	}, [isSideDrawerOpen]);
	// JSX
	return (
		<>
			<header className={styles['header']}>
				<Row
					className={styles['header__wrapper']}
					align={'middle'}
					justify={'space-between'}
				>
					<Col className={styles['header__details-left']}>
						<div className={styles['header__details-left--logo']}>
							<Image
								src="/assets/images/animal_planet_logo.png"
								preview={false}
								alt="group"
							/>
						</div>
					</Col>
					<Col className={styles['header__details-right']}>
						{organizationOptions?.length > 0 && (
							<Select
								placeholder="Select Organization"
								className={styles['header__details-right--organization']}
								onChange={(e, data) => organizationChangeHandler(e, data)}
								defaultValue={
									selectedOrganization == 'undefined'
										? 'Select Organization'
										: selectedOrganization
								}
							>
								{organizationOptions?.map((company: any, key: number) => (
									<Select.Option value={company?.companyId} key={key}>
										{company?.companyName}
									</Select.Option>
								))}
							</Select>
						)}

						<div
							className={styles['header__details-right--settings']}
							onClick={() => { navigate('/settings/users') }}
						>
							<Image
								src="/assets/images/settings.png"
								preview={false}
								alt="group"
							/>
						</div>

						<div className={styles['header__details-right--user']}>
							<div className={styles['header__details-right--user-logo']}>
								<UserNameBox
									name={`${userData?.firstName} ${userData?.lastName}`}
									imageUrl={
										userData?.profileImg &&
										`${process.env.REACT_APP_AWS_BASE_URL}${userData?.profileImg}`
									}
								/>
							</div>
							<div className={styles['header__details-right--user-details']}>
								<p className={styles['header__details-right--user-name']}>
									{userData?.firstName} {userData?.lastName}
								</p>
								<p
									className={styles['header__details-right--user-profile']}
									onClick={myProfileHandler}
								>
									My Profile
								</p>
							</div>
						</div>
						<div className={styles['header__details-right--user-logout']}>
							<Image
								src="/assets/images/logout.png"
								preview={false}
								alt="group"
								onClick={logoutHandler}
							/>
						</div>
					</Col>
				</Row>
			</header>

			{/* {isSideDrawerOpen && (
				<SideDrawerWrapper
					isOpen={drawerAnimation}
					removeDrawerFromDom={removeDrawerFromDom}
					closeDrawerByAnimation={closeDrawerByAnimation}
					headerTitle={drawerInfo.drawerTitle}
					position="bottom"
					width="full"
				>
					<SettingsLayout
						onSideBarChange={sideBarChangeHandler}
						selectedSidebar={selectedSidebar}
					>
						<SettingsBody selectedSidebar={selectedSidebar} />
					</SettingsLayout>
				</SideDrawerWrapper>
			)} */}

			{isProfileModalOpen && (
				<UserProfileModal
					isProfileModalOpen={isProfileModalOpen}
					handleCancel={profileCancel}
				/>
			)}
		</>
	);
};

export default Header;
