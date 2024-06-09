import { FC, forwardRef } from 'react'

export interface OwnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
  errorMessage?: string
  label?: string
  type?: React.HTMLInputTypeAttribute
  classNames?: string
}

const Input: FC<OwnProps> = forwardRef<HTMLInputElement, OwnProps>(
  ({ id, label, placeholder, errorMessage, type = 'text', classNames = '', ...props }, ref) => {
    const getBorderStyle = () => {
      if (errorMessage) {
        return 'border-red-400'
      } else {
        return 'border-gray-200'
      }
    }

    return (
      <div
        className={`w-full flex flex-col content-center relative transition-all duration-200 ease-in-out ${classNames}`}
      >
        {label && (
          <label htmlFor={id} className="font-normal text-md text-gray-500 pb-1">
            {label}:
          </label>
        )}

        <input
          id={id}
          ref={ref}
          name={id}
          type={type}
          aria-label={label}
          placeholder={placeholder}
          className={`flex items-center outline-0 rounded-md border ${getBorderStyle()} bg-gray-50 py-2 px-3 text-base text-blue-900 mb-4 placeholder:font-extralight placeholder:text-gray-400 hover:border-blue-500 focus:border-blue-500`}
          {...props}
        />

        {errorMessage && (
          <p className="absolute font-light bottom-0 left-0 text-[0.625rem] text-red-400">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
