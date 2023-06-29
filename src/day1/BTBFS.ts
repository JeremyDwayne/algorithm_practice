export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  // unshift and shift in typescript are O(n^2)
  // using ArrayList [] for simplicity.
  // If you used a proper Queue you build yourself it would be O(n)
  const q: (BinaryNode<number> | null)[] = [head];
  while (q.length) {
    const curr = q.shift() as BinaryNode<number> | undefined | null;
    if (!curr) continue;

    if (curr.value === needle) return true;

    q.push(curr.left);
    q.push(curr.right);
  }

  return false;
}

