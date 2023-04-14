import React, { useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Editor.module.css";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

const Editor = ({ displayName, language, value, onChange }) => {
  const [open, setOpen] = useState(true);
  const edtorRef = useRef(null);
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  return (
    <div className={`${open ? styles.editorContainer : styles.collapse}`}>
      <div className={styles.editorTitle}>
        {displayName}
        <button onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
    
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className={styles.codeMirrorWrapper}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
