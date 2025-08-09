export interface DeleteCabinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cabinName: string;
}