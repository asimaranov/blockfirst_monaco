"use client";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "~/server/auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import LogoSvg from "./icons/logo.svg";
import ErrorDecorationSvg from "./icons/error_decoration.svg";
import AccountSvg from "./icons/account";
import EmailSvg from "./icons/email";
import PasswordSvg from "./icons/password";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";

import Image from "next/image";
import { cn } from "~/helpers";
import GoogleLoginIcon from "./icons/google";
import VkLoginIcon from "./icons/vk";

const SIGNIN_ERROR_URL = "/error";

export default function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const showPassword = true;

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
        .max(15, "Must be 15 characters or less")
        .required("Не заполнено имя"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Не заполнен пароль"),
      email: Yup.string().email("Неверный формат почты").required("Не заполнена почта"),
    }),
  });

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Blue glow effect */}

      <div className="relative z-10 flex w-full max-w-[468px] flex-col p-[64px] outline outline-[1px] outline-accent">
        {/* Logo */}
        <div className="mb-[64px] flex w-full items-center justify-center">
          <Image src={LogoSvg} alt="logo" />
        </div>

        {/* Main heading */}
        <div className="mb-[40px]">
          <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
            Открой двери
            <br />в мир web3
          </h1>
          <p className="mt-6 text-center text-[14px] leading-5 text-secondary">
            Добропожаловать на образовательную платформу
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
            <div className="group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground">
              <div className="mr-[14px] h-[16px] w-[16px]">
                <AccountSvg />
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
              <span className="ml-auto flex items-center text-xs text-success">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                Доступно
              </span>
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className=" mt-[12px] ml-16px text-error text-[12px] flex gap-[8px] ml-[16px]">
                <Image src={ErrorDecorationSvg} alt={""} width={14} height={14}></Image>
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
                <EmailSvg />
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
              <div className=" mt-[12px] ml-16px text-error text-[12px] flex gap-[8px] ml-[16px]">
                <Image src={ErrorDecorationSvg} alt={""} width={14} height={14}></Image>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password field */}
          <div className="relative">
            <div className="group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground">
              <div className="mr-[14px] h-[16px] w-[16px]">
                <PasswordSvg />
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
                // onClick={() => setShowPassword(!showPassword)}
                className="text-secondary opacity-50"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="absolute bg-red-500">
                {/* {formik.errors.password} */}
              </div>
            ) : null}
          </div>
        </form>
        <div className="flex-grow"></div>

        {/* Login link */}
        <div className="mb-[20px] h-auto text-center text-[14px] text-foreground">
          Вы зарегистрированны?{" "}
          <Link href="#" className="text-primary">
            Вход
          </Link>
        </div>

        {/* Register button */}
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 text-foreground"
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
          <button className="flex items-center justify-center">
            <GoogleLoginIcon />
          </button>
          <button className="flex items-center justify-center">
            <VkLoginIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

