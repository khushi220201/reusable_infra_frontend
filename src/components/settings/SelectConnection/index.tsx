import { useState } from "react";
import { Col, Row } from "antd";
import styles from "./index.module.scss";
import {
  integrationsAccountCards,
  integrationsEcommerceCards,
  integrationsERPCards,
  integrationsMarketplaceCards,
  integrationsPaymentCards,
} from "../../../utils/staticObject";
import IntegrationSelectCard from "components/settings/IntegrationSelectCard/index";
import { useNavigate } from "react-router-dom";
//import { setSelectConnectState } from '../../../redux/actions/connectionAction';
import { TableActionHeader } from "components/Global";

function SelectConnectionBody() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    integrationsAccountCards,
    integrationsEcommerceCards,
    integrationsERPCards,
    integrationsPaymentCards,
    integrationsMarketplaceCards,
    connectionCount: 2,
  });

  return (
    <div className={styles.intergtaion}>
      <TableActionHeader title={"Select Connections"}>
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
        <h2> Ecommerce</h2>
      </div>
      <Row gutter={16}>
        {state.integrationsEcommerceCards?.map((card, index) => {
          const returnUpdatedData = (data: any) =>
            data.map((d: any) => {
              if (d.title === card?.title) {
                return {
                  ...d,
                  select: !d.select,
                };
              }
              return d;
            });
          return (
            <Col key={index} xl={4} lg={4} md={12} sm={12} xs={24}>
              <IntegrationSelectCard
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
                select={card?.select}
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
                  select: !d.select,
                };
              }
              return d;
            });
          return (
            <Col key={index} xl={4} lg={4} md={12} sm={12} xs={24}>
              <IntegrationSelectCard
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
                select={card?.select}
              />
            </Col>
          );
        })}
      </Row>
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
                    select: !d.select,
                  };
                }
                return d;
              });
            return (
              <Col key={index} xl={4} lg={4} md={10} sm={10} xs={20}>
                <IntegrationSelectCard
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
                  select={card?.select}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className={"mb-2"}>
        <h2> Payment Gateways</h2>
      </div>
      <div>
        <Row gutter={16}>
          {state.integrationsPaymentCards?.map((card, index) => {
            const returnUpdatedData = (data: any) =>
              data.map((d: any) => {
                if (d.title === card?.title) {
                  return {
                    ...d,
                    select: !d.select,
                  };
                }
                return d;
              });
            return (
              <Col
                key={index}
                className="gutter-row"
                xl={4}
                lg={4}
                md={12}
                sm={12}
                xs={24}
              >
                <IntegrationSelectCard
                  onButtonClick={() => {
                    setState({
                      ...state,
                      integrationsPaymentCards: returnUpdatedData(
                        state.integrationsPaymentCards
                      ),
                    });
                  }}
                  title={card?.title}
                  buttonText={card?.buttonText}
                  logo={card?.logo}
                  ghost={card?.ghost}
                  select={card?.select}
                />
              </Col>
            );
          })}
        </Row>
      </div>

      <div className={"mb-2"}>
        <h2> Marketplace</h2>
      </div>
      <div>
        <Row gutter={16}>
          {state.integrationsMarketplaceCards?.map((card, index) => {
            const returnUpdatedData = (data: any) =>
              data.map((d: any) => {
                if (d.title === card?.title) {
                  return {
                    ...d,
                    select: !d.select,
                  };
                }
                return d;
              });
            return (
              <Col
                key={index}
                className="gutter-row"
                xl={4}
                lg={4}
                md={12}
                sm={12}
                xs={24}
              >
                <IntegrationSelectCard
                  onButtonClick={() => {
                    setState({
                      ...state,
                      integrationsMarketplaceCards: returnUpdatedData(
                        state.integrationsMarketplaceCards
                      ),
                    });
                  }}
                  title={card?.title}
                  buttonText={card?.buttonText}
                  logo={card?.logo}
                  ghost={card?.ghost}
                  select={card?.select}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SelectConnectionBody;
