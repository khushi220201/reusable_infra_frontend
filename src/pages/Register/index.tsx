import { RegistrationLayout } from "layouts";
import { FORMDATA } from "constants/Data";
import { loginAction } from "redux/slice/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getCompanies } from "redux/slice/companySlice";
import { useState } from "react";
// import { fetchProfileAction } from "redux/action/profileAction";
import { RegisterLayoutBody } from "components/Register";
import { getApi } from "redux/apis";
// import { toastText } from "utils/utils";
import { registerAction } from "redux/slice/registerSlice";
import { toastText } from "utils/utils";

// Register page
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isIntuitLoading, setIsIntuitLoading] = useState(false);
  const [isXeroLoading, setIsXeroLoading] = useState(false);

  const onSubmit = (values: any) => {
    setIsLoading(true);
    setIsXeroLoading(false);
    setIsIntuitLoading(false);

    const { email } = values
    console.log("🚀 ~ file: index.tsx:28 ~ onSubmit ~ email:", email)


    getApi(`/users/get-email`, { email })
      .then((res) => {
        console.log("🚀 ~ file: index.tsx:34 ~ .then ~ res:", res.data.data)
        if (res.data.data === null) {
          alert("enter")
          dispatch(registerAction(values) as any)
            .unwrap()
            .then(() => {

              navigate("/login");

            })
            .catch(() => {
              setIsLoading(false);
              setIsXeroLoading(false);
              setIsIntuitLoading(false);
              navigate("/register");
            });

            toastText("Registration successfully, Please check your inbox to verify your email. ", 'success');
        }

        else {
          toastText("User Already exist", 'error');
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.tsx:38 ~ onSubmit ~ err:", err)
        toastText(err?.response?.data?.message, 'error');
        setIsLoading(false);
      });

    // if (data === null){
    //   dispatch(registerAction(values) as any)
    // .unwrap()
    // .then(() => {
    //   // dispatch(fetchProfileAction() as any).then(() => {
    //   //   setIsLoading(false);
    //   //   dispatch(getCompanies(res));
    //   // });
    //   navigate("/login");

    // })
    // .catch(() => {
    //   setIsLoading(false);
    //   setIsXeroLoading(false);
    //   setIsIntuitLoading(false);
    //   navigate("/register");
    // });
    // }

  };
  // JSX
  return (
    <RegistrationLayout>
      <RegisterLayoutBody
        title="Register"
        description="<p>
							Welcome to <strong> Animal Planet! </strong>Please Enter your
							Details.
						</p>"
        formData={FORMDATA.registerFields}
        buttonTitle={"Register Now!"}
        action={loginAction}
        btnIntuit={"Sign in with Intuit"}
        btnXero={"Sign in with Xero"}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isIntuitLoading={isIntuitLoading}
        isXeroLoading={isXeroLoading}
        accountText={"Already have an account?"}
        accountUrl={"Login Now!"}
      ></RegisterLayoutBody>
    </RegistrationLayout>
  );
};

export default Register;
