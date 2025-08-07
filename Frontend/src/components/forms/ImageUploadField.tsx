import { Label } from '@/components/ui/label';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  id: string;
  label: string;
  file: File | null;
  error?: string;
  touched?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const ImageUploadField = ({
  id,
  label,
  file,
  error,
  touched,
  required = false,
  onChange,
  onBlur
}: ImageUploadFieldProps) => {
  const hasError = error && touched;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(hasError && "text-destructive")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
        hasError ? "border-destructive" : "border-border"
      )}>
        <input
          type="file"
          id={id}
          accept="image/*"
          onChange={onChange}
          onBlur={onBlur}
          className="hidden"
        />
        <label htmlFor={id} className="cursor-pointer">
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {file ? file.name : "Klik untuk upload foto profil toko"}
          </p>
        </label>
      </div>
      {hasError && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};
