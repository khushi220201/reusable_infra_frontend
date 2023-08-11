import { LoginLayoutBody } from "components/Login";
import { LoginLayout } from "layouts";
import { FORMDATA } from "constants/Data";
import { loginAction } from "redux/slice/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCompanies } from "redux/slice/companySlice";
import { useEffect, useState } from "react";
import { fetchProfileAction } from "redux/action/profileAction";
import { postApi } from "redux/apis";
import { toastText } from "utils/utils";

// Login page
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isIntuitLoading, setIsIntuitLoading] = useState(false);
  const [isXeroLoading, setIsXeroLoading] = useState(false);
  const [token, setToken] = useState(searchParams.get("token"));

  const first = searchParams.get("first");

  useEffect(() => {
    // If there's a token, handle token verification and further actions
    if (token) {
      setIsLoading(true);
      postApi(`/auth/verifyemail/${token}`)
        .then((res) => {
          if (first) {
            toastText("Email verification successful", "success");
            setToken(null);
            setIsLoading(false);
          } else {
            toastText(res?.data?.message, "success");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          toastText(err?.response?.data?.message, "error");
          setIsLoading(false);
        });
    }
  }, [token, first]);

  const onSubmit = (values: any) => {
    setIsLoading(true);
    setIsXeroLoading(false);
    setIsIntuitLoading(false);
    dispatch(loginAction(values) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchProfileAction() as any).then(() => {
          setIsLoading(false);
          setIsXeroLoading(false);
          setIsIntuitLoading(false);
          dispatch(getCompanies(res));
          navigate("/");
        });
      })
      .catch(() => {
        setIsLoading(false);
        setIsXeroLoading(false);
        setIsIntuitLoading(false);
        navigate("/login");
      });
  };

  // JSX
  return (
    <LoginLayout>
      <LoginLayoutBody
        title="Log in"
        description="<p>
							Welcome to <strong> Animal Planet! </strong>Please Enter your
							Details.
						</p>"
        formData={FORMDATA.loginFields}
        buttonTitle={"Sign in"}
        action={loginAction}
        redirectUrl="/forgot-password"
        redirectText="Forgot password?"
        btnIntuit={"Sign in with Intuit"}
        btnXero={"Sign in with Xero"}
        rememberMe={"Remember me"}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isIntuitLoading={isIntuitLoading}
        isXeroLoading={isXeroLoading}
        accountText={" Don't have an account yet?"}
        accountUrl={"Sign up Today!"}
      ></LoginLayoutBody>
    </LoginLayout>
  );
};

export default Login;
