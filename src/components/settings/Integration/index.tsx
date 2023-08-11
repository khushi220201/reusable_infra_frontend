import { TableActionHeader } from "components/Global";
import { integrationDataSource } from "constants/Data";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ConfirmDelete from "components/Global/confirmDeleteModel";
import { useNavigate } from "react-router-dom";
import { getUsersAction, paginateUserAction } from "redux/action/userAction";
import { AppDispatch } from "redux/store";
import { AddSvg } from "utils/svgs";
import DynamicTable from "./Table";
import styles from "./index.module.scss";
// import { getRoleActionTable } from "redux/action/roleTableAction";

// Creating the list of user table
const IntegrationTable = () => {
  const [isInViewPort, setIsInViewPort] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // Handle the pagination for the table
  const paginationChangeHandler = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  //adding body to scroll to table body Infinite scroll
  const scrollHandler = useCallback((event: any) => {
    const { currentTarget } = event;
    const tableBody = currentTarget?.querySelector("tbody");
    if (
      tableBody!.getBoundingClientRect().top +
        tableBody.getBoundingClientRect().height <
      screen.height - 100
    ) {
      setIsInViewPort(true);
    } else {
      setIsInViewPort(false);
    }
  }, []);

  useEffect(() => {
    if (isInViewPort) {
      setCurrentPage((prev) => prev + 1);

      let query;

      // if (filterValue !== 'all') {
      // 	query['filter'] = filterValue;
      // }

      dispatch(paginateUserAction(query));
      // paginateRole(
      // 	`page=${currentPage + 1}&limit=10&search=${searchValue}&sort=roleName`
      // )
    }
  }, [isInViewPort]);

  // For perform the sorting operation
  const performSortHandler = (type: string) => {
    setCurrentPage(1);
    dispatch(
      getUsersAction({
        page: 1,
        limit: 10,
        sort: "firstName",
        type: type === "ascend" ? "asc" : "desc",
      })
    );
  };

  useEffect(() => {
    if (tableRef.current) {
      const tableBody = tableRef.current
        ? tableRef.current?.querySelector(".ant-table-body")
        : null;
      // if (tableBody) {
      tableBody?.addEventListener("scroll", scrollHandler);
      return () => tableBody?.removeEventListener("scroll", scrollHandler);
      // }
    }
  }, [tableRef.current]);

  //   For conform operation
  const handleOk = () => {
    setIsModalOpen(false);
  };

  //   For cancel operation
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Delete User
  const deleteHandler = () => {
    setIsModalOpen(false);
  };

  //   For open the model
  const showModal = () => {
    setIsModalOpen(true);
  };

  // JSX
  return (
    <>
      <div className={styles["integration-table"]}>
        <div>
          <TableActionHeader title={"Integrations"}>
            <div className={styles["integration-table__action"]}>
              {localStorage.getItem("companyId") !== "undefined" && (
                <button
                  className={`btn-blue ${styles["integration-table__action--button"]}`}
                  onClick={() => navigate("/settings/selectconnection")}
                >
                  <AddSvg />
                  <p>Add New Connections</p>
                </button>
              )}
            </div>
          </TableActionHeader>
          <div>
            <DynamicTable
              integrationDataSource={integrationDataSource}
              paginationChangeHandler={paginationChangeHandler}
              currentPage={currentPage}
              totalRecords={10}
              tableRef={tableRef}
              showModal={showModal}
              performSortHandler={performSortHandler}
            />
          </div>
        </div>
      </div>
      <ConfirmDelete
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default IntegrationTable;
