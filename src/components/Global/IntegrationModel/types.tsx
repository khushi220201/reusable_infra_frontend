import { SingleUserInput } from "../InputWithLabel/types";

export interface IntegrationModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  integrateHandler?: () => void;
  isLoading?: boolean;
  title: string;
  formData: any;
  logo:any;
}
