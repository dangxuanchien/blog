import { Readable, ReadableOptions } from 'stream';
export class ReadableStream<T> extends Readable {
  data: string;
  sent: boolean = false;
  constructor(data: string, options?: ReadableOptions) {
    super(options);
    this.data = data;
  }
  _read(size: number) {
    if (this.data.length) {
      const chunk = Buffer.from(this.data.slice(0, size));
      this.data = this.data.slice(size, this.data.length);
      this.push(chunk);
    } else {
      this.push(null);
    }
  }
}