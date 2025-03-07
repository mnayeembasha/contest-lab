// def two_sum(nums, target):
//     num_map = {}  # Dictionary to store numbers and their indices
//     for i, num in enumerate(nums):
//         complement = target - num
//         if complement in num_map:
//             return [num_map[complement], i]  # Return indices of the two numbers
//         num_map[num] = i  # Store the index of the current number
//     return []  # Return empty list if no solution found

// if __name__ == "__main__":
//     import sys
//     input_data = sys.stdin.read().strip().split("\n")  # Read input from stdin
//     for line in input_data:
//         nums_str, target_str = line.split(";")  # Expecting input format: "2,7,11,15;9"
//         nums = list(map(int, nums_str.split(",")))
//         target = int(target_str)
//         print(two_sum(nums, target))  # Output result for each test case

// def is_valid(s):
//     stack = []
//     mapping = {")": "(", "}": "{", "]": "["}
//     for char in s:
//         if char in mapping:
//             top_element = stack.pop() if stack else '#'
//             if mapping[char] != top_element:
//                 return False
//         else:
//             stack.append(char)
//     return not stack

  // if __name__ == "__main__":
  //     import sys
  //     for line in sys.stdin:
  //         line = line.strip().strip("'\"")  # Remove surrounding quotes
  //         print(str(is_valid(line)).lower())  # Print result in lowercase


  // def max_subarray(nums):
  // if not nums:
  //     raise ValueError("The input array is empty")

  // current_sum = max_sum = nums[0]
  // for num in nums[1:]:
  //     current_sum = max(num, current_sum + num)
  //     max_sum = max(max_sum, current_sum)
  // return max_sum

// from collections import deque

// def level_order_traversal(root):
//     if not root:
//         return []

//     result = []
//     queue = deque([root])

//     while queue:
//         level_size = len(queue)
//         current_level = []

//         for _ in range(level_size):
//             node = queue.popleft()
//             current_level.append(node.val)

//             if node.left:
//                 queue.append(node.left)
//             if node.right:
//                 queue.append(node.right)

//         result.append(current_level)

//     return result





export const problems = [
  {
    "_id": "1991-asdf",
    "title": "Two Sum",
    "slug": "two-sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "difficulty": "easy",
    "category": "Array",
    "starterCode": {
      "python": "def two_sum(nums, target):\n    # Your code here\n    return []\n\nif __name__ == \"__main__\":\n    import sys\n    input_data = sys.stdin.read().strip().split(\"\\n\")\n    for line in input_data:\n        nums_str, target_str = line.split(\";\")\n        nums = list(map(int, nums_str.strip(\"[]\").split(\",\")))\n        target = int(target_str)\n        result = two_sum(nums, target)\n        print(str(result).replace(\" \", \"\"))",

      "java": "import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine();\n            String[] parts = line.split(\";\");\n            String[] numsStr = parts[0].replaceAll(\"\\\\[|\\\\]\", \"\").split(\",\");\n            int[] nums = new int[numsStr.length];\n            for (int i = 0; i < numsStr.length; i++) {\n                nums[i] = Integer.parseInt(numsStr[i].trim());\n            }\n            int target = Integer.parseInt(parts[1].trim());\n            int[] result = twoSum(nums, target);\n            System.out.println(Arrays.toString(result));\n        }\n        scanner.close();\n    }",

      "javascript": "function twoSum(nums, target) {\n    // Your code here\n    return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const [numsStr, targetStr] = line.split(';');\n    const nums = JSON.parse(numsStr);\n    const target = parseInt(targetStr);\n    const result = twoSum(nums, target);\n    console.log(JSON.stringify(result));\n});",

      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* result = (int*)malloc(2 * sizeof(int));\n    // Your code here\n    return result;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        char* numsPart = strtok(line, \";\");\n        char* targetPart = strtok(NULL, \";\");\n        int target = atoi(targetPart);\n        numsPart++;\n        numsPart[strlen(numsPart)-1] = '\\0';\n        int nums[1000], numsSize = 0;\n        char* token = strtok(numsPart, \",\");\n        while (token) {\n            nums[numsSize++] = atoi(token);\n            token = strtok(NULL, \",\");\n        }\n        int returnSize;\n        int* result = twoSum(nums, numsSize, target, &returnSize);\n        printf(\"[%d,%d]\\n\", result[0], result[1]);\n        free(result);\n    }\n    return 0;\n}",

      "c++": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        size_t split = line.find(';');\n        string numsStr = line.substr(0, split);\n        int target = stoi(line.substr(split + 1));\n        numsStr = numsStr.substr(1, numsStr.size() - 2);\n        stringstream ss(numsStr);\n        vector<int> nums;\n        string num;\n        while (getline(ss, num, ',')) {\n            nums.push_back(stoi(num));\n        }\n        vector<int> result = twoSum(nums, target);\n        cout << \"[\" << result[0] << \",\" << result[1] << \"]\" << endl;\n    }\n    return 0;\n}"
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
      {
        "id": 1,
        "input": "[2,7,11,15];9",
        "expected": "[0,1]",
        "description": "nums=[2,7,11,15], target=9"
      },
      {
        "id": 2,
        "input": "[3,2,4];6",
        "expected": "[1,2]",
        "description": "nums=[3,2,4], target=6"
      },
      {
        "id": 3,
        "input": "[5,3,5,8];10",
        "expected": "[0,2]",
        "description": "nums=[5,3,5,8], target=10"
      }
    ],
    "hiddenTestCases": [
      { "input": "[1,5,3,7,9];12", "expected": "[2,3]", "description": "nums=[1,5,3,7,9], target=12" },
      { "input": "[4,3,2,1];5", "expected": "[1,2]", "description": "nums=[4,3,2,1], target=5" },
      { "input": "[10,20,30,40];50", "expected": "[1,2]", "description": "nums=[10,20,30,40], target=50" },
      { "input": "[8,15,7,1];16", "expected": "[0,2]", "description": "nums=[8,15,7,1], target=16" },
      { "input": "[6,6];12", "expected": "[0,1]", "description": "nums=[6,6], target=12" }
    ]
  },
  {
    "_id": "1992-qwer",
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "difficulty": "easy",
    "category": "String",
    "starterCode": {
      "python": "def is_valid(s):\n    # Your code here\n    return False\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip().strip(\"'\\\"\")\n        print(str(is_valid(line)).lower())",

      "java": "import java.util.*;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim().replaceAll(\"^['\\\"]|['\\\"]$\", \"\");\n            System.out.println(isValid(line) ? \"true\" : \"false\");\n        }\n        scanner.close();\n    }",

      "javascript": "function isValid(s) {\n    // Your code here\n    return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const cleanLine = line.trim().replace(/^['\"]|['\"]$/g, '');\n    console.log(isValid(cleanLine) ? 'true' : 'false');\n});",

      "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isValid(char* s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        if (line[0] == '\\'' || line[0] == '\"') {\n            memmove(line, line + 1, strlen(line));\n            line[strlen(line) - 1] = '\\0';\n        }\n        printf(isValid(line) ? \"true\\n\" : \"false\\n\");\n    }\n    return 0;\n}",

      "c++": "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        if (!line.empty() && (line.front() == '\"' || line.front() == '\\'')) {\n            line = line.substr(1, line.size() - 2);\n        }\n        cout << (isValid(line) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}"
    },
    "examples": [
      {
        "id": 1,
        "inputText": "s = '()'",
        "outputText": "True",
        "explanation": "Valid as () is a correct sequence."
      },
      {
        "id": 2,
        "inputText": "s = '()[]{}'",
        "outputText": "True",
        "explanation": "Valid as ()[]{}, all pairs are matched."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists only of '(', ')', '{', '}', '[', and ']'",
      "Each opening bracket must have a corresponding closing bracket in the correct order"
    ],
    "testCases": [
      { "id": 1, "input": "'()'", "expected": "True", "description": "s='()'" },
      { "id": 2, "input": "'()[]{}'", "expected": "True", "description": "s='()[]{}'" },
      { "id": 3, "input": "'(]'", "expected": "False", "description": "s='(]'" }
    ],
    "hiddenTestCases": [
      { "input": "'[{()}]'", "expected": "True", "description": "s='[{()}]'" },
      { "input": "'{[)]}'", "expected": "False", "description": "s='{[)]}'" },
      { "input": "'()()()()'", "expected": "True", "description": "s='()()()()'" },
      { "input": "'([)]'", "expected": "False", "description": "s='([)]'" },
      { "input": "'((()))'", "expected": "True", "description": "s='((()))'" }
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
      "python": "def max_subarray(nums):\n    # Your code here\n    return 0\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip()\n        nums = list(map(int, line.strip(\"[]\").split(\",\")))\n        print(max_subarray(nums))",

      "java": "import java.util.*;\n\npublic class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim().replaceAll(\"\\\\[|\\\\]\", \"\");\n            String[] tokens = line.split(\",\");\n            int[] nums = new int[tokens.length];\n            for (int i = 0; i < tokens.length; i++) {\n                nums[i] = Integer.parseInt(tokens[i].trim());\n            }\n            System.out.println(maxSubArray(nums));\n        }\n        scanner.close();\n    }",

      "javascript": "function maxSubArray(nums) {\n    // Your code here\n    return 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const nums = JSON.parse(line);\n    console.log(maxSubArray(nums));\n});",

      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        line++;\n        line[strlen(line)-1] = '\\0';\n        int nums[1000], numsSize = 0;\n        char* token = strtok(line, \",\");\n        while (token) {\n            nums[numsSize++] = atoi(token);\n            token = strtok(NULL, \",\");\n        }\n        printf(\"%d\\n\", maxSubArray(nums, numsSize));\n    }\n    return 0;\n}",

      "c++": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        line = line.substr(1, line.size() - 2);\n        stringstream ss(line);\n        vector<int> nums;\n        string num;\n        while (getline(ss, num, ',')) {\n            nums.push_back(stoi(num));\n        }\n        cout << maxSubArray(nums) << endl;\n    }\n    return 0;\n}"
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
        { "id": 1, "input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected": "6", "description": "nums=[-2,1,-3,4,-1,2,1,-5,4]" },
        { "id": 2, "input": "[1]", "expected": "1", "description": "nums=[1]" },
        { "id": 3, "input": "[5,4,-1,7,8]", "expected": "23", "description": "nums=[5,4,-1,7,8]"}
    ],
    "hiddenTestCases": [
        { "input": "[3,-1,2,-1,2,-3,3]", "expected": "6","description":"nums = [3,-1,2,-1,2,-3,3]" },
        { "input": "[-1,-2,-3,-4]", "expected": "-1","description":"nums = [-1,-2,-3,-4]" },
        { "input": "[10,20,30,40,-100,50,60]", "expected": "110","description":"nums = [10,20,30,40,-100,50,60]" },
        { "input": "[0,0,0,0]", "expected": "0","description":"nums = [0,0,0,0]" },
        { "input": "[8,-19,5,-4,20]", "expected": "21" ,"description":"nums = [8,-19,5,-4,20]"}
    ]
  },
  {
    "_id": "1995-mnbv",
    "title": "Binary Tree Level Order Traversal",
    "slug": "binary-tree-level-order-traversal",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    "difficulty": "medium",
    "category": "Tree",
        "starterCode": {
      "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order_traversal(root):\n    # Your code here\n    return []\n\ndef build_tree(nodes):\n    if not nodes:\n        return None\n    root = TreeNode(int(nodes[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(nodes):\n        node = queue.pop(0)\n        if nodes[i] != 'null':\n            node.left = TreeNode(int(nodes[i]))\n            queue.append(node.left)\n        i += 1\n        if i < len(nodes) and nodes[i] != 'null':\n            node.right = TreeNode(int(nodes[i]))\n            queue.append(node.right)\n        i += 1\n    return root\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip().strip(\"[]\")\n        if not line:\n            print(\"[]\")\n            continue\n        nodes = [x.strip() for x in line.split(\",\")]\n        root = build_tree(nodes)\n        result = level_order_traversal(root)\n        print(str(result).replace(\" \", \"\").replace(\"'\", \"\"))",

      "java": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class Solution {\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    \n    public static TreeNode buildTree(String[] nodes) {\n        if (nodes.length == 0 || nodes[0].equals(\"null\")) return null;\n        \n        TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        \n        int i = 1;\n        while (!queue.isEmpty() && i < nodes.length) {\n            TreeNode current = queue.poll();\n            \n            if (!nodes[i].equals(\"null\")) {\n                current.left = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.add(current.left);\n            }\n            i++;\n            \n            if (i < nodes.length && !nodes[i].equals(\"null\")) {\n                current.right = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.add(current.right);\n            }\n            i++;\n        }\n        \n        return root;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim();\n            line = line.substring(1, line.length() - 1); // Remove [ and ]\n            \n            if (line.isEmpty()) {\n                System.out.println(\"[]\");\n                continue;\n            }\n            \n            String[] nodes = line.split(\",\");\n            for (int i = 0; i < nodes.length; i++) {\n                nodes[i] = nodes[i].trim();\n            }\n            \n            TreeNode root = buildTree(nodes);\n            List<List<Integer>> result = levelOrder(root);\n            \n            // Format the output\n            StringBuilder sb = new StringBuilder();\n            sb.append(\"[\");\n            for (int i = 0; i < result.size(); i++) {\n                sb.append(\"[\");\n                for (int j = 0; j < result.get(i).size(); j++) {\n                    sb.append(result.get(i).get(j));\n                    if (j < result.get(i).size() - 1) sb.append(\",\");\n                }\n                sb.append(\"]\");\n                if (i < result.size() - 1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            System.out.println(sb.toString());\n        }\n        scanner.close();\n    }",

      "javascript": "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val)\n    this.left = (left===undefined ? null : left)\n    this.right = (right===undefined ? null : right)\n}\n\nfunction levelOrder(root) {\n    // Your code here\n    return [];\n}\n\nfunction buildTree(nodes) {\n    if (!nodes.length || nodes[0] === null) return null;\n    \n    const root = new TreeNode(nodes[0]);\n    const queue = [root];\n    let i = 1;\n    \n    while (queue.length && i < nodes.length) {\n        const node = queue.shift();\n        \n        if (nodes[i] !== null) {\n            node.left = new TreeNode(nodes[i]);\n            queue.push(node.left);\n        }\n        i++;\n        \n        if (i < nodes.length && nodes[i] !== null) {\n            node.right = new TreeNode(nodes[i]);\n            queue.push(node.right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    try {\n        const nodes = JSON.parse(line);\n        const root = buildTree(nodes);\n        const result = levelOrder(root);\n        console.log(JSON.stringify(result));\n    } catch (e) {\n        console.log('[]');\n    }\n});",

      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\ntypedef struct TreeNode TreeNode;\n\nint** levelOrder(TreeNode* root, int* returnSize, int** returnColumnSizes) {\n    *returnSize = 0;\n    if (!root) return NULL;\n    \n    // Your code here\n    \n    // This is just a placeholder\n    *returnSize = 1;\n    *returnColumnSizes = (int*)malloc(sizeof(int));\n    (*returnColumnSizes)[0] = 1;\n    int** result = (int**)malloc(sizeof(int*));\n    result[0] = (int*)malloc(sizeof(int));\n    result[0][0] = root->val;\n    return result;\n}\n\nTreeNode* createNode(int val) {\n    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));\n    node->val = val;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}\n\nTreeNode* buildTree(char** nodes, int size) {\n    if (size == 0 || strcmp(nodes[0], \"null\") == 0) return NULL;\n    \n    TreeNode* root = createNode(atoi(nodes[0]));\n    TreeNode** queue = (TreeNode**)malloc(size * sizeof(TreeNode*));\n    int front = 0, rear = 0;\n    queue[rear++] = root;\n    \n    int i = 1;\n    while (front < rear && i < size) {\n        TreeNode* current = queue[front++];\n        \n        if (strcmp(nodes[i], \"null\") != 0) {\n            current->left = createNode(atoi(nodes[i]));\n            queue[rear++] = current->left;\n        }\n        i++;\n        \n        if (i < size && strcmp(nodes[i], \"null\") != 0) {\n            current->right = createNode(atoi(nodes[i]));\n            queue[rear++] = current->right;\n        }\n        i++;\n    }\n    \n    free(queue);\n    return root;\n}\n\nvoid freeTree(TreeNode* root) {\n    if (!root) return;\n    freeTree(root->left);\n    freeTree(root->right);\n    free(root);\n}\n\nint main() {\n    char line[10000];\n    while (fgets(line, sizeof(line), stdin)) {\n        // Remove newline character\n        line[strcspn(line, \"\\n\")] = 0;\n        \n        // Remove brackets\n        int len = strlen(line);\n        if (len >= 2) {\n            memmove(line, line + 1, len - 2);\n            line[len - 2] = '\\0';\n        }\n        \n        if (strlen(line) == 0) {\n            printf(\"[]\\n\");\n            continue;\n        }\n        \n        // Split by comma\n        char* nodesArray[1000];\n        int size = 0;\n        char* token = strtok(line, \",\");\n        while (token) {\n            nodesArray[size++] = token;\n            token = strtok(NULL, \",\");\n        }\n        \n        TreeNode* root = buildTree(nodesArray, size);\n        \n        int returnSize;\n        int* returnColumnSizes;\n        int** result = levelOrder(root, &returnSize, &returnColumnSizes);\n        \n        // Print result\n        printf(\"[\");\n        for (int i = 0; i < returnSize; i++) {\n            printf(\"[\");\n            for (int j = 0; j < returnColumnSizes[i]; j++) {\n                printf(\"%d\", result[i][j]);\n                if (j < returnColumnSizes[i] - 1) printf(\",\");\n            }\n            printf(\"]\");\n            if (i < returnSize - 1) printf(\",\");\n        }\n        printf(\"]\\n\");\n        \n        // Free memory\n        for (int i = 0; i < returnSize; i++) {\n            free(result[i]);\n        }\n        free(result);\n        free(returnColumnSizes);\n        freeTree(root);\n    }\n    return 0;\n}",

      "c++": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <sstream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Your code here\n    return {};\n}\n\nTreeNode* buildTree(vector<string>& nodes) {\n    if (nodes.empty() || nodes[0] == \"null\") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    \n    int i = 1;\n    while (!q.empty() && i < nodes.size()) {\n        TreeNode* node = q.front();\n        q.pop();\n        \n        if (nodes[i] != \"null\") {\n            node->left = new TreeNode(stoi(nodes[i]));\n            q.push(node->left);\n        }\n        i++;\n        \n        if (i < nodes.size() && nodes[i] != \"null\") {\n            node->right = new TreeNode(stoi(nodes[i]));\n            q.push(node->right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\nvoid deleteTree(TreeNode* root) {\n    if (!root) return;\n    deleteTree(root->left);\n    deleteTree(root->right);\n    delete root;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        // Remove brackets\n        line = line.substr(1, line.length() - 2);\n        \n        if (line.empty()) {\n            cout << \"[]\" << endl;\n            continue;\n        }\n        \n        // Parse input\n        vector<string> nodes;\n        stringstream ss(line);\n        string token;\n        while (getline(ss, token, ',')) {\n            // Remove leading/trailing whitespace\n            size_t start = token.find_first_not_of(\" \");\n            size_t end = token.find_last_not_of(\" \");\n            if (start != string::npos && end != string::npos) {\n                token = token.substr(start, end - start + 1);\n            } else {\n                token = \"\";\n            }\n            nodes.push_back(token);\n        }\n        \n        TreeNode* root = buildTree(nodes);\n        vector<vector<int>> result = levelOrder(root);\n        \n        // Format output\n        cout << \"[\";\n        for (int i = 0; i < result.size(); i++) {\n            cout << \"[\";\n            for (int j = 0; j < result[i].size(); j++) {\n                cout << result[i][j];\n                if (j < result[i].size() - 1) cout << \",\";\n            }\n            cout << \"]\";\n            if (i < result.size() - 1) cout << \",\";\n        }\n        cout << \"]\" << endl;\n        \n        // Clean up\n        deleteTree(root);\n    }\n    return 0;\n}"
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
            "expected": "[[3],[9,20],[15,7]]",
            "description":"root = [3,9,20,null,null,15,7]"
        },
        {
            "id": 2,
            "input": "[1]",
            "expected": "[[1]]",
            "description":"root = [1]"
        },
        {
            "id": 3,
            "input": "[1,2,3,4,5]",
            "expected": "[[1],[2,3],[4,5]]",
            "description":"root = [1,2,3,4,5] "
        }
    ],
    "hiddenTestCases": [
        {
            "input": "[5,1,4,null,null,3,6]",
            "expected": "[[5],[1,4],[3,6]]",
            "description":"root = [5,1,4,null,null,3,6]"
        },
        {
            "input": "[10,5,15,null,null,6,20]",
            "expected": "[[10],[5,15],[6,20]]",
            "description":"root = [10,5,15,null,null,6,20]"
        },
        {
            "input": "[1,null,2,null,3]",
            "expected": "[[1],[2],[3]]",
            "description":"root = [1,null,2,null,3]"
        },
        {
            "input": "[7,4,9,3,5,8,10]",
            "expected": "[[7],[4,9],[3,5,8,10]]",
            "description":"root = [7,4,9,3,5,8,10]"
        },
        {
            "input": "[1,2,3,4,5,6,7]",
            "expected": "[[1],[2,3],[4,5,6,7]]",
            "description":"root = [1,2,3,4,5,6,7]"
        }
    ]
  },
]
