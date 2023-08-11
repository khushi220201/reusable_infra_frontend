import { Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { CloseSvg } from "utils/svgs";
import styles from "./index.module.scss";
import { IntegrationModalProps } from "./types";

// IntegrationModal popup
const IntegrationModal: FC<IntegrationModalProps> = (props) => {
  // Inits
  const { handleCancel, handleOk, isModalOpen, title, logo, formData } = props;
  const [form] = Form.useForm(); // Ant Design Form instance
  const [formValues, setFormValues] = useState({});

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormReset = () => {
    form.resetFields(); // Reset form fields
    setFormValues({}); // Reset controlled form values
  };

  const handleFormSubmit = async (values: any) => {
    console.log('values: ', values);
    await handleOk(); // Handle submission logic
    handleFormReset(); // Reset form fields and values after submission
  };

  //   JSX
  return (
    <Modal
      title={
        <div className={styles["integration-model"]}>
          <img src={logo} alt="logo" height={25} width={80} />
          <h3>{title}</h3>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={() => {
        handleCancel();
        handleFormReset(); // Reset form fields and values when modal is closed
      }}
      centered={true}
      width={500}
      closeIcon={<CloseSvg />}
      footer={null}
    >
      <div>
        <Form
          form={form}
          initialValues={formValues}
          onFinish={handleFormSubmit}
          onFinishFailed={onFinishFailed}
        >
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
          <div key={"wrapper"} className={styles["integration-model__button"]}>
            <button
              type="submit"
              className={`${styles["integration-model__button--save"]} ${styles["integration-model__button--btn"]}`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                handleCancel();
                handleFormReset(); // Reset form fields and values when Cancel is clicked
              }}
              className={`${styles["integration-model__button--cancel"]} ${styles["integration-model__button--btn"]}`}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default IntegrationModal;
