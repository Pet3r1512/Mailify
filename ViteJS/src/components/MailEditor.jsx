import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";

export default function MailEditor({
  showEditor,
  setShowEditor,
  notice,
  setNotice,
}) {
  const [inbox, setInbox] = useState();
  const [sendError, setSendError] = useState("");
  const [title, setTitle] = useState("");
  const [receiverArr, setReceiverArr] = useState();
  const [type, setType] = useState("");

  const changeType = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };

  const receivers = [];

  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    control,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function handleChange(content) {
    setInbox(content);
  }

  const onSubmit = async () => {
    await sleep(200);
    await fetch("api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inbox: inbox,
        sender: localStorage.getItem("thisUsername"),
        receivers: receiverArr,
        title: title,
        type: type,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setShowEditor(false);
        setSendError("");
        setNotice("Successful mailing");
      } else {
        setSendError(res.message);
        setNotice("Sending mail has failed");
      }
    });
  };

  return (
    <Box
      sx={{
        display: `${!showEditor && "none"}`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth variant="outlined">
          <Box display={"flex"}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              color="inputColor"
            >
              Send to
            </InputLabel>
            <OutlinedInput
              fullWidth
              required
              id="destinations"
              color="inputColor"
              type="text"
              label="Send to"
              onBlur={(e) => {
                e.target.value.split(",").forEach((item) => {
                  receivers.push(item);
                });
                setReceiverArr(receivers);
                e.stopPropagation();
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#ffb703",
              padding: "0 10px",
              marginTop: "10px",
            }}
          >
            When sending mail to more than one person, list the usernames
            separated by commas. For example: JohnDoe,MartinScott
          </Typography>
        </FormControl>
        <FormControl
          sx={{
            marginBlock: "10px",
          }}
          fullWidth
          variant="outlined"
        >
          <Box display={"flex"}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              color="inputColor"
            >
              Title
            </InputLabel>
            <OutlinedInput
              fullWidth
              required
              id="destinations"
              color="inputColor"
              type="text"
              label="Title"
              onBlur={(e) => {
                setTitle(e.target.value);
                e.stopPropagation();
              }}
            />
          </Box>
        </FormControl>
        <FormControl sx={{ padding: "0 10px" }}>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            color={"inputColor"}
          >
            Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={changeType}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <FormControlLabel
              value="Important"
              control={<Radio />}
              label="Important"
            />
            <FormControlLabel
              value="Social Media"
              control={<Radio />}
              label="Social Media"
            />
            <FormControlLabel
              value="Advertisments"
              control={<Radio />}
              label="Advertisments"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <SunEditor
            id="mailContent"
            autoFocus={true}
            width="100%"
            getSunEditorInstance={getSunEditorInstance}
            setOptions={{
              showPathLabel: false,
              minHeight: "50vh",
              maxHeight: "50vh",
              placeholder: "Enter your text here!!!",
              plugins: [
                align,
                font,
                fontColor,
                fontSize,
                formatBlock,
                hiliteColor,
                horizontalRule,
                lineHeight,
                list,
                paragraphStyle,
                table,
                template,
                textStyle,
                image,
                link,
              ],
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["paragraphStyle"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor"],
                ["removeFormat"],
                "/", // Line break
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image"],
              ],
              formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
              font: [
                "Arial",
                "Calibri",
                "Comic Sans",
                "Courier",
                "Garamond",
                "Georgia",
                "Impact",
                "Lucida Console",
                "Palatino Linotype",
                "Segoe UI",
                "Tahoma",
                "Times New Roman",
                "Trebuchet MS",
              ],
            }}
            onChange={handleChange}
          />
        </FormControl>
        <Box>
          <Button
            color={"inputColor"}
            sx={{ color: "#fff", fontWeight: 700 }}
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
          >
            Send
          </Button>
          <Typography variant="body1" color="initial">
            {sendError}
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
