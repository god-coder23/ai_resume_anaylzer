import { CloudUpload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import AI_Response from './AI_Response';
import { PDFParse } from "pdf-parse"
PDFParse.setWorker(
  "https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs"
)
const Upload = () => {
    const [fileName, setFileName] = React.useState("");
    const fileRef = useRef(null)
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);
    const [jobDes, setJobDes] = React.useState("");
    const [file, setFile] = React.useState(null);
    const handleUploadClick = () =>{
        fileRef.current.click()
    }
    const handleFileChange = (e) =>{
        const selectedFile = e.target.files[0]
        setFileName(selectedFile.name)
        console.log(selectedFile)
        setFile(selectedFile)
    }
    const handleButtonClick = () =>{
        analyseDoc()
    }
    const handleJobDes = (e) =>{
        setJobDes(e.target.value)
    }
    const extractTextFromPDF = async (file) => {
        const arrayBuffer = await file.arrayBuffer()

        const parser = new PDFParse({ data: arrayBuffer })
        const result = await parser.getText()

        await parser.destroy()

        return result.text
    }
    const analyseDoc = async () =>{
        if (!file) return alert("Upload a file first")
        let text = ""
        if (file.type == "application/pdf"){
            text = await extractTextFromPDF(file)
        }else{
            text = await file.text()
        }
        console.log(text)
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
Job Description:
${jobDes}

Resume:
${text}

Give:
- match score
- missing skills
- improvements
          `,
        },
      ],
    }),
  })

  const data = await res.json()
  console.log(data)
    }
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <div className='h-[80%] w-[80%] flex flex-row px-10 justify-center items-center gap-5 bg-white rounded-4xl shadow-lg shadow-black/20 '>
            <div onClick={()=>handleUploadClick()} className='border-3 border-dotted border-gray-300 hover:cursor-pointer rounded-3xl h-[70%] w-[60%] flex flex-col justify-center items-center'>
                <CloudUpload color='#165CFD' size={60} />
                <h1>Click or drag and drop</h1>
                <h1 className='text-gray-400 text-xs'>PDF, DOCX (Max 20MB )</h1>
                <input type="file" ref={fileRef} className='hidden' onChange={(e)=>handleFileChange(e)} accept='.pdf,.doc,.docx' />
                {fileName && <div className='text-sm mt-3 bg-amber-300 p-3 rounded-3xl'>{fileName}</div>}
            </div>
            <div className='border border-gray-300 rounded-3xl h-[70%] w-[60%] flex flex-col justify-center items-center'>
                <textarea onChange={(e)=>handleJobDes(e)} type="text" placeholder='Paste the job description here...' className='w-full h-full p-5 outline-[#165DFC] rounded-3xl font-normal' />
            </div>
        </div>
        {<div className='pt-5'>
    <div onClick={()=>handleButtonClick()} className='bg-gray-400 p-4 rounded-3xl flex flex-row gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" color='white' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-astroid-icon lucide-astroid"><path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203"/></svg>
        <h1 className='text-white'>Anaysle Resume</h1>
    </div>
</div>}
        {isButtonClicked && <AI_Response file={file} />}
    </div>
  )
}

export default Upload
