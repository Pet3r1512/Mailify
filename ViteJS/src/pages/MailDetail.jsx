import React, { useEffect, useState } from "react";
import { Box, Fab, Typography, Alert, Tooltip, Button } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MailDetail() {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState("");
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleDelete = () => {
    const dataFetch = async () => {
      const data = (
        await fetch(`https://mailify-server.onrender.com/api/mail/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailId: state.id,
          }),
        })
      )
        .json()
        .then((res) => {
          if (res.success === true) {
            setAlert("Deleted Successfully");
          } else {
            setAlert("Something goes wrong!");
          }
        });
    };
    dataFetch();
  };

  const handleSpam = () => {
    const dataFetch = async () => {
      const data = (
        await fetch(`https://mailify-server.onrender.com/api/mail/spam`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailId: state.id,
          }),
        })
      )
        .json()
        .then((res) => {
          if (res.success === true) {
            setAlert("Moved to spam successfully");
          } else {
            setAlert("Something goes wrong!");
          }
        });
    };
    dataFetch();
  };

  const handleStar = () => {
    const dataFetch = async () => {
      const data = (
        await fetch(`https://mailify-server.onrender.com/api/mail/star`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mailId: state.id,
          }),
        })
      )
        .json()
        .then((res) => {
          if (res.success === true) {
            setAlert("Starred Successfully");
          } else {
            setAlert("Something goes wrong!");
          }
        });
    };
    dataFetch();
  };

  useEffect(() => {
    const dataFetch = async () => {
      const data = (
        await fetch(
          `https://mailify-server.onrender.com/api/mail/${state.id}`,
          {
            method: "GET",
          }
        )
      )
        .json()
        .then((res) => {
          setData(res.mail);
        });
    };
    dataFetch();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 3500);
  }, [alert]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "#000",
        height: {
          xs: "auto",
          md: "100vh",
        },
        minHeight: {
          xs: "100vh",
          md: "100vh",
        },
        padding: {
          xs: "20px 8px",
          md: "unset",
        },
      }}
    >
      <Tooltip title="Back To Inbox">
        <Button
          sx={{
            width: "fit-content",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          variant="contained"
          onClick={() => {
            navigate("/inbox");
          }}
        >
          Back
        </Button>
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: "20px",
        }}
      >
        <Box sx={{ cursor: "default" }}>
          <Typography variant="h6" color="initial">
            From: {data.sender}
          </Typography>
          <Typography variant="h6" color="initial">
            To:{" "}
            {data.receivers?.map((item) => {
              return item;
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Fab onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
          <Fab onClick={handleSpam}>
            <ReportIcon />
          </Fab>
          <Fab onClick={handleStar}>
            <StarOutlineIcon />
          </Fab>
        </Box>
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <Typography variant="h3" color="initial" textAlign={"center"}>
          {data.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </Box>
      {alert === "" ? (
        <></>
      ) : (
        <Box>
          {alert === "Something goes wrong!" ? (
            <Alert severity="error">Something goes wrong!</Alert>
          ) : (
            <Alert
              sx={{
                position: "absolute",
                bottom: {
                  xs: "10px",
                  md: 0,
                },
              }}
              severity="success"
            >
              {alert}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
