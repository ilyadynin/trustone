'use client';

import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, User, Package } from 'lucide-react';

interface CertificateViewPageProps {
  params: {
    id: string;
  };
}

export default function CertificateViewPage({ params }: CertificateViewPageProps) {
  // Mock data - für die Präsentation
  const certificate = {
    id: params.id || 'AMP-1733279482541',
    product: 'AirPods Max',
    color: 'Space Gray',
    serialNumber: 'JQXXXXXXXXXX',
    owner: 'Magdalini Thomloudi',
    previousOwner: 'Apple Store München',
    transferredAt: '1 minute ago',
    createdAt: 'December 3, 2024',
    authentic: true,
    blockchainVerified: true,
    transactionHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Logo */}
      <div className="relative overflow-hidden" style={{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)', backgroundSize: '100% 280px', backgroundRepeat: 'no-repeat'}}>
        <div className="flex flex-col items-center justify-center pt-8 pb-16">
          <img src="/assets/logo.png" alt="TrustOne" className="h-24 w-auto mb-6" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Product Certificate</h1>
            <p className="text-sm text-gray-600 mt-2">Verified on TrustOne Blockchain</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 -mt-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Verified Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="mb-4 flex justify-center"
              >
                <img src="/assets/verified.png" alt="Verified" className="h-24 drop-shadow-lg" />
              </motion.div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-white" />
                <h2 className="text-3xl font-bold text-white">Authentic Product</h2>
              </div>
              <p className="text-green-100 text-lg">Certificate verified on blockchain</p>
            </div>
          </div>

          {/* Product Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-48">
                <div className="bg-gray-50 rounded-xl p-6">
                  <img
                    src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpyd2ttdW5wTmRBL1NETnlMVldNRXJ0RFZOSzlQRTFSbHNFZCtKQi9Wc2w5b3I2TGhYaGhMVkJpQ2RGWWVURTZNbXphV29iOFBIcjE1bWVvKzVNUlpwYys"
                    alt="AirPods Max"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{certificate.product}</h3>
                <p className="text-lg text-gray-600 mb-6">Color: {certificate.color}</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Current Owner</p>
                      <p className="text-lg font-bold text-gray-900">{certificate.owner}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Last Transfer</p>
                      <p className="text-base font-semibold text-gray-900">{certificate.transferredAt}</p>
                      <p className="text-sm text-gray-500">From: {certificate.previousOwner}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Serial Number</p>
                      <p className="font-mono text-sm text-gray-900 bg-gray-50 px-3 py-1.5 rounded inline-block">
                        {certificate.serialNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ownership Proof */}
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Proof of Ownership</h4>
                <p className="text-gray-700 leading-relaxed">
                  This certificate provides verifiable proof that <span className="font-semibold">{certificate.owner}</span> is the legitimate owner of this {certificate.product}.
                  The ownership record is permanently stored on the TrustOne blockchain and cannot be altered or forged.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="p-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Certificate Details</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Certificate ID</span>
                <span className="font-mono text-sm font-semibold text-gray-900">{certificate.id}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Issue Date</span>
                <span className="text-sm font-medium text-gray-900">{certificate.createdAt}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Blockchain Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Verified</span>
                </div>
              </div>

              <div className="flex items-start justify-between py-3">
                <span className="text-sm text-gray-600">Transaction Hash</span>
                <span className="font-mono text-xs text-gray-500 text-right max-w-xs break-all">
                  {certificate.transactionHash}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Secured by TrustOne Blockchain Technology</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This certificate is cryptographically signed and cannot be tampered with
            </p>
          </div>
        </motion.div>

        {/* QR Code Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Share this certificate by scanning the QR code or sharing the link
          </p>
        </div>
      </div>
    </div>
  );
}
