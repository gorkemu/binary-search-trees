class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        //Remove duplicates
        let unique = Array.from(new Set(arr));
        //Sort
        let sorted = unique.sort((a, b) => a - b);
        this.root = this.buildTree(sorted, 0, sorted.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        const mid = parseInt((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
        return node;
    }

    insert(value, node = this.root) {
        if (node == null) {
            node = new Node(value);
            return node;
        }

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    delete(value, node = this.root) {
        if (node == null) return node;

        if (value < node.data) {
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {
            node.right = this.delete(value, node.right);

            // if value is same as root's data,
            // then this is the node to be deleted
        } else {
            // node with only one child or no child
            if (node.left == null) {
                return node.right;
            }
            else if (node.right == null) {
                return node.left;
            }

            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            node.data = this.minValue(node.right);

            // Delete the inorder successor
            node.right = this.delete(node.data, node.right);
        }
        return node;
    }
    
    minValue(node) {
        let minv = node.data;
        while (node.left != null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    find(value, node = this.root) {
        if (node == null || node.data === value) {
            console.log(node);
            return node;
        }

        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback) {
        const queue = [this.root];
        let levelOrderList = [];
        while (queue.length > 0) {
            for (let i = 0; i < queue.length; i++) {
                const node = queue.shift();
                levelOrderList.push(node.data);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
                if (callback) callback(node);
            }
        }
        if (!callback) return levelOrderList;
    }

    preorder(callback, node = this.root, preorderList = []) {
        if (node == null) return;
        callback ? callback(node) : preorderList.push(node.data);
        this.preorder(callback, node.left, preorderList);
        this.preorder(callback, node.right, preorderList);
        return preorderList;
    }

    inorder(callback, node = this.root, inorderList = []) {
        if (node == null) return;
        this.inorder(callback, node.left, inorderList);
        callback ? callback(node) : inorderList.push(node.data);
        this.inorder(callback, node.right, inorderList);
        return inorderList;
    }

    postorder(callback, node = this.root, postorderList = []) {
        if (node == null) return;
        this.postorder(callback, node.left, postorderList);
        this.postorder(callback, node.right, postorderList);
        callback ? callback(node) : postorderList.push(node.data);
        return postorderList;
    }

    height(node = this.root) {
        if (node == null) return 0;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeData, node = this.root, counter = 0) {
        if (node == null) return;
        if (nodeData === node.data) return counter;

        if (nodeData < node.data) {
            return this.depth(nodeData, node.left, counter + 1);
        } else {
            return this.depth(nodeData, node.right, counter + 1);
        }
    }

    isBalanced(node = this.root) {
        if (node == null) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);


        if (Math.abs(leftHeight - rightHeight) < 2) {
            if (this.isBalanced(node.left) && this.isBalanced(node.right)) return true;
        }
        return false;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const exampleArr = [5, 6, 72, 4, 49, 55, 56, 49, 49, 49, 49];
const newTree = new Tree(exampleArr);
newTree.insert(100);
newTree.delete(55);
newTree.delete(5);
newTree.find(100);
newTree.insert(33);
newTree.insert(88);
newTree.insert(52);
newTree.insert(3);
newTree.insert(2);
newTree.insert(7);
newTree.insert(30);
newTree.insert(37);
prettyPrint(newTree.root);
console.log(newTree.levelOrder());
console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());
console.log(newTree.height());
console.log(newTree.height(newTree.find(7)));
console.log(newTree.depth(49));
console.log(newTree.depth(88));
console.log(newTree.isBalanced());

