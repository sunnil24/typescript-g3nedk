export class Template {
  private host: HTMLTemplateElement;
  constructor(target: string) {
    this.host = document.getElementById(target) as HTMLTemplateElement;
  }

  getHTML(): HTMLElement {
    const template = this.host.content.cloneNode(true) as HTMLElement;
    return template;
  }
}
