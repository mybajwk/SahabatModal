"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/file-uploader";

export const FormDataSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  role: z.enum(["seeker", "investor"], { required_error: "Role is required" }),
  companyname: z.string().nullable(),
  companyowner: z.string().nullable(),
  business_age: z.number().nullable(),
  report: z.instanceof(File).nullable(),
});

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "General Information",
    fields: ["username", "password", "name", "email", "phone_number", "role"],
  },
  {
    id: "Step 2",
    name: "Company Information",
    fields: ["companyname", "companyowner", "business_age", "report"],
  },
  { id: "Step 3", name: "Term of Use" },
];

export default function FormRegister() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [isBusiness, setIsBusiness] = useState(false);
  const [path, setPath] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const selectedRole = watch("role");

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsBusiness(selectedRole === "seeker");
    if (isBusiness) {
      setValue("companyname", "");
      setValue("companyowner", "");
      setValue("business_age", 0);
      setValue("report", null);
    } else {
      setValue("companyname", null);
      setValue("companyowner", null);
      setValue("business_age", null);
      setValue("report", null);
    }
  }, [isBusiness, setValue]);

  useEffect(() => {
    setIsBusiness(selectedRole === "seeker");
  }, [selectedRole]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const registerEndpoint = "api/registration";
    const businessEndpoint = "api/registration/business";
    const generalData = {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      phone_number: data.phone_number,
      role: data.role == "investor" ? 4 : 3,
    };

    try {
      const userResponse = await axios.post("/api/registration", generalData);
      console.log("response regis user", userResponse);
      const newUserId = userResponse.data?.user.id;

      if (
        isBusiness &&
        (data.companyname || data.companyowner || data.business_age || path)
      ) {
        const businessData = {
          name: data.companyname,
          owner: data.companyowner,
          business_age: data.business_age,
          report: path,
          user_id: newUserId,
        };

        const businessResponse = await axios.post(
          "/api/registration/business",
          businessData
        );
        toast({ variant: "default", title: "success register business" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({ variant: "destructive", title: "Fail to register" });
    }

    router.refresh();
    router.push("/login");
  };

  const handleRegister = async () => {
    console.log("Register button clicked."); // Log when the button is clicked

    try {
      // Call handleSubmit and wait for its result
      await handleSubmit(processForm)();
      console.log("Form submitted successfully."); // Log if form submission is initiated
    } catch (error) {
      console.error("Error during registration:", error); // Log any errors
    }
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      if (!isBusiness) {
        setCurrentStep((step) => step + 1);
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
      if (!isBusiness) {
        setCurrentStep((step) => step - 1);
      }
    }
  };
  return (
    <section className="absolute inset-0 flex flex-col justify-between p-24">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className="mt-1 py-12" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ business_age: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              General Information
            </h2>
            <p className="text-sm leading-6 text-gray-600 ">
              Provide your general information details.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="username"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Username
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan username Anda.."
                  id="username"
                  {...register("username")}
                  autoComplete="given-name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.username?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Password
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Password Anda.."
                  id="password"
                  {...register("password")}
                  autoComplete="given-name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="password"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Confirm Password
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Konfirmasi Password Anda.."
                  id="password"
                  {...register("password")}
                  autoComplete="given-name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Nama Lengkap
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap Anda.."
                  id="name"
                  {...register("name")}
                  autoComplete="given-name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.name?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="email"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Email
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Email Anda.."
                  id="email"
                  {...register("email")}
                  autoComplete="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.name?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="phone_number"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Phone Number
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Masukkan Nomor Telepon Anda.."
                  id="phone_number"
                  {...register("phone_number")}
                  autoComplete="tel"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.phone_number?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-10 mb-4">
                <label
                  htmlFor="role"
                  className="block mb-1"
                  style={{ color: "#0010A4" }}
                >
                  Pilih Role
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                >
                  <option value="">-- Pilih Role --</option>{" "}
                  {/* Opsi default */}
                  <option value="seeker">Seeker</option>
                  <option value="investor">Investor</option>
                </select>
                {errors.role?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ business_age: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Company Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Detail Company Information
            </p>

            <div className="mt-5 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-10 mb-0">
                <label
                  htmlFor="companyname"
                  className="block mb-0"
                  style={{ color: "#0010A4" }}
                >
                  Nama Perusahaan
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Perusahaan Anda.."
                  id="companyname"
                  {...register("companyname")}
                  autoComplete="company-name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.companyname?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.companyname.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-10 mb-0">
                <label
                  htmlFor="companyowner"
                  className="block mb-0"
                  style={{ color: "#0010A4" }}
                >
                  Nama Pemilik
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Pemilik Perusahaan Anda.."
                  id="companyowner"
                  {...register("companyowner")}
                  autoComplete="company-owner"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  style={{
                    borderRadius: "5px",
                    border: "1.5px solid #C9C9C9",
                    background:
                      "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                    color: "#000",
                  }}
                />
                {errors.companyowner?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.companyowner.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-10">
                <label
                  htmlFor="business_age"
                  className="block mb-0"
                  style={{ color: "#0010A4" }}
                >
                  Lama Usaha
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="business_age"
                    {...register("business_age", {
                      valueAsNumber: true,
                      setValueAs: (value) => value.toString(),
                    })}
                    autoComplete="business_age-level2"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                      borderRadius: "5px",
                      border: "1.5px solid #C9C9C9",
                      background:
                        "var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)",
                      color: "#000",
                    }}
                  />
                  {errors.business_age?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.business_age.message}
                    </p>
                  )}
                </div>
              </div>
              <FileUploader path={path} setPath={setPath} />
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Terms Of Use
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600 h-96 overflow-y-auto mb-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                efficitur, libero sed luctus vestibulum, turpis metus dignissim
                eros, sit amet molestie libero nisl id ligula. Nulla vel sapien
                purus. Curabitur nec quam velit. Etiam sed ex sapien. Proin
                dictum, eros quis posuere porttitor, dui odio dapibus mauris,
                vitae fringilla eros felis non libero. Fusce sit amet mi a augue
                lobortis pharetra. Nulla facilisi. Donec vitae malesuada nisl,
                ac lacinia justo. Suspendisse sit amet nunc arcu. Mauris at dui
                in libero lacinia consequat a vel elit.
              </p>
              <p>
                Aenean nec nibh eget libero sodales vehicula at eget enim. Fusce
                bibendum purus sit amet magna malesuada, ac faucibus erat
                vulputate. Aenean vehicula justo nec est fermentum mollis. Sed
                ac turpis at metus consectetur aliquam. Mauris et velit ac lacus
                laoreet varius. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia curae; Curabitur blandit orci
                quis erat viverra facilisis. Duis nec elit et arcu gravida
                cursus. Integer pretium eros eget erat tincidunt ultricies.
              </p>
              <p>
                Curabitur eget justo ac eros luctus scelerisque. Phasellus quis
                ligula nulla. Integer feugiat odio sit amet metus fringilla, a
                suscipit mi elementum. Nunc aliquet, justo eget interdum
                viverra, erat mauris sollicitudin lorem, sit amet efficitur
                lectus orci non orci. Ut id interdum sem. Mauris ultricies
                malesuada libero, nec tempor ex scelerisque quis. Cras tincidunt
                consequat nisi, id pellentesque nulla placerat in. Donec sit
                amet sem non dui convallis tincidunt. Nunc vehicula dolor vitae
                interdum sodales. Integer pretium, nulla sit amet fermentum
                laoreet, sapien felis aliquet purus, et aliquet tortor sapien in
                erat.
              </p>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Duis mollis odio a dolor hendrerit, non
                pellentesque nisi dapibus. Ut facilisis ligula sit amet
                convallis consequat. Nulla dictum urna vitae arcu rutrum, vel
                viverra neque iaculis. Maecenas consectetur nulla orci, vitae
                efficitur est fermentum a. Donec lacinia magna sed metus
                blandit, a consectetur mauris posuere. Integer non metus in leo
                vulputate convallis. Suspendisse in orci dapibus, ullamcorper
                velit vel, consectetur orci. Etiam fringilla eros non enim
                sodales efficitur. Etiam pharetra dui ut orci consectetur
                fringilla.
              </p>
            </div>
            <button
              onClick={handleRegister}
              type="button"
              className="w-full mt-2 py-2 transition business_age-200"
              style={{
                borderRadius: "269.667px",
                background:
                  "radial-gradient(61.94% 48.96% at 49.96% 96.22%, #3B47BC 0%, #374583 100%)",
                boxShadow:
                  "0px 1.079px 67.417px 0px #D9E6FE, 0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset",
                color: "white",
              }}
            >
              REGISTER
            </button>
            <div className="text-center mt-4">
              <p className="text-gray-500">
                sudah memiliki akun?
                <a
                  href="login"
                  style={{ color: "#DC2522", textDecoration: "underline" }}
                >
                  login here
                </a>
              </p>
            </div>
          </>
        )}
      </form>
      <div className="mt-0 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="items-center">
          {currentStep !== steps.length - 1 && (
            <p className="text-gray-500 items-center mt-3">
              sudah memiliki akun?{" "}
              <a
                href="#"
                style={{ color: "#DC2522", textDecoration: "underline" }}
              >
                login here
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
