import axios from "axios";
import { useForm } from "react-hook-form";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const { register, handleSubmit, formState, trigger }: any = useForm();
  const { errors } = formState;

  const submitHandler = async (data) => {
    try {
      if (data.password === data.rpassword && router.query.reset) {
        await axios
          .post("api/auth/reset", { ...data, reset: router.query.reset })
          .then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message);
            router.push("/signup");
          });
      }
    } catch (e) {
      toast.error(e.response.data);
      console.log(e);
    }
  };
  return (
    <div>
      <div className="container  forgot-pass mt-5">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="d-flex flex-column justify-content-center  align-items-center"
        >
          <div>
            <input
              type="text"
              placeholder="Email"
              className="mt-3"
              {...register("email", {
                required: true,
                pattern: { value: regex, message: "Invalid Email" },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            {errors.email?.message}
            {errors.email?.type === "required" && (
              <span className=" required-msg">Email is required</span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="mt-3"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be above 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message: `""`,
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            {errors.password?.type === "pattern" && (
              <span className="required-msg">
                Must Contain at least 8 Characters,One Uppercase,
                <br />
                One Lowercase One Number,One Special Character
              </span>
            )}
            {errors.password?.type === "required" && (
              <span className="required-msg">Password is required</span>
            )}
            <input
              type="password"
              placeholder="Repeat Password"
              className="mt-3"
              {...register("rpassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be above 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message: `""`,
                },
              })}
              onKeyUp={() => {
                trigger("rpassword");
              }}
            />
            <button className="btn btn-secondary mt-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
