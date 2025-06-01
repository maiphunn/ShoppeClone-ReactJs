import type { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  name: string
  placeholder?: string
  className?: string
  register: UseFormRegister<any>
  // rules: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  className,
  errorMessage,
  placeholder,
  name,
  // rules,
  autoComplete,
  register
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
