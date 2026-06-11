export interface NavItem {
  id: string;
  label: string;
}

export interface LaunchConfig {
  destination: string;
  payloadType: string;
  trajectoryMode: string;
  isSimulating: boolean;
  progress: number;
  logs: string[];
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
}
