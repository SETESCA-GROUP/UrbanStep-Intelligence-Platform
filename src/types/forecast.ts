export interface ForecastMethod {
  name: string;
  status: string;
  description: string;
  note: string;
}

export interface ForecastOverviewDto {
  methods: ForecastMethod[];
  monthlyForecast: Array<{ name: string; actual: number; forecast: number }>;
}
