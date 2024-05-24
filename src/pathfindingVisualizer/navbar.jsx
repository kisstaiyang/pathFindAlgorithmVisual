import React, { Component } from "react";
import "./navbar.css";
import { message } from "antd";
import { FaGithub } from "react-icons/fa";

const brand = window.innerWidth > 600 ? "迷宫寻路算法可视化" : "寻路算法";

class NavBar extends Component {
  state = {
    algorithm: "可视化算法",
    maze: "生成迷宫",
    pathState: false,
    mazeState: false,
    speedState: "速度",
    visible: false,
  };

  // 选择算法
  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === "可视化算法" ||
      this.state.algorithm === "请选择一个算法!"
    ) {
      this.setState({ algorithm: selection });
    } else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } else {
      this.setState({ algorithm: selection });
    }
  }

  // 选择迷宫
  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "生成迷宫" ||
      this.state.maze === "请选择一个迷宫!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }

  // 可视化算法，根据选择的算法调用相应的算法进行可视化
  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === "可视化算法" ||
      this.state.algorithm === "请选择一个算法!"
    ) {
      this.setState({ algorithm: "请选择一个算法!" });
      message.error("请选择一个算法!");
    } else {
      this.setState({ pathState: true });
      if (this.state.algorithm === "可视化 Dijkstra")
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === "可视化 A*")
        this.props.visualizeAStar();
      else if (this.state.algorithm === "Visualize Greedy BFS")
        this.props.visualizeGreedyBFS();
      else if (this.state.algorithm === "Visualize Bidirectional Greedy")
        this.props.visualizeBidirectionalGreedySearch();
      else if (this.state.algorithm === "可视化 BFS") this.props.visualizeBFS();
      else if (this.state.algorithm === "可视化 DFS") this.props.visualizeDFS();
      else if (this.state.algorithm === "Visualize Random Walk")
        this.props.visualizeRandomWalk();
    }
  }

  // 生成迷宫，根据选择的迷宫生成相应的迷宫
  generateMaze() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.mazeState || this.state.pathState) {
      this.clearTemp();
    }
    if (
      this.state.maze === "生成迷宫" ||
      this.state.maze === "请选择一个迷宫!"
    ) {
      this.setState({ maze: "请选择一个迷宫!" });
      message.error("请选择一个迷宫!");
    } else {
      this.setState({ mazeState: true });
      if (this.state.maze === "生成随机迷宫") this.props.generateRandomMaze();
      else if (this.state.maze === "生成垂直迷宫")
        this.props.generateVerticalMaze();
      else if (this.state.maze === "生成递归划分迷宫")
        this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "生成DFS迷宫") this.props.generateDFSMaze();
      else if (this.state.maze === "生成DFS迷宫") this.props.generateDFSMaze();
    }
  }

  // 清除迷宫
  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: "可视化算法",
      maze: "生成迷宫",
      pathState: false,
      mazeState: false,
    });
  }

  // 清除路径
  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  // 改变速度
  changeSpeed(speed) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    let value = [10, 10];
    if (speed === "低速") value = [50, 30];
    else if (speed === "中速") value = [25, 20];
    else if (speed === "高速") value = [10, 10];
    this.setState({ speedState: speed });
    this.props.updateSpeed(value[0], value[1]);
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand h1 mb-0" href="https://taiyang.space/maze/">
          {brand}
        </a>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  算法
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("可视化 A*")}
                  >
                    A*
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("可视化 BFS")}
                  >
                    BFS
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("可视化 DFS")}
                  >
                    DFS
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("可视化 Dijkstra")}
                  >
                    Dijkstra
                  </button>
                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                {this.state.algorithm}
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  迷宫
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("生成DFS迷宫")}
                  >
                    DFS迷宫
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("生成随机迷宫")}
                  >
                    随机迷宫
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("生成垂直迷宫")}
                  >
                    垂直迷宫
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("生成递归划分迷宫")}
                  >
                    递归划分迷宫
                  </button>
                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.generateMaze()}
              >
                {this.state.maze}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                清除迷宫
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.speedState}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("低速")}
                  >
                    低速
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("中速")}
                  >
                    中速
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("高速")}
                  >
                    高速
                  </button>
                </div>
              </div>{" "}
            </li>
          </ul>
        </div>
        <div style={{ textAlign: "right" }}>
          <a
            // class="navbar-brand"
            href="https://github.com/kisstaiyang/pathFindAlgorithmVisual"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            <FaGithub size={36} />
          </a>
        </div>
      </nav>
    );
  }
}
export default NavBar;
