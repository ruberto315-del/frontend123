import z, { regex } from "zod";
import { Button } from "../ui/button";
import BaseField from "../ui/custom/base-field";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import { signUp } from "@/api/auth-client";
import getFormErrors from "@/helpers/get-form-errors";
import { toast } from "sonner";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
  name: z
    .string()
    .min(8, { message: "Короткий ПІБ" })
    .max(100, { message: "Занадто довгий ПІБ" }),
  email: z.email({ message: "Неправильний формат пошти" }),
  phone: z.string().regex(phoneRegex, "Неправильний формат телефону"),
  password: z
    .string()
    .min(8, { message: "Мінімальна довжина паролю - 8 символів" })
    .max(30, { message: "Максимальна довжина паролю - 30 символів" }),
});

export type FormData = z.infer<typeof formSchema>;

interface Props {
  setAuthType: Dispatch<SetStateAction<"login" | "register">>;
}

const RegisterForm: FC<Props> = ({ setAuthType }) => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState(initialFormData);
  const [showErrors, setShowErrors] = useState(false);
  const [isPending, setIsPanding] = useState(false);
  const [RegisterError, setRegisterError] = useState<string | null>(null);

  const formData = {
    ...initialFormData,
    ...userFormData,
  };

  const validate = () => {
    const res = formSchema.safeParse(formData);
    if (res.success) return;
    return res.error.format();
  };

  const errors = showErrors ? validate() : undefined;

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPanding(true);
    const errors = validate();
    if (errors) {
      setShowErrors(true);
      setIsPanding(false);
      return;
    }

    await signUp.email(
      { ...formData, callbackURL: "/" },
      {
        onRequest: (ctx) => {
          setRegisterError(null);
          setIsPanding(true);
        },
        onSuccess: (ctx) => {
          setIsPanding(false);
          navigate("/", { replace: true });
        },
        onError: (ctx) => {
          setIsPanding(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const changeUserFormData = (key: keyof FormData, value: string) => {
    setUserFormData((prev) => ({ ...prev, [key]: value }));
    setShowErrors(false);
  };

  return (
    <form className="">
      <BaseField
        label="ПІБ"
        type="text"
        placeholder="Прізвище Ім'я Побатькові"
        value={formData.name}
        onChange={(value) => changeUserFormData("name", value)}
        required
        className="mb-4"
      />

      <BaseField
        label="Email"
        type="email"
        placeholder="Введіть ваш Email"
        value={formData.email}
        onChange={(value) => changeUserFormData("email", value)}
        required
        className="mb-4"
      />

      <BaseField
        label="Телефон"
        type="tel"
        placeholder="Введіть ваш телефон"
        value={formData.phone}
        onChange={(value) => changeUserFormData("phone", value)}
        required
        className="mb-4"
      />

      <BaseField
        label="Пароль"
        type="password"
        placeholder="Введіть ваш пароль"
        value={formData.password}
        onChange={(value) => changeUserFormData("password", value)}
        required
        className="mb-4"
      />

      {showErrors && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          {getFormErrors(errors).map((error) => (
            <p className="text-sm text-destructive">{error}</p>
          ))}
        </div>
      )}

      <Button
        type="button"
        className="w-full mt-4"
        size="lg"
        onClick={handleRegister}
        disabled={isPending}
      >
        {isPending ? "Завантаження" : "Зареєструватись"}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary flex gap-1 justify-center">
          Вже маєте акаунт?{" "}
          <div
            onClick={() => setAuthType("login")}
            className="text-primary font-medium hover:text-primary-hover transition-colors cursor-pointer"
          >
            Увійти
          </div>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
