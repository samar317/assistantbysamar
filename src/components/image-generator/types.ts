
export interface ImageMetadata {
  promptUsed?: string;
  model?: string;
  size?: string;
  quality?: string;
  timestamp?: string;
}

export interface GenerationSettings {
  size: string;
  model: string;
  quality: string;
}
