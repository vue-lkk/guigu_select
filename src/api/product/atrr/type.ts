interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface categoryObj{
    createTime?: string,
    id: number | string,
    name: string,
    updateTime: string,
    category1Id?: string,
    category2Id?: string
}

export interface categoryResponseData extends ResponseData{
    data:categoryObj[]
}