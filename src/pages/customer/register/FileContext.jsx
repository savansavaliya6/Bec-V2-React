// FileContext.js
import React, { createContext, useState } from "react"
import { useEffect } from "react"

const FileContext = createContext()

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([])

  const saveFile = (newFile) => {
    setFiles((prevFiles) => {
      const existingFileIndex = prevFiles.findIndex(
        (file) => file.name === newFile.name
      )
      if (existingFileIndex !== -1) {
        const updatedFiles = [...prevFiles]
        updatedFiles[existingFileIndex] = newFile
        return updatedFiles
      } else {
        return [...prevFiles, newFile]
      }
    })
  }

  return (
    <FileContext.Provider value={{ files, saveFile }}>
      {children}
    </FileContext.Provider>
  )
}

export default FileContext
