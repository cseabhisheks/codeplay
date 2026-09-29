import { useState } from "react"
import Editor from "@monaco-editor/react"

export default function App() {
  const [tab, setTab] = useState(0)

  const [codeTab, setCodeTab] = useState({
    html: '',
    css: '',
    js: '',
    result: ''
  })

  const [isrunActive, setRunActive] = useState(false)

  const handleTab = (idx) => {
    setRunActive(false)
    setTab(idx)
  }

  const handleRun = () => {
    const r = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        ${codeTab.css}
      </style>
    </head>
    <body>
      ${codeTab.html}
      <script>
        ${codeTab.js}
      </script>
    </body>
    </html>
    `

    setCodeTab((prev) => ({
      ...prev,
      result: r
    }))

    setRunActive(true)
  }

  const tabButton = [
    { name: 'HTML', id: 0 },
    { name: 'CSS', id: 1 },
    { name: 'JS', id: 2 }
  ]

  return (
    <div className="h-screen overflow-hidden bg-gray-950 text-white">

      {/* Page Header */}
      <header className="flex h-16 shrink-0 items-center border-b border-gray-800 bg-gray-900 px-6">
        <h1 className="text-xl font-bold">
          Code<span className="text-green-400">Editor</span>
        </h1>

        <span className="ml-4 rounded-md bg-gray-800 px-3 py-1 text-xs text-gray-400">
          HTML • CSS • JS
        </span>
      </header>

      {/* Main */}
      <main className="mx-auto h-[calc(100vh-64px)] max-w-7xl p-6">

        {/* Editor Card */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 shadow-2xl">

          {/* Editor Header */}
          <div className="flex h-14 shrink-0 items-center border-b border-gray-800 bg-gray-900">

            {/* Tabs */}
            <div className="flex h-full">
              {tabButton.map((e) => (
                <button
                  onClick={() => handleTab(e.id)}
                  key={e.id}
                  className={`border-r border-gray-800 px-7 text-sm font-medium transition
                    ${tab === e.id && !isrunActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                    }`}
                >
                  {e.name}
                </button>
              ))}
            </div>

            {/* Run */}
            <button
              onClick={handleRun}
              className="ml-auto mr-3 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold transition hover:bg-green-500 active:scale-95"
            >
              ▶ Run
            </button>
          </div>

          {/* Editor / Result */}
          <div className="min-h-0 flex-1">

            {isrunActive ? (
              <div className="flex h-full flex-col bg-white">

                <div className="flex h-10 shrink-0 items-center border-b border-gray-200 bg-gray-100 px-4 text-sm font-medium text-gray-600">
                  Result
                </div>

                <iframe
                  srcDoc={codeTab.result}
                  title="result"
                  className="min-h-0 w-full flex-1 bg-white"
                />

              </div>
            ) : (
              <Editor
                height="100%"
                language={
                  tab === 0
                    ? "html"
                    : tab === 1
                      ? "css"
                      : "javascript"
                }
                theme="vs-dark"
                value={codeTab[tabButton[tab].name.toLowerCase()]}
                onChange={(value) => {
                  const name = tabButton[tab].name.toLowerCase()

                  setCodeTab((prev) => ({
                    ...prev,
                    [name]: value || ''
                  }))
                }}
                options={{
      
                  cursorBlinking: "smooth",
                  scrollBeyondLastLine: false,

                  inlineSuggest: {
                    enabled: true
                  }
                }}
              />
            )}

          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            {isrunActive
              ? "Preview"
              : `Editing ${tabButton[tab].name}`}
          </span>

          <span>
            Monaco Editor
          </span>
        </div>

      </main>
    </div>
  )
}