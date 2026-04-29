import { CheckCircle2, FileSearch, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const loadingSteps = [
  'Reviewing the resume content',
  'Comparing it with the job description',
  'Drafting suggestions and strengths',
]

const AI_Response = ({ parsedDoc, jobDes, fileName }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError('')

        const fetchAI = await fetch('https://odd-surf-c38e.yatnesh65.workers.dev/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parsedDoc: parsedDoc.slice(0, 3000),
            jobDes: jobDes.slice(0, 1500),
          }),
        })

        const data = await fetchAI.json()

        if (!fetchAI.ok) {
          throw new Error(data?.error?.message || 'Failed to generate the analysis.')
        }

        if (data.error) {
          setError(data.error.message)
          setResult('')
          return
        }

        setResult(data.choices?.[0]?.message?.content || 'No response returned.')
      } catch (requestError) {
        console.error(requestError)
        setError(requestError.message || 'Unable to fetch the AI response right now.')
        setResult('')
      } finally {
        setIsLoading(false)
      }
    }

    if (parsedDoc && jobDes) {
      fetchData()
    }
  }, [parsedDoc, jobDes])

  return (
    <section className="mt-8 rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] backdrop-blur sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            <Sparkles size={14} />
            AI Response
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Resume match summary
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {fileName ? `Review generated for ${fileName}.` : 'Review generated from your latest upload.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p>Resume sample used: {Math.min(parsedDoc.length, 3000)} characters</p>
          <p>Job description used: {Math.min(jobDes.length, 1500)} characters</p>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4 py-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <FileSearch size={22} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">In Progress</p>
                <h3 className="mt-1 text-xl font-semibold">Building your analysis</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              The AI is turning your resume and target role into a recruiter-style review.
            </p>
          </div>

          <div className="space-y-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            {loadingSteps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-slate-600 shadow-sm"
              >
                <span className="h-3 w-3 animate-pulse rounded-full bg-sky-500" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm leading-6 text-rose-700">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_100%)] p-6 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={22} />
              <h3 className="text-xl font-semibold">Analysis complete</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Use the feedback on the right to refine wording, align keywords, and tighten
              the story your resume tells for this role.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <pre className="font-sans whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {result}
            </pre>
          </div>
        </div>
      )}
    </section>
  )
}

export default AI_Response
