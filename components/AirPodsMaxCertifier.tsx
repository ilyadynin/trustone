'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const detectAirPodsInfo = (serialNumber: string) => {
  const hasUSBC = /[A-Z]{1,2}([0-9]{2})[A-Z]{2}/.test(serialNumber)
  const colorMap: { [key: string]: string } = {
    '01': 'Space Gray',
    '02': 'Silver',
    '03': 'Green',
    '04': 'Sky Blue',
    '05': 'Pink'
  }
  const detectedColor = colorMap[serialNumber.substring(0, 2)] || 'Space Gray'
  return { hasUSBC, detectedColor }
}

const colors = [
  { id: 'space-gray', name: 'Space Gray', hex: '#4A5568' },
  { id: 'silver', name: 'Silver', hex: '#CBD5E0' },
  { id: 'green', name: 'Green', hex: '#48BB78' },
  { id: 'sky-blue', name: 'Sky Blue', hex: '#4299E1' },
  { id: 'pink', name: 'Pink', hex: '#ED64A6' }
]

export default function AirPodsMaxCertifier() {
  const [ownerName, setOwnerName] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [detectedInfo, setDetectedInfo] = useState<{ hasUSBC: boolean; detectedColor: string } | null>(null)
  const [created, setCreated] = useState(false)
  const [certificateId, setCertificateId] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSerialNumberChange = (value: string) => {
    setSerialNumber(value.toUpperCase())

    if (value.length >= 4) {
      const info = detectAirPodsInfo(value)
      setDetectedInfo(info)

      const colorMatch = colors.find(c => c.name === info.detectedColor)
      if (colorMatch) {
        setSelectedColor(colorMatch.id)
      }
    } else {
      setDetectedInfo(null)
    }
  }

  const handleCreate = async () => {
    setIsCreating(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const certId = `AMP-${Date.now()}`
    setCertificateId(certId)
    setCreated(true)
    setIsCreating(false)
  }

  const isValid = ownerName.length > 0 && serialNumber.length >= 4 && selectedColor

  if (created) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="mb-4 flex justify-center"
              >
                <img src="/assets/verified.png" alt="Verified" className="h-20 drop-shadow-lg" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Certificate Verified</h2>
              <p className="text-blue-100">Authenticity confirmed on blockchain</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Product Display */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-gray-200">
              <div className="flex-shrink-0 w-40">
                <div className="bg-gray-50 rounded-xl p-4">
                  <img
                    src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpyd2ttdW5wTmRBL1NETnlMVldNRXJ0RFZOSzlQRTFSbHNFZCtKQi9Wc2w5b3I2TGhYaGhMVkJpQ2RGWWVURTZNbXphV29iOFBIcjE1bWVvKzVNUlpwYys"
                    alt="AirPods Max"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AirPods Max</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Product Owner</p>
                    <p className="text-lg font-semibold text-gray-900">{ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Color</p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: colors.find(c => c.id === selectedColor)?.hex }}
                      />
                      <p className="font-semibold text-gray-900">{colors.find(c => c.id === selectedColor)?.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                    <p className="font-mono text-sm text-gray-900 bg-gray-50 p-2 rounded">{serialNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Certificate ID</p>
              <p className="font-mono text-lg font-bold text-gray-900 break-all">{certificateId}</p>
              <p className="text-xs text-gray-600 mt-3">Verified on TrustOne Blockchain</p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setCreated(false)
                setOwnerName('')
                setSerialNumber('')
                setSelectedColor('')
                setDetectedInfo(null)
              }}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Another Certificate
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header with Gradient and Logo */}
      <div className="relative overflow-visible h-48" style={{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
        <img src="/assets/logo.png" alt="TrustOne" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-56 w-auto" />

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-gray-600 mb-1">
            Products / AirPods Max / Edit / <span className="font-medium text-gray-900">Certificate</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">AirPods Max Certificate</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 px-8 py-8">
        <div className="flex gap-8 max-w-full">
          {/* Left: Image and Buttons */}
          <div className="w-96 flex-shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <img
                src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpyd2ttdW5wTmRBL1NETnlMVldNRXJ0RFZOSzlQRTFSbHNFZCtKQi9Wc2w5b3I2TGhYaGhMVkJpQ2RGWWVURTZNbXphV29iOFBIcjE1bWVvKzVNUlpwYys"
                alt="AirPods Max"
                className="w-full"
              />
            </div>

            {/* Buttons under image */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOwnerName('')
                  setSerialNumber('')
                  setSelectedColor('')
                  setDetectedInfo(null)
                }}
                className="px-4 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 text-sm"
              >
                Discard
              </button>

              <button
                onClick={handleCreate}
                disabled={!isValid || isCreating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isCreating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Create
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Panels */}
          <div className="flex-1 space-y-6 pb-8">
            {/* Panel 1: Certificate */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-lg shadow border border-gray-200"
            >
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Certificate</h2>
              </div>

              <div className="px-8 py-6">
                <p className="text-sm text-gray-600 mb-8">Customize the details of your certificate and preview your changes above.</p>

                {/* Details */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Product */}
                <div className="mb-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <div className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium">
                        AirPods Max
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={serialNumber}
                          onChange={(e) => handleSerialNumberChange(e.target.value)}
                          placeholder="e.g., JQXXXXXXXXXX"
                          maxLength={12}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        />
                        {detectedInfo && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-medium text-green-600">
                              {detectedInfo.hasUSBC ? 'USB-C' : 'Lightning'}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                      <div className="grid grid-cols-5 gap-3">
                        {colors.map((color) => (
                          <motion.button
                            key={color.id}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedColor(color.id)}
                            className={`relative p-2 rounded-lg border-2 transition-all ${
                              selectedColor === color.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="w-full h-10 rounded-md" style={{ backgroundColor: color.hex }} />
                            {selectedColor === color.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0.5 right-0.5 bg-blue-500 rounded-full p-0.5"
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                            <p className="text-xs font-medium text-gray-700 mt-1.5 text-center">{color.name}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Panel 2: Notification */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow border border-gray-200"
            >
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Notification</h2>
              </div>

              <div className="px-8 py-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Email</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Automatically send an email notification to the owner when the certificate is created.
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Send email notification upon creation</span>
                </label>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
