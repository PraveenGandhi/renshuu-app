import { autoinject } from 'aurelia-framework';
import * as Showdown from 'showdown';

@autoinject()
export class MarkdownCustomAttribute {

    converter: any;
    constructor(private element: Element) {
        this.element = element;
        this.converter = new Showdown.Converter();
    }

    valueChanged(newValue) {
        this.element.innerHTML = this.converter.makeHtml(
            newValue
            .split('\n')
            .map(line => line.trim())
            .join('\n')
        );
    }
}