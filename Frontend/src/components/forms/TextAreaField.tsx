import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  rows?: number;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const TextAreaField = ({
  id,
  label,
  placeholder,
  value,
  error,
  touched,
  required = false,
  rows = 4,
  onChange,
  onBlur
}: TextAreaFieldProps) => {
  const hasError = error && touched;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(hasError && "text-destructive")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea 
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(hasError && "border-destructive focus-visible:ring-destructive")}
        rows={rows}
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
