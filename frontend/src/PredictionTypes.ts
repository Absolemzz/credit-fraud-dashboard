export interface PredictionResult {
  Time: number;
  Amount: number;
  prediction: number;
  probability: number;
  [key: string]: string | number;
}
