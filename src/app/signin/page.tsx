"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarOrigin } from "@mui/material/Snackbar";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface State extends SnackbarOrigin {
  open: boolean;
}
export default function SignIn() {
  const [errorMessage, setErrorMessage] = React.useState<JSX.Element | null>();
  const route = useRouter();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log(data.get("password"), data.get("email"));
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    if (json.error) {
      setErrorMessage(json.error);
    }
    if (json.Status === "Success") {
      setState({ ...state, open: true });
      route.push("/");
    }
    console.log(json);
  };

  return <div>Haha</div>;
}
