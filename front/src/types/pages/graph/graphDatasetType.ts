export type GraphDatasetType = {
  type: string;
  label: string;
  borderColor: string;
  backgroundColor?: string;
  borderWidth?: number;
  spanGaps: true;
  data: Array<number | null>;
  yAxisID?: string;
};
