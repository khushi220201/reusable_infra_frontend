import { Button, Form } from "antd";
import { InputWithLabelAndSvgReg } from "components/Global";
import { FC } from "react";
import styles from "./index.module.scss";
import { RegisterLayoutBodyProps } from "./types";
import { Link } from "react-router-dom";

// register layout body designing
const RegisterLayoutBody: FC<RegisterLayoutBodyProps> = (props) => {
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
          <h4 className={styles["register-body__top--title"]}>{title}</h4>
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
            {isLoading ? (
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
            {isLoading ? (
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
