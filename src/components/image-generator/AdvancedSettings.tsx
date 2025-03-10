
import React from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GenerationSettings } from './types';

interface AdvancedSettingsProps {
  settings: GenerationSettings;
  onSettingsChange: (setting: keyof GenerationSettings, value: string) => void;
  disabled: boolean;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  onSettingsChange,
  disabled
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          disabled={disabled}
          className="shrink-0"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Advanced Settings</h4>
          
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select 
              value={settings.model} 
              onValueChange={(value) => onSettingsChange('model', value)}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select 
              value={settings.size} 
              onValueChange={(value) => onSettingsChange('size', value)}
            >
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                <SelectItem value="1792x1024">1792x1024 (Landscape)</SelectItem>
                <SelectItem value="1024x1792">1024x1792 (Portrait)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quality">Quality</Label>
            <Select 
              value={settings.quality} 
              onValueChange={(value) => onSettingsChange('quality', value)}
            >
              <SelectTrigger id="quality">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="hd">HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdvancedSettings;
