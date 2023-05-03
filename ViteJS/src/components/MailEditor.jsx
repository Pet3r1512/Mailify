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

export default function MailEditor({ showEditor, setShowEditor }) {
  const [inbox, setInbox] = useState();
  const [sendError, setSendError] = useState("");

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
    console.log("OnChange: ", content);
    setInbox(content);
  }
  console.log(inbox);

  const onSubmit = async () => {
    console.log(inbox);
    await sleep(200);
    await fetch("api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inbox: inbox }),
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setShowEditor(false);
        setSendError("");
        console.log(showEditor);
      }
      setSendError(res.message);
    });
  };

  return (
    <Box
      sx={{
        display: `${!showEditor && "none"}`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <FormControl fullWidth variant="outlined">
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
              {...register("username")}
            />
            <Button
              color={"inputColor"}
              sx={{
                color: "#fff",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
              variant="contained"
            >
              Check
            </Button>
          </Box>
        </FormControl> */}
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
