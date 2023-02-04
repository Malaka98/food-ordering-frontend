export class Food {
  name!: string
  price!: string
  category!: string
  imgUri!: string
  description!: string


  constructor(name: string, price: string, category: string, imgUri: string, description: string) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.imgUri = imgUri;
    this.description = description;
  }
}
