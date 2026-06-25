import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.scss";
import type { LoginInterface, LoginResponse } from "./Login.types";
import { useLoginMutation } from "./Login.services";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/authSlice";
import { isExpired, decodeToken } from "react-jwt";

const ROLE_ROUTES: Record<string, string> = {
  MANAGER: "/dashboard",
  "HR-COORDINATOR": "/hr-dashboard",
  HIRE: "/hire-dashboard",
};

const Login = () => {
  const [login, loginState] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInterface>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (userData: LoginInterface) => {
    const response = await login(userData);

    if (!response.data?.accessToken) return;

    const token = response.data.accessToken;
    const decodedToken = decodeToken<{ role: string }>(token);

    if (!decodedToken?.role) return;

    // persist to localStorage
    localStorage.setItem("accessToken", JSON.stringify(token));
    localStorage.setItem("role", JSON.stringify(decodedToken.role));

    // update redux auth state
    dispatch(loginAction({ ...response.data, role: decodedToken.role }));

    // navigate to role-specific dashboard
    const route = ROLE_ROUTES[decodedToken.role];
    if (route) {
      navigate(route);
    } else {
      console.error("Unknown role:", decodedToken.role);
    }
  };

  return (
    <section className={styles.background}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Log in</h1>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <div>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>
            <Input
              type="email"
              placeholder="Enter email..."
              {...register("email", {
                required: "*Email field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="password"
              placeholder="Enter password..."
              {...register("password", { required: "*Password is required" })}
            />
            <div>
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
              {loginState.isError && (
                <p className={styles.errorMessage}>{loginState.data?.error?.message}</p>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <PrimaryButton>Login</PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;