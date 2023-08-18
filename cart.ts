import { first, second } from './decorators';
import { ElementPosition, IProduct } from './interface';
import { Template } from './template';

export class Cart {
  readonly html: HTMLElement;
  private readonly cart: IProduct[];

  constructor(private target: HTMLElement) {
    const template = new Template('cart-template');
    this.html = template.getHTML();
    this.cart = [];
  }

  updateCart() {
    const cartCountElem = this.html.querySelector('.cart-text span');

    if (cartCountElem) {
      cartCountElem.textContent = this.detail.length.toString();
    } else {
      document.querySelector('.cart-text span').textContent =
        this.detail.length.toString();
      const cartListEle = document.querySelector('.cart-list');
      cartListEle.innerHTML = '';
      this.cart.forEach(({ title, thumbnail, price }) => {
        const list = document.createElement('li');
        const template = new Template('cart-item').getHTML();
        (
          template.querySelector('.cart-product-image') as HTMLImageElement
        ).src = thumbnail;
        template.querySelector('.cart-product-title').textContent = title;
        template.querySelector('.cart-product-price').textContent =
          '$' + price.toString();
        list.append(template);
        cartListEle.insertAdjacentElement('beforeend', list);
      });
    }
    this.target.append(this.html);
  }

  // @first()
  // @second()
  render() {
    this.updateCart();
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
