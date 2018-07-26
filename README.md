项目脚手架
===================


### 技术选择
> - 模板: swig
> - 样式: scss
> - 框架: vue + vue-router
> = 模块打包：webpack
> - 编程风格: ES6
> - 编译: gulp
> - 服务器: browserSync


### 文件架构
> - src: 源码
> - dev: 开发、本地调试时，编译之后的临时文件夹，即本地node服务器指向该文件夹
> - doc: 文档说明文件夹，目前只有svg文档备份。
> - lib: 公共依赖工具库
> - gulp: 整体node端编译脚本
> - mock: 本地开发调试时，mock接口存储

### src源码架构
> - common: 公共函数
> - component: 公共组件
> - include: 页面公共部分
> - module: 业务组件

### 本地调试开发
> - 启动本地gulp任务: npm run server
> - 启动测试环境gulp任务: npm run server:remote

### 远程测试环境部署
> - 执行: gulp scp:dev