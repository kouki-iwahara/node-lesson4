const isValidPassword = (password, confirmPassword) => {
  return password === confirmPassword && password.length > 5
}

export const isValidationComplete = (
  name,
  email,
  password,
  confirmPassword
) => {
  return (
    name.length && email.length && isValidPassword(password, confirmPassword)
  )
}
