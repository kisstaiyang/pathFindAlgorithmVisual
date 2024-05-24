export function randomMaze(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let walls = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // 排除起点和终点
      if (
        (row === startNode.row && col === startNode.col) ||
        (row === finishNode.row && col === finishNode.col)
      )
        continue;
      // 随机决定当前格子是否成为障碍物
      if (Math.random() < 0.33) {
        walls.push([row, col]);
      }
    }
  }
  // 打乱障碍物的顺序
  walls.sort(() => Math.random() - 0.5);
  return walls;
}
