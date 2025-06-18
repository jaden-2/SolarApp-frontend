export interface NavbarProps {
  activeTab?: 'new' | 'list';
  onTabChange?: (tab: 'new' | 'list') => void;
}