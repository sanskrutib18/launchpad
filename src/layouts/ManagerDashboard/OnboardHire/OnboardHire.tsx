import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import styles from "./OnboardHire.module.scss";
import { useForm } from "react-hook-form";
import type { OnboardHireFormProps } from "./OnboardHire.types";
import { SecondaryButton } from "../../../components/Button/Button";
import { useOnboardHireMutation } from "./OnboardHire.services";

const OnboardHire = () => {
  const navigate = useNavigate();

  const [onboardHireState, onboardHire] = useOnboardHireMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardHireFormProps>({
    defaultValues: {
      email: "",
      name: "",
      managerId: "",
    },
    mode: "onChange",
  });

  const handleOnSubmit = async (hireData: OnboardHireFormProps) => {
    const response = await onboardHire(hireData);
    console.log(response.data);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <section className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={styles.heading}>
          <h2>Onboard New Hires</h2>
        </div>

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
              required: "*Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
        </div>

        <div className={styles.inputGroup}>
          <div>
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>
          <Input
            type="text"
            placeholder="Enter name..."
            {...register("name", { required: "*Name is required" })}
          />
        </div>

        <div className={styles.inputGroup}>
          <div>
            {errors.managerId && (
              <p className={styles.errorMessage}>{errors.managerId.message}</p>
            )}
          </div>
          <Input
            type="text"
            placeholder="Enter ManagerId..."
            {...register("managerId", { required: "*ManagerId is required" })}
          />
        </div>

        <div className={styles.buttonGroup}>
          <SecondaryButton>Save</SecondaryButton>
          <SecondaryButton type="button" onClick={handleCancel}>
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </section>
  );
};

export default OnboardHire;