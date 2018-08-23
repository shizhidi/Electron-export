# electron 入门实例

> 基于electron-vue开发的一个数据导出导入的工具

### 项目技术架构
- vue
- vue-router
- vuex
- axios
- lodash
- scss
- webpack
- element-ui

### npm模块
- fs
- mysql
- shelljs
- cmd-promise

## windows平台

##### 安装包

![](/static/images/setup.png)

##### 界面
![](/static/images/exportLogin.png)

![](/static/images/exportHome.png)


### Todos
- 安装包可以选择安路径,定制安装界面

### 目录结构

> 这里只列了src renderer进程中目录,static 目录已看便知 其他文件可参照官方文档详解
>  https://electronjs.org/docs 和 https://simulatedgreg.gitbooks.io/electron-vue/content/cn/project_structure.html

```
renderer/
   |
   ├──api/                       * mysql操作 cmd 命令执行
   |
   ├──assets/                    * 资源
   │
   │──common/                    * 公共自定义js文件
   |
   ├──components/                * vue 组件目录
   │
   ├──router/                    * 路由目录
   │
   ├──scss/                      * scss 样式文件
   │
   ├──store/                     * vuex 状态管理
   │
   ├──App.vue                    * <router-view>
   │
   └──main.js                    * 入口文件

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
