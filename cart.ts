import { first, second } from './decorators';
import { ElementPosition, IProduct } from './interface';
import { Template } from './template';

export class Cart {
  html: HTMLElement;
  private cart: IProduct[];

  constructor(private target: HTMLElement) {
    const template = new Template('cart-template');
    this.html = template.getHTML();
    this.cart = [];
  }

  updateCart() {
    const cartCountElem =
      this.html.querySelector('.cart-text span') ||
      document.querySelector('.cart-text span');

    if (cartCountElem) {
      cartCountElem.textContent = this.detail.length.toString();
    }
  }

  // @first()
  // @second()
  render() {
    this.updateCart();
    this.target.append(this.html);
    // this.target.insertAdjacentElement(this.position, this.html);
  }

  add(product: IProduct) {
    // const
    const confirmation = confirm(
      'Are you sure to add ' + product.title + ' in cart?'
    );
    if (confirmation) {
      this.cart.push(product);
      this.updateCart();

      alert(product.title + ' has been added to cart successfully');
    }
  }

  get detail() {
    return this.cart;
  }
}
