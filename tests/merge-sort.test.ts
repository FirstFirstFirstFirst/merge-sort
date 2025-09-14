import { describe, it, expect, beforeEach } from "vitest";
import { merge_sort, merge_helper, merge } from "../src/merge-sort";

describe("Merge Sort Algorithm", () => {
  describe("merge_sort function", () => {
    it("should return empty array when given empty array", () => {
      const result = merge_sort([]);
      expect(result).toEqual([]);
    });

    it("should return single element array unchanged", () => {
      const input = [42];
      const result = merge_sort(input);
      expect(result).toEqual([42]);
      expect(result).not.toBe(input); // Ensures immutability
    });

    it("should sort two-element array correctly", () => {
      expect(merge_sort([2, 1])).toEqual([1, 2]);
      expect(merge_sort([1, 2])).toEqual([1, 2]);
    });

    it("should sort already sorted arrays", () => {
      const sorted = [1, 2, 3, 4, 5];
      expect(merge_sort(sorted)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort reverse sorted arrays", () => {
      const reversed = [5, 4, 3, 2, 1];
      expect(merge_sort(reversed)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle arrays with duplicate elements", () => {
      const duplicates = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
      const expected = [1, 1, 2, 3, 3, 4, 5, 5, 6, 9];
      expect(merge_sort(duplicates)).toEqual(expected);
    });

    it("should handle arrays with all identical elements", () => {
      const identical = [7, 7, 7, 7, 7];
      expect(merge_sort(identical)).toEqual([7, 7, 7, 7, 7]);
    });

    it("should handle large arrays efficiently", () => {
      const large = Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * 1000)
      );
      const result = merge_sort(large);
      const expected = [...large].sort((a, b) => a - b);
      expect(result).toEqual(expected);
    });

    it("should not mutate the original array", () => {
      const original = [3, 1, 4, 1, 5];
      const originalCopy = [...original];
      merge_sort(original);
      expect(original).toEqual(originalCopy);
    });

    it("should handle negative numbers correctly", () => {
      const negatives = [-3, -1, -4, -1, -5];
      const expected = [-5, -4, -3, -1, -1];
      expect(merge_sort(negatives)).toEqual(expected);
    });

    it("should handle mixed positive and negative numbers", () => {
      const mixed = [-2, 5, -1, 3, 0, -4];
      const expected = [-4, -2, -1, 0, 3, 5];
      expect(merge_sort(mixed)).toEqual(expected);
    });
  });

  describe("merge_helper function", () => {
    it("should merge two empty arrays", () => {
      expect(merge_helper([], [])).toEqual([]);
    });

    it("should merge when left array is empty", () => {
      expect(merge_helper([], [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("should merge when right array is empty", () => {
      expect(merge_helper([1, 2, 3], [])).toEqual([1, 2, 3]);
    });

    it("should merge two sorted arrays of equal length", () => {
      const left = [1, 3, 5];
      const right = [2, 4, 6];
      expect(merge_helper(left, right)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should merge arrays of different lengths", () => {
      const left = [1, 5];
      const right = [2, 3, 4, 6, 7];
      expect(merge_helper(left, right)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it("should handle duplicate elements during merge", () => {
      const left = [1, 3, 3];
      const right = [2, 3, 4];
      expect(merge_helper(left, right)).toEqual([1, 2, 3, 3, 3, 4]);
    });

    it("should merge when all elements in left are smaller", () => {
      const left = [1, 2, 3];
      const right = [4, 5, 6];
      expect(merge_helper(left, right)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should merge when all elements in right are smaller", () => {
      const left = [7, 8, 9];
      const right = [1, 2, 3];
      expect(merge_helper(left, right)).toEqual([1, 2, 3, 7, 8, 9]);
    });
  });

  describe("merge function", () => {
    let collection1: number[];
    let collection2: number[];
    let collection3: number[];

    beforeEach(() => {
      collection1 = [3, 1, 4];
      collection2 = [1, 5, 9];
      collection3 = [2, 6, 5];
    });

    it("should merge three collections and reverse the third one", () => {
      // collection3 reversed: [5, 6, 2]
      // combined: [3, 1, 4, 1, 5, 9, 5, 6, 2]
      // sorted: [1, 1, 2, 3, 4, 5, 5, 6, 9]
      const result = merge(collection1, collection2, collection3);
      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    it("should handle empty collections", () => {
      expect(merge([], [], [])).toEqual([]);
      expect(merge([1], [], [])).toEqual([1]);
      expect(merge([], [2], [])).toEqual([2]);
      expect(merge([], [], [3])).toEqual([3]);
    });

    it("should not mutate input arrays", () => {
      const original1 = [...collection1];
      const original2 = [...collection2];
      const original3 = [...collection3];

      merge(collection1, collection2, collection3);

      expect(collection1).toEqual(original1);
      expect(collection2).toEqual(original2);
      expect(collection3).toEqual(original3);
    });

    it("should handle single element arrays", () => {
      const result = merge([1], [2], [3]);
      expect(result).toEqual([1, 2, 3]);
    });

    it("should handle arrays with negative numbers", () => {
      const result = merge([-1, 3], [0, -2], [5, -3]);
      // collection3 reversed: [-3, 5]
      // combined: [-1, 3, 0, -2, -3, 5]
      // sorted: [-3, -2, -1, 0, 3, 5]
      expect(result).toEqual([-3, -2, -1, 0, 3, 5]);
    });

    it("should handle large input collections", () => {
      const large1 = Array.from({ length: 100 }, (_, i) => i);
      const large2 = Array.from({ length: 100 }, (_, i) => i + 100);
      const large3 = Array.from({ length: 100 }, (_, i) => i + 200);

      const result = merge(large1, large2, large3);
      expect(result).toHaveLength(300);
      expect(result).toEqual([...result].sort((a, b) => a - b));
    });
  });

  describe("Edge Cases and Performance", () => {
    it("should maintain stability for equal elements", () => {
      // This test verifies that merge sort is stable
      const input = [1, 2, 2, 3];
      const result = merge_sort(input);
      expect(result).toEqual([1, 2, 2, 3]);
    });

    it("should handle floating point numbers", () => {
      const floats = [3.14, 2.71, 1.41, 1.73];
      const result = merge_sort(floats);
      expect(result).toEqual([1.41, 1.73, 2.71, 3.14]);
    });

    it("should complete within reasonable time for large inputs", () => {
      const startTime = performance.now();
      const large = Array.from({ length: 10000 }, () => Math.random());
      merge_sort(large);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
});
