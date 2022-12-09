import { useForm } from "react-hook-form";
import Logo from "../public/Logo (2).svg";
import Signup from "../public/Signup.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AuthenticationService from "services/authentication.service";
const authService = new AuthenticationService();

export default function SignUp({ mutate }) {
  const { register, handleSubmit, formState, trigger } = useForm({
    defaultValues: {
      firstName: `${""}`,
      lastName: `${""}`,
      phoneNumber: `${""}`,
      email: `${""}`,
      password: `${""}`,
    },
  });
  const [login, setLogin] = useState(true);

  const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const submitHandler = async (data: any) => {
    try {
      const userInfoData: any = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      };
      const resp = await authService.createUser(userInfoData);
      await authService.authenticateUser(resp.token);
      console.log(resp.user);
      router.push("/dashboard");
      toast.success(resp.message);
    } catch (e) {
      toast.error(e);
    }
  };
  const loginHandler = () => {
    setLogin(true);
  };
  const signUpHandler = () => {
    setLogin(false);
  };

  //Login Submit Authentication

  const router = useRouter();
  // const [showPassword, setShowPassword] = React.useState(false);

  const { isSubmitting, errors } = formState;

  const loginSubmitHandler = (values: any) => {
    authService
      .userSignIN(values)
      .then((res: any) => {
        authService.authenticateUser(res?.token);
        // router.push("/dashboard");
        mutate();
        toast.success(res.message, { autoClose: 3000 });
      })
      .catch((err: any) => {
        console.log("Error in Login", err);
        toast.error(err.message, { autoClose: 3000 });
      });
  };

  return (
    <div className="container-fluid bg-container d-flex flex-column justify-content-center align-items-center">
      <div className="container ">
        <div className="card-content d-flex flex-row justify-content-center align-items-center">
          <div className="image-content d-flex flex-row justify-content-center align-items-center">
            <div>
              <p>
                Fashion is the armor to survive the reality of everyday life
              </p>
              <p className="ms-auto">- Bill Cunningham</p>
            </div>
          </div>

          <div className="signup-form">
            <div className="d-flex  pt-3">
              <Link href="" onClick={loginHandler} className="login-link ms-5">
                Login
              </Link>

              <Link href="" onClick={signUpHandler} className="signup-link ">
                SignUp
              </Link>
            </div>
            {/* <pre>{JSON.stringify(userInfo,undefined,2)}</pre> */}

            {/* SignUp form  */}
            {!login && (
              <form
                className="line-height p-5 pb-0 "
                onSubmit={handleSubmit(submitHandler)}
              >
                {/* <div className="d-flex g-1"> */}
                {[
                  {
                    type: "text",
                    placeholder: "FirstName",
                    field: "firstName",
                    validation: { required: true },
                  },
                  {
                    type: "text",
                    placeholder: "LastName",
                    field: "lastName",
                    validation: { required: true },
                  },
                  {
                    type: "text",
                    placeholder: "Phone Number",
                    field: "phoneNumber",
                    validation: {
                      required: true,
                      maxLength: {
                        value: 10,
                        message: "Mobile Number should be 10 digits only",
                      },
                    },
                  },
                  {
                    type: "text",
                    placeholder: "Email",
                    field: "email",
                    validation: {
                      required: true,
                      pattern: { value: regex, message: "Invalid Email" },
                    },
                  },
                  {
                    type: "password",
                    placeholder: "Password",
                    field: "password",
                    validation: {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must be above 8 characters",
                      },
                    },
                  },
                ].map((e: any, id: any) => (
                  <div
                    className={
                      "flex-column " +
                      ([0, 1].includes(id)
                        ? "d-inline-flex  w-50"
                        : "d-flex w-100")
                    }
                  >
                    <input
                      type={e.type}
                      placeholder={e.placeholder}
                      className={
                        "w-100 " +
                        (id === 0 ? "me-2" : id === 1 ? "ms-2" : "mt-3")
                      }
                      {...register(e.field, { required: true })}
                      onKeyUp={() => {
                        trigger(e.field);
                      }}
                    />

                    {errors[e.field]?.type === "maxLength" && (
                      <span>Mobile Number should be 10 digits</span>
                    )}
                    {errors[e.field]?.type === "required" && (
                      <span className="text-danger required-msg ">
                        {e.field} is required
                      </span>
                    )}
                    {errors[e.field]?.message}
                    {errors[e.field]?.type === "pattern" && (
                      <span className="required-msg">
                        Must Contain at least 8 Characters,One Uppercase,
                        <br />
                        One Lowercase One Number,One Special Character
                      </span>
                    )}
                  </div>
                ))}
                {/* </div> */}

                <button className="signup-btn">SignUp</button>
                <p className="text-center bottom-text">
                  You agree with our terms of use & privacy policy by signing up
                </p>
              </form>
            )}

            {/* LoginForm */}
            {login && (
              <form
                className="line-height p-5 pb-0 "
                onSubmit={handleSubmit(loginSubmitHandler)}
              >
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
                    Must Contain at least 8 Characters, One Uppercase,
                    <br /> One Lowercase One Number and
                    <br /> One Special Case Character
                  </span>
                )}
                {errors.password?.type === "required" && (
                  <span className="required-msg">Password is required</span>
                )}
                <div className="d-flex justify-content-between mt-2">
                  <a href="#" className="links">
                    OTP login
                  </a>
                  <a href="/forgotpassword" className="links">
                    Forgot Password
                  </a>
                </div>

                <button className="signup-btn">Login</button>
              </form>
            )}
            <div className="text-center mt-5">
              <Image alt="logo" src={Logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
