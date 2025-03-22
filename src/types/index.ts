export interface INode {
    dir?: string;
    children?: INode[];
    file?: string;
}

export interface IAlphabeticalMapping {
    alphabet: { [key: string]: number[] };
    numbered: { [key: string]: string[] };
}

export interface ISeriesItem {
    id: string;
    title: string;
    sort: string;
    subSeriesOf: string[];
    path: string;
    image: string;
    numOfBooks: number;
    description: string;
    uri: string;
}

export interface IPaginatedSeries {
    items: ISeriesItem[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}

export interface IBookItem {
    id: string;
    path: string;
    title: string;
    extension: string;
    numOfPages: number;
    image: string;
    description: string;
    uri: string;
}

export interface IPaginatedBooks {
    items: IBookItem[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}