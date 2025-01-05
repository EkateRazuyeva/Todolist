import { FormControl, FormLabel } from "@mui/material"
import { useLogin } from "../../../todolists/lib/hooks/useLogin"
import { Navigate } from "react-router-dom"
import Grid from "@mui/material/Unstable_Grid2"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel"
import { LoginForm } from "./LoginForm/LoginFrom"

export const Login = () => {
  const { isLoggedIn } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid>
    </Grid>
  )
}
