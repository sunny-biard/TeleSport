export interface FormattedData {
    
    name: string;
    value: number;
}

export interface FormattedDetailedData {
    
    name: string;
    series: FormattedData[];
}