/* eslint-disable react-hooks/rules-of-hooks */
import { Space, Switch, Table } from "antd";
import { FC } from "react";
import { DeleteActionSvg, SortSvgBottom, SortSvgTop } from "utils/svgs";
import "./index.scss";
import { DynamicTableProps } from "./types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { editUserAction } from "redux/action/userAction";
import { SettingOutlined } from "@ant-design/icons";

const DynamicTable: FC<DynamicTableProps> = (props) => {
  // Inits
  const { Column } = Table;
  const { integrationDataSource, tableRef, showModal, performSortHandler } =
    props;

  const dispatch = useDispatch<AppDispatch>();

  const deleteDataHandler = (userObject: any) => {
    console.log("userObject: ", userObject);
  };

  const statusHandler = (value: any, data: any) => {
    const finalData = {
      roleId: data?.roleId,
      userId: data?.userId,
      status: value,
      isChangeStatus: true,
    };
    dispatch(editUserAction(finalData));
  };

  // For handle the table change click
  const tableChangeHandler = (_: any, __: any, data: any) => {
    performSortHandler!(data.order);
  };

  // JSX
  return (
    <div className={"dynamic-table"}>
      <Table
        dataSource={integrationDataSource}
        scroll={{ y: "61vh", x: "63vh" }}
        pagination={false}
        className="table-global"
        ref={tableRef}
        onChange={tableChangeHandler}
      >
        <Column
          title="Ecommerce Software"
          dataIndex="Ecommerce_Software"
          key="Ecommerce_Software"
          showSorterTooltip={{ title: "" }}
          defaultSortOrder="ascend"
          sorter={() => {
            return null as any;
          }}
          className="bg-white"
          sortDirections={["ascend", "descend", "ascend"]}
          sortIcon={(data) => {
            return data.sortOrder === "ascend" ? (
              <SortSvgTop />
            ) : (
              <SortSvgBottom />
            );
          }}
          render={(_, record: { Ecommerce_Software: any }) => {
            let URl;

            switch (record.Ecommerce_Software.connection) {
              case "Magento":
                URl = "/assets/Ecommerce/Magento.png";
                break;
              case "Shopify":
                URl = "/assets/Ecommerce/shopify.png";
                break;
              case "ShopWare":
                URl = "/assets/Ecommerce/ShopWare.png";
                break;
              case "Woo":
                URl = "/assets/Ecommerce/Woo.png";
                break;
            }
            return (
              <>
                <img src={URl} height={"30px"} />
                <p>
                  <span>{record.Ecommerce_Software.company}</span>
                </p>
              </>
            );
          }}
        />
        <Column
          title="Accounting Software"
          dataIndex="Accounting_Software"
          key="Accounting_Software"
          className="bg-white"
          render={(_, record: { Accounting_Software: any }) => {
            let URl;

            switch (record.Accounting_Software.connection) {
              case "QBO":
                URl = "/assets/Accounting/QBO.png";
                break;
              case "ZOHO":
                URl = "/assets/Accounting/ZB.png";
                break;
              case "XERO":
                URl = "/assets/Accounting/XERO.png";
                break;
              case "MYON":
                URl = "/assets/Accounting/myOn.png";
                break;
            }
            return (
              <>
                <img src={URl} height={"30px"} />
                <p>
                  <span>{record.Accounting_Software.company}</span>
                </p>
              </>
            );
          }}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          className="bg-white"
          width={"10%"}
          // width={'176px'}
          render={(value: any, data: any) => {
            return (
              <Switch
                key={Math.random()}
                defaultChecked={value}
                disabled={data?.isCompanyAdmin || !data.roleStatus}
                onChange={(e) => statusHandler(e, data)}
              ></Switch>
            );
          }}
        />
        <Column
          title="Action"
          dataIndex="action"
          key="action"
          className="bg-white"
          width={"15%"}
          render={(values, data: any) => {
            return (
              <Space size={20}>
                {!(data.isCompanyAdmin || data.isAdmin) ? (
                  <>
                    <div className="cursor-pointer flex align-center justify-center">
                      <SettingOutlined/>
                    </div>
                    <div
                      className="cursor-pointer flex align-center justify-center"
                      onClick={() => {
                        deleteDataHandler(data);
                        showModal();
                      }}
                    >
                      <DeleteActionSvg />
                    </div>
                  </>
                ) : null}
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default DynamicTable;
