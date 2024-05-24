let walls;
export function recursiveDivisionMaze(grid, startNode, finishNode) {
  // 检查起点和终点是否存在，并且它们不是同一个节点
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  // 初始化垂直和水平数组
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  // 获取递归分割后的墙壁
  getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode);
  return walls;
}

// 生成从0到len-1的数组
function range(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

// 获取递归分割后的墙壁
function getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode) {
  // 如果垂直或水平数组的长度小于2，则返回
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let dir;
  let num;
  // 如果垂直数组长度大于水平数组长度，则选择水平方向分割
  if (vertical.length > horizontal.length) {
    dir = 0;
    num = generateOddRandomNumber(vertical);
  }
  // 如果垂直数组长度小于等于水平数组长度，则选择垂直方向分割
  if (vertical.length <= horizontal.length) {
    dir = 1;
    num = generateOddRandomNumber(horizontal);
  }

  if (dir === 0) {
    // 添加水平方向的墙壁
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    // 递归处理左边的区域
    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      grid,
      startNode,
      finishNode
    );
    // 递归处理右边的区域
    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      grid,
      startNode,
      finishNode
    );
  } else {
    // 添加垂直方向的墙壁
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    // 递归处理上边的区域
    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      grid,
      startNode,
      finishNode
    );
    // 递归处理下边的区域
    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      grid,
      startNode,
      finishNode
    );
  }
}

// 生成一个奇数的随机数
function generateOddRandomNumber(array) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}

// 添加墙壁
function addWall(dir, num, vertical, horizontal, startNode, finishNode) {
  let isStartFinish = false;
  let tempWalls = [];
  if (dir === 0) {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
      if (
        (temp === startNode.row && num === startNode.col) ||
        (temp === finishNode.row && num === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if (
        (num === startNode.row && temp === startNode.col) ||
        (num === finishNode.row && temp === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([num, temp]);
    }
  }
  // 如果不包含起点和终点，随机删除一个墙壁
  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  // 将生成的墙壁加入到总墙壁数组中
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

// 生成一个随机数
function generateRandomNumber(max) {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return randomNum;
}
