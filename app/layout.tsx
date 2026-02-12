// © 2026 Mathew Sekanjako. Psalms23Wave. All Rights Reserved.

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AkademData',
  description: 'Excel data analytics — upload, validate, visualize',
}

export const viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.className} min-h-screen bg-slate-900 bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 selection:bg-purple-500/30 overflow-x-hidden`}>
        <header className="fixed top-0 w-full z-50 h-16 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center">
            <span className="font-semibold text-white text-lg tracking-tight">AkademData</span>
          </div>
        </header>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-16 pb-12">
            {children}
          </main>
          <footer className="border-t border-slate-700/50 bg-slate-900/60 mt-12 py-8 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
                  <span className="font-medium text-slate-300">© 2026 Mathew Sekanjako</span>
                  <span className="text-slate-600 hidden sm:inline">·</span>
                  <a href="https://github.com/mathewisrich/akademdata-open-source/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">MIT License</a>
                  <span className="text-slate-600 hidden sm:inline">·</span>
                  <a href="https://psalms23wave.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Psalms23Wave</a>
                </div>
                <span className="text-slate-500">Open-source template for Excel analytics</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

