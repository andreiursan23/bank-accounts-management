import { Play } from 'iconoir-react'
import { forwardRef, useEffect, useRef, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  id: string
  options: SelectOption[]
  placeholder: string
  errorMessage?: string
  label?: string
  classNames?: string
  value?: string
  onChange?: (value: string) => void
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    { id, label, options, placeholder, errorMessage, classNames = '', value, onChange, ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClick = (value: string) => {
      if (onChange) onChange(value)
      setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    const getBorderStyle = () => {
      if (errorMessage) {
        return 'border-red-400'
      } else {
        return 'border-gray-200'
      }
    }

    return (
      <div
        ref={containerRef}
        tabIndex={0}
        className={`w-full flex flex-col content-center relative transition-all duration-200 ease-in-out ${classNames}`}
      >
        {label && (
          <label htmlFor={id} id={`${id}-label`} className="font-normal text-md text-gray-500 pb-1">
            {label}:
          </label>
        )}

        <div
          className={`flex items-center outline-0 rounded-md border ${getBorderStyle()} bg-gray-50 py-2 px-3 text-base text-blue-900 mb-4 hover:border-blue-500 focus:border-blue-500 cursor-pointer`}
          data-testid={`select-${id}`}
          onClick={toggleDropdown}
        >
          <span className={value ? 'text-blue-900' : 'text-gray-400 font-extralight'}>
            {value ? options.find(option => option.value === value)?.label : placeholder}
          </span>

          <Play
            className={`ml-auto h-5 w-5 transition-transform text-gray-400 ${
              isOpen ? 'rotate-[270deg]' : 'rotate-90'
            }`}
          />
        </div>

        <input
          type="hidden"
          ref={ref}
          value={value || ''}
          id={id}
          name={id}
          aria-labelledby={`${id}-label`}
          {...props}
        />

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-md bg-white border-solid border-[1px] border-gray-200 shadow-sm z-10 top-[4.5rem]">
            <ul className="max-h-60 rounded-md py-1 text-base leading-6 shadow-sm overflow-auto focus:outline-none sm:text-sm sm:leading-5">
              {options.map(option => (
                <li
                  key={option.value}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-200"
                  onClick={() => handleOptionClick(option.value)}
                  data-testid={`select-${id}-${option.value}`}
                >
                  <span
                    className={value === option.value ? 'font-bold text-blue-500' : 'font-normal'}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {errorMessage && (
          <p className="absolute font-light bottom-0 left-0 text-[0.625rem] text-red-400">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
