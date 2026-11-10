export type PlanetTheme =
  | 'speed'
  | 'art'
  | 'life'
  | 'innovation'
  | 'knowledge'
  | 'projects'
  | 'future';

export interface PlanetData {
  id: string;
  name: string;
  subtitle: string;
  theme: PlanetTheme;
  themeLabel: string;
  orderFromSun: number;
  orbitalPeriodDays: number;
  diameterKm: number;
  distanceFromSunMillionKm: number;
  surfaceTemperature: string;
  gravityMps2: number;
  accentColor: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
}
