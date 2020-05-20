export class UpdateProductDetails {
    constructor(
        public product_id?: number,
        public product_name?: string,
        public category_id?: number,
        public price?: number,
        public image_path?: string
    ) {}
}