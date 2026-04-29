import Upload from './Upload'

const metrics = [
  { value: '20MB', label: 'supported uploads' },
  { value: 'AI', label: 'resume review engine' },
  { value: 'Fast', label: 'job-match feedback' },
]

const Heading = () => {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-sm font-medium tracking-[0.24em] text-sky-700 uppercase shadow-sm shadow-sky-100/60 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Smarter Resume Review
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Make your next application feel
          <span className="block bg-gradient-to-r from-sky-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
            tailored before you hit send
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Upload your resume, drop in a job description, and get focused AI feedback on
          alignment, gaps, and how strong your story looks to recruiters.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="min-w-36 rounded-2xl border border-white/80 bg-white/80 px-5 py-4 text-left shadow-lg shadow-slate-200/40 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-500 capitalize">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Upload />
    </section>
  )
}

export default Heading
