declare module "@azz/elementtree" {
  export class ElementTree {
    constructor(element: Element);
    getroot(): Element;
    setroot(element: Element): void;
    parse(source: string, parser?: unknown): ElementTree;
    iter(tag: string, callback: unknown): void;
    find(path: string): Element;
    findtext(path: string, defvalue?: string): string;
    findall(path: string, defvalue?: string): Element[];
    write(options?: Record<string, unknown>): string;
  }

  export const Element: Element;
  export interface Element {
    new (tag: string, attrib?: Object): Element;
    (tag: string, attrib?: Object): Element;
    toString(): string;
    makeelement(tag: string, attrib?: Record<string, unknown>): Element;
    len(): number;
    getItem(index: number): Element;
    setItem(index: number, element: Element): void;
    delItem(index: number): void;
    getSlice(start: number, stop: number): Element[];
    setSlice(start: number, stop: number, elements: Element[]): void;
    delSlice(start: number, stop: number): void;
    append(element: Element): void;
    extend(elements: Element[]): void;
    insert(index: number, element: Element): void;
    remove(element: Element): void;
    getchildren(): Element[];
    find(path: string): Element;
    findtext(path: string, defvalue?: string): string;
    findall(path: string, defvalue?: string): Element[];
    clear(): void;
    get(key: string, defvalue?: string): string;
    set(key: string, value: string): void;
    keys(): string[];
    items(): Element[];
    iter(tag: string, callback: unknown): void;
    itertext(callback: unknown): void;
    text: string;
  }

  export class QName {
    constructor(text_or_uri: string, tag: string);
    toString(): string;
  }

  export function XML(data: string): Element;
  export function parse(source: string, parser?: string): ElementTree;
  export function tostring(element: Element, options: Record<string, unknown>): string;
  export function register_namespace(prefix: string, uri: string): void;
  export function SubElement(
    parent: Element,
    tag: string,
    attrib?: string | Object,
  ): Element;
  export function Comment(text: string): Element;
  export function CData(text: string): Element;
    
  export interface ProcessingInstruction {
    (target: string, text?: string): Element;
  }
  export const ProcessingInstruction: ProcessingInstruction;
  export const PI: ProcessingInstruction;
}
