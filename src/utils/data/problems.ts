// export const problems = [
//   {
//     "_id": "1991-asdf",
//     "title": "Two Sum",
//     "slug": "two-sum",
//     "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//     "difficulty": "easy",
//     "category": "Array",
//     "starterCode": {
//       "python": "def two_sum(nums, target):\n    # Your code here\n    return []\n\nif __name__ == \"__main__\":\n    import sys\n    input_data = sys.stdin.read().strip().split(\"\\n\")\n    for line in input_data:\n        nums_str, target_str = line.split(\";\")\n        nums = list(map(int, nums_str.strip(\"[]\").split(\",\")))\n        target = int(target_str)\n        result = two_sum(nums, target)\n        print(str(result).replace(\" \", \"\"))",

//       "java": "import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine();\n            String[] parts = line.split(\";\");\n            String[] numsStr = parts[0].replaceAll(\"\\\\[|\\\\]\", \"\").split(\",\");\n            int[] nums = new int[numsStr.length];\n            for (int i = 0; i < numsStr.length; i++) {\n                nums[i] = Integer.parseInt(numsStr[i].trim());\n            }\n            int target = Integer.parseInt(parts[1].trim());\n            int[] result = twoSum(nums, target);\n            System.out.println(Arrays.toString(result));\n        }\n        scanner.close();\n    }",

//       "javascript": "function twoSum(nums, target) {\n    // Your code here\n    return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const [numsStr, targetStr] = line.split(';');\n    const nums = JSON.parse(numsStr);\n    const target = parseInt(targetStr);\n    const result = twoSum(nums, target);\n    console.log(JSON.stringify(result));\n});",

//       "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    int* result = (int*)malloc(2 * sizeof(int));\n    // Your code here\n    return result;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        char* numsPart = strtok(line, \";\");\n        char* targetPart = strtok(NULL, \";\");\n        int target = atoi(targetPart);\n        numsPart++;\n        numsPart[strlen(numsPart)-1] = '\\0';\n        int nums[1000], numsSize = 0;\n        char* token = strtok(numsPart, \",\");\n        while (token) {\n            nums[numsSize++] = atoi(token);\n            token = strtok(NULL, \",\");\n        }\n        int returnSize;\n        int* result = twoSum(nums, numsSize, target, &returnSize);\n        printf(\"[%d,%d]\\n\", result[0], result[1]);\n        free(result);\n    }\n    return 0;\n}",

//       "c++": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        size_t split = line.find(';');\n        string numsStr = line.substr(0, split);\n        int target = stoi(line.substr(split + 1));\n        numsStr = numsStr.substr(1, numsStr.size() - 2);\n        stringstream ss(numsStr);\n        vector<int> nums;\n        string num;\n        while (getline(ss, num, ',')) {\n            nums.push_back(stoi(num));\n        }\n        vector<int> result = twoSum(nums, target);\n        cout << \"[\" << result[0] << \",\" << result[1] << \"]\" << endl;\n    }\n    return 0;\n}"
//     },
//     "constraints": [
//       "2 ≤ nums.length ≤ 10^4",
//       "-10^9 ≤ nums[i] ≤ 10^9",
//       "-10^9 ≤ target ≤ 10^9",
//       "Only one valid answer exists."
//     ],
//     "examples": [
//       {
//         "id": 1,
//         "inputText": "nums = [2,7,11,15], target = 9",
//         "outputText": "[0,1]",
//         "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
//       },
//       {
//         "id": 2,
//         "inputText": "nums = [3,2,4], target = 6",
//         "outputText": "[1,2]",
//         "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
//       }
//     ],
//     "testCases": [
//       {
//         "id": 1,
//         "input": "[2,7,11,15];9",
//         "expected": "[0,1]",
//         "description": "nums=[2,7,11,15], target=9"
//       },
//       {
//         "id": 2,
//         "input": "[3,2,4];6",
//         "expected": "[1,2]",
//         "description": "nums=[3,2,4], target=6"
//       },
//       {
//         "id": 3,
//         "input": "[5,3,5,8];10",
//         "expected": "[0,2]",
//         "description": "nums=[5,3,5,8], target=10"
//       }
//     ],
//     "hiddenTestCases": [
//       { "input": "[1,5,3,7,9];12", "expected": "[2,3]", "description": "nums=[1,5,3,7,9], target=12" },
//       { "input": "[4,3,2,1];5", "expected": "[1,2]", "description": "nums=[4,3,2,1], target=5" },
//       { "input": "[10,20,30,40];50", "expected": "[1,2]", "description": "nums=[10,20,30,40], target=50" },
//       { "input": "[8,15,7,1];16", "expected": "[0,2]", "description": "nums=[8,15,7,1], target=16" },
//       { "input": "[6,6];12", "expected": "[0,1]", "description": "nums=[6,6], target=12" }
//     ]
//   },
//   {
//     "_id": "1992-qwer",
//     "title": "Valid Parentheses",
//     "slug": "valid-parentheses",
//     "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
//     "difficulty": "easy",
//     "category": "String",
//     "starterCode": {
//       "python": "def is_valid(s):\n    # Your code here\n    return False\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip().strip(\"'\\\"\")\n        print(str(is_valid(line)).lower())",

//       "java": "import java.util.*;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim().replaceAll(\"^['\\\"]|['\\\"]$\", \"\");\n            System.out.println(isValid(line) ? \"true\" : \"false\");\n        }\n        scanner.close();\n    }",

//       "javascript": "function isValid(s) {\n    // Your code here\n    return false;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const cleanLine = line.trim().replace(/^['\"]|['\"]$/g, '');\n    console.log(isValid(cleanLine) ? 'true' : 'false');\n});",

//       "c": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nbool isValid(char* s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        if (line[0] == '\\'' || line[0] == '\"') {\n            memmove(line, line + 1, strlen(line));\n            line[strlen(line) - 1] = '\\0';\n        }\n        printf(isValid(line) ? \"true\\n\" : \"false\\n\");\n    }\n    return 0;\n}",

//       "c++": "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Your code here\n    return false;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        if (!line.empty() && (line.front() == '\"' || line.front() == '\\'')) {\n            line = line.substr(1, line.size() - 2);\n        }\n        cout << (isValid(line) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}"
//     },
//     "examples": [
//       {
//         "id": 1,
//         "inputText": "s = '()'",
//         "outputText": "True",
//         "explanation": "Valid as () is a correct sequence."
//       },
//       {
//         "id": 2,
//         "inputText": "s = '()[]{}'",
//         "outputText": "True",
//         "explanation": "Valid as ()[]{}, all pairs are matched."
//       }
//     ],
//     "constraints": [
//       "1 <= s.length <= 10^4",
//       "s consists only of '(', ')', '{', '}', '[', and ']'",
//       "Each opening bracket must have a corresponding closing bracket in the correct order"
//     ],
//     "testCases": [
//       { "id": 1, "input": "'()'", "expected": "True", "description": "s='()'" },
//       { "id": 2, "input": "'()[]{}'", "expected": "True", "description": "s='()[]{}'" },
//       { "id": 3, "input": "'(]'", "expected": "False", "description": "s='(]'" }
//     ],
//     "hiddenTestCases": [
//       { "input": "'[{()}]'", "expected": "True", "description": "s='[{()}]'" },
//       { "input": "'{[)]}'", "expected": "False", "description": "s='{[)]}'" },
//       { "input": "'()()()()'", "expected": "True", "description": "s='()()()()'" },
//       { "input": "'([)]'", "expected": "False", "description": "s='([)]'" },
//       { "input": "'((()))'", "expected": "True", "description": "s='((()))'" }
//     ]
//   },
//   {
//     "_id": "1994-zxcv",
//     "title": "Maximum Subarray",
//     "slug": "maximum-subarray",
//     "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
//     "difficulty": "medium",
//     "category": "Array",
//     "starterCode": {
//       "python": "def max_subarray(nums):\n    # Your code here\n    return 0\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip()\n        nums = list(map(int, line.strip(\"[]\").split(\",\")))\n        print(max_subarray(nums))",

//       "java": "import java.util.*;\n\npublic class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim().replaceAll(\"\\\\[|\\\\]\", \"\");\n            String[] tokens = line.split(\",\");\n            int[] nums = new int[tokens.length];\n            for (int i = 0; i < tokens.length; i++) {\n                nums[i] = Integer.parseInt(tokens[i].trim());\n            }\n            System.out.println(maxSubArray(nums));\n        }\n        scanner.close();\n    }",

//       "javascript": "function maxSubArray(nums) {\n    // Your code here\n    return 0;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    const nums = JSON.parse(line);\n    console.log(maxSubArray(nums));\n});",

//       "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    char line[1000];\n    while (fgets(line, sizeof(line), stdin)) {\n        line[strcspn(line, \"\\n\")] = 0;\n        line++;\n        line[strlen(line)-1] = '\\0';\n        int nums[1000], numsSize = 0;\n        char* token = strtok(line, \",\");\n        while (token) {\n            nums[numsSize++] = atoi(token);\n            token = strtok(NULL, \",\");\n        }\n        printf(\"%d\\n\", maxSubArray(nums, numsSize));\n    }\n    return 0;\n}",

//       "c++": "#include <iostream>\n#include <vector>\n#include <sstream>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        line = line.substr(1, line.size() - 2);\n        stringstream ss(line);\n        vector<int> nums;\n        string num;\n        while (getline(ss, num, ',')) {\n            nums.push_back(stoi(num));\n        }\n        cout << maxSubArray(nums) << endl;\n    }\n    return 0;\n}"
//     },
//     "examples": [
//         {
//             "id": 1,
//             "inputText": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
//             "outputText": "6",
//             "explanation": "The subarray [4,-1,2,1] has the largest sum."
//         },
//         {
//             "id": 2,
//             "inputText": "nums = [1]",
//             "outputText": "1",
//             "explanation": "The subarray [1] has the largest sum."
//         }
//     ],
//     "constraints": [
//         "1 <= nums.length <= 100000",
//         "-10000 <= nums[i] <= 10000"
//     ],
//     "testCases": [
//         { "id": 1, "input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected": "6", "description": "nums=[-2,1,-3,4,-1,2,1,-5,4]" },
//         { "id": 2, "input": "[1]", "expected": "1", "description": "nums=[1]" },
//         { "id": 3, "input": "[5,4,-1,7,8]", "expected": "23", "description": "nums=[5,4,-1,7,8]"}
//     ],
//     "hiddenTestCases": [
//         { "input": "[3,-1,2,-1,2,-3,3]", "expected": "6","description":"nums = [3,-1,2,-1,2,-3,3]" },
//         { "input": "[-1,-2,-3,-4]", "expected": "-1","description":"nums = [-1,-2,-3,-4]" },
//         { "input": "[10,20,30,40,-100,50,60]", "expected": "110","description":"nums = [10,20,30,40,-100,50,60]" },
//         { "input": "[0,0,0,0]", "expected": "0","description":"nums = [0,0,0,0]" },
//         { "input": "[8,-19,5,-4,20]", "expected": "21" ,"description":"nums = [8,-19,5,-4,20]"}
//     ]
//   },
//   {
//     "_id": "1995-mnbv",
//     "title": "Binary Tree Level Order Traversal",
//     "slug": "binary-tree-level-order-traversal",
//     "description": "Given the root of a binary tree, return the level order traversal of its nodes' values.",
//     "difficulty": "medium",
//     "category": "Tree",
//         "starterCode": {
//       "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef level_order_traversal(root):\n    # Your code here\n    return []\n\ndef build_tree(nodes):\n    if not nodes:\n        return None\n    root = TreeNode(int(nodes[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(nodes):\n        node = queue.pop(0)\n        if nodes[i] != 'null':\n            node.left = TreeNode(int(nodes[i]))\n            queue.append(node.left)\n        i += 1\n        if i < len(nodes) and nodes[i] != 'null':\n            node.right = TreeNode(int(nodes[i]))\n            queue.append(node.right)\n        i += 1\n    return root\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        line = line.strip().strip(\"[]\")\n        if not line:\n            print(\"[]\")\n            continue\n        nodes = [x.strip() for x in line.split(\",\")]\n        root = build_tree(nodes)\n        result = level_order_traversal(root)\n        print(str(result).replace(\" \", \"\").replace(\"'\", \"\"))",

//       "java": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class Solution {\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n    \n    public static TreeNode buildTree(String[] nodes) {\n        if (nodes.length == 0 || nodes[0].equals(\"null\")) return null;\n        \n        TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        \n        int i = 1;\n        while (!queue.isEmpty() && i < nodes.length) {\n            TreeNode current = queue.poll();\n            \n            if (!nodes[i].equals(\"null\")) {\n                current.left = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.add(current.left);\n            }\n            i++;\n            \n            if (i < nodes.length && !nodes[i].equals(\"null\")) {\n                current.right = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.add(current.right);\n            }\n            i++;\n        }\n        \n        return root;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim();\n            line = line.substring(1, line.length() - 1); // Remove [ and ]\n            \n            if (line.isEmpty()) {\n                System.out.println(\"[]\");\n                continue;\n            }\n            \n            String[] nodes = line.split(\",\");\n            for (int i = 0; i < nodes.length; i++) {\n                nodes[i] = nodes[i].trim();\n            }\n            \n            TreeNode root = buildTree(nodes);\n            List<List<Integer>> result = levelOrder(root);\n            \n            // Format the output\n            StringBuilder sb = new StringBuilder();\n            sb.append(\"[\");\n            for (int i = 0; i < result.size(); i++) {\n                sb.append(\"[\");\n                for (int j = 0; j < result.get(i).size(); j++) {\n                    sb.append(result.get(i).get(j));\n                    if (j < result.get(i).size() - 1) sb.append(\",\");\n                }\n                sb.append(\"]\");\n                if (i < result.size() - 1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            System.out.println(sb.toString());\n        }\n        scanner.close();\n    }",

//       "javascript": "function TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val)\n    this.left = (left===undefined ? null : left)\n    this.right = (right===undefined ? null : right)\n}\n\nfunction levelOrder(root) {\n    // Your code here\n    return [];\n}\n\nfunction buildTree(nodes) {\n    if (!nodes.length || nodes[0] === null) return null;\n    \n    const root = new TreeNode(nodes[0]);\n    const queue = [root];\n    let i = 1;\n    \n    while (queue.length && i < nodes.length) {\n        const node = queue.shift();\n        \n        if (nodes[i] !== null) {\n            node.left = new TreeNode(nodes[i]);\n            queue.push(node.left);\n        }\n        i++;\n        \n        if (i < nodes.length && nodes[i] !== null) {\n            node.right = new TreeNode(nodes[i]);\n            queue.push(node.right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n});\n\nrl.on('line', (line) => {\n    try {\n        const nodes = JSON.parse(line);\n        const root = buildTree(nodes);\n        const result = levelOrder(root);\n        console.log(JSON.stringify(result));\n    } catch (e) {\n        console.log('[]');\n    }\n});",

//       "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\ntypedef struct TreeNode TreeNode;\n\nint** levelOrder(TreeNode* root, int* returnSize, int** returnColumnSizes) {\n    *returnSize = 0;\n    if (!root) return NULL;\n    \n    // Your code here\n    \n    // This is just a placeholder\n    *returnSize = 1;\n    *returnColumnSizes = (int*)malloc(sizeof(int));\n    (*returnColumnSizes)[0] = 1;\n    int** result = (int**)malloc(sizeof(int*));\n    result[0] = (int*)malloc(sizeof(int));\n    result[0][0] = root->val;\n    return result;\n}\n\nTreeNode* createNode(int val) {\n    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));\n    node->val = val;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}\n\nTreeNode* buildTree(char** nodes, int size) {\n    if (size == 0 || strcmp(nodes[0], \"null\") == 0) return NULL;\n    \n    TreeNode* root = createNode(atoi(nodes[0]));\n    TreeNode** queue = (TreeNode**)malloc(size * sizeof(TreeNode*));\n    int front = 0, rear = 0;\n    queue[rear++] = root;\n    \n    int i = 1;\n    while (front < rear && i < size) {\n        TreeNode* current = queue[front++];\n        \n        if (strcmp(nodes[i], \"null\") != 0) {\n            current->left = createNode(atoi(nodes[i]));\n            queue[rear++] = current->left;\n        }\n        i++;\n        \n        if (i < size && strcmp(nodes[i], \"null\") != 0) {\n            current->right = createNode(atoi(nodes[i]));\n            queue[rear++] = current->right;\n        }\n        i++;\n    }\n    \n    free(queue);\n    return root;\n}\n\nvoid freeTree(TreeNode* root) {\n    if (!root) return;\n    freeTree(root->left);\n    freeTree(root->right);\n    free(root);\n}\n\nint main() {\n    char line[10000];\n    while (fgets(line, sizeof(line), stdin)) {\n        // Remove newline character\n        line[strcspn(line, \"\\n\")] = 0;\n        \n        // Remove brackets\n        int len = strlen(line);\n        if (len >= 2) {\n            memmove(line, line + 1, len - 2);\n            line[len - 2] = '\\0';\n        }\n        \n        if (strlen(line) == 0) {\n            printf(\"[]\\n\");\n            continue;\n        }\n        \n        // Split by comma\n        char* nodesArray[1000];\n        int size = 0;\n        char* token = strtok(line, \",\");\n        while (token) {\n            nodesArray[size++] = token;\n            token = strtok(NULL, \",\");\n        }\n        \n        TreeNode* root = buildTree(nodesArray, size);\n        \n        int returnSize;\n        int* returnColumnSizes;\n        int** result = levelOrder(root, &returnSize, &returnColumnSizes);\n        \n        // Print result\n        printf(\"[\");\n        for (int i = 0; i < returnSize; i++) {\n            printf(\"[\");\n            for (int j = 0; j < returnColumnSizes[i]; j++) {\n                printf(\"%d\", result[i][j]);\n                if (j < returnColumnSizes[i] - 1) printf(\",\");\n            }\n            printf(\"]\");\n            if (i < returnSize - 1) printf(\",\");\n        }\n        printf(\"]\\n\");\n        \n        // Free memory\n        for (int i = 0; i < returnSize; i++) {\n            free(result[i]);\n        }\n        free(result);\n        free(returnColumnSizes);\n        freeTree(root);\n    }\n    return 0;\n}",

//       "c++": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <sstream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Your code here\n    return {};\n}\n\nTreeNode* buildTree(vector<string>& nodes) {\n    if (nodes.empty() || nodes[0] == \"null\") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    \n    int i = 1;\n    while (!q.empty() && i < nodes.size()) {\n        TreeNode* node = q.front();\n        q.pop();\n        \n        if (nodes[i] != \"null\") {\n            node->left = new TreeNode(stoi(nodes[i]));\n            q.push(node->left);\n        }\n        i++;\n        \n        if (i < nodes.size() && nodes[i] != \"null\") {\n            node->right = new TreeNode(stoi(nodes[i]));\n            q.push(node->right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\nvoid deleteTree(TreeNode* root) {\n    if (!root) return;\n    deleteTree(root->left);\n    deleteTree(root->right);\n    delete root;\n}\n\nint main() {\n    string line;\n    while (getline(cin, line)) {\n        // Remove brackets\n        line = line.substr(1, line.length() - 2);\n        \n        if (line.empty()) {\n            cout << \"[]\" << endl;\n            continue;\n        }\n        \n        // Parse input\n        vector<string> nodes;\n        stringstream ss(line);\n        string token;\n        while (getline(ss, token, ',')) {\n            // Remove leading/trailing whitespace\n            size_t start = token.find_first_not_of(\" \");\n            size_t end = token.find_last_not_of(\" \");\n            if (start != string::npos && end != string::npos) {\n                token = token.substr(start, end - start + 1);\n            } else {\n                token = \"\";\n            }\n            nodes.push_back(token);\n        }\n        \n        TreeNode* root = buildTree(nodes);\n        vector<vector<int>> result = levelOrder(root);\n        \n        // Format output\n        cout << \"[\";\n        for (int i = 0; i < result.size(); i++) {\n            cout << \"[\";\n            for (int j = 0; j < result[i].size(); j++) {\n                cout << result[i][j];\n                if (j < result[i].size() - 1) cout << \",\";\n            }\n            cout << \"]\";\n            if (i < result.size() - 1) cout << \",\";\n        }\n        cout << \"]\" << endl;\n        \n        // Clean up\n        deleteTree(root);\n    }\n    return 0;\n}"
//     },
//     "examples": [
//         {
//             "id": 1,
//             "inputText": "root = [3,9,20,null,null,15,7]",
//             "outputText": "[[3],[9,20],[15,7]]",
//             "explanation": "Nodes are visited level-wise."
//         },
//         {
//             "id": 2,
//             "inputText": "root = [1]",
//             "outputText": "[[1]]",
//             "explanation": "Only one node exists at the root level."
//         }
//     ],
//     "constraints": [
//         "0 <= number of nodes <= 2000",
//         "-1000 <= Node.val <= 1000"
//     ],
//     "testCases": [
//         {
//             "id": 1,
//             "input": "[3,9,20,null,null,15,7]",
//             "expected": "[[3],[9,20],[15,7]]",
//             "description":"root = [3,9,20,null,null,15,7]"
//         },
//         {
//             "id": 2,
//             "input": "[1]",
//             "expected": "[[1]]",
//             "description":"root = [1]"
//         },
//         {
//             "id": 3,
//             "input": "[1,2,3,4,5]",
//             "expected": "[[1],[2,3],[4,5]]",
//             "description":"root = [1,2,3,4,5] "
//         }
//     ],
//     "hiddenTestCases": [
//         {
//             "input": "[5,1,4,null,null,3,6]",
//             "expected": "[[5],[1,4],[3,6]]",
//             "description":"root = [5,1,4,null,null,3,6]"
//         },
//         {
//             "input": "[10,5,15,null,null,6,20]",
//             "expected": "[[10],[5,15],[6,20]]",
//             "description":"root = [10,5,15,null,null,6,20]"
//         },
//         {
//             "input": "[1,null,2,null,3]",
//             "expected": "[[1],[2],[3]]",
//             "description":"root = [1,null,2,null,3]"
//         },
//         {
//             "input": "[7,4,9,3,5,8,10]",
//             "expected": "[[7],[4,9],[3,5,8,10]]",
//             "description":"root = [7,4,9,3,5,8,10]"
//         },
//         {
//             "input": "[1,2,3,4,5,6,7]",
//             "expected": "[[1],[2,3],[4,5,6,7]]",
//             "description":"root = [1,2,3,4,5,6,7]"
//         }
//     ]
//   },
// ]

export const problems = [
  {
    "_id": "1995-smd",
    "title": "The Secret Message Decoder",
    "slug": "secret-message-decoder",
    "description": "Given a compressed string s consisting of lowercase letters, digits, and square brackets [], decode it and return the original message.",
    "difficulty": "medium",
    "category": "String",
    "starterCode": {
      "python": "def decodeMessage(s):\n    \"\"\"\n    Decode a compressed string consisting of lowercase letters, digits, and square brackets.\n    \n    Args:\n        s: A compressed string with lowercase letters, digits, and square brackets.\n        \n    Returns:\n        The decoded original message.\n    \"\"\"\n    # Your code here\n    return \"\"\n\nif __name__ == \"__main__\":\n    import sys\n    for line in sys.stdin:\n        print(decodeMessage(line.strip()))",
      "java": "import java.util.*;\n\npublic class Solution {\n    /**\n     * Decode a compressed string consisting of lowercase letters, digits, and square brackets.\n     * \n     * @param s A compressed string with lowercase letters, digits, and square brackets\n     * @return The decoded original message\n     */\n    public static String decodeMessage(String s) {\n        // Your code here\n        return \"\";\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine();\n            System.out.println(decodeMessage(line));\n        }\n        scanner.close();\n    }\n}",
      "javascript": "/**\n * Decode a compressed string consisting of lowercase letters, digits, and square brackets.\n * \n * @param {string} s - A compressed string with lowercase letters, digits, and square brackets\n * @return {string} - The decoded original message\n */\nfunction decodeMessage(s) {\n    // Your code here\n    return \"\";\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nrl.on('line', (line) => {\n    console.log(decodeMessage(line.trim()));\n});",
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n/**\n * Decode a compressed string consisting of lowercase letters, digits, and square brackets.\n * \n * @param s A compressed string with lowercase letters, digits, and square brackets\n * @param result Pre-allocated buffer to store the decoded message\n * @return The length of the decoded message\n */\nint decodeMessage(const char* s, char* result) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    char line[1024];\n    char result[10000]; // Assume decoded message won't exceed this length\n    \n    while (fgets(line, sizeof(line), stdin)) {\n        // Remove trailing newline if present\n        size_t len = strlen(line);\n        if (len > 0 && line[len-1] == '\\n') {\n            line[len-1] = '\\0';\n        }\n        \n        decodeMessage(line, result);\n        printf(\"%s\\n\", result);\n    }\n    \n    return 0;\n}",
      "c++": "#include <iostream>\n#include <string>\n\n/**\n * Decode a compressed string consisting of lowercase letters, digits, and square brackets.\n * \n * @param s A compressed string with lowercase letters, digits, and square brackets\n * @return The decoded original message\n */\nstd::string decodeMessage(const std::string& s) {\n    // Your code here\n    return \"\";\n}\n\nint main() {\n    std::string line;\n    \n    while (std::getline(std::cin, line)) {\n        std::cout << decodeMessage(line) << std::endl;\n    }\n    \n    return 0;\n}"
    },
    "constraints": [
      "1 ≤ s.length ≤ 1000",
      "s consists of lowercase letters, digits, and square brackets [].",
      "The input is always valid, and all brackets are properly nested."
    ],
    "examples": [
      {
        "id": 1,
        "inputText": "\"a3[b2c1]\"",
        "outputText": "\"abbcabbcabbc\"",
        "explanation": "The substring b2c1 decodes to bbc. The outer pattern a3[bbc] decodes to abbcabbcabbc."
      },
      {
        "id": 2,
        "inputText": "\"2[a3[b]2[c]]\"",
        "outputText": "\"abbbccabbbcc\"",
        "explanation": "The substring b decodes to b. The substring a3[b]2[c] decodes to abbbcc. The outer pattern 2[abbbcc] decodes to abbbccabbbcc."
      },
      {
        "id": 3,
        "inputText": "\"3[a]2[bc]\"",
        "outputText": "\"aaabcbc\"",
        "explanation": "The substring a decodes to a. The substring bc decodes to bc. The outer pattern 3[a]2[bc] decodes to aaabcbc."
      }
    ],
    "testCases": [
      { "id": 1, "input": "\"a2[b]\"", "expected": "\"abb\"", "description": "s=\"a2[b]\"" },
      { "id": 2, "input": "\"x3[y]\"", "expected": "\"xyyy\"", "description": "s=\"x3[y]\"" },
      { "id": 3, "input": "\"3[a2[b]]\"", "expected": "\"abbabbabb\"", "description": "s=\"3[a2[b]]\"" },
    {  "id": 4,
      "input": "\"4[a]3[b2[c]]\"\n",
      "expected": "\"aaaabccbccbcc\"\n",
        "description": "s=\"4[a]3[b2[c]]\"" }
    ],
    "hiddenTestCases": [
      { "input": "\"4[a]3[b2[c]]\"", "expected": "\"aaaabccbccbcc\"", "description": "Nested patterns with different counts." },
      { "input": "\"6[a2[b]]\"", "expected": "\"abbabbabbabbabbabb\"", "description": "Deep nested pattern repetition." },
      { "input": "\"5[x3[y2[z]]]\"", "expected": "\"xyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzzxyzz\"", "description": "Highly nested with varying multipliers." },
      { "input": "\"2[a3[b2[c]]]\"", "expected": "\"abccbccbccabccbccbcc\"", "description": "Complex nested decoding with multiple levels." },
      { "input": "\"3[a2[b3[c4[d]]]]\"", "expected": "\"abccddddccddddccddddabccddddccddddccddddabccddddccddddccdddd\"", "description": "Extremely deep nested pattern with different repetitions." },
      { "input": "\"4[w2[x3[y]]]\"", "expected": "\"wxyyyxyyywxyyyxyyywxyyyxyyywxyyyxyyy\"", "description": "Multiple levels of repetition." }
    ]
  },
  {
    "_id": "1995-cnsc",
    "title": "Count Nodes with Single Child",
    "slug": "count-nodes-single-child",
    "description": "Given a binary tree, count the number of nodes that have exactly one child.",
    "difficulty": "medium",
    "category": "Tree",
    "constraints": [
      "1 ≤ Number of nodes ≤ 10^5",
      "Tree nodes contain unique integer values.",
      "Each node has at most two children."
    ],
    "examples": [
      {
        "id": 1,
        "inputText": "Tree: [10,5,15,null,7,null,20]",
        "outputText": "2",
        "explanation": "Nodes 5 and 15 have exactly one child."
      },
      {
        "id": 2,
        "inputText": "Tree: [8,3,null,1,6]",
        "outputText": "1",
        "explanation": "Node 8 has exactly one child."
      }
    ],

    "starterCode": {
      "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef count_single_child_nodes(root):\n    \"\"\"\n    Count the number of nodes in a binary tree that have exactly one child.\n    \n    Args:\n        root: The root node of the binary tree.\n        \n    Returns:\n        An integer representing the count of nodes with exactly one child.\n    \"\"\"\n    if root is None:\n        return 0\n    \n    count = 0\n    \n    # Check if current node has exactly one child\n    if (root.left is None and root.right is not None) or (root.left is not None and root.right is None):\n        count += 1\n    \n    # Recursively count nodes with one child in left and right subtrees\n    count += count_single_child_nodes(root.left)\n    count += count_single_child_nodes(root.right)\n    \n    return count\n\ndef build_tree(nodes, index=0):\n    \"\"\"Helper function to build tree from level-order traversal array\"\"\"\n    if index >= len(nodes) or nodes[index] is None:\n        return None\n    \n    root = TreeNode(nodes[index])\n    root.left = build_tree(nodes, 2 * index + 1)\n    root.right = build_tree(nodes, 2 * index + 2)\n    \n    return root\n\nif __name__ == \"__main__\":\n    import sys\n    import json\n    \n    for line in sys.stdin:\n        line = line.strip()\n        # Parse input array, handling null values\n        if line.startswith('[') and line.endswith(']'):\n            nodes_str = line[1:-1].split(',')\n            nodes = []\n            for node_str in nodes_str:\n                node_str = node_str.strip()\n                if node_str == \"null\":\n                    nodes.append(None)\n                else:\n                    nodes.append(int(node_str))\n            \n            root = build_tree(nodes)\n            result = count_single_child_nodes(root)\n            print(result)",

      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n// Definition for a binary tree node\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\n/**\n * Count the number of nodes in a binary tree that have exactly one child.\n * \n * @param root The root node of the binary tree\n * @return An integer representing the count of nodes with exactly one child\n */\nint count_single_child_nodes(struct TreeNode* root) {\n    if (root == NULL) {\n        return 0;\n    }\n    \n    int count = 0;\n    \n    // Check if current node has exactly one child\n    if ((root->left == NULL && root->right != NULL) || \n        (root->left != NULL && root->right == NULL)) {\n        count++;\n    }\n    \n    // Recursively count in left and right subtrees\n    count += count_single_child_nodes(root->left);\n    count += count_single_child_nodes(root->right);\n    \n    return count;\n}\n\n// Helper function to create a new tree node\nstruct TreeNode* create_node(int val) {\n    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));\n    node->val = val;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}\n\n// Helper function to build tree from level-order traversal array\nstruct TreeNode* build_tree(int* nodes, int size, int index, int* null_map) {\n    if (index >= size || null_map[index]) {\n        return NULL;\n    }\n    \n    struct TreeNode* root = create_node(nodes[index]);\n    root->left = build_tree(nodes, size, 2 * index + 1, null_map);\n    root->right = build_tree(nodes, size, 2 * index + 2, null_map);\n    \n    return root;\n}\n\n// Helper function to free the memory used by the tree\nvoid free_tree(struct TreeNode* root) {\n    if (root == NULL) {\n        return;\n    }\n    free_tree(root->left);\n    free_tree(root->right);\n    free(root);\n}\n\n// Parse the input array and set up null_map\nvoid parse_input(char* input, int** nodes, int** null_map, int* size) {\n    // Count number of elements\n    int count = 0;\n    char* temp_input = strdup(input);\n    char* token = strtok(temp_input, \"[,]\");\n    while (token != NULL) {\n        count++;\n        token = strtok(NULL, \"[,]\");\n    }\n    free(temp_input);\n    \n    // Allocate memory\n    *size = count;\n    *nodes = (int*)malloc(count * sizeof(int));\n    *null_map = (int*)malloc(count * sizeof(int));\n    \n    // Parse values\n    temp_input = strdup(input);\n    token = strtok(temp_input, \"[,]\");\n    int i = 0;\n    while (token != NULL && i < count) {\n        // Trim whitespace\n        while (*token == ' ') token++;\n        char* end = token + strlen(token) - 1;\n        while (end > token && *end == ' ') end--;\n        *(end + 1) = '\\0';\n        \n        if (strcmp(token, \"null\") == 0) {\n            (*null_map)[i] = 1;\n        } else {\n            (*nodes)[i] = atoi(token);\n            (*null_map)[i] = 0;\n        }\n        \n        i++;\n        token = strtok(NULL, \"[,]\");\n    }\n    free(temp_input);\n}\n\nint main() {\n    char input[1024];\n    \n    while (fgets(input, sizeof(input), stdin) != NULL) {\n        // Remove newline\n        input[strcspn(input, \"\\n\")] = '\\0';\n        \n        if (input[0] == '[' && input[strlen(input) - 1] == ']') {\n            int* nodes;\n            int* null_map;\n            int size;\n            \n            parse_input(input, &nodes, &null_map, &size);\n            struct TreeNode* root = build_tree(nodes, size, 0, null_map);\n            \n            int result = count_single_child_nodes(root);\n            printf(\"%d\\n\", result);\n            \n            // Clean up\n            free_tree(root);\n            free(nodes);\n            free(null_map);\n        }\n    }\n    \n    return 0;\n}",

      "java": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class Solution {\n    /**\n     * Count the number of nodes in a binary tree that have exactly one child.\n     * \n     * @param root The root node of the binary tree\n     * @return An integer representing the count of nodes with exactly one child\n     */\n    public static int countSingleChildNodes(TreeNode root) {\n        if (root == null) {\n            return 0;\n        }\n        \n        int count = 0;\n        \n        // Check if current node has exactly one child\n        if ((root.left == null && root.right != null) || (root.left != null && root.right == null)) {\n            count++;\n        }\n        \n        // Recursively count in left and right subtrees\n        count += countSingleChildNodes(root.left);\n        count += countSingleChildNodes(root.right);\n        \n        return count;\n    }\n    \n    // Helper function to build tree from level-order traversal array\n    private static TreeNode buildTree(Integer[] nodes) {\n        if (nodes == null || nodes.length == 0 || nodes[0] == null) {\n            return null;\n        }\n        \n        TreeNode root = new TreeNode(nodes[0]);\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.offer(root);\n        \n        for (int i = 1; i < nodes.length; i++) {\n            TreeNode current = queue.poll();\n            \n            if (i < nodes.length && nodes[i] != null) {\n                current.left = new TreeNode(nodes[i]);\n                queue.offer(current.left);\n            }\n            \n            i++;\n            \n            if (i < nodes.length && nodes[i] != null) {\n                current.right = new TreeNode(nodes[i]);\n                queue.offer(current.right);\n            }\n        }\n        \n        return root;\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine().trim();\n            \n            // Parse input array\n            if (line.startsWith(\"[\") && line.endsWith(\"]\")) {\n                String[] nodeStrs = line.substring(1, line.length() - 1).split(\",\");\n                Integer[] nodes = new Integer[nodeStrs.length];\n                \n                for (int i = 0; i < nodeStrs.length; i++) {\n                    String nodeStr = nodeStrs[i].trim();\n                    if (nodeStr.equals(\"null\")) {\n                        nodes[i] = null;\n                    } else {\n                        nodes[i] = Integer.parseInt(nodeStr);\n                    }\n                }\n                \n                TreeNode root = buildTree(nodes);\n                int result = countSingleChildNodes(root);\n                System.out.println(result);\n            }\n        }\n        scanner.close();\n    }\n}",

      "c++": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <string>\n#include <sstream>\n\n// Definition for a binary tree node\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\n/**\n * Count the number of nodes in a binary tree that have exactly one child.\n * \n * @param root The root node of the binary tree\n * @return An integer representing the count of nodes with exactly one child\n */\nint countSingleChildNodes(TreeNode* root) {\n    if (root == nullptr) {\n        return 0;\n    }\n    \n    int count = 0;\n    \n    // Check if current node has exactly one child\n    if ((root->left == nullptr && root->right != nullptr) || \n        (root->left != nullptr && root->right == nullptr)) {\n        count++;\n    }\n    \n    // Recursively count in left and right subtrees\n    count += countSingleChildNodes(root->left);\n    count += countSingleChildNodes(root->right);\n    \n    return count;\n}\n\n// Helper function to build tree from level-order traversal array\nTreeNode* buildTree(const std::vector<std::string>& nodes) {\n    if (nodes.empty() || nodes[0] == \"null\") {\n        return nullptr;\n    }\n    \n    TreeNode* root = new TreeNode(std::stoi(nodes[0]));\n    std::queue<TreeNode*> q;\n    q.push(root);\n    \n    int i = 1;\n    while (!q.empty() && i < nodes.size()) {\n        TreeNode* current = q.front();\n        q.pop();\n        \n        // Left child\n        if (i < nodes.size()) {\n            if (nodes[i] != \"null\") {\n                current->left = new TreeNode(std::stoi(nodes[i]));\n                q.push(current->left);\n            }\n            i++;\n        }\n        \n        // Right child\n        if (i < nodes.size()) {\n            if (nodes[i] != \"null\") {\n                current->right = new TreeNode(std::stoi(nodes[i]));\n                q.push(current->right);\n            }\n            i++;\n        }\n    }\n    \n    return root;\n}\n\n// Helper function to free memory\nvoid freeTree(TreeNode* root) {\n    if (root == nullptr) return;\n    freeTree(root->left);\n    freeTree(root->right);\n    delete root;\n}\n\n// Helper function to parse input\nstd::vector<std::string> parseInput(const std::string& input) {\n    std::vector<std::string> result;\n    // Remove brackets\n    std::string content = input.substr(1, input.length() - 2);\n    \n    std::stringstream ss(content);\n    std::string item;\n    \n    while (getline(ss, item, ',')) {\n        // Trim whitespace\n        size_t start = item.find_first_not_of(\" \\t\");\n        size_t end = item.find_last_not_of(\" \\t\");\n        if (start != std::string::npos && end != std::string::npos) {\n            item = item.substr(start, end - start + 1);\n        } else {\n            item = \"\";\n        }\n        \n        result.push_back(item);\n    }\n    \n    return result;\n}\n\nint main() {\n    std::string line;\n    \n    while (std::getline(std::cin, line)) {\n        // Trim input\n        size_t start = line.find_first_not_of(\" \\t\");\n        size_t end = line.find_last_not_of(\" \\t\\n\\r\");\n        if (start != std::string::npos && end != std::string::npos) {\n            line = line.substr(start, end - start + 1);\n        }\n        \n        if (line[0] == '[' && line[line.length() - 1] == ']') {\n            std::vector<std::string> nodes = parseInput(line);\n            TreeNode* root = buildTree(nodes);\n            \n            int result = countSingleChildNodes(root);\n            std::cout << result << std::endl;\n            \n            // Cleanup\n            freeTree(root);\n        }\n    }\n    \n    return 0;\n}",

      "javascript": "class TreeNode {\n    constructor(val = 0, left = null, right = null) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\n/**\n * Count the number of nodes in a binary tree that have exactly one child.\n * \n * @param {TreeNode} root - The root node of the binary tree\n * @return {number} - An integer representing the count of nodes with exactly one child\n */\nfunction countSingleChildNodes(root) {\n    if (root === null) {\n        return 0;\n    }\n    \n    let count = 0;\n    \n    // Check if current node has exactly one child\n    if ((root.left === null && root.right !== null) || \n        (root.left !== null && root.right === null)) {\n        count++;\n    }\n    \n    // Recursively count in left and right subtrees\n    count += countSingleChildNodes(root.left);\n    count += countSingleChildNodes(root.right);\n    \n    return count;\n}\n\n// Helper function to build tree from level-order traversal array\nfunction buildTree(nodes) {\n    if (!nodes || nodes.length === 0 || nodes[0] === null) {\n        return null;\n    }\n    \n    const root = new TreeNode(nodes[0]);\n    const queue = [root];\n    let i = 1;\n    \n    while (queue.length > 0 && i < nodes.length) {\n        const current = queue.shift();\n        \n        // Left child\n        if (i < nodes.length) {\n            if (nodes[i] !== null) {\n                current.left = new TreeNode(nodes[i]);\n                queue.push(current.left);\n            }\n            i++;\n        }\n        \n        // Right child\n        if (i < nodes.length) {\n            if (nodes[i] !== null) {\n                current.right = new TreeNode(nodes[i]);\n                queue.push(current.right);\n            }\n            i++;\n        }\n    }\n    \n    return root;\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nrl.on('line', (line) => {\n    line = line.trim();\n    \n    // Parse input array\n    if (line.startsWith('[') && line.endsWith(']')) {\n        const nodeStrs = line.substring(1, line.length - 1).split(',');\n        const nodes = nodeStrs.map(nodeStr => {\n            nodeStr = nodeStr.trim();\n            return nodeStr === \"null\" ? null : parseInt(nodeStr);\n        });\n        \n        const root = buildTree(nodes);\n        const result = countSingleChildNodes(root);\n        console.log(result);\n    }\n});"
    }
    ,
    "testCases": [
      { "id": 1, "input": "[4,2,6,1,null,5]", "expected": "2", "description": "Tree: [4,2,6,1,null,5]" },
      { "id": 2, "input": "[7,3,10,1,null,9]", "expected": "2", "description": "Tree: [7,3,10,1,null,9]" },
      { "id": 3, "input": "[10,5,15,3,null,null,20]", "expected": "2", "description": "Tree: [10,5,15,3,null,null,20]" },
      { "id": 4, "input": "[1,null,2,null,3,null,4]", "expected": "3", "description": "Tree: [1,null,2,null,3,null,4]" }
    ],
    "hiddenTestCases": [
      { "input": "[50,30,70,20,null,60,80]", "expected": "3", "description": "Complex binary tree structure." },
      { "input": "[5,3,7,2,null,null,8]", "expected": "2", "description": "Nodes with mixed child structures." },
      { "input": "[15,10,20,5,12,null,25]", "expected": "2", "description": "Middle-range complexity." },
      { "input": "[8,4,12,2,6,10,14,1,3,5,7,9,11,13,15]", "expected": "0", "description": "Perfect binary tree, no single child nodes." },
      { "input": "[1,null,2,3,null,4,5,null,null,6,7]", "expected": "4", "description": "Deep binary tree with single children at various depths." },
      { "input": "[100,50,150,25,75,125,175,null,30,null,80,110,null,160,180]", "expected": "3", "description": "Nodes at different levels have single children." },
      { "input": "[9,5,13,3,7,11,15,null,4,6,8,10,12,14,16]", "expected": "0", "description": "Balanced tree, no single-child nodes." },
      { "input": "[5,4,null,3,null,2,null,1]", "expected": "4", "description": "Left-skewed tree with all nodes having single children." }
    ]
  },
  {
    "_id": "1996-stms",
    "title": "Smart Traffic Management System",
    "slug": "smart-traffic-management",
    "description": "Given an array representing traffic density at multiple traffic lights, determine the optimal green light durations to minimize total waiting time while satisfying given constraints.",
    "difficulty": "hard",
    "category": "Greedy Algorithm",
    "starterCode": {
      "python": "def traffic_light_duration(density, min_time, max_time, total_time):\n    \"\"\"\n    Determine optimal green light durations to minimize waiting time.\n    \n    Args:\n        density: A list of integers representing traffic density at each traffic light.\n        min_time: Minimum allowed green light duration.\n        max_time: Maximum allowed green light duration.\n        total_time: Total time available for all traffic lights.\n        \n    Returns:\n        A list of integers representing green light duration for each traffic light,\n        or [-1] if no valid distribution exists.\n    \"\"\"\n    # Your code here\n    return []\n\nif __name__ == \"__main__\":\n    import sys\n    input_data = sys.stdin.read().strip().split(\"\\n\")\n    for line in input_data:\n        n, min_time, max_time, total_time, density_str = line.split(\";\")\n        density = list(map(int, density_str.strip(\"[]\").split(\",\")))\n        result = traffic_light_duration(density, int(min_time), int(max_time), int(total_time))\n        print(str(result).replace(\" \", \"\"))",
      "java": "import java.util.*;\n\npublic class Solution {\n    /**\n     * Determine optimal green light durations to minimize waiting time.\n     * \n     * @param density Array of integers representing traffic density at each traffic light\n     * @param minTime Minimum allowed green light duration\n     * @param maxTime Maximum allowed green light duration\n     * @param totalTime Total time available for all traffic lights\n     * @return Array of integers representing green light duration for each traffic light,\n     *         or {-1} if no valid distribution exists\n     */\n    public static int[] trafficLightDuration(int[] density, int minTime, int maxTime, int totalTime) {\n        // Your code here\n        return new int[0];\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            String line = scanner.nextLine();\n            String[] parts = line.split(\";\");\n            int n = Integer.parseInt(parts[0]);\n            int minTime = Integer.parseInt(parts[1]);\n            int maxTime = Integer.parseInt(parts[2]);\n            int totalTime = Integer.parseInt(parts[3]);\n            String[] densityStr = parts[4].replaceAll(\"\\\\[|\\\\]\", \"\").split(\",\");\n            int[] density = new int[n];\n            for (int i = 0; i < n; i++) {\n                density[i] = Integer.parseInt(densityStr[i].trim());\n            }\n            int[] result = trafficLightDuration(density, minTime, maxTime, totalTime);\n            System.out.println(Arrays.toString(result));\n        }\n        scanner.close();\n    }",
      "javascript": "/**\n * Determine optimal green light durations to minimize waiting time.\n * \n * @param {number[]} density - Array of integers representing traffic density at each traffic light\n * @param {number} minTime - Minimum allowed green light duration\n * @param {number} maxTime - Maximum allowed green light duration\n * @param {number} totalTime - Total time available for all traffic lights\n * @return {number[]} - Array of integers representing green light duration for each traffic light,\n *                      or [-1] if no valid distribution exists\n */\nfunction trafficLightDuration(density, minTime, maxTime, totalTime) {\n    // Your code here\n    return [];\n}\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nrl.on('line', (line) => {\n    const [n, minTime, maxTime, totalTime, densityStr] = line.split(';');\n    const density = JSON.parse(densityStr);\n    const result = trafficLightDuration(density, parseInt(minTime), parseInt(maxTime), parseInt(totalTime));\n    console.log(JSON.stringify(result));\n});",
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n/**\n * Determine optimal green light durations to minimize waiting time.\n * \n * @param density Array of integers representing traffic density at each traffic light\n * @param n Number of traffic lights\n * @param min_time Minimum allowed green light duration\n * @param max_time Maximum allowed green light duration\n * @param total_time Total time available for all traffic lights\n * @param result Output array to store the result (should be pre-allocated with size n)\n * @return 1 if a valid distribution exists, 0 otherwise\n */\nint traffic_light_duration(int* density, int n, int min_time, int max_time, int total_time, int* result) {\n    // Your code here\n    return 0;\n}\n\nint main() {\n    char line[1024];\n    while (fgets(line, sizeof(line), stdin)) {\n        int n, min_time, max_time, total_time;\n        char density_str[1024];\n        \n        // Parse input\n        sscanf(line, \"%d;%d;%d;%d;[%[^]]\", &n, &min_time, &max_time, &total_time, density_str);\n        \n        // Parse density array\n        int* density = (int*)malloc(n * sizeof(int));\n        char* token = strtok(density_str, \",\");\n        for (int i = 0; i < n && token != NULL; i++) {\n            density[i] = atoi(token);\n            token = strtok(NULL, \",\");\n        }\n        \n        // Allocate result array\n        int* result = (int*)malloc(n * sizeof(int));\n        \n        // Call function\n        int valid = traffic_light_duration(density, n, min_time, max_time, total_time, result);\n        \n        // Print result\n        if (!valid) {\n            printf(\"[-1]\\n\");\n        } else {\n            printf(\"[\");\n            for (int i = 0; i < n; i++) {\n                printf(\"%d\", result[i]);\n                if (i < n - 1) printf(\",\");\n            }\n            printf(\"]\\n\");\n        }\n        \n        free(density);\n        free(result);\n    }\n    return 0;\n}",
      "c++": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n\n/**\n * Determine optimal green light durations to minimize waiting time.\n * \n * @param density Vector of integers representing traffic density at each traffic light\n * @param min_time Minimum allowed green light duration\n * @param max_time Maximum allowed green light duration\n * @param total_time Total time available for all traffic lights\n * @return Vector of integers representing green light duration for each traffic light,\n *         or {-1} if no valid distribution exists\n */\nstd::vector<int> trafficLightDuration(const std::vector<int>& density, int min_time, int max_time, int total_time) {\n    // Your code here\n    return {};\n}\n\n// Helper function to parse density array from string\nstd::vector<int> parseDensity(const std::string& str) {\n    std::vector<int> result;\n    std::string densityStr = str.substr(1, str.length() - 2); // Remove [ and ]\n    std::stringstream ss(densityStr);\n    std::string token;\n    \n    while (std::getline(ss, token, ',')) {\n        result.push_back(std::stoi(token));\n    }\n    \n    return result;\n}\n\nint main() {\n    std::string line;\n    while (std::getline(std::cin, line)) {\n        std::stringstream ss(line);\n        std::string item;\n        \n        std::getline(ss, item, ';');\n        int n = std::stoi(item);\n        \n        std::getline(ss, item, ';');\n        int min_time = std::stoi(item);\n        \n        std::getline(ss, item, ';');\n        int max_time = std::stoi(item);\n        \n        std::getline(ss, item, ';');\n        int total_time = std::stoi(item);\n        \n        std::getline(ss, item);\n        std::vector<int> density = parseDensity(item);\n        \n        std::vector<int> result = trafficLightDuration(density, min_time, max_time, total_time);\n        \n        if (result.empty() || (result.size() == 1 && result[0] == -1)) {\n            std::cout << \"[-1]\" << std::endl;\n        } else {\n            std::cout << \"[\";\n            for (size_t i = 0; i < result.size(); i++) {\n                std::cout << result[i];\n                if (i < result.size() - 1) std::cout << \",\";\n            }\n            std::cout << \"]\" << std::endl;\n        }\n    }\n    \n    return 0;\n}"
    },
    "constraints": [
      "1 ≤ n ≤ 10^5",
      "1 ≤ min_time ≤ max_time ≤ 10^4",
      "1 ≤ total_time ≤ 10^9",
      "1 ≤ density[i] ≤ 10^4"
    ],
    "examples": [
      {
        "id": 1,
        "inputText": "5;2;5;20;[10,20,30,40,50]",
        "outputText": "[2,3,4,5,6]",
        "explanation": "The sum of durations is 2+3+4+5+6=20, which is within the total_time limit."
      },
      {
        "id": 2,
        "inputText": "3;3;5;10;[5,10,15]",
        "outputText": "-1",
        "explanation": "No valid distribution satisfies all constraints, so the output is -1."
      }
    ],
    "testCases": [
      { "id": 1, "input": "4;2;6;15;[5,8,12,10]", "expected": "[2,3,5,5]", "description": "4;2;6;15;[5,8,12,10]" },
      { "id": 2, "input": "3;1;4;6;[3,2,1]", "expected": "[1,2,3]", "description": "3;1;4;6;[3,2,1]" },
      { "id": 3, "input": "6;2;5;25;[12,15,20,18,10,14]", "expected": "[3,4,5,4,4,5]", "description": "6;2;5;25;[12,15,20,18,10,14]" },
      { "id": 4, "input": "7;3;7;30;[8,15,20,25,10,18,14]", "expected": "[3,4,5,6,4,4,4]", "description": "7;3;7;30;[8,15,20,25,10,18,14]" }
    ],
    "hiddenTestCases": [
      { "input": "8;2;6;35;[10,15,25,20,30,15,10,5]", "expected": "[3,4,5,5,6,4,4,4]", "description": "Complex traffic allocation." },
      { "input": "10;1;8;50;[10,20,30,25,15,12,18,22,25,10]", "expected": "[2,3,5,6,4,3,4,5,6,4]", "description": "Larger number of traffic lights." },
      { "input": "5;2;5;18;[10,15,20,25,30]", "expected": "[2,3,4,4,5]", "description": "Total time slightly limited." },
      { "input": "6;3;6;27;[10,12,15,18,20,25]", "expected": "[3,4,5,5,6,4]", "description": "Balanced distribution with constraints." },
      { "input": "7;2;5;28;[15,18,20,22,25,30,35]", "expected": "[3,4,5,5,6,5,5]", "description": "High-density traffic scenario." },
      { "input": "9;3;7;40;[10,15,20,30,25,35,40,15,10]", "expected": "[3,4,5,6,5,7,7,4,4]", "description": "Multiple traffic lights, high density." },
      { "input": "4;2;6;16;[8,12,15,10]", "expected": "[2,3,5,6]", "description": "Tight constraints with minimal leeway." },
      { "input": "5;1;4;10;[3,5,7,9,11]", "expected": "[1,2,3,4,4]", "description": "Very restrictive time constraints." }
    ]
  },

]
