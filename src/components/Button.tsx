interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  className?: string
}

const Button = ({ children, isLoading = false, className = '', ...rest }: Props) => {
  return (
    <button
      disabled={isLoading}
      className={className !== '' ? className : 'flex items-center justify-center gap-2'}
      {...rest}
    >
      {isLoading && <></>}
      {children}
    </button>
  )
}

export default Button
