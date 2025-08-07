import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock } from 'lucide-react';

interface OperatingHoursFieldProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export const OperatingHoursField = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange
}: OperatingHoursFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>Jam Operasional</Label>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-32"
          />
        </div>
        <span className="text-muted-foreground">sampai</span>
        <div className="flex items-center space-x-2">
          <Input 
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};
