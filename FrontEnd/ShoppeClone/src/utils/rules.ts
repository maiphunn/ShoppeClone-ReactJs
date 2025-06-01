import type { UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

export const getRules = (getValues?: UseFormGetValues<any>) => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email là không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 tới 160'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 tới 160'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 tới 160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 tới 160'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại mật khẩu là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 tới 160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 tới 160'
    },
    validate:
      typeof getValues === 'function'
        ? (value: any) => value === getValues('password') || 'Mật khẩu không trùng khớp'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email là không đúng định dạng')
    .min(5, 'Độ dài từ 5 tới 160')
    .max(160, 'Độ dài từ 5 tới 160'),
  password: yup.string().required('Email là bắt buộc').min(6, 'Độ dài từ 6 tới 160').max(160, 'Độ dài từ 6 tới 160'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6 tới 160')
    .max(160, 'Độ dài từ 6 tới 160')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

export type Schema = yup.InferType<typeof schema>
