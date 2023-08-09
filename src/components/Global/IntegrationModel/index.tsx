import { Form, Input, Modal } from "antd";
import { FC } from "react";
import { CloseSvg } from "utils/svgs";
import styles from "./index.module.scss";
import { IntegrationModalProps } from "./types";

// IntegrationModal popup
const IntegrationModal: FC<IntegrationModalProps> = (props) => {
  // Inits
  const {
    handleCancel,
    handleOk,
    isModalOpen,
    integrateHandler,
    isLoading,
    title,
    formData,
  } = props;
  //const { singleUserInput, disabled } = props;

  //   JSX
  return (
    <Modal
      title={
        <div className={styles["integration-model"]}>
          <h3>{title}</h3>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered={true}
      width={500}
      closeIcon={<CloseSvg />}
      footer={[
        <div key={"wrapper"} className={styles["integration-model__button"]}>
          <button
            type="submit"
            key="ok"
            className={`${styles["integration-model__button--save"]} ${
              styles["integration-model__button--btn"]
            } ${isLoading && "pointer-event-none"}`}
            onClick={integrateHandler}
          >
            {isLoading
              ? // <img src="assets/gifs/loading-black.gif" height={40} />
                "Save"
              : "Save"}
          </button>
          <button
            key="cancel"
            onClick={handleCancel}
            className={`${styles["integration-model__button--cancel"]} ${styles["integration-model__button--btn"]}`}
          >
            Cancel
          </button>
        </div>,
      ]}
    >
      <div>
        {formData?.map((fieldData: any, index: any) => (
          <div className={styles["input-icon"]} key={index}>
            <div className={styles["input-icon__title"]}>
              {fieldData.svg && (
                <div className={styles["input-icon__title--svg"]}>
                  {fieldData.svg}
                </div>
              )}
              <label className={styles["input-icon__title--label"]}>
                {fieldData.title}{" "}
                {fieldData?.required && (
                  <span className="required-color">*</span>
                )}
              </label>
            </div>
            <div className={styles["input-icon__form"]}>
              <Form.Item name={fieldData.name} rules={fieldData.rules}>
                {fieldData.type === "text" || fieldData.type === "number" ? (
                  <Input
                    placeholder={fieldData.placeHolder}
                    size="large"
                    className={styles["input-icon__form--input"]}
                    type={fieldData.type}
                  />
                ) : (
                  fieldData.type === "password" && (
                    <Input.Password
                      placeholder={fieldData.placeHolder}
                      size="large"
                      className={styles["input-icon__form--input"]}
                    />
                  )
                )}
              </Form.Item>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default IntegrationModal;
