export function merge_sort(collection: number[]): number[] {
  if (collection.length <= 1) return [...collection];

  const mid = Math.floor(collection.length / 2);
  const left = merge_sort(collection.slice(0, mid));
  const right = merge_sort(collection.slice(mid));

  return merge_helper(left, right);
}

export function merge_helper(left: number[], right: number[]): number[] {
  let result_collection: number[] = [],
    left_index = 0,
    right_index = 0;
  while (left_index < left.length && right_index < right.length) {
    const left_val = left[left_index];
    const right_val = right[right_index];

    if (left_val !== undefined && right_val !== undefined) {
      if (left_val < right_val) {
        result_collection.push(left_val);
        left_index++;
      } else {
        result_collection.push(right_val);
        right_index++;
      }
    }
  }

  return result_collection
    .concat(left.slice(left_index))
    .concat(right.slice(right_index));
}

export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  const reversed_collection_3 = [...collection_3].reverse();

  const combined_collections = [
    ...collection_1,
    ...collection_2,
    ...reversed_collection_3,
  ];

  return merge_sort(combined_collections);
}
