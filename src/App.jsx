import Heading from './components/Heading'

const App = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.20),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.18),_transparent_24%),linear-gradient(180deg,_#fffdf8_0%,_#f7fbff_45%,_#eef4ff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[8%] top-20 h-32 w-32 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-[10%] top-12 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Heading />
      </div>
    </main>
  )
}

export default App
