export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const prev = new Array(graph.length).fill(-1);
  const seen = new Array(graph.length).fill(false);
  const queue: number[] = [source];

  seen[source] = true;

  do {
    const curr = queue.shift() as number;
    if (curr === needle) {
      break;
    }

    const adjs = graph[curr];
    for (let i = 0; i < adjs.length; ++i) {
      if (adjs[i] === 0) {
        continue;
      }
      if (seen[i]) {
        continue;
      }

      seen[i] = true;
      prev[i] = curr;
      queue.push(i);
    }
    seen[curr] = true;
  } while (queue.length);

  let curr = needle;
  const path: number[] = [];
  while (prev[curr] != -1) {
    path.push(curr);
    curr = prev[curr];
  }

  if (path.length) {
    return [source].concat(path.reverse());
  }

  return null;
}

