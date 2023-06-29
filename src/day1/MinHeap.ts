export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.length = 0;
    this.data = [];
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapify_up(this.length);
    this.length++;
  }

  delete(): number {
    if (this.length === 0) return -1;

    const out = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return out;
    }

    this.data[0] = this.data[this.length];
    this.heapify_down(0);
    return out;
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private left_child(idx: number): number {
    return idx * 2 + 1;
  }

  private right_child(idx: number): number {
    return idx * 2 + 2;
  }

  private heapify_up(idx: number): void {
    if (idx === 0) {
      return;
    }

    const parent = this.parent(idx);
    const parent_value = this.data[parent];
    const value = this.data[idx];

    if (parent_value > value) {
      this.data[idx] = parent_value;
      this.data[parent] = value;

      this.heapify_up(parent);
    }
  }

  private heapify_down(idx: number): void {
    const left_idx = this.left_child(idx);
    const right_idx = this.right_child(idx);

    if (idx >= this.length || left_idx >= this.length) {
      return;
    }

    const left_value = this.data[left_idx];
    const right_value = this.data[right_idx];
    const value = this.data[idx];

    if (left_value > right_value && value > right_value) {
      this.data[idx] = right_value;
      this.data[right_idx] = value;
      this.heapify_down(right_idx);
    } else if (right_value > left_value && value > left_value) {
      this.data[idx] = left_value;
      this.data[left_idx] = value;
      this.heapify_down(left_idx);
    }
  }
}

