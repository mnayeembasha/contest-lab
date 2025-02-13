export const twoSum = {
  _id: "1992-asdf",
  title: "Two Sum",
  slug: "two-sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficulty: "easy",
  category: "Array",
  starterCode: {
    python:
      "def twoSum(nums, target):\n    //write your code here    \n    pass",
    javascript: "function twoSum(nums, target) {\n    // Your code here\n}",
    java: "public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return new int[0];\n}",
    c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    return NULL;\n}",
    "c++":
      "vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}",
  },
  constraints: [
    "2 ≤ nums.length ≤ 10^4",
    "-10^9 ≤ nums[i] ≤ 10^9",
    "-10^9 ≤ target ≤ 10^9",
    "Only one valid answer exists.",
  ],
  image: "https://example.com/two-sum.png",
  examples: [
    {
      id: 1,
      inputText: "nums = [2,7,11,15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [2,7,11,15], target = 10",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 3,
      inputText: "nums = [2,7,11,15], target = 11",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  testCases: [
    {
      id: 1,
      input: "[2,7,11,15], 9",
      expected: "[0,1]",
    },
    {
      id: 2,
      input: "[3,2,4], 6",
      expected: "[1,2]",
    },
  ],
  "hiddenTestCases": [
    {
      "input": "[1,5,3,7,9], 12",
      "expected": "[2,3]"
    },
    {
      "input": "[4,3,2,1], 5",
      "expected": "[1,2]"
    }
  ]
};

export const problems = [
  {
    "_id":"1991-asdf",
    "title": "Two Sum",
    "slug": "two-sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "difficulty": "easy",
    "category": "Array",
    "starterCode": {
      "python": "def two_sum(nums, target):\n    # Your code here\n    return []\n\nif __name__ == \"__main__\":\n    nums = [2,7,11,15]\n    target = 9\n    print(two_sum(nums, target))  # Example test case",
      "java": "import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2,7,11,15};\n        int target = 9;\n        System.out.println(Arrays.toString(twoSum(nums, target))); // Example test case\n    }\n}",
      "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    *returnSize = 0;\n    return NULL;\n}\n\nint main() {\n    int nums[] = {2,7,11,15};\n    int target = 9;\n    int returnSize;\n    int* result = twoSum(nums, 4, target, &returnSize);\n\n    if (result) {\n        printf(\"[%d, %d]\\n\", result[0], result[1]);\n        free(result);\n    }\n    return 0;\n}",
      "c++": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2,7,11,15};\n    int target = 9;\n    vector<int> result = twoSum(nums, target);\n\n    cout << \"[\" << result[0] << \", \" << result[1] << \"]\" << endl; // Example test case\n    return 0;\n}",
      "javascript": "function twoSum(nums, target) {\n    // Your code here\n    return [];\n}\n\n// Example test case\nconst nums = [2,7,11,15];\nconst target = 9;\nconsole.log(twoSum(nums, target));"
    },
    "constraints": [
      "2 ≤ nums.length ≤ 10^4",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "-10^9 ≤ target ≤ 10^9",
      "Only one valid answer exists."
    ],
    "examples": [
      {
        "id": 1,
        "inputText": "nums = [2,7,11,15], target = 9",
        "outputText": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "id": 2,
        "inputText": "nums = [3,2,4], target = 6",
        "outputText": "[1,2]",
        "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    "testCases": [
      { "id": 1, "input": "[2,7,11,15], 9", "expected": "[0,1]" },
      { "id": 2, "input": "[3,2,4], 6", "expected": "[1,2]" },
      { "id": 3, "input": "[5,3,5,8], 10", "expected": "[0,2]" }
    ],
    "hiddenTestCases": [
      { "input": "[1,5,3,7,9], 12", "expected": "[2,3]" },
      { "input": "[4,3,2,1], 5", "expected": "[1,2]" },
      { "input": "[10,20,30,40], 50", "expected": "[1,2]" },
      { "input": "[8,15,7,1], 16", "expected": "[0,2]" },
      { "input": "[6,6], 12", "expected": "[0,1]" }
    ]
  }
,
  {
    "_id":"1992-qwer",
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "difficulty": "easy",
    "category": "String",
    "starterCode": {
      "python": "def is_valid(s):\n    # Your code here\n    return False\n\nif __name__ == \"__main__\":\n    s = \"()\"\n    print(is_valid(s))  # Example test case",
      "java": "import java.util.*;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        String s = \"()\";\n        System.out.println(isValid(s)); // Example test case\n    }\n}",
      "c": "#include <stdio.h>\n#include <stdbool.h>\n\nbool isValid(char* s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    char s[] = \"()\";\n    printf(\"%s\\n\", isValid(s) ? \"true\" : \"false\");\n    return 0;\n}",
      "c++": "#include <iostream>\nusing namespace std;\n\nbool isValid(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    string s = \"()\";\n    cout << (isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "javascript": "function isValid(s) {\n    // Your code here\n    return false;\n}\n\n// Example test case\nconst s = \"()\";\nconsole.log(isValid(s));"
    },
    "examples": [
      {
        "id": 1,
        "inputText": "s = '()'",
        "outputText": "true",
        "explanation": "Valid as () is a correct sequence."
      },
      {
        "id": 2,
        "inputText": "s = '()[]{}'",
        "outputText": "true",
        "explanation": "Valid as ()[]{}, all pairs are matched."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists only of '(', ')', '{', '}', '[', and ']'",
      "Each opening bracket must have a corresponding closing bracket in the correct order"
    ],
    "testCases": [
      { "id": 1, "input": "'()'", "expected": "true" },
      { "id": 2, "input": "'()[]{}'", "expected": "true" },
      { "id": 3, "input": "'(]'", "expected": "false" }
    ],
    "hiddenTestCases": [
      { "input": "'[{()}]'", "expected": "true" },
      { "input": "'{[)]}'", "expected": "false" },
      { "input": "'()()()()'", "expected": "true" },
      { "input": "'([)]'", "expected": "false" },
      { "input": "'((()))'", "expected": "true" }
    ]
  },
  {
    "_id": "1994-zxcv",
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    "difficulty": "medium",
    "category": "Array",
    "starterCode": {
        "python": "def max_subarray(nums):\n    # Your code here\n    return 0\n\nif __name__ == \"__main__\":\n    nums = [-2,1,-3,4,-1,2,1,-5,4]\n    print(max_subarray(nums))  # Example test case",
        "java": "import java.util.*;\n\npublic class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {-2,1,-3,4,-1,2,1,-5,4};\n        System.out.println(maxSubArray(nums)); // Example test case\n    }\n}",
        "c": "#include <stdio.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    int nums[] = {-2,1,-3,4,-1,2,1,-5,4};\n    printf(\"%d\\n\", maxSubArray(nums, 9));\n    return 0;\n}",
        "c++": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};\n    cout << maxSubArray(nums) << endl;\n    return 0;\n}",
        "javascript": "function maxSubArray(nums) {\n    // Your code here\n    return 0;\n}\n\n// Example test case\nconst nums = [-2,1,-3,4,-1,2,1,-5,4];\nconsole.log(maxSubArray(nums));"
    },
    "examples": [
        {
            "id": 1,
            "inputText": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            "outputText": "6",
            "explanation": "The subarray [4,-1,2,1] has the largest sum."
        },
        {
            "id": 2,
            "inputText": "nums = [1]",
            "outputText": "1",
            "explanation": "The subarray [1] has the largest sum."
        }
    ],
    "constraints": [
        "1 <= nums.length <= 100000",
        "-10000 <= nums[i] <= 10000"
    ],
    "testCases": [
        { "id": 1, "input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected": "6" },
        { "id": 2, "input": "[1]", "expected": "1" },
        { "id": 3, "input": "[5,4,-1,7,8]", "expected": "23" }
    ],
    "hiddenTestCases": [
        { "input": "[3,-1,2,-1,2,-3,3]", "expected": "6" },
        { "input": "[-1,-2,-3,-4]", "expected": "-1" },
        { "input": "[10,20,30,40,-100,50,60]", "expected": "110" },
        { "input": "[0,0,0,0]", "expected": "0" },
        { "input": "[8,-19,5,-4,20]", "expected": "21" }
    ]
}
,
{
  "_id": "1995-mnbv",
  "title": "Binary Tree Level Order Traversal",
  "slug": "binary-tree-level-order-traversal",
  "description": "Given the root of a binary tree, return the level order traversal of its nodes' values.",
  "difficulty": "medium",
  "category": "Tree",
  "starterCode": {
      "python": "def level_order(root):\n    # Your code here\n    return []\n\nif __name__ == \"__main__\":\n    root = None  # Example test case\n    print(level_order(root))",
      "java": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class Solution {\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = null; // Example test case\n        System.out.println(levelOrder(root));\n    }\n}",
      "c": "#include <stdio.h>\n\nvoid levelOrder(void* root) {\n    // Your code here\n}\n\nint main() {\n    void* root = NULL;\n    levelOrder(root);\n    return 0;\n}",
      "c++": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<vector<int>> levelOrder(void* root) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    void* root = NULL;\n    cout << \"[]\" << endl;\n    return 0;\n}",
      "javascript": "function levelOrder(root) {\n    // Your code here\n    return [];\n}\n\n// Example test case\nconsole.log(levelOrder(null));"
  },
  "examples": [
      {
          "id": 1,
          "inputText": "root = [3,9,20,null,null,15,7]",
          "outputText": "[[3],[9,20],[15,7]]",
          "explanation": "Nodes are visited level-wise."
      },
      {
          "id": 2,
          "inputText": "root = [1]",
          "outputText": "[[1]]",
          "explanation": "Only one node exists at the root level."
      }
  ],
  "constraints": [
      "0 <= number of nodes <= 2000",
      "-1000 <= Node.val <= 1000"
  ],
  "testCases": [
      {
          "id": 1,
          "input": "[3,9,20,null,null,15,7]",
          "expected": "[[3],[9,20],[15,7]]"
      },
      {
          "id": 2,
          "input": "[1]",
          "expected": "[[1]]"
      },
      {
          "id": 3,
          "input": "[1,2,3,4,5]",
          "expected": "[[1],[2,3],[4,5]]"
      }
  ],
  "hiddenTestCases": [
      {
          "input": "[5,1,4,null,null,3,6]",
          "expected": "[[5],[1,4],[3,6]]"
      },
      {
          "input": "[10,5,15,null,null,6,20]",
          "expected": "[[10],[5,15],[6,20]]"
      },
      {
          "input": "[1,null,2,null,3]",
          "expected": "[[1],[2],[3]]"
      },
      {
          "input": "[7,4,9,3,5,8,10]",
          "expected": "[[7],[4,9],[3,5,8,10]]"
      },
      {
          "input": "[1,2,3,4,5,6,7]",
          "expected": "[[1],[2,3],[4,5,6,7]]"
      }
  ]
},
];
