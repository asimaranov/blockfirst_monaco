"use client";
import { signIn } from "next-auth/react";

import Link from "next/link";
import LogoSvg from "./assets/logo.svg";
import ErrorDecorationSvg from "./assets/error_decoration.svg";

import AccountSvg from "./assets/input-legends/account";
import EmailSvg from "./assets/input-legends/email";
import PasswordSvg from "./assets/input-legends/password";
import { useFormik } from "formik";
import * as Yup from "yup";

import Image from "next/image";
import { cn } from "~/helpers";
import GoogleLoginIcon from "./assets/social/google";
import VkLoginIcon from "./assets/social/vk";
import PasswordEyeOpen from "./assets/password_eye_open";
import PasswordEyeClosed from "./assets/password_eye_closed";
import { useState } from "react";
import { AuthStep } from ".";

export default function SignInForm({setAuthStep}: {setAuthStep: (step: AuthStep) => void}) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Не более 20 символов")
        .required("Не заполнено имя"),
      password: Yup.string()
        .required("Не заполнен пароль")
        .test((value) => {
          let errors = [];

          if (!/^(?=.{8,})/.test(value)) {
            errors.push("8+ символов");
          }

          // if (!/^(?=.*[!@#\$%\^&\*])/.test(value)) {
          //   errors.push("Спец. символ");
          // }

          if (!/^(?=.*[0-9])/.test(value)) {
            errors.push("Цифра");
          }

          if (!/^(?=.*[a-z])/.test(value)) {
            errors.push("Строчная буква");
          }

          if (!/^(?=.*[A-Z])/.test(value)) {
            errors.push("Заглавная буква");
          }
          if (errors.length > 0) {
            throw new Yup.ValidationError(
              errors.join("|"),
              errors,
              "password",
              value,
            );
          }

          return true;
        }),
      email: Yup.string()
        .email("Неверный формат почты")
        .required("Не заполнена почта"),
    }),
  });

  return (
    <>
        {/* Main heading */}
        <div className="mb-[40px]">
          <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
            Открой двери
            <br />в мир web3
          </h1>
          <p className="mt-6 text-center text-[14px] leading-5 text-secondary">
            Добропожаловать на платформу
            <br />
            BlockFirst. Мы рады видеть каждого!
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-[24px]"
          onSubmit={formik.handleSubmit}
        >
          {/* Username field */}
          <div className="relative">
            <div
              className={cn(
                "group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground",
                formik.touched.username &&
                  formik.errors.username &&
                  "border-error",
              )}
            >
              {" "}
              <div className="mr-[14px] h-[16px] w-[16px]">
                <AccountSvg active={formik.values.username !== ""} />
              </div>
              <input
                className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
                placeholder={"Ваше имя"}
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              ></input>
              {/* <span className="ml-auto flex items-center text-xs text-success">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                Доступно
              </span> */}
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute left-0 top-[52px] flex gap-[8px] text-[12px] text-error">
                <Image
                  src={ErrorDecorationSvg}
                  alt={""}
                  width={14}
                  height={14}
                ></Image>
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          {/* Email field */}
          <div className="relative">
            <div
              className={cn(
                "group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground",
                formik.touched.email && formik.errors.email && "border-error",
              )}
            >
              <div className="mr-[14px] h-[16px] w-[16px]">
                <EmailSvg active={formik.values.email !== ""} />
              </div>

              <input
                type="email"
                placeholder="Электронная почта"
                className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="absolute left-0 top-[52px] flex gap-[8px] text-[12px] text-error">
                <Image
                  src={ErrorDecorationSvg}
                  alt={""}
                  width={14}
                  height={14}
                ></Image>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password field */}
          <div className="relative">
            <div
              className={cn(
                "group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground",
                formik.touched.password &&
                  formik.errors.password &&
                  "border-error",
              )}
            >
              {" "}
              <div className="mr-[14px] h-[16px] w-[16px]">
                <PasswordSvg active={formik.values.password !== ""} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                className="group"
                onClick={() => setShowPassword(!showPassword)}
              >
                <div className="group">
                  {showPassword ? <PasswordEyeOpen /> : <PasswordEyeClosed />}
                </div>
              </button>
            </div>
            {formik.values.password && formik.errors.password ? (
              <div className="mt-[12px] flex flex-row gap-[8px]">
                {(formik.errors.password.includes("|")
                  ? formik.errors.password.split("|")
                  : [formik.errors.password]
                ).map((error, index) => (
                  <div
                    key={index}
                    className="my-[5px] flex gap-[8px] rounded-[4px] bg-error px-[8px] py-[5px] text-[12px] text-foreground"
                  >
                    {error}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </form>
        <div className="flex-grow"></div>

        {/* Login link */}
        <div className="mb-[20px] h-auto text-center text-[14px] text-foreground">
          Вы зарегистрированы?{" "}
          <Link href="#" className="text-primary">
            Вход
          </Link>
        </div>

        {/* Register button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-foreground"
          onClick={async () => {
            try {
              await signIn("credentials", {
                email: formik.values.email,
                password: formik.values.password,
                email_code: 'abacaba',
                redirect: false,
                
              });
            } catch (error) {
              console.error('Error',error);
            } finally {
              console.log("done");
              setAuthStep(AuthStep.SignUpConfirmEmail);
            }
          }}
        >
          <span className="text-[14px]">Зарегистрироваться</span>
          <svg
            className="ml-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        {/* Social login */}
        <div className="mt-[40px] flex w-full items-center justify-center gap-[12px]">
          <button
            className="flex items-center justify-center"
            onClick={() => signIn("google")}
          >
            <GoogleLoginIcon />
          </button>
          <button
            className="flex items-center justify-center"
            onClick={() => signIn("vk")}
          >
            <VkLoginIcon />
          </button>
        </div>
    </>
  );
}
