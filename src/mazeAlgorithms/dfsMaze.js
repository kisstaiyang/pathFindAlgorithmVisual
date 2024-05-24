export function dfsMaze(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    // 初始化迷宫生成的状态
    const walls = [];

    // 将起点和终点标记为已访问
    startNode.isVisited = true;
    finishNode.isVisited = true;

    // 以起点开始深度优先搜索
    recursiveDFS(grid, startNode, walls);

    // 重置所有节点的访问状态
    resetVisited(grid);

    // 返回迷宫生成的墙壁数组
    return walls;
}

// 定义递归的深度优先搜索函数
function recursiveDFS(grid, currentNode, walls) {
    currentNode.isVisited = true;

    // 定义可能的四个方向
    const directions = [
        [0, 2],     // 右
        [0, -2],    // 左
        [2, 0],     // 下
        [-2, 0]     // 上
    ];

    // 随机打乱方向的顺序
    shuffleArray(directions);

    // 对于每个方向，检查相邻节点
    for (const [dx, dy] of directions) {
        const newRow = currentNode.row + dx;
        const newCol = currentNode.col + dy;

        // 检查相邻节点是否在网格内且未被访问过
        if (isValidNode(grid, newRow, newCol) && !grid[newRow][newCol].isVisited) {
            // 将相邻节点标记为已访问
            grid[newRow][newCol].isVisited = true;

            // 将当前节点和相邻节点之间的墙壁加入迷宫的墙壁列表中
            const wallRow = (currentNode.row + newRow) / 2;
            const wallCol = (currentNode.col + newCol) / 2;
            walls.push([wallRow, wallCol]);

            // 递归地进行深度优先搜索
            recursiveDFS(grid, grid[newRow][newCol], walls);
        }
    }
}

// 检查节点是否在迷宫内以及是否未被访问过
function isValidNode(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].isVisited;
}

// 重置所有节点的访问状态
function resetVisited(grid) {
    for (const row of grid) {
        for (const node of row) {
            node.isVisited = false;
        }
    }
}

// 随机打乱数组的顺序
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
