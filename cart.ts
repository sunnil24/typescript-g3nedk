import { first, second } from './decorators';
import { ElementPosition, IProduct } from './interface';
import { Template } from './template';

interface ICart {
  total: number;
  products: {
    quantity: number;
    product: IProduct;
  }[];
}

export class Cart {
  readonly html: HTMLElement;
  private cart: ICart;

  constructor(private target: HTMLElement) {
    const template = new Template('cart-template');
    this.html = template.getHTML();
    this.cart = {
      total: 0,
      products: [],
    };
  }

  updateCart() {
    const cartCountElem = this.html.querySelector('.cart-text span');

    if (cartCountElem) {
      cartCountElem.textContent = this.detail.products.length.toString();
    } else {
      document.querySelector('.cart-text span').textContent =
        this.detail.products.length.toString();
      const cartListEle = document.querySelector('.cart-list');
      cartListEle.innerHTML = '';
      this.cart.products.forEach(({ product }) => {
        const { title, thumbnail, price } = product;
        const list = document.createElement('li');
        const template = new Template('cart-item').getHTML();
        (
          template.querySelector('.cart-product-image') as HTMLImageElement
        ).src = thumbnail;
        template.querySelector('.cart-product-title').textContent = title;
        template.querySelector('.cart-product-count').textContent = 'Count - 1';
        template.querySelector('.cart-product-price').textContent =
          'Price - $' + price.toString();
        list.append(template);
        cartListEle.insertAdjacentElement('beforeend', list);
      });
      const li = document.createElement('h3');
      li.textContent = `Total amount - $${this.cart.total}`;
      cartListEle.insertAdjacentElement('beforeend', li);
    }
  }

  // @first()
  // @second()
  render() {
    this.updateCart();
    this.target.append(this.html);
  }

  add(product: IProduct) {
    this.cart.products.push({
      quantity: 1,
      product,
    });
    this.cart.total = this.cart.products.reduce(
      (total, { product: { price } }) => total + price,
      0
    );
    this.updateCart();

    alert(product.title + ' has been added to cart successfully');
  }

  get detail() {
    return this.cart;
  }
}
