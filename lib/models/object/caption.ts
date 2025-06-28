export interface ICaption {
    id?: string;
    caption: string;
    image: File;
}

export interface ICaptionHistory {
    id: string;
    imageUrl: string;
    caption: string;
    timestamp: Date;
}