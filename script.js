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

exampleArr = [5, 6, 72, 4, 49, 55, 56, 49, 49, 49, 49];
newTree = new Tree(exampleArr);
newTree.insert(100);
newTree.delete(55);
newTree.delete(5);
newTree.find(100);
prettyPrint(newTree.root);