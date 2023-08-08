import React, { useState } from "react";
import { Button, Col, Drawer, Row, Select, Space } from "antd";
import styles from "./index.module.scss";
import {
  integrationsAccountCards,
  integrationsEcommerceCards,
  integrationsERPCards,
} from "../../../utils/staticObject";
import IntegrationCard from "components/settings/IntegrationCard";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TableActionHeader from "components/Global/TableActionHeader";

function ConnectionBody() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    integrationsAccountCards,
    integrationsEcommerceCards,
    integrationsERPCards,
    connectionCount: 2,
  });
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.integrations}>
      <TableActionHeader title={"Connections"}>
        <div>
          {localStorage.getItem("companyId") !== "undefined" && (
            <button
              className={`btn-black ${styles["intergtaion__action"]}`}
              onClick={() => navigate("/settings/connections")}
            >
              <p>Next</p>
            </button>
          )}
        </div>
      </TableActionHeader>
      <div>
        <div>
          <h2>Accounting</h2>
        </div>
        <div>
          <Row gutter={16}>
            {state.integrationsAccountCards?.map((card, index) => {
              const returnUpdatedData = (data: any) =>
                data.map((d: any) => {
                  if (d.title === card?.title) {
                    return {
                      ...d,
                      buttonText:
                        d.buttonText === "Connect" ? "Disconnect" : "Connect",
                    };
                  }
                  return d;
                });
              return (
                <Col key={index} xl={6} lg={6} md={12} sm={12} xs={24}>
                  <IntegrationCard
                    onButtonClick={() => {
                      setState({
                        ...state,
                        integrationsAccountCards: returnUpdatedData(
                          state.integrationsAccountCards
                        ),
                      });
                    }}
                    title={card?.title}
                    buttonText={card?.buttonText}
                    logo={card?.logo}
                    ghost={card?.ghost}
                  />
                </Col>
              );
            })}
          </Row>
          <div>
            <h2> Ecommerce</h2>
          </div>
          <Row gutter={16}>
            {state.integrationsEcommerceCards?.map((card, index) => {
              const returnUpdatedData = (data: any) =>
                data.map((d: any) => {
                  if (d.title === card?.title) {
                    return {
                      ...d,
                      buttonText:
                        d.buttonText === "Connect" ? "Disconnect" : "Connect",
                    };
                  }
                  return d;
                });
              return (
                <Col key={index} xl={6} lg={6} md={12} sm={12} xs={24}>
                  <IntegrationCard
                    onButtonClick={() => {
                      setState({
                        ...state,
                        integrationsEcommerceCards: returnUpdatedData(
                          state.integrationsEcommerceCards
                        ),
                      });
                    }}
                    title={card?.title}
                    buttonText={card?.buttonText}
                    logo={card?.logo}
                    ghost={card?.ghost}
                  />
                </Col>
              );
            })}
          </Row>
          <div>
            <h2> ERP</h2>
          </div>
          <Row gutter={16}>
            {state.integrationsERPCards?.map((card, index) => {
              const returnUpdatedData = (data: any) =>
                data.map((d: any) => {
                  if (d.title === card?.title) {
                    return {
                      ...d,
                      buttonText:
                        d.buttonText === "Connect" ? "Disconnect" : "Connect",
                    };
                  }
                  return d;
                });
              return (
                <Col key={index} xl={6} lg={6} md={12} sm={12} xs={24}>
                  <IntegrationCard
                    onButtonClick={() => {
                      setState({
                        ...state,
                        integrationsERPCards: returnUpdatedData(
                          state.integrationsERPCards
                        ),
                      });
                    }}
                    title={card?.title}
                    buttonText={card?.buttonText}
                    logo={card?.logo}
                    ghost={card?.ghost}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
        <Drawer
          title="Add New Integration"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={<Space></Space>}
        >
          <table className="customTable">
            <thead>
              <tr>
                <th colSpan={3}>Integration Mapping</th>
              </tr>
              <tr>
                <th>E-Commerce </th>
                <th colSpan={2}>Accounting </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(state.connectionCount)].map((row, i: number) => (
                <tr key={i}>
                  <td>
                    <Select
                      defaultValue="lucy"
                      style={{ width: "100%" }}
                      options={[
                        {
                          label: "QBO",
                          options: [
                            { label: "Sandbox 1", value: "jack" },
                            { label: "Sandbox 1", value: "lucy" },
                          ],
                        },
                        {
                          label: "XERO",
                          options: [
                            { label: "XERO Sandbox 1", value: "Yiminghe" },
                            { label: "XERO Sandbox 2", value: "Yimindghe" },
                          ],
                        },
                        {
                          label: "Zoho Book",
                          options: [
                            { label: "Zoho Sandbox 1", value: "Yimissnghe" },
                            { label: "Zoho Sandbox 2", value: "Zoho" },
                          ],
                        },
                      ]}
                    />{" "}
                  </td>

                  <td>
                    {" "}
                    <Select
                      defaultValue="lucy"
                      style={{ width: "100%" }}
                      options={[
                        {
                          label: "ShopWare",
                          options: [
                            { label: "ShopWare 1", value: "jack" },
                            { label: "ShopWare 1", value: "lucy" },
                          ],
                        },
                        {
                          label: " Woo Commerce",
                          options: [
                            {
                              label: " Woo Commerce Sandbox 1",
                              value: "Yiminghe",
                            },
                            {
                              label: " Woo Commerce Sandbox 2",
                              value: "Yimindghe",
                            },
                          ],
                        },
                        {
                          label: "shopify",
                          options: [
                            { label: "shopify Sandbox 1", value: "Yimissnghe" },
                            { label: "shopify Sandbox 2", value: "Zoho" },
                          ],
                        },
                      ]}
                    />{" "}
                  </td>
                  <td>
                    <DeleteOutlined size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Button
              type={"primary"}
              onClick={() =>
                setState({
                  ...state,
                  connectionCount: state.connectionCount + 1,
                })
              }
            >
              Add Integration
            </Button>
            <Button
              type={"primary"}
              onClick={() => navigate("/settings/integration")}
            >
              Save
            </Button>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default ConnectionBody;
