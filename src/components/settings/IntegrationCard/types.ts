export type IntegrationCardProps = {
  logo: string;
  title: string;
  ghost: boolean;
  buttonText: string;
  select?: boolean;
  type?: string;
  connect?: boolean;
  onButtonClick?: () => void;
};
