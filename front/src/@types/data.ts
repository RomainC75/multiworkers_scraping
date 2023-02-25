export interface ChartDataInterface{
    labels:string[],
    datasets:DatasetInterface[]
}

export interface DatasetInterface{
    label:string,
    data:number[],
    backgroundColor:string[],
    borderWidth: number,
    borderColor: string
}