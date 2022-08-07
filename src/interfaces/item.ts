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
    title: string,
    brand: string,
    image: string,
    category: string,
    description: string,
    stock: number,
    sellerId: string,
    orders: string[],
}

export interface MongooseItemInterface extends ItemInterface {
    _id: string
}