import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3, CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  LogOut,
  Shield,
  Trash2,
  User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useScannerStore } from '../stores/scannerStore';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { scanHistory, fetchScanHistory, deleteScan } = useScannerStore();
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchScanHistory();
      setIsLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [fetchScanHistory, user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeleteScan = (scanId: string) => {
    setDeletingId(scanId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getRiskBadgeColor = (risk: string) => {
    if (risk === 'Low') return 'bg-success/20 text-success';
    if (risk === 'Medium') return 'bg-warning/20 text-warning';
    return 'bg-error/20 text-error';
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'Low') return <CheckCircle className="h-4 w-4" />;
    if (risk === 'Medium') return <AlertCircle className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          User <span className="gradient-text">Profile</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-gray-300"
        >
          Manage your account and view your scan history
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-900/30 flex items-center justify-center text-primary-300">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-lg font-semibold break-all mb-1 max-w-[300px]">{user?.email}</h2>
                <p className="text-sm text-gray-400">Member since {formatDate(user?.created_at || Date.now().toString())}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-200 hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary-300" />
                  <span className="text-sm">Security Level</span>
                </div>
                <span className="text-sm text-primary-300">Educational</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-200 hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary-300" />
                  <span className="text-sm">Total Scans</span>
                </div>
                <span className="text-sm text-primary-300">{scanHistory.length}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-200 hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary-300" />
                  <span className="text-sm">Last Activity</span>
                </div>
                <span className="text-sm text-gray-400">
                  {scanHistory.length > 0
                    ? formatDate(scanHistory[0].created_at)
                    : 'No activity'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full btn-secondary flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-300" />
              Quick Actions
            </h3>

            <div className="space-y-3">
              <Link
                to="/scanner"
                className="flex items-center justify-between p-3 rounded-lg bg-dark-200 hover:bg-primary-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary-300" />
                  <span className="text-sm group-hover:text-primary-300 transition-colors">Start New Scan</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-primary-300 transition-colors" />
              </Link>

              <Link
                to="/about"
                className="flex items-center justify-between p-3 rounded-lg bg-dark-200 hover:bg-primary-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-primary-300" />
                  <span className="text-sm group-hover:text-primary-300 transition-colors">Security Resources</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-primary-300 transition-colors" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scan History */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-300" />
              Scan History
            </h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-primary-900/20 border border-primary-900/50 rounded-lg"
            >
              <div className="flex items-center gap-2 text-sm text-primary-300">
                <AlertCircle className="h-5 w-5" />
                <p>
                  For security purposes, scan history cannot be permanently deleted but can be temporarily hidden from view.
                </p>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-primary-300 border-t-transparent rounded-full"></div>
              </div>
            ) : scanHistory.length === 0 ? (
              <div className="text-center py-12 bg-dark-200 rounded-lg">
                <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">No Scan History</h4>
                <p className="text-gray-400 mb-6">
                  You haven't performed any vulnerability scans yet.
                </p>
                <Link to="/scanner" className="btn-primary inline-flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Start Your First Scan
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {scanHistory.map((scan: any, i: number) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -300,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        }
                      }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border border-dark-100 rounded-lg overflow-hidden"
                      layout
                    >
                      <div className="p-4 bg-dark-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary-300" />
                            {scan.url}
                          </h4>
                          <div className="text-xs text-gray-400">
                            {formatDate(scan.created_at)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Security Score</div>
                            <div className={`text-lg font-bold ${getScoreColor(scan.security_score)}`}>
                              {scan.security_score}/100
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                            <div className={`py-0.5 px-2 rounded-full text-xs font-medium inline-flex items-center gap-1 justify-center ${getRiskBadgeColor(scan.risk_level)}`}>
                              {getRiskIcon(scan.risk_level)}
                              {scan.risk_level}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Vulnerabilities</div>
                            <div className="text-sm">
                              <span className="text-error">{scan.vulnerabilities_count.high} high</span>,{' '}
                              <span className="text-warning">{scan.vulnerabilities_count.medium} med</span>,{' '}
                              <span className="text-success">{scan.vulnerabilities_count.low} low</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                          <button className="p-2 text-gray-400 hover:text-primary-300 rounded-full transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteScan(scan.id)}
                            disabled={deletingId === scan.id}
                            className={`p-2 rounded-full transition-colors ${deletingId === scan.id
                              ? 'text-gray-500'
                              : 'text-gray-400 hover:text-error'
                              }`}
                            title="Delete scan"
                          >
                            <Trash2
                              className={`h-5 w-5 ${deletingId === scan.id
                                ? 'animate-pulse'
                                : ''
                                }`}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="bg-dark-200 p-6 rounded-lg max-w-md w-full mx-4 border border-primary-900/50"
            >
              <h4 className="text-lg font-semibold mb-3">Hide Scan History</h4>
              <p className="text-gray-300 mb-6">
                This scan will be temporarily hidden from your history. You can restore it later from your account settings.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteScan(deletingId);
                    setDeletingId(null);
                  }}
                  className="btn-primary"
                >
                  Hide Scan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
