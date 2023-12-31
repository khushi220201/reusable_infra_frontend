import { Button, Form } from "antd";
import { InputWithLabelAndSvgReg } from "components/Global";
import { FC } from "react";
import styles from "./index.module.scss";
import { RegisterLayoutBodyProps } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

// register layout body designing
const RegisterLayoutBody: FC<RegisterLayoutBodyProps> = (props) => {
  const navigate = useNavigate();
  // Inits
  const {
    title,
    description,
    formData: registerFields,
    buttonTitle,
    onSubmit,
    btnIntuit,
    btnXero,
    isLoading,
    isIntuitLoading,
    isXeroLoading,
    accountText,
    accountUrl,
  } = props;

  const onFinishFailed = (values: any) => {
    console.log("false", values);
  };

  // JSX
  return (
    <div className={styles["register-body"]}>
      <Form
        className={styles["register-body__wrapper"]}
        name="basic"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <div className={styles["register-body__top"]}>
          <div className={styles["register-body__top--title"]}>
            <h4 className={styles["register-body__top--title--maintitle"]}>
              {title}{" "}
            </h4>
            <div
              onClick={() => {
                navigate("/login");
              }}
              style={{ cursor: "pointer" }}
            >
              <LeftOutlined /> Back
            </div>
          </div>
          {description && (
            <div className={styles["register-body__top--description"]}>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}
        </div>
        <div className={styles["register-body__center"]}>
          {registerFields.map((singleUserInput, key) => {
            return (
              <InputWithLabelAndSvgReg
                key={key}
                singleUserInput={singleUserInput}
              />
            );
          })}
        </div>
        <div className={styles["register-body__end"]}>
          <Button
            type="primary"
            className={`${styles["register-body__end--button"]} ${
              isLoading && "pointer-event-none"
            }`}
            size="large"
            htmlType="submit"
            // disabled={isLoading}
          >
            {isLoading ? (
              <img src="assets/gifs/loading-black.gif" height={40} />
            ) : (
              <>{buttonTitle}</>
            )}
          </Button>
        </div>
        <div className={styles["register-body__signin-options"]}>
          <Button
            type="primary"
            className={`${
              styles["register-body__signin-options--button-intuit"]
            } ${isLoading && "pointer-event-none"}`}
            size="large"

            // disabled={isLoading}
          >
            {isIntuitLoading ? (
              <img src="assets/gifs/loading-black.gif" height={40} />
            ) : (
              <>{btnIntuit}</>
            )}
          </Button>

          <Button
            className={`${
              styles["register-body__signin-options--button-xero"]
            } ${isLoading && "pointer-event-none"}`}
            size="large"
          >
            {isXeroLoading ? (
              <img src="assets/gifs/loading-black.gif" height={40} />
            ) : (
              <>
                <img src="assets/images/xero-logo.png" alt="" />
                {btnXero}
              </>
            )}
          </Button>
        </div>

        <div className={styles["register-body__account-text"]}>
          <div className={styles["register-body__account-text--text"]}>
            {accountText}
          </div>
          <Link
            to={"/login"}
            className={styles["register-body__account-text--link"]}
          >
            {accountUrl}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterLayoutBody;
