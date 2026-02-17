export const FiapusStatusEnum = {
  HAPPY: 'HAPPY',
  NEUTRAL: 'NEUTRAL',
  SAD: 'SAD',
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

/* STRIDE ANALYISIS TYPES ABOVE */

export type StrideCategory =
  | 'Spoofing'
  | 'Tampering'
  | 'Repudiation'
  | 'Information Disclosure'
  | 'Denial of Service'
  | 'Elevation of Privilege';

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
