import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Box } from "@mui/material";
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

export default function MailEditor() {
  const [content, setContent] = useState();

  function handleChange(content) {
    console.log("OnChange: ", content);
    setContent(content);
  }

  return (
    <Box>
      <SunEditor
        autoFocus={true}
        // lang="en"
        width="100%"
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
        // defaultValue={richTextEditorHtml}
        onChange={handleChange}
      />
    </Box>
  );
}
