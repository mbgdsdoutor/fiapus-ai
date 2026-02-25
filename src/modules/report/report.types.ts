export const FiapusStatusEnum = {
  HAPPY_INITIAL: 'HAPPY_INITIAL',
  HAPPY_RESULT: 'HAPPY_RESULT',
  HAPPY_PRE_UPLOAD: 'HAPPY_PRE_UPLOAD',
  NEUTRAL: 'NEUTRAL',
  SAD_UPLOAD: 'SAD_UPLOAD',
  SAD_RESULT: 'SAD_RESULT',
} as const;

export type FiapusStatusEnum =
  (typeof FiapusStatusEnum)[keyof typeof FiapusStatusEnum];

export type ReportProps = {
  id: string;
  type: string;
  step: number;
  totalSteps?: number;
  spentTime: string;
  creationDate: string;
  score?: number;
  status?: string;
};

export type ReportFileProps = {
  file: File;
  reportType: string;
};

export type ReportTypeFileProps = {
  name: string;
  allowedTypes: string[];
  required: boolean;
  uploaded: boolean;
  allowMultipleUploads?: boolean;
};

export type ReportTypeProps = {
  name: string;
  files?: ReportTypeFileProps[];
};

export const ReportStatusEnum = {
  PROCESSING: 'PROCESSING',
  COMPLETE: 'COMPLETE',
} as const;

export type ReportStatusEnum =
  (typeof ReportStatusEnum)[keyof typeof ReportStatusEnum];

export interface FindReportsParams {
  page?: number;
  pageSize?: number;
  processId?: string;
  startDate?: string;
  endDate?: string;
  status?: ReportStatusEnum;
  scoreRange?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface IReportItem {
  processId: number;
  code: string;
  status: 'available' | 'failed' | 'processing' | 'COMPLETE' | 'SUCCESS';
  createdAt: number;
  currentStep: number;
  totalSteps: number;
  elapsedTime: string;
  type: string;
}

export type IReportsResponse = PaginatedResponse<IReportItem>;

export type UseReportQueryFilters = Omit<FindReportsParams, 'page'>;

export interface UseReportsQueryProps {
  filters?: UseReportQueryFilters;
}

/* STRIDE ANALYISIS TYPES BELOW */

export type StrideCategory =
  | 'spoofing'
  | 'tampering'
  | 'repudiation'
  | 'informationDisclosure'
  | 'denialOfService'
  | 'elevationOfPrivilege';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Threat {
  id: string;
  stride: StrideCategory;
  title: string;
  description: string;
  attackScenario: string;
  impact: string;
  riskLevel: RiskLevel;
  confidence: 'Low' | 'Medium' | 'High';
  assumptions: string[];
  recommendations: string[];
}

export interface ComponentThreatAnalysis {
  id: string;
  componentName: string;
  componentType: string;
  trustBoundaryCrossed: boolean;
  threats: Threat[];
}

export interface StrideReport {
  metadata: {
    diagramType: string;
    analysisDate: string;
    assumptions: string[];
    limitations: string[];
  };

  architectureSummary: {
    detectedArchitectureStyle: string;
    mainComponents: string[];
    trustBoundaries: string[];
    externalDependencies: string[];
  };

  riskOverview: {
    overallRisk: RiskLevel;
    riskDistribution: Record<StrideCategory, number>;
    mostCriticalComponents: string[];
  };

  components: ComponentThreatAnalysis[];

  globalRecommendations: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
}

export const STRIDE_LABELS: Record<StrideCategory, string> = {
  spoofing: 'Spoofing',
  tampering: 'Tampering',
  repudiation: 'Repudiation',
  informationDisclosure: 'Information Disclosure',
  denialOfService: 'Denial of Service',
  elevationOfPrivilege: 'Elevation of Privilege',
};

export const STRIDE_COLORS: Record<StrideCategory, string> = {
  spoofing: '#e03131',
  tampering: '#f76707',
  repudiation: '#fab005',
  informationDisclosure: '#1098ad',
  denialOfService: '#7048e8',
  elevationOfPrivilege: '#e8590c',
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  Critical: '#e03131',
  High: '#f76707',
  Medium: '#fab005',
  Low: '#40c057',
};

export const RISK_MANTINE_COLORS: Record<RiskLevel, string> = {
  Critical: 'red',
  High: 'orange',
  Medium: 'yellow',
  Low: 'green',
};

export interface OpenAIResponse {
  id: string;
  object: 'response';
  status: 'completed';
  output: OutputItem[];
}

interface OutputItem {
  id: string;
  type: 'message';
  role: 'assistant';
  content: ContentBlock[];
}

interface ContentBlock {
  type: 'output_text';
  text: string;
}
