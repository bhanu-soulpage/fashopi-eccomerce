export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
export const storeType = [
    { value: 'Ethnic wear', label: 'Ethnic wear', color: '#00B8D9', isFixed: true },
    { value: 'Pure Cotton', label: 'Pure Cotton', color: '#0052CC',isFixed: true},
    { value: 'Wedding wear', label: 'Wedding wear', color: '#5243AA' },
    { value: 'Men Shirts', label: 'Men Shirts', color: '#FF5630' },
    { value: 'Tshirts', label: 'Tshirts', color: '#FF8B00' },
    { value: 'Jeans', label: 'Jeans', color: '#FFC400' },
    { value: 'Suits', label: 'Suits', color: '#36B37E' },
    { value: 'Blazer', label: 'Blazer', color: '#00875A' },
    { value: 'Footwear', label: 'Footwear', color: '#253858' },
    { value: 'Kids wear', label: 'Kids wear', color: '#666666' },
  ];