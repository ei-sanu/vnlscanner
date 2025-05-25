import { create } from 'zustand';
import { scanForVulnerabilities } from '../lib/scanner';
import { getScanHistory, saveScanResult } from '../lib/supabase';
import { useAuthStore } from './authStore';

interface ScanState {
  isScanning: boolean;
  url: string;
  scanResult: any | null;
  scanHistory: any[];
  error: string | null;
  scanUrl: (url: string) => Promise<void>;
  clearScan: () => void;
  fetchScanHistory: () => Promise<void>;
  setUrl: (url: string) => void;
  deleteScan: (scanId: string) => Promise<void>;
}

export const useScannerStore = create<ScanState>((set, get) => ({
  isScanning: false,
  url: '',
  scanResult: null,
  scanHistory: [],
  error: null,

  scanUrl: async (url) => {
    try {
      set({ isScanning: true, error: null });

      // Validate URL
      try {
        new URL(url);
      } catch (error) {
        throw new Error('Please enter a valid URL including http:// or https://');
      }

      // Perform the scan
      const result = await scanForVulnerabilities(url);

      // Save scan result to Supabase if user is authenticated
      const user = useAuthStore.getState().user;
      if (user) {
        await saveScanResult(user.id, result);
        // Refresh scan history after saving new scan
        await get().fetchScanHistory();
      }

      set({
        scanResult: result,
        isScanning: false
      });
    } catch (error: any) {
      console.error('Scan error:', error);
      set({
        error: error.message || 'Failed to scan URL',
        isScanning: false
      });
    }
  },

  clearScan: () => {
    set({
      scanResult: null,
      url: '',
      error: null
    });
  },

  fetchScanHistory: async () => {
    try {
      set({ error: null });
      const user = useAuthStore.getState().user;

      if (!user) {
        set({ scanHistory: [] });
        return;
      }

      const { data, error } = await getScanHistory(user.id);

      if (error) throw error;

      set({ scanHistory: data || [] });
    } catch (error: any) {
      console.error('Fetch scan history error:', error);
      set({ error: error.message || 'Failed to fetch scan history' });
    }
  },

  setUrl: (url) => set({ url }),

  deleteScan: async (scanId) => {
    try {
      await fetch(`/api/scans/${scanId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      set((state) => ({
        scanHistory: state.scanHistory.filter(scan => scan.id !== scanId)
      }));
    } catch (error) {
      console.error('Error deleting scan:', error);
    }
  },
}));
