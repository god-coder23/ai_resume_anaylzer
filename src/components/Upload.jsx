import {
  Briefcase,
  CloudUpload,
  FileText,
  Sparkles,
  Upload as UploadIcon,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { PDFParse } from 'pdf-parse'
import AI_Response from './AI_Response'

PDFParse.setWorker(
  'https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs',
)

const featureCards = [
  {
    icon: FileText,
    title: 'Resume parsing',
    description: 'Reads your uploaded file and extracts the content used for review.',
  },
  {
    icon: Briefcase,
    title: 'Role targeting',
    description: 'Compares your resume against the job description you want to pursue.',
  },
  {
    icon: Sparkles,
    title: 'Actionable feedback',
    description: 'Returns clear guidance instead of making you sift through raw output.',
  },
]

const Upload = () => {
  const fileRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [jobDes, setJobDes] = useState('')
  const [file, setFile] = useState(null)
  const [parsedText, setParsedText] = useState('')
  const [isParsing, setIsParsing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleUploadClick = () => {
    fileRef.current?.click()
  }

  const applySelectedFile = (selectedFile) => {
    if (!selectedFile) return

    setFile(selectedFile)
    setFileName(selectedFile.name)
    setParsedText('')
    setShowResult(false)
    setError('')
  }

  const handleFileChange = (event) => {
    applySelectedFile(event.target.files?.[0] ?? null)
  }

  const handleJobDes = (event) => {
    setJobDes(event.target.value)
    setShowResult(false)
    setError('')
  }

  const extractTextFromPDF = async (selectedFile) => {
    const arrayBuffer = await selectedFile.arrayBuffer()
    const parser = new PDFParse({ data: arrayBuffer })
    const result = await parser.getText()

    await parser.destroy()

    return result.text
  }

  const analyseDoc = async () => {
    if (!file) {
      setError('Upload your resume before running the analysis.')
      return
    }

    if (!jobDes.trim()) {
      setError('Paste a job description so the AI has something to compare against.')
      return
    }

    try {
      setIsParsing(true)
      setError('')

      let text = ''
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file)
      } else {
        text = await file.text()
      }

      setParsedText(text)
      setShowResult(true)
    } catch (parseError) {
      console.error(parseError)
      setError('Something went wrong while reading the file. Try another upload and retry.')
      setShowResult(false)
    } finally {
      setIsParsing(false)
    }
  }

  const isReadyToAnalyse = Boolean(file && jobDes.trim())

  return (
    <section className="mx-auto mt-10 max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-2">
            <button
              type="button"
              onClick={handleUploadClick}
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                applySelectedFile(event.dataTransfer.files?.[0] ?? null)
              }}
              className={`group flex min-h-[320px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed px-6 py-8 text-center transition duration-300 ${
                isDragging
                  ? 'border-sky-500 bg-sky-50 shadow-inner'
                  : 'border-slate-300 bg-slate-50/70 hover:border-sky-400 hover:bg-white'
              }`}
            >
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-200">
                <CloudUpload size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-slate-900">Upload your resume</h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                Click to browse or drag and drop a PDF, DOC, or DOCX file here.
              </p>

              <div className="mt-6 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700">
                {fileName || 'No file selected yet'}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                <UploadIcon size={16} />
                Max file size: 20MB
              </div>
            </button>

            <div className="flex min-h-[320px] flex-col rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.96)_100%)] p-1">
              <div className="flex items-center justify-between px-5 pt-5">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    Target Role
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    Paste the job description
                  </h2>
                </div>
                <Briefcase className="text-amber-500" size={24} />
              </div>

              <textarea
                value={jobDes}
                onChange={handleJobDes}
                placeholder="Include the responsibilities, requirements, and keywords you want to optimize for."
                className="mt-4 min-h-[230px] flex-1 resize-none rounded-[1.4rem] border border-transparent bg-white px-5 py-4 text-sm leading-6 text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-200"
              />
            </div>
          </div>

          <input
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />

          <div className="mt-5 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Analysis</p>
              <p className="mt-2 text-sm text-slate-300">
                {isParsing
                  ? 'Reading your resume and preparing the content for AI review.'
                  : 'Run the comparison when both the resume and job description are ready.'}
              </p>
            </div>

            <button
              type="button"
              onClick={analyseDoc}
              disabled={!isReadyToAnalyse || isParsing}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={18} />
              {isParsing ? 'Preparing analysis...' : 'Analyze resume'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
        </div>

        <aside className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
            What You Get
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            A cleaner review flow from upload to insight
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This layout keeps the most important actions visible, shortens the path to
            analysis, and makes the generated feedback easier to scan.
          </p>

          <div className="mt-6 space-y-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {showResult && parsedText && jobDes && (
        <AI_Response parsedDoc={parsedText} jobDes={jobDes} fileName={fileName} />
      )}
    </section>
  )
}

export default Upload
