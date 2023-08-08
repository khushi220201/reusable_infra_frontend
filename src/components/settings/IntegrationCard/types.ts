export type IntegrationCardProps = {
  logo: string;
  title: string;
  ghost: boolean;
  buttonText: string;
  select?: boolean;
  type?: string;
  onButtonClick: () => void;
};
