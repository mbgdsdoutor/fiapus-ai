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
