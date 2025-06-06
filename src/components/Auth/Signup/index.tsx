"use client"

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRegisterMutation } from "@/redux/api/authApi";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      nameFamily: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      nameFamily: Yup.string()
        .required("نام و نام خانوادگی الزامی است")
        .min(3, "نام و نام خانوادگی باید حداقل 3 کاراکتر باشد"),
      phoneNumber: Yup.string()
        .matches(/^09[0-9]{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد")
        .required("شماره موبایل الزامی است"),
      password: Yup.string()
        .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
        .required("رمز عبور الزامی است"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "رمز عبور و تکرار آن باید یکسان باشند")
        .required("تکرار رمز عبور الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        await register({
          nameFamily: values.nameFamily,
          phoneNumber: values.phoneNumber,
          password: values.password,
        }).unwrap();
        router.push("/signin?message=ثبت نام شما با موفقیت انجام شد. حالا وارد سایت شوید");
      } catch (err) {
        if (err?.data?.Message.includes("is already taken")) {
          setError("با این شماره موبایل قبلا ثبت نام کرده اید");
        } else if (err?.data?.Message.includes("Passwords must have at least one digit")) {
          setError("رمز عبور باید حداقل یک عدد داشته باشد");
        } else if (err?.data?.Message.includes("Passwords must have at least one non alphanumeric character")) {
          setError("رمز عبور باید حداقل یک کاراکتر خاص غیر حروف و عدد داشته باشد");
        } else {
          setError("در ثبت نام مشکلی پیش آمده است");
        }
      }
    },
  });

  return (
    <>
      <Breadcrumb title={"ثبت نام"} desc={"ثبت نام در سایت"} pages={["ثبت نام"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                ثبت نام در سایت
              </h2>
              <p>اطلاعات خود را وارد کنید</p>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="nameFamily" className="block mb-2.5">
                    نام و نام خانوادگی
                  </label>

                  <input
                    type="text"
                    name="nameFamily"
                    id="nameFamily"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    value={formik.values.nameFamily}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  {formik.touched.nameFamily && formik.errors.nameFamily && (
                    <div className="text-red font-medium text-sm mt-1">
                      {formik.errors.nameFamily}
                    </div>
                  )}
                </div>

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

                <div className="mb-5">
                  <label htmlFor="confirmPassword" className="block mb-2.5">
                    تکرار رمز عبور
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="رمز عبور خود را مجدداً وارد کنید"
                    autoComplete="on"
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red font-medium text-sm mt-1">
                      {formik.errors.confirmPassword}
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
                  {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
                </button>

                <p className="text-center mt-6">
                  قبلاً ثبت نام کرده‌اید؟
                  <Link
                    href="/signin"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    وارد شوید
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

export default Signup;
