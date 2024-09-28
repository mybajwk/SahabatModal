'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'General Information',
    fields: ['username', 'password', 'name','email','phone', 'role']
  },
  {
    id: 'Step 2',
    name: 'Company Information',
    fields: ['companyname', 'companyowner', 'duration', 'report']
  },
  { id: 'Step 3', name: 'Term of Use' }
]

export default function FormRegister() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })


  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

    const handleRegister = () => {
      console.log("Register in");
    };

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    
      {/* Form */}
      <form className='mt-1 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              General Information
            </h2>
            <p className='text-sm leading-6 text-gray-600 '>
              Provide your general information details.
            </p>
            <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className="sm:col-span-10 mb-4">
                    <label 
                        htmlFor='username'
                        className="block mb-1" 
                        style={{ color: '#0010A4' }}>
                        Username
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Masukkan username Anda.."
                    id='username'
                    {...register('username')}
                    autoComplete='given-name'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.username?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.username.message}
                        </p>
                    )}
                </div>
            </div>

            <div className='sm:col-span-4'>
                <div className="sm:col-span-10 mb-4">
                    <label 
                        htmlFor='password'
                        className="block mb-1" 
                        style={{ color: '#0010A4' }}>
                        Password
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Masukkan Password Anda.."
                    id='password'
                    {...register('password')}
                    autoComplete='given-name'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.password?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.password.message}
                        </p>
                    )}
                </div>
            </div>
            
            <div className='sm:col-span-4'>
                <div className="sm:col-span-10 mb-4">
                    <label 
                        htmlFor='password'
                        className="block mb-1" 
                        style={{ color: '#0010A4' }}>
                        Confirm Password
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Konfirmasi Password Anda.."
                    id='password'
                    {...register('password')}
                    autoComplete='given-name'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.password?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.password.message}
                        </p>
                    )}
                </div>
            </div>
            
            <div className='mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className="sm:col-span-10 mb-4">
                    <label 
                        htmlFor='name'
                        className="block mb-1" 
                        style={{ color: '#0010A4' }}>
                        Nama Lengkap
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Masukkan Nama Lengkap Anda.."
                    id='name'
                    {...register('name')}
                    autoComplete='given-name'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.name?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.name.message}
                        </p>
                    )}
                </div>
            </div>
            <div className='sm:col-span-4'>
            <div className="sm:col-span-10 mb-4">
                <label 
                    htmlFor='email'
                    className="block mb-1" 
                    style={{ color: '#0010A4' }}>
                    Email
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                type="text"
                placeholder="Masukkan Email Anda.."
                id='email'
                {...register('email')}
                autoComplete='email'
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{
                    borderRadius: '5px',
                    border: '1.5px solid #C9C9C9',
                    background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                }}
                />
                {errors.name?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                    {errors.name.message}
                    </p>
                )}
            </div>
            <div className="sm:col-span-10 mb-4">
                <label 
                    htmlFor='phone'
                    className="block mb-1" 
                    style={{ color: '#0010A4' }}
                >
                    Phone
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                    type="tel"  
                    placeholder="Masukkan Nomor Telepon Anda.." 
                    id='phone'
                    {...register('phone')}
                    autoComplete='tel'  
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                    borderRadius: '5px',
                    border: '1.5px solid #C9C9C9',
                    background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                />
                {errors.phone?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                    {errors.phone.message}
                    </p>
                )}
            </div>
            <div className="sm:col-span-10 mb-4">
                <label 
                    htmlFor='role'
                    className="block mb-1" 
                    style={{ color: '#0010A4' }}
                >
                    Pilih Role
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                    id='role'
                    {...register('role')}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                    borderRadius: '5px',
                    border: '1.5px solid #C9C9C9',
                    background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                >
                    <option value="">-- Pilih Role --</option> {/* Opsi default */}
                    <option value="seeker">Seeker</option>
                    <option value="investor">Investor</option>
                </select>
                {errors.role?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                    {errors.role.message}
                    </p>
                )}
            </div>
        </div>
        </motion.div>
    )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Company Details
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Detail Company Information
            </p>

            <div className='mt-5 grid grid-cols-1 gap-y-4 sm:grid-cols-6'>
              <div className="sm:col-span-10 mb-0">
                    <label 
                        htmlFor='companyname'
                        className="block mb-0" 
                        style={{ color: '#0010A4' }}>
                        Nama Perusahaan
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Masukkan Nama Perusahaan Anda.."
                    id='companyname'
                    {...register('companyname')}
                    autoComplete='company-name'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.companyname?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.companyname.message}
                        </p>
                    )}
              </div>
              <div className="sm:col-span-10 mb-0">
                    <label 
                        htmlFor='companyowner'
                        className="block mb-0" 
                        style={{ color: '#0010A4' }}>
                        Nama Pemilik
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Masukkan Nama Pemilik Perusahaan Anda.."
                    id='companyowner'
                    {...register('companyowner')}
                    autoComplete='company-owner'
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    style={{
                        borderRadius: '5px',
                        border: '1.5px solid #C9C9C9',
                        background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                    }}
                    />
                    {errors.companyowner?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                        {errors.companyowner.message}
                        </p>
                    )}
              </div>
              <div className='sm:col-span-10'>
                  <label 
                      htmlFor='duration'
                      className="block mb-0" 
                      style={{ color: '#0010A4' }}>
                      Lama Usaha
                      <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      id='duration'
                      {...register('duration', { 
                          valueAsNumber: true, 
                          setValueAs: (value) => value.toString() 
                      })}
                      autoComplete='duration-level2'
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      style={{
                          borderRadius: '5px',
                          border: '1.5px solid #C9C9C9',
                          background: 'var(--Miscellaneous-Floating-Tab---Pill-Fill, #FFF)',
                      }}
                    />
                      {errors.duration?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                          {errors.duration.message}
                      </p>
                      )}
                  </div>
                </div>
                <div className='sm:col-span-10'>
                  <label 
                        htmlFor='report'
                        className="block mb-0" 
                        style={{ color: '#0010A4' }}>
                        Laporan Keuangan atau Proposal Bisnis Anda
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className='mt-2'>
                        <label
                        htmlFor='report'
                        className='flex items-center justify-center w-full h-30 p-4 border rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200'
                        style={{ border: '2px dashed #C9C9C9' }}
                        >
                        <img src='/upload.png' alt='Upload' className='mr-2 w-6 h-6' />
                        <span className='text-gray-700'>Upload File</span>
                        </label>

                        <input
                        type='file'
                        id='report'
                        {...register('report', { 
                            required: 'Report must be a file', 
                            validate: {
                            // fileSize: (files) => files[0]?.size <= 2 * 1024 * 1024 || 'File size must be less than 2MB',
                            // fileType: (files) => 
                            //     ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(files[0]?.type) || 'Only PDF and Word files are allowed',
                            },
                        })}
                        className='hidden'
                        accept=".pdf, .doc, .docx"
                        />
                        {errors.report?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                            {errors.report.message}
                        </p>
                        )}
                    </div>
                </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Terms Of Use
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur, libero sed luctus vestibulum, turpis metus dignissim eros, sit amet molestie libero nisl id ligula. Nulla vel sapien purus. Curabitur nec quam velit. Etiam sed ex sapien. Proin dictum, eros quis posuere porttitor, dui odio dapibus mauris, vitae fringilla eros felis non libero. Fusce sit amet mi a augue lobortis pharetra. Nulla facilisi. Donec vitae malesuada nisl, ac lacinia justo. Suspendisse sit amet nunc arcu. Mauris at dui in libero lacinia consequat a vel elit.

            Aenean nec nibh eget libero sodales vehicula at eget enim. Fusce bibendum purus sit amet magna malesuada, ac faucibus erat vulputate. Aenean vehicula justo nec est fermentum mollis. Sed ac turpis at metus consectetur aliquam. Mauris et velit ac lacus laoreet varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur blandit orci quis erat viverra facilisis. Duis nec elit et arcu gravida cursus. Integer pretium eros eget erat tincidunt ultricies.

            Curabitur eget justo ac eros luctus scelerisque. Phasellus quis ligula nulla. Integer feugiat odio sit amet metus fringilla, a suscipit mi elementum. Nunc aliquet, justo eget interdum viverra, erat mauris sollicitudin lorem, sit amet efficitur lectus orci non orci. Ut id interdum sem. Mauris ultricies malesuada libero, nec tempor ex scelerisque quis. Cras tincidunt consequat nisi, id pellentesque nulla placerat in. Donec sit amet sem non dui convallis tincidunt. Nunc vehicula dolor vitae interdum sodales. Integer pretium, nulla sit amet fermentum laoreet, sapien felis aliquet purus, et aliquet tortor sapien in erat.

            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis mollis odio a dolor hendrerit, non pellentesque nisi dapibus. Ut facilisis ligula sit amet convallis consequat. Nulla dictum urna vitae arcu rutrum, vel viverra neque iaculis. Maecenas consectetur nulla orci, vitae efficitur est fermentum a. Donec lacinia magna sed metus blandit, a consectetur mauris posuere. Integer non metus in leo vulputate convallis. Suspendisse in orci dapibus, ullamcorper velit vel, consectetur orci. Etiam fringilla eros non enim sodales efficitur. Etiam pharetra dui ut orci consectetur fringilla.
            </p>
            <button
              onClick={handleRegister}
              className="w-full py-2 transition duration-200"
              style={{
                borderRadius: '269.667px',
                background: 'radial-gradient(61.94% 48.96% at 49.96% 96.22%, #3B47BC 0%, #374583 100%)',
                boxShadow: '0px 1.079px 67.417px 0px #D9E6FE, 0px 0px 0px 11.865px rgba(255, 255, 255, 0.07), 0px -1.079px 0px 2.697px rgba(0, 0, 0, 0.20) inset, 0px 1.079px 0px 2.697px rgba(255, 255, 255, 0.40) inset',
                color: 'white', 
              }}
            >
              REGISTER
            </button>
            <div className="text-center mt-4">
              <p className="text-gray-500">
                sudah memiliki akun?{" "}
                <a href="#" style={{ color: '#DC2522', textDecoration: 'underline' }}>
                  login here
                </a>
              </p>
            </div>
          </>
        )}
      </form>
      <div className='mt-0 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
        <div className='items-center'>
          <p className="text-gray-500 items-center mt-3">
                  sudah memiliki akun?{" "}
                  <a href="#" style={{ color: '#DC2522', textDecoration: 'underline' }}>
                    login here
                  </a>
                </p>
        </div>
      </div>
    </section>
  )
}