export type ImageInfo = {
    uri: string;
    width: number;
    height: number;
    type?: 'image' | 'video';
    exif?: Record<string, any>;
    base64?: string;
    duration?: number;
    cancelled: boolean;
};
export interface ItemInterface {
    category: string,
    description: string,
    title: string,
    brand: string,
    sellerId: string,
    stock: number,
    orders: string[],
}

export interface MongooseItemInterface extends ItemInterface {
    _id: string
}