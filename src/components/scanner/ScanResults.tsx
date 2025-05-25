import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, 
  AlertCircle, Code, Server, Globe, Clock, BarChart3
} from 'lucide-react';

interface ScanResultsProps {
  scanResult: any;
}

const ScanResults: React.FC<ScanResultsProps> = ({ scanResult }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedVulnerability, setExpandedVulnerability] = useState<number | null>(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null);
  
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
    if (risk === 'Low') return <CheckCircle className="h-5 w-5" />;
    if (risk === 'Medium') return <AlertCircle className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };
  
  const getSeverityBadgeColor = (severity: string) => {
    if (severity === 'low') return 'bg-success/20 text-success';
    if (severity === 'medium') return 'bg-warning/20 text-warning';
    return 'bg-error/20 text-error';
  };
  
  const toggleVulnerability = (index: number) => {
    if (expandedVulnerability === index) {
      setExpandedVulnerability(null);
    } else {
      setExpandedVulnerability(index);
    }
  };
  
  const toggleRecommendation = (index: number) => {
    if (expandedRecommendation === index) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(index);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      {/* Result Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
              <Shield className="h-6 w-6 text-primary-300" />
              Scan Results for {scanResult.url}
            </h2>
            <p className="text-gray-400 text-sm">
              Scan completed on {scanResult.scanDate} (Duration: {scanResult.scanDuration})
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Security Score</div>
              <div className={`text-2xl font-bold ${getScoreColor(scanResult.securityScore)}`}>
                {scanResult.securityScore}/100
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Risk Level</div>
              <div className={`py-1 px-3 rounded-full font-medium text-sm flex items-center gap-1 ${getRiskBadgeColor(scanResult.riskLevel)}`}>
                {getRiskIcon(scanResult.riskLevel)}
                {scanResult.riskLevel}
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-dark-200 border border-dark-100">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-300">High Severity</div>
              <div className="h-8 w-8 rounded-full bg-error/20 flex items-center justify-center text-error">
                {scanResult.vulnerabilitiesSummary.high}
              </div>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div 
                className="bg-error h-2 rounded-full" 
                style={{ width: `${(scanResult.vulnerabilitiesSummary.high / (scanResult.vulnerabilitiesSummary.high + scanResult.vulnerabilitiesSummary.medium + scanResult.vulnerabilitiesSummary.low) * 100) || 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-dark-200 border border-dark-100">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-300">Medium Severity</div>
              <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center text-warning">
                {scanResult.vulnerabilitiesSummary.medium}
              </div>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full" 
                style={{ width: `${(scanResult.vulnerabilitiesSummary.medium / (scanResult.vulnerabilitiesSummary.high + scanResult.vulnerabilitiesSummary.medium + scanResult.vulnerabilitiesSummary.low) * 100) || 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-dark-200 border border-dark-100">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-300">Low Severity</div>
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                {scanResult.vulnerabilitiesSummary.low}
              </div>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${(scanResult.vulnerabilitiesSummary.low / (scanResult.vulnerabilitiesSummary.high + scanResult.vulnerabilitiesSummary.medium + scanResult.vulnerabilitiesSummary.low) * 100) || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b border-dark-100">
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 border-b-2 ${
            activeTab === 'overview'
              ? 'border-primary-300 text-primary-300'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 className="h-4 w-4" />
          Overview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 border-b-2 ${
            activeTab === 'vulnerabilities'
              ? 'border-primary-300 text-primary-300'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('vulnerabilities')}
        >
          <AlertTriangle className="h-4 w-4" />
          Vulnerabilities
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-dark-200 text-gray-400">
            {scanResult.vulnerabilities.length}
          </span>
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 border-b-2 ${
            activeTab === 'recommendations'
              ? 'border-primary-300 text-primary-300'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('recommendations')}
        >
          <CheckCircle className="h-4 w-4" />
          Recommendations
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 border-b-2 ${
            activeTab === 'technical'
              ? 'border-primary-300 text-primary-300'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('technical')}
        >
          <Server className="h-4 w-4" />
          Technical Details
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-300" />
            Security Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Security Score</h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className={`text-xs font-semibold inline-block ${getScoreColor(scanResult.securityScore)}`}>
                      {scanResult.securityScore}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-300">
                  <div 
                    style={{ width: `${scanResult.securityScore}%` }} 
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      scanResult.securityScore >= 80 
                        ? 'bg-success' 
                        : scanResult.securityScore >= 60 
                          ? 'bg-warning' 
                          : 'bg-error'
                    }`}
                  ></div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Vulnerability Breakdown</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-400">High Severity</div>
                      <div className="text-xs text-error">{scanResult.vulnerabilitiesSummary.high} found</div>
                    </div>
                    <div className="w-full bg-dark-300 rounded-full h-1.5">
                      <div className="bg-error h-1.5 rounded-full" style={{ width: `${scanResult.vulnerabilitiesSummary.high * 20}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-400">Medium Severity</div>
                      <div className="text-xs text-warning">{scanResult.vulnerabilitiesSummary.medium} found</div>
                    </div>
                    <div className="w-full bg-dark-300 rounded-full h-1.5">
                      <div className="bg-warning h-1.5 rounded-full" style={{ width: `${scanResult.vulnerabilitiesSummary.medium * 20}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-400">Low Severity</div>
                      <div className="text-xs text-success">{scanResult.vulnerabilitiesSummary.low} found</div>
                    </div>
                    <div className="w-full bg-dark-300 rounded-full h-1.5">
                      <div className="bg-success h-1.5 rounded-full" style={{ width: `${scanResult.vulnerabilitiesSummary.low * 20}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Summary</h4>
              <div className="bg-dark-200 p-4 rounded-lg border border-dark-100">
                <div className="flex items-start gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">Target</div>
                    <div className="text-sm text-gray-400 break-all">{scanResult.url}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">Scan Date</div>
                    <div className="text-sm text-gray-400">{scanResult.scanDate}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">Risk Assessment</div>
                    <div className={`inline-block mt-1 py-0.5 px-2 rounded-full text-xs font-medium ${getRiskBadgeColor(scanResult.riskLevel)}`}>
                      {scanResult.riskLevel} Risk
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Server className="h-5 w-5 text-primary-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">Technologies Detected</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {scanResult.technicalDetails.technologies.slice(0, 5).map((tech: string, i: number) => (
                        <span key={i} className="bg-dark-100 text-gray-300 text-xs py-0.5 px-2 rounded">
                          {tech}
                        </span>
                      ))}
                      {scanResult.technicalDetails.technologies.length > 5 && (
                        <span className="bg-dark-100 text-gray-300 text-xs py-0.5 px-2 rounded">
                          +{scanResult.technicalDetails.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {scanResult.vulnerabilities.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Critical Issues</h4>
                  <div className="space-y-2">
                    {scanResult.vulnerabilities
                      .filter((v: any) => v.severity === 'high')
                      .slice(0, 2)
                      .map((vuln: any, i: number) => (
                        <div key={i} className="bg-error/10 border border-error/20 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-error mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-white">{vuln.name}</div>
                              <div className="text-xs text-gray-400 mt-1">{vuln.description.slice(0, 100)}...</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'vulnerabilities' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary-300" />
            Vulnerabilities ({scanResult.vulnerabilities.length})
          </h3>
          
          {scanResult.vulnerabilities.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">No Vulnerabilities Detected</h4>
              <p className="text-gray-400">
                Great news! No security vulnerabilities were found during the scan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {scanResult.vulnerabilities.map((vuln: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`border rounded-lg overflow-hidden ${
                    vuln.severity === 'high' 
                      ? 'border-error/30' 
                      : vuln.severity === 'medium'
                        ? 'border-warning/30'
                        : 'border-success/30'
                  }`}
                >
                  <div 
                    className={`p-4 flex items-center justify-between cursor-pointer ${
                      vuln.severity === 'high' 
                        ? 'bg-error/10' 
                        : vuln.severity === 'medium'
                          ? 'bg-warning/10'
                          : 'bg-success/10'
                    }`}
                    onClick={() => toggleVulnerability(i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-full ${getSeverityBadgeColor(vuln.severity)}`}>
                        {vuln.severity === 'high' ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : vuln.severity === 'medium' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{vuln.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`capitalize ${
                            vuln.severity === 'high' 
                              ? 'text-error' 
                              : vuln.severity === 'medium'
                                ? 'text-warning'
                                : 'text-success'
                          }`}>
                            {vuln.severity} Severity
                          </span>
                          {vuln.cvss && (
                            <span className="text-gray-400">
                              CVSS: {vuln.cvss}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {expandedVulnerability === i ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedVulnerability === i && (
                    <div className="p-4 bg-dark-200 border-t border-dark-100">
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Description</h5>
                        <p className="text-sm text-gray-400">{vuln.description}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Location</h5>
                        <div className="bg-dark-300 p-2 rounded font-mono text-xs text-gray-300">
                          {vuln.location}
                        </div>
                      </div>
                      
                      {vuln.evidence && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-300 mb-2">Evidence</h5>
                          <div className="bg-dark-300 p-2 rounded font-mono text-xs text-gray-300 overflow-x-auto">
                            <code>{vuln.evidence}</code>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 text-primary-300 text-sm">
                        <Code className="h-4 w-4" />
                        <span>Reference: OWASP Top 10</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'recommendations' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary-300" />
            Security Recommendations
          </h3>
          
          <div className="space-y-4">
            {scanResult.recommendations.map((rec: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border border-primary-900/30 rounded-lg overflow-hidden"
              >
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer bg-dark-200"
                  onClick={() => toggleRecommendation(i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-primary-900/30 text-primary-300">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <h4 className="font-medium">{rec.title}</h4>
                  </div>
                  <div>
                    {expandedRecommendation === i ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedRecommendation === i && (
                  <div className="p-4 bg-dark-100 border-t border-dark-200">
                    <div className="mb-4">
                      <p className="text-sm text-gray-300">{rec.description}</p>
                    </div>
                    
                    {rec.code && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Example Implementation</h5>
                        <div className="bg-dark-300 p-3 rounded font-mono text-xs text-gray-300 overflow-x-auto">
                          <pre>{rec.code}</pre>
                        </div>
                      </div>
                    )}
                    
                    {rec.resources && rec.resources.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Resources</h5>
                        <ul className="list-disc list-inside text-sm text-primary-300">
                          {rec.resources.map((resource: string, j: number) => (
                            <li key={j} className="mb-1">
                              <a href="#" className="hover:underline">
                                {resource}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'technical' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary-300" />
            Technical Details
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Technologies Detected</h4>
              <div className="bg-dark-200 p-4 rounded-lg border border-dark-100">
                <div className="flex flex-wrap gap-2">
                  {scanResult.technicalDetails.technologies.map((tech: string, i: number) => (
                    <span key={i} className="bg-primary-900/20 text-primary-300 text-xs py-1 px-2 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-gray-300 mt-6 mb-3">Open Ports</h4>
              <div className="bg-dark-200 p-4 rounded-lg border border-dark-100">
                <div className="space-y-2">
                  {scanResult.technicalDetails.ports.map((port: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{port.service}</span>
                      <span className="text-xs bg-dark-300 py-0.5 px-2 rounded text-gray-400">
                        Port {port.number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">HTTP Headers</h4>
              <div className="bg-dark-200 p-4 rounded-lg border border-dark-100 h-64 overflow-y-auto">
                <pre className="terminal-text text-xs text-green-400 whitespace-pre-wrap">
                  {scanResult.technicalDetails.headers}
                </pre>
              </div>
              
              <h4 className="text-sm font-medium text-gray-300 mt-6 mb-3">DNS Information</h4>
              <div className="bg-dark-200 p-4 rounded-lg border border-dark-100">
                <pre className="terminal-text text-xs text-green-400 whitespace-pre-wrap">
                  {scanResult.technicalDetails.dns}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ScanResults;