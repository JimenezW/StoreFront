export interface AlertData {
  type: 'success' | 'error' | 'warn' | 'info' | 'confirm';
  title: string;
  message: string;
}
