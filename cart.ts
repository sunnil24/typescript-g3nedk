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

  remove(targetProduct: IProduct) {
    this.cart.products = this.cart.products.filter(
      ({ product }) => product.title !== targetProduct.title
    );
    this.cart.total = this.cart.products.reduce(
      (total, { product: { price }, count }) => total + price * count,
      0
    );
    this.updateCart();
  }

  updateCart() {
    const cartCountElem =
      this.html.querySelector('.cart-text span') ||
      document.querySelector('.cart-text span');

    if (!this.cart.products.length) {
      cartCountElem.textContent = this.detail.products.length.toString();
      const cartListEle = document.querySelector('.cart-list');
      if (cartListEle) {
        cartListEle.innerHTML = `<li>
        <div class="cart-empty"><p>There is nothing in cart</p></div>
      </li>`;
      } else {
      }
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
        template
          .querySelector('.cart-item-remove')
          .addEventListener('click', () => {
            this.remove(product);
          });
        list.append(template);

        cartListEle.insertAdjacentElement('beforeend', list);
      });
      const li = document.createElement('h3');
      li.textContent = `Total amount - $${this.cart.total}`;
      cartListEle.insertAdjacentElement('beforeend', li);
    }
  }

  toggleDropdown(e: MouseEvent) {
    e.preventDefault();
    const ele = e.target as HTMLButtonElement;
    ele.classList.toggle('open-cart-list');
  }

  closeDropdown(e: any) {
    e.preventDefault();
    const ele = document.querySelector('.open-cart-list') as HTMLButtonElement;
    const isCartListATarget =
      e.explicitOriginalTarget.parentElement.closest('.cart-list');

    if (ele && !isCartListATarget) {
      ele.classList.remove('open-cart-list');
    }
  }

  // @first()
  // @second()
  render() {
    this.updateCart();
    this.html
      .querySelector('.cart-text')
      .addEventListener('click', this.toggleDropdown);
    this.html
      .querySelector('.cart-text')
      .addEventListener('blur', this.closeDropdown);
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
