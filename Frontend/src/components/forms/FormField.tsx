import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const FormField = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  required = false,
  className,
  onChange,
  onBlur
}: FormFieldProps) => {
  const hasError = error && touched;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(hasError && "text-destructive")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input 
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          hasError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        required={required}
      />
      {hasError && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};
