export class Food {
  id!: string
  name!: string
  price!: number
  category!: string
  imgUri!: string
  description!: string


  constructor(id: string, name: string, price: number, category: string, imgUri: string, description: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.imgUri = imgUri;
    this.description = description;
  }
}
