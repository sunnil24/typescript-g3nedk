import { first, second } from './decorators';
import { IProduct } from './interface';
import { Template } from './template';

interface ICartProduct {
  count: number;
  product: IProduct;
}

interface ICart {
  total: number;
  products: ICartProduct[];
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
      this.cart.products.forEach(({ product, count }) => {
        const { title, thumbnail, price } = product;
        const list = document.createElement('li');
        const template = new Template('cart-item').getHTML();
        (
          template.querySelector('.cart-product-image') as HTMLImageElement
        ).src = thumbnail;
        template.querySelector('.cart-product-title').textContent = title;
        template.querySelector(
          '.cart-product-count'
        ).textContent = `Count - ${count}`;
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
    const { title } = product;

    const hasAlreadyInCart = this.cart.products.some(
      ({ product }) => product.title === title
    );
    if (hasAlreadyInCart) {
      this.cart.products = this.cart.products.map((products) => ({
        ...products,
        ...(products.product.title === title
          ? { count: products.count + 1 }
          : {}),
      }));
    } else {
      this.cart.products.push({
        product,
        count: 1,
      });
    }

    this.cart.total = this.cart.products.reduce(
      (total, { product: { price }, count }) => total + price * count,
      0
    );
    this.updateCart();

    alert(product.title + ' has been added to cart successfully');
  }

  get detail() {
    return this.cart;
  }
}
