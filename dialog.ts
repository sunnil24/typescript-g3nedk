import { Template } from './template';

export class Dialog {
  host: HTMLElement;
  template: HTMLElement;
  constructor(target) {
    this.host = document.querySelector(target);
    const tempalte = new Template('dialog-template');
    this.template = tempalte.getHTML();
  }

  openDialog(e: MouseEvent) {
    e.preventDefault();
    this.host.querySelector('dialog').showModal();
  }

  render() {
    const dialogEle = this.template.querySelector('dialog');
    this.host.append(dialogEle);
  }
}
