// Import stylesheets
import './style.css';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string, string, string, string, string];
}

class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string, string, string, string, string];

  constructor(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.discountPercentage = product.discountPercentage;
    this.rating = product.rating;
    this.stock = product.stock;
    this.brand = product.brand;
    this.category = product.category;
    this.thumbnail = product.thumbnail;
    this.images = product.images;
  }
}

class Template {
  private host: HTMLTemplateElement;
  constructor(target: string) {
    this.host = document.getElementById(target) as HTMLTemplateElement;
  }

  getHTML(): HTMLElement {
    const template = this.host?.content.cloneNode(true) as HTMLElement;
    return template;
  }
}

class Shop {
  private host: HTMLElement;
  constructor(private target: string, private title: string) {
    this.host = document.getElementById(target);
    this.title = title;
  }

  async getProducts(): Promise<IProduct[]> {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }

  renderProducts(target: Node, productsList: IProduct[]) {
    const template = new Template('product-template');
    // const productsContainer = document.querySelector(target);
    productsList.forEach(({ title, thumbnail, description }) => {
      const html = template.getHTML();
      const titleElem = html.querySelector(
        '.product-title'
      ) as HTMLHeadingElement;
      const imageEle = html.querySelector('.product-image') as HTMLImageElement;
      const desciptionEle = html.querySelector(
        '.product-description'
      ) as HTMLParagraphElement;

      titleElem.textContent = title;
      imageEle.src = thumbnail;
      desciptionEle.textContent = description;
      target.appendChild(html);
    });
  }

  async create() {
    const products = await this.getProducts();
    const template = new Template('shop-template');
    const html = template.getHTML();
    const titleEle = html.querySelector('.shop-title');
    const productsContainer = html.querySelector('.products-conatainer');

    titleEle.textContent = this.title;
    this.renderProducts(productsContainer, products);
    this.host.appendChild(html);
  }
}

const shop = new Shop('app', 'My shop');
shop.create();
