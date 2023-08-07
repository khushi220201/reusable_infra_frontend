
export type DynamicTableProps = {
	integrationDataSource: any;
	paginationChangeHandler: (pageNo: number) => void;
	currentPage: number;
	totalRecords: number;
	showModal: () => void;
	openDrawerHandler: () => void;
	setDrawerInfoHandler: (title: string) => void;
	setEditSelectedUser: any;
	tableRef?: any;
	performSortHandler?: (type: string) => void;
};
