import { RegistrationLayout } from "layouts";
import { FORMDATA } from "constants/Data";
import { loginAction } from "redux/slice/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getCompanies } from "redux/slice/companySlice";
import { useState } from "react";
// import { fetchProfileAction } from "redux/action/profileAction";
import { RegisterLayoutBody } from "components/Register";
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
    dispatch(registerAction(values) as any)
      .unwrap()
     .then((res : any) => {
				toastText(res?.message, 'success');
				setIsLoading(false);
				navigate('/login');
			})
      .catch(() => {
        setIsLoading(false);
        setIsXeroLoading(false);
        setIsIntuitLoading(false);
        navigate("/register");
      });
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
