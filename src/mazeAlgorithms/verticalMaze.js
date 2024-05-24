let walls;
export function verticalMaze(grid, startNode, finishNode) {
  // 检查起点和终点是否存在，并且它们不是同一个节点
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  // 初始化垂直和水平数组
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  // 获取垂直迷宫的墙壁
  getVerticalWalls(vertical, horizontal, startNode, finishNode);
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

// 获取垂直迷宫的墙壁
function getVerticalWalls(vertical, horizontal, startNode, finishNode) {
  // 如果垂直数组长度小于2，则返回
  if (vertical.length < 2) {
    return;
  }

  // 随机选择垂直方向的迷宫类型：奇数列或偶数列
  let choice = Math.floor(Math.random() * 2);
  for (let num of vertical) {
    // 根据选择的类型添加墙壁
    if (choice === 0 && num % 2 !== 0) {
      addWall(num, horizontal, startNode, finishNode);
    }
    if (choice === 1 && num % 2 === 0) {
      addWall(num, horizontal, startNode, finishNode);
    }
  }
}

// 添加墙壁
function addWall(num, horizontal, startNode, finishNode) {
  let isStartFinish = false;
  let tempWalls = [];
  // 遍历水平方向的格子
  for (let temp of horizontal) {
    // 排除起点和终点
    if (
      (temp === startNode.row && num === startNode.col) ||
      (temp === finishNode.row && num === finishNode.col)
    ) {
      isStartFinish = true;
      continue;
    }
    tempWalls.push([temp, num]);
  }
  // 如果不包含起点和终点，随机删除一个墙壁
  if (!isStartFinish) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
  }
  // 将生成的墙壁加入到总墙壁数组中
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}
