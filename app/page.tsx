import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <img src="/assets/logo.png" alt="TrustOne" className="h-32 w-auto mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TrustOne</h1>
        <p className="text-xl text-gray-600 mb-12">Blockchain Product Certificates</p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/builder"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Certificate
          </Link>
          <Link
            href="/certificate/demo"
            className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            View Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
