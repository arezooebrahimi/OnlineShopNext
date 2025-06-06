"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLoginMutation } from "@/redux/api/authApi";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { cookieService } from "@/services/cookieService";


const Signin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^09[0-9]{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
        .required("شماره موبایل الزامی است"),
      password: Yup.string()
        .required("رمز عبور الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        cookieService.setCookie('atn', result.data.accessToken, 1);
        cookieService.setCookie('rtn', result.data.refreshToken, 30);

        window.location.href = "/";
      } catch (err) {
        if (err?.data?.Message.includes("Username or password is incorrect")) {
          setError("شماره موبایل یا رمز عبور اشتباه است");
        } else {
          setError("در ورود به حساب کاربری مشکلی پیش آمده است");
        }
      }
    },
  });

  return (
    <>
      <Breadcrumb title={"ورود"} desc={"ورود به حساب کاربری"} pages={["ورود"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                ورود به حساب کاربری
              </h2>
              <p>اطلاعات خود را وارد کنید</p>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                {successMessage && (
                  <div className="mb-4 p-4 border border-green rounded-lg">
                    <p className="text-green text-sm font-medium text-center">
                      {successMessage}
                    </p>
                  </div>
                )}

                <div className="mb-5">
                  <label htmlFor="phoneNumber" className="block mb-2.5">
                    شماره موبایل
                  </label>

                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="شماره موبایل خود را وارد کنید"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-red font-medium text-sm mt-1">
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    رمز عبور
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="رمز عبور خود را وارد کنید"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red font-medium text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="text-red text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                >
                  {isLoading ? "در حال ورود..." : "ورود به حساب کاربری"}
                </button>

                <a
                  href="#"
                  className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  رمز عبور خود را فراموش کرده‌اید؟
                </a>

                <span className="relative z-1 block font-medium text-center mt-4.5">
                  <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                  <span className="inline-block px-3 bg-white">یا</span>
                </span>

                <p className="text-center mt-6">
                  حساب کاربری ندارید؟
                  <Link
                    href="/signup"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    ثبت نام کنید
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
