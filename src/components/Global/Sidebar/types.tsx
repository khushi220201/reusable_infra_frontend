import type { MenuProps } from 'antd';

export interface SidebarProps  {
	handleSidebar?: (data: any) => void;
	items: MenuProps['items'];
	isGetSupportButton: boolean;
	selectedSidebar: string;
}
