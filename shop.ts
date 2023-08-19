import { IProduct } from './interface';
import { Product } from './product';
import { Template } from './template';
import { Cart } from './cart';
import { Dialog } from './dialog';

export class Shop {
  private host: HTMLElement;
  private html: HTMLElement;
  private cart: Cart;
  constructor(private target: string, private title: string) {
    this.host = document.getElementById(target);
    this.title = title;
    const template = new Template('shop-template');
    this.html = template.getHTML();
    this.cart = new Cart(this.host);
  }

  async getProducts(): Promise<IProduct[]> {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }

  renderProducts(target: Node, productsList: IProduct[]) {
    const template = new Template('product-template');
    productsList.forEach((product) => {
      const html = template.getHTML();
      const titleElem = html.querySelector(
        '.product-title'
      ) as HTMLHeadingElement;
      const imageEle = html.querySelector('.product-image') as HTMLImageElement;
      const desciptionEle = html.querySelector(
        '.product-description'
      ) as HTMLParagraphElement;
      const priceEle = html.querySelector(
        '.product-price'
      ) as HTMLParagraphElement;
      const addToCartCTA = html.querySelector(
        '.product-add-to-cart'
      ) as HTMLButtonElement;

      const prod = new Product(product);

      const { title, thumbnail, description, price } = prod;

      titleElem.textContent = title;
      imageEle.src = thumbnail;
      imageEle.width = 250;
      priceEle.textContent = `Price - $${price}`;
      desciptionEle.textContent = description;

      addToCartCTA.addEventListener('click', () => {
        this.cart.add(prod);
      });
      target.appendChild(html);
    });
  }

  async create() {
    const products = await this.getProducts();

    const titleEle = this.html.querySelector('.shop-title');
    const productsContainer = this.html.querySelector('.products-conatainer');
    titleEle.textContent = this.title;
    this.renderProducts(productsContainer, products);
    this.cart.render();
    this.host.appendChild(this.html);
    const dialog = new Dialog('.products-conatainer');
    dialog.render();
  }
}
