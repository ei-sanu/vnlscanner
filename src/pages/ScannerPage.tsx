import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, CheckCircle, Shield, AlertTriangle, Lock, Zap } from 'lucide-react';
import { useScannerStore } from '../stores/scannerStore';

import ScanResults from '../components/scanner/ScanResults';

const ScannerPage: React.FC = () => {
  const { url, setUrl, scanUrl, isScanning, scanResult, error, clearScan } = useScannerStore();
  const [formError, setFormError] = useState('');

  // Reset scan on unmount
  useEffect(() => {
    return () => {
      clearScan();
    };
  }, [clearScan]);

  // Update form error when store error changes
  useEffect(() => {
    if (error) {
      setFormError(error);
    } else {
      setFormError('');
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Basic URL validation
    if (!url.trim()) {
      setFormError('Please enter a URL to scan');
      return;
    }

    // Check if URL has protocol
    let urlToScan = url;
    if (!/^https?:\/\//i.test(urlToScan)) {
      urlToScan = 'https://' + urlToScan;
      setUrl(urlToScan);
    }

    // Try to create a URL object to validate
    try {
      new URL(urlToScan);
    } catch (error) {
      setFormError('Please enter a valid URL');
      return;
    }

    // Submit for scanning
    scanUrl(urlToScan);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Website <span className="gradient-text">Vulnerability</span> Scanner
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-gray-300 max-w-2xl mx-auto"
        >
          Enter a website URL to scan for security vulnerabilities. This educational tool will analyze
          the target site and provide detailed information about potential security issues.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card mb-8"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-primary-300">
            <Shield className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Security Scanner</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
                Enter Website URL
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </span>
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input-field pl-10"
                  placeholder="https://example.com"
                  disabled={isScanning}
                />
              </div>
              {formError && (
                <div className="mt-2 text-error text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 py-2.5 px-5"
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Scan Website</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clearScan}
                className="text-gray-400 hover:text-primary-300 text-sm transition"
                disabled={isScanning || !scanResult}
              >
                Clear Results
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 mt-0.5 text-primary-300 flex-shrink-0" />
              <p>Your scan data is private and only used for educational purposes.</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-400 flex-shrink-0" />
              <p>For educational purposes only. Never scan websites without explicit permission.</p>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 mt-0.5 text-primary-300 flex-shrink-0" />
              <p>This scanner uses simulated results to demonstrate security concepts.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scanning Animation */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="card p-6 mb-8 overflow-hidden"
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-primary-300">Scanning in Progress</h3>
            <p className="text-gray-400 text-sm">Analyzing {url} for security vulnerabilities</p>
          </div>

          <div className="h-64 relative border border-primary-900/30 rounded-md bg-dark-300 overflow-hidden">
            {/* Scanner beam animation */}
            <motion.div
              className="scanner-beam"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Terminal-like text */}
            <div className="p-4 h-full overflow-hidden terminal-text text-xs">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-green-400 mb-1">{'>'} Initializing security scan...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-green-400 mb-1">{'>'} Target: {url}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <p className="text-green-400 mb-1">{'>'} Checking for XSS vulnerabilities...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <p className="text-green-400 mb-1">{'>'} Analyzing server headers...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <p className="text-green-400 mb-1">{'>'} Testing for SQL injection...</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                <p className="text-green-400 mb-1">{'>'} Checking authentication security...</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="animate-spin h-4 w-4 border-2 border-primary-300 border-t-transparent rounded-full"></span>
              <span>Estimated time remaining: 30 seconds</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scan Results */}
      {scanResult && !isScanning && (
        <ScanResults scanResult={scanResult} />
      )}
    </div>
  );
};

export default ScannerPage;
