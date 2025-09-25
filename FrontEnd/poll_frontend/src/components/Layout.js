import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { logout } from "../services/api";

export default function Layout({ children }) {
    const token = localStorage.getItem("access");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Polls App
          </Typography>
          {token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main style={{ padding: "1rem" }}>{children}</main>
    </>
  );
}
