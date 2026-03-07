import { describe, expect } from "../../utils/structures";

// ─── Problem ──────────────────────────────────────────────────────────────────
// Two Sum
// https://leetcode.com/problems/two-sum/
//
// Given an array of integers nums and an integer target,
// return indices of the two numbers that add up to target.

function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Two Sum", () => {
  expect("basic case", twoSum([2, 7, 11, 15], 9), [0, 1]);
  expect("middle elements", twoSum([3, 2, 4], 6), [1, 2]);
  expect("duplicate values", twoSum([3, 3], 6), [0, 1]);
});
