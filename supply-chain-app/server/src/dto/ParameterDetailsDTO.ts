type ChartData = {
    x: Date;
    y: number;
    score: number,
}
export class ParameterDetailDTO {
    id: number;
    parameter: string;
    selected: boolean;
    chartData: Array<ChartData>;
}