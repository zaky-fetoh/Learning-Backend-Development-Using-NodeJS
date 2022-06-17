const path = require("path");
const fs = require("fs");

class TreeNode {
  constructor(key, obj) {
    this.key = parseInt(key);
    this.obj = obj;
    this.left = undefined;
    this.right = undefined;
    this.parant = undefined;
  }
}

class Tree {
  constructor() {
    this.root = undefined;
  }

  insert(key, obj) {
    let node = new TreeNode(key, obj);
    this.insertNode(node);
  }
  insertNode(node) {
    if (this.root === undefined) this.root = node;
    else {
      let curr = this.root,
        flg = true;
      while (flg) {
        if (node.key < curr.key) {
          if (curr.left) curr = curr.left;
          else {
            curr.left = node;
            node.parant = curr;
            flg = false;
          }
        } else {
          if (curr.right) curr = curr.right;
          else {
            curr.right = node;
            node.parant = curr;
            flg = false;
          }
        }
      }
    }
  }
  getMaxNode(subroot) {
    let curr = subroot;
    while (curr && curr.right) curr = curr.right;
    return curr;
  }
  getMinNode(subroot) {
    let curr = subroot;
    while (curr && curr.left) curr = curr.left;
    return curr;
  }
  deleteNode(node) {
    let rep1 = this.getMaxNode(node.left);
    if (!rep1) rep1 = this.getMinNode(node.right);

    if (node.parant) {
      let d = 0; // 0 mean that node is left chiled
      if (node.parant.right && node.parant.right.key === node.key) d = 1;
      if (d) node.parant.right = rep1;
      else node.parant.left = rep1;
    } else this.root = rep1;

    if (rep1) {
      this.deleteNode(rep1);
      rep1.parant = node.parant;
      rep1.left = node.left;
      rep1.right = node.right;
      if (node.right) node.right.parant = rep1;
      if (node.left) node.left.parant = rep1;
    }
  }
  finedNode(key) {
    let curr = this.root;
    while (curr)
      if (curr.key === key) return curr;
      else if (key < curr.key) curr = curr.left;
      else curr = curr.right;
  }

  delete(key) {
    let ver = this.finedNode(key);

    if (!ver) return false;
    this.deleteNode(ver);
    return true;
  }
  update(oldKey, key, obj) {
    this.delete(oldKey);
    this.insert(key, obj);
  }

  inorder(operation = n => console.log, node = this.root) {
    if (node.left) this.inorder(operation, node.left);
    operation(node);
    if (node.right) this.inorder(operation, node.right);
  }
  preorder(operation = n => console.log, node = this.root) {
    if (node) operation(node);

    if (node.left) this.preorder(operation, node.left);
    if (node.right) this.preorder(operation, node.right);
  }
}

const serializeTree = function (tree) {
  let arr = [];
  if (tree.root)
    tree.preorder(({ key, obj }) => {
      arr.push({ key, obj });
    });
  return JSON.stringify(arr);
};

function treeFromString(s) {
  let tree = new Tree();
  if (s.length <= 2) return tree;
  let objs = JSON.parse(s);
  objs.forEach(({ key, obj }) => {
    tree.insert(key, obj);
  });
  return tree;
}

class DB {
  constructor(db_name, Regupdate = 5000) {
    this.db_name = db_name;
    this.Regup = Regupdate;
    this.tree = new Tree();
    this.update = false;

    if (this.Regup <= 0)
      throw new Error("Register Update Time Must Be Positive value in Milisec");

    this.dfile = path.join(__dirname, "data", db_name);
    if (!fs.existsSync(this.dfile)) {
      console.log("creating The DB");
      fs.mkdirSync(path.basename(this.dfile), { recursive: true });
      fs.writeFile(this.dfile, "", () => { });
    }
    this.loadFromDisk(() => { });
    this.update_time = setInterval(() => {
      if (this.update) this.saveToDisk(function () { });
      //   this.update = false;
    }, this.Regup);
  }

  loadFromDisk(callback) {
    let dt = fs.readFileSync(this.dfile, "utf-8");
    this.tree = treeFromString(dt);
  }
  saveToDisk(callback) {
    let s = serializeTree(this.tree);
    fs.writeFile(this.dfile, s, callback);
  }
  insert(key, obj) {
    if (typeof key !== 'number') key = parseInt(key)
    this.tree.insert(key, obj);
    this.updateFlag();
  }
  delete(key) {
    if (typeof key !== 'number') key = parseInt(key)
    this.tree.delete(key);
    this.updateFlag();
  }
  updating(oldkey, newkey, newobj) {
    if (typeof oldkey !== 'number') oldkey = parseInt(oldkey)
    if (typeof newkey !== 'number') newkey = parseInt(newkey)
    this.tree.update(oldkey, newkey, newobj);
    this.updateFlag();
  }
  find(key) {
    // this.updateFlag()
    if (typeof key !== 'number') key = parseInt(key)
    let obj = this.tree.finedNode(key);
    if (obj) return obj.obj;
    return obj;
  }
  updateFlag() {
    this.update = true;
  }
}

module.exports = DB;
