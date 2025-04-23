import { ButtonProps } from '../components/ui/button';

declare module '../components/ui/button' {
  export interface ButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
} 