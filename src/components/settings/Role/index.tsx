import {
	Loader,
	SideDrawerWrapper,
	TableActionHeader,
} from 'components/Global';
import ConfirmDelete from 'components/Global/confirmDeleteModel';
import { roleColumns } from 'constants/Data';
import {
	ChangeEvent,
	// useCallback,
	useEffect, useRef, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteRoleActionTable,
	getRoleActionTable,
	// paginateRoleTable,
} from 'redux/action/roleTableAction';
import { getPermissionsAction } from 'redux/action/permissionAction';
import { AppDispatch } from 'redux/store';
import { AddSvg } from 'utils/svgs';
import AddRoleBody from './AddRoleBody';
import PermissionBody from './PermissionBody';
import DynamicTable from './Table';
import styles from './index.module.scss';

// Creating the list of role table
const RoleTable = () => {
	const [drawerAnimation, setDrawerAnimation] = useState<boolean>(false);
	const [isSideDrawerOpen, setSideDrawerOpen] = useState<boolean>(false);
	// const [isInViewPort, setIsInViewPort] = useState<boolean>(false);
	const [selectedRole, setSelectedRole] = useState<any>(null);
	const [sort, setSort] = useState('asc');
	const [isPermissionDrawerOpen, setPermissionSideDrawerOpen] =
		useState<boolean>(false);
	const [filteredData, setFilterData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [filterValue, setFilterValue] = useState('all');
	const [drawerInfo, setDrawerInfo] = useState({
		drawerTitle: 'Add Role',
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editSelectedRole, setEditSelectedRole] = useState<any>();

	const tableRef = useRef<HTMLDivElement>(null);
	const roleData = useSelector((state: any) => state?.roleTable?.data);
	const { count, fistTimeFetchLoading } = useSelector(
		(state: any) => state?.roleTable
	);
	console.log(count);

	const { data: permissions, isLoading } = useSelector(
		(state: any) => state.permissions
	);

	const totalRecords = useSelector((state: any) => state?.roleTable?.count)


	// setRecords(totalRecords)
	console.log("🚀 ~ file: index.tsx:53 ~ RoleTable ~ totalData:", totalRecords)

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		const data = roleData?.map((role: any) => {
			return {
				id: role?.id,
				name: role?.roleName,
				description: role?.roleDescription,
				status: role?.status,
				isAdmin: role?.isAdminRole,
			};
		});

		setFilterData(data);
	}, [roleData]);

	// Remove from drawer handler
	const removeDrawerFromDom = () => {
		setSideDrawerOpen(false);
		setPermissionSideDrawerOpen(false);
	};
	// For open the sideDrawer with animation
	const openDrawerHandler = () => {
		setDrawerAnimation(true);
		setSideDrawerOpen(true);
	};

	// For open the sideDrawer with animation
	const openPermissionsHandler = () => {
		setDrawerAnimation(true);
		setPermissionSideDrawerOpen(true);
	};

	// For perform the close animation
	const closeDrawerByAnimation = () => {
		setDrawerAnimation(false);
		setEditSelectedRole(undefined);
	};

	// Handle the pagination for the table
	const paginationChangeHandler = (pageNo: number) => {
		console.log("🚀 ~ file: index.tsx:92 ~ paginationChangeHandler ~ pageNo:", pageNo)
		// alert("page"+pageNo)
		setCurrentPage(pageNo);

		dispatch(
			getRoleActionTable({
				url: `page=${pageNo}&limit=10&search=${searchValue}&sort=${sort}`,
				isPagination: false,
			})
		);
	};

	// For perform the search operation
	const performSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchValue(value);
		setCurrentPage(1);
	};

	// Perform Filter
	const performFilterHandler = (value: any) => {
		// alert(value)
		setFilterValue(value);
		if (value == 'all') {
			dispatch(
				getRoleActionTable({
					url: `page=${1}&limit=10&search=${searchValue}&sort=${sort}`,
				})
			);
		} else {
			dispatch(
				getRoleActionTable({
					url: `page=${1}&limit=10&search=${searchValue}&sort=${sort}&filter=${value === 'active' ? true : false
						}`,
				})
			);
		}
	};

	//   For open the model
	const showModal = () => {
		setIsModalOpen(true);
	};

	// For change the data and title between components
	const setDrawerInfoHandler = (drawerTitle: any) => {
		setDrawerInfo({ drawerTitle });
	};

	//   For conform operation
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const deleteHandler = () => {
		if (editSelectedRole) {
			dispatch(deleteRoleActionTable({ roleId: editSelectedRole?.id })).then(
				() => {
					setEditSelectedRole(undefined);
					setIsModalOpen(false);
				}
			);
		}
	};

	//   For cancel operation
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// For fetch the all permission of some role
	const fetchRolePermissions = (permissionDetails: any) => {
		setSelectedRole(permissionDetails);
		dispatch(getPermissionsAction(permissionDetails.id));
	};

	//adding body to scroll to table body Infinite scroll
	// const scrollHandler = useCallback((event: any) => {
	// 	const { currentTarget } = event;
	// 	const tableBody = currentTarget?.querySelector('tbody');
	// 	if (
	// 		tableBody!.getBoundingClientRect().top +
	// 			tableBody.getBoundingClientRect().height <
	// 		screen.height - 100
	// 	) {
	// 		setIsInViewPort(true);
	// 	} else {
	// 		setIsInViewPort(false);
	// 	}
	// }, []);
	console.log(currentPage, "currentPage");
	// alert(currentPage)

	// For perform the sorting operation
	const performSortHandler = (type: string , current : number) => {
		console.log("🚀 ~ file: index.tsx:198 ~ performSortHandler ~ current:", current)
		// alert("sort")
		// setCurrentPage(1);
		setSort(type === 'ascend' ? 'asc' : 'desc');
		dispatch(
			getRoleActionTable({
				url: `page=${current}&limit=10&search=${searchValue}&sort=${type === 'ascend' ? 'asc' : 'desc'
					}${filterValue !== 'all'
						? `&filter=${filterValue === 'active' ? true : false}`
						: ''
					}`,
				isPagination: false,
			})
		);
	};

	// For change in view port
	// useEffect(() => {
	// 	if (isInViewPort && filteredData.length < count) {
	// 		setCurrentPage((prev) => prev + 1);
	// 		dispatch(
	// 			paginateRoleTable(
	// 				`page=${currentPage + 1}&limit=10&search=${searchValue}&sort=${sort}${filterValue !== 'all'
	// 					? `&filter=${filterValue === 'active' ? true : false}`
	// 					: ''
	// 				}`
	// 			)
	// 		);
	// 	}
	// }, [isInViewPort]);

	// console.log(currentPage);

	// For search
	useEffect(() => {
		// alert("Please")

		dispatch(
			getRoleActionTable({
				url: `page=${currentPage}&limit=10&search=${searchValue}&sort=${sort}${filterValue !== 'all'
					? `&filter=${filterValue === 'active' ? true : false}`
					: ''
					}`,
				isPagination: false,
			})
		);
	}, [searchValue]);

	// For perform pagination logic
	// useEffect(() => {
	// 	if (tableRef.current) {
	// 		const tableBody = tableRef.current
	// 			? tableRef.current?.querySelector('.ant-table-body')
	// 			: null;
	// 		if (tableBody) {
	// 			tableBody.addEventListener('scroll', scrollHandler);
	// 			return () => tableBody.removeEventListener('scroll', scrollHandler);
	// 		}
	// 	}
	// }, [tableRef.current]);

	return (
		<>
			<div className={styles['role-table']}>
				{!fistTimeFetchLoading ? (
					<>
						<TableActionHeader title={'Roles'}>
							<div className={styles['role-table__action']}>
								{localStorage.getItem('companyId') !== 'undefined' && (
									<button
										className={`btn-blue ${styles['role-table__action--button']}`}
										onClick={openDrawerHandler}
									>
										<AddSvg />
										<p>Add Roles</p>
									</button>
								)}
							</div>
						</TableActionHeader>
						<div>
							<DynamicTable
								roleDataSource={filteredData}
								roleColumns={roleColumns}
								paginationChangeHandler={paginationChangeHandler}
								currentPage={currentPage}
								totalRecords={totalRecords}
								performSearchHandler={performSearchHandler}
								searchValue={searchValue}
								showModal={showModal}
								openDrawerHandler={openDrawerHandler}
								setDrawerInfoHandler={setDrawerInfoHandler}
								openPermissionsHandler={openPermissionsHandler}
								setEditSelectedRole={setEditSelectedRole}
								fetchRolePermissions={fetchRolePermissions}
								performSortHandler={performSortHandler}
								tableRef={tableRef}
								performFilterHandler={performFilterHandler}
								filterValue={filterValue}
							/>
							{/* {JSON.stringify(currentPage)} */}
						</div>
					</>
				) : (
					<Loader />
				)}
			</div>
			<ConfirmDelete
				handleCancel={handleCancel}
				handleOk={handleOk}
				isModalOpen={isModalOpen}
				deleteHandler={deleteHandler}
			/>
			{isSideDrawerOpen && (
				<SideDrawerWrapper
					isOpen={drawerAnimation}
					removeDrawerFromDom={removeDrawerFromDom}
					closeDrawerByAnimation={closeDrawerByAnimation}
					headerTitle={drawerInfo.drawerTitle}
					position="right"
					width="half"
				>
					<AddRoleBody
						closeDrawerByAnimation={closeDrawerByAnimation}
						editSelectedRole={editSelectedRole}
						setEditSelectedRole={setEditSelectedRole}
					/>
				</SideDrawerWrapper>
			)}
			{isPermissionDrawerOpen && !isLoading && (
				<SideDrawerWrapper
					isOpen={drawerAnimation}
					removeDrawerFromDom={removeDrawerFromDom}
					closeDrawerByAnimation={closeDrawerByAnimation}
					headerTitle={drawerInfo.drawerTitle}
					position="right"
					width="half"
				>
					{permissions.length > 0 && (
						<PermissionBody
							closeDrawerByAnimation={closeDrawerByAnimation}
							permissions={permissions}
							selectedRole={selectedRole}
						/>
					)}
				</SideDrawerWrapper>
			)}
		</>
	);
};

export default RoleTable;
