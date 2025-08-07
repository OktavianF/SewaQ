import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoryOption } from '@/types/openStore';

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  options: CategoryOption[];
  error?: string;
  touched?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const SelectField = ({
  id,
  label,
  placeholder,
  value,
  options,
  error,
  touched,
  required = false,
  onChange,
  onBlur
}: SelectFieldProps) => {
  const hasError = error && touched;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(hasError && "text-destructive")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select 
        value={value} 
        onValueChange={(value) => {
          onChange(value);
          onBlur();
        }}
      >
        <SelectTrigger className={cn(hasError && "border-destructive focus:ring-destructive")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};
