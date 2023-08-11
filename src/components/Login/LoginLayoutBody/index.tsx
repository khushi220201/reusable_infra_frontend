import { Button, Checkbox, Form } from "antd";
import { InputWithLabelAndSvg } from "components/Global";
import { FC } from "react";
import styles from "./index.module.scss";
import { LoginLayoutBodyProps } from "./types";
import { Link, useNavigate } from "react-router-dom";

// Login layout body designing
const LoginLayoutBody: FC<LoginLayoutBodyProps> = (props) => {
  // Inits
  const {
    title,
    description,
    formData: loginFields,
    buttonTitle,
    // action,
    redirectText,
    redirectUrl,
    onSubmit,
    btnIntuit,
    btnXero,
    rememberMe,
    isLoading,
    isIntuitLoading,
    isXeroLoading,
    accountText,
    accountUrl,
  } = props;

  console.log(title, "title");
  const navigate = useNavigate();

  const onFinishFailed = (values: any) => {
    console.log("false", values);
  };

  // JSX
  return (
    <div className={styles["login-body"]}>
      <Form
        className={styles["login-body__wrapper"]}
        name="basic"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={{
          rememberMe: false, // Set default value for rememberMe
        }}
      >
        <div className={styles["login-body__top"]}>
          <h4 className={styles["login-body__top--title"]}>{title}</h4>
          {description && (
            <div className={styles["login-body__top--description"]}>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}
        </div>
        <div className={styles["login-body__center"]}>
          {loginFields.map((singleUserInput, key) => {
            return (
              <InputWithLabelAndSvg
                key={key}
                singleUserInput={singleUserInput}
              />
            );
          })}
        </div>
        <div className={styles["login-body__remberme-forgot"]}>
          {rememberMe && (
            <Form.Item name="rememberMe" valuePropName="checked">
              <Checkbox
                className={styles["login-body__remberme-forgot--remeber-me"]}
              >
                {rememberMe}
              </Checkbox>
            </Form.Item>
          )}

          <p
            className={styles["login-body__remberme-forgot--forgot-password"]}
            onClick={() => navigate(`${redirectUrl}`)}
          >
            {redirectText}
          </p>
        </div>

        <div className={styles["login-body__end"]}>
          <Button
            type="primary"
            className={`${styles["login-body__end--button"]} ${
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
        <div className={styles["login-body__signin-options"]}>
          {btnIntuit && (
            <Button
              type="primary"
              className={`${
                styles["login-body__signin-options--button-intuit"]
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
          )}

          {btnXero && (
            <Button
              className={`${
                styles["login-body__signin-options--button-xero"]
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
          )}
        </div>
        {accountText && accountUrl && (
          <div className={styles["login-body__account-text"]}>
            <div className={styles["login-body__account-text--text"]}>
              {accountText}
            </div>
            <Link
              to={"/register"}
              className={styles["login-body__account-text--link"]}
            >
              {accountUrl}
            </Link>
          </div>
        )}
      </Form>
    </div>
  );
};

export default LoginLayoutBody;
