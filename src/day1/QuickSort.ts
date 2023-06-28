function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let idx = lo - 1;
  for (let i = lo; i < hi; ++i) {
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }
  idx++
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

function sort(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) {
    return;
  }
  const p = partition(arr, lo, hi);
  sort(arr, lo, p - 1);
  sort(arr, p + 1, hi);
}

export default function quick_sort(arr: number[]): void {
  sort(arr, 0, arr.length - 1);
}
