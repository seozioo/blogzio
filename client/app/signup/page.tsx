import { useCallback } from "react"

export default function Signup() {
  const onSignup = useCallback(async () => {
    const formData = new FormData()

    formData.append("email", "")
    formData.append("password", "")

    await fetch("/user/signup", {
      method: "POST", body: formData})
  }, [])

  return (
    <><button title="Sign Up" onClick={onSignup}></button></>
  )
}
