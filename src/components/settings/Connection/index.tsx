import { Col, Row } from "antd";
import TableActionHeader from "components/Global/TableActionHeader";
import IntegrationCard from "components/settings/IntegrationCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { FORMDATA } from "constants/Data";
import IntegrationModal from "components/Global/IntegrationModel";

function ConnectionBody() {
  const navigate = useNavigate();
  const ConnectionState: any = useSelector<any>((state) => state.Connection);
  console.log("ConnectionState: ", ConnectionState);
  //const [state, setState] = useState(ConnectionState.data);

  const [selectState, setSelectState] = useState({
    data: [
      ...(ConnectionState?.data?.integrationsAccountCards || []).filter(
        (data: any) => data.select === true
      ),
      ...(ConnectionState?.data?.integrationsERPCards || []).filter(
        (data: any) => data.select === true
      ),
      ...(ConnectionState?.data?.integrationsEcommerceCards || []).filter(
        (data: any) => data.select === true
      ),
      ...(ConnectionState?.data?.integrationsMarketplaceCards || []).filter(
        (data: any) => data.select === true
      ),
      ...(ConnectionState?.data?.integrationsPaymentCards || []).filter(
        (data: any) => data.select === true
      ),
    ],
  });

  useEffect(() => {
    // console.log(selectState, 'state');
  }, [selectState]);

  //for formData

  const [formData, setFormData] = useState([{}]);
  const [logo, setLogo] = useState();
  const [titleKey, setTitleKey] = useState();
  // const [connected,setConnected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   For cancel operation
  const handleCancel = () => {
    console.log("handleCancel: ");
    setIsModalOpen(false);
  };
  //
  const handleOk = () => {
    console.log("handleOk: ");
    setIsModalOpen(false);

    // console.log("setSelectState: ", selectState);
    setSelectState({
      ...selectState,
      data: selectState.data.map((d) => {
        if (d.titleKey === titleKey) {
          return {
            ...d,
            connect: true, // Set the connect property to true
          };
        }
        return d;
      }),
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onConnect = (card: any) => {
    if (card?.connect === false && card?.select === true) {
      setSelectState((prevState) => {
        return {
          ...prevState,
          data: [
            ...prevState.data.map((d: any) => {
              if (d.title === card?.title) {
                if (d.titleKey === "Sage") {
                  setIsLoading(true);
                  setFormData(FORMDATA.sageIntegrationFields);
                  setTitleKey(card.titleKey);
                  setLogo(d.logo);
                  showModal();
                }
                if (d.titleKey === "woo") {
                  setIsLoading(true);
                  setFormData(FORMDATA.wooIntegrationFields);
                  setTitleKey(card.titleKey);
                  setLogo(d.logo);
                  showModal();
                }
              }

              return d;
            }),
          ],
        };
      });
    } else {
      setSelectState((prevState) => {
        return {
          ...prevState,
          data: [
            ...prevState.data.map((d: any) => {
              if (d.titleKey === card.titleKey) {
                return {
                  ...d,
                  connect: false,
                };
              } else {
                return d;
              }
            }),
          ],
        };
      });
    }
  };

  return (
    <div className={styles.integrations}>
      <TableActionHeader title={"Connections"}>
        <div>
          {localStorage.getItem("companyId") !== "undefined" && (
            <button
              className={`btn-blue ${styles["intergtaion__action"]}`}
              onClick={() => navigate("/settings/integrations")}
            >
              <p>Next</p>
            </button>
          )}
        </div>
      </TableActionHeader>
      <div>
        <div className={styles.integrations__container}>
          <Row gutter={16}>
            {selectState.data?.map((card, index) => {
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
                  <IntegrationCard
                    onButtonClick={() => {
                      onConnect(card);
                    }}
                    type={"notConnect"}
                    title={card?.title}
                    connect={card?.connect}
                    buttonText={card?.buttonText}
                    logo={card?.logo}
                    ghost={card?.ghost}
                  />
                </Col>
              );
            })}
          </Row>
          <div className={"mb-2"}>
            <h2>Connected Apps</h2>
          </div>
          <Row gutter={16}>
            {selectState.data
              ?.filter((d) => d.connect === true)
              ?.map((card, index) => {
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
                    <IntegrationCard
                      type={"connect"}
                      title={card?.title}
                      connect={card?.connect}
                      buttonText={card?.buttonText}
                      logo={card?.logo}
                      ghost={card?.ghost}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <IntegrationModal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        formData={formData}
        isLoading={isLoading}
        title={"Integration"}
        logo={logo}
      />
    </div>
  );
}

export default ConnectionBody;
