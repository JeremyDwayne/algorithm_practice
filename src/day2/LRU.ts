type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

function create_node<V>(value: V): Node<V> {
  return { value };
}

export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;
  private reverse_lookup: Map<Node<V>, K>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverse_lookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    // does it exist?
    let node = this.lookup.get(key);
    if (!node) {
      node = create_node(value);
      this.length++;
      this.prepend(node);
      this.trim_cache();

      this.lookup.set(key, node);
      this.reverse_lookup.set(node, key);
    } else {
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: Node<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (this.head === node) {
      this.head = this.head.next;
    }
    if (this.tail === node) {
      this.tail = this.tail.prev;
    }

    node.prev = undefined;
    node.next = undefined;
  }

  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  private trim_cache(): void {
    if (this.length <= this.capacity) {
      return;
    }
    const tail = this.tail as Node<V>;
    this.detach(this.tail as Node<V>);

    const key = this.reverse_lookup.get(tail) as K;
    this.lookup.delete(key);
    this.reverse_lookup.delete(tail);
    this.length--;
  }
}
