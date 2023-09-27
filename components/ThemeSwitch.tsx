'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      {mounted && (
        <div className="flex items-center rounded-full border p-1">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={`rounded-full p-2 hover:text-gray-900 dark:hover:text-gray-100 ${
              theme === 'dark'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => {
              setTheme('dark')
            }}
          >
            <span className="flex items-center gap-[10px] text-[13px]">
              <svg
                fill="none"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </span>
          </button>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={`rounded-full p-2 hover:text-gray-900 dark:hover:text-gray-100 ${
              theme === 'light'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => {
              setTheme('light')
            }}
          >
            <span className="flex items-center gap-[10px] text-[13px]">
              <svg
                fill="none"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2" />
                <path d="M12 21v2" />
                <path d="M4.22 4.22l1.42 1.42" />
                <path d="M18.36 18.36l1.42 1.42" />
                <path d="M1 12h2" />
                <path d="M21 12h2" />
                <path d="M4.22 19.78l1.42-1.42" />
                <path d="M18.36 5.64l1.42-1.42" />
              </svg>
            </span>
          </button>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={`rounded-full p-2 hover:text-gray-900 dark:hover:text-gray-100 ${
              theme === 'system'
                ? 'bg-gray-100 hover:text-current dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => {
              setTheme('system')
            }}
          >
            <span className="flex items-center gap-[10px] text-[13px]">
              <svg
                fill="none"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  )
}

export default ThemeSwitch
