# 一套 Vue 的单页模板：N3-admin

你只配娱乐 [SegmentFault](javascript:void(0);) *2017-08-20*

趁着周末偷来一点闲，总结近期的工作和学习，想着该花点心思把N3-admin这套基于N3-components的单页应用模板简单的给介绍一下。

> 首发于个人博客：blog.lxstart.net
>
> 项目路径: https://github.com/N3-components/N3-admin
>
> ps: 本项目不同于vue-admin等模板项目介绍大量的组件，基础组件的用法请参考：
>
> https://n3-components.github.io/N3-components/

#### 1、概述

首先 N3-admin 是一个基于vue / vuex / vue-router / N3 / axios 的单页应用，适用于单页应用的快速上手，并不仅限于N3-components的使用，而是提供一个**比较完善的项目构建的思路和结构**，提供给初学者学习。同时也是一套可扩展的Vue单页应用开发模板。

项目工程基于Vue-cli，因此大部分同学都能快速上手和理解，往下介绍一下特性和结构。

#### 2、特性

**项目工程相关**

- **开发环境；静态文件服务器、HTTP代理、热更新

- **生产构建：代码编译提取压缩合并混淆hash命名base64~

- **eslint

- **babel

- **webpack 2.x

**vue**

- **组件分级 [路由级组件、复用型组件、基础组件(N3)]

- **Vue扩展 [filters、directives等]

**vue-router**

- **二级路由

- **转场动画

- **路由拦截器

**vuex**

- **多模块(module)支持

**axios**

- **支持多实例

- **请求、响应拦截器

- **Vue 扩展，通过实例的方法可访问

**layout 布局**

- **layout 布局

**全局进度条 Nprogress**

- **全局进度条 Nprogress

**css 预处理**

- **less

- **postcss

- [] stylus <= 仅需安装预处理器和loader

- [] sass / scss <= 仅需安装预处理器和loader

**API 调用支持**

- **接口配置

- [] mock

#### 3、布局方式

二级路由下生效。

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHmicf8YiaSO32aPGYJ9JuPaO09FRCGDjaPbAicSpYJKAFQiciax0zGuIvTpg0gTzzcicDxx3CicpLiaHJuA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 4、文件结构

```
.├── README.md                           <=  项目介绍├── build                               <=  工程构建相关 <Vue-cli>│   ├── build.js                        <=  构建脚本│   ├── check-versions.js               <=  Node Npm版本检查│   ├── dev-client.js                   <=  开发客户端：浏览器刷新│   ├── dev-server.js                   <=  开发服务器：静态文件服务器、代理、热更新│   ├── utils.js                        <=  utils│   ├── webpack.base.conf.js            <=  webpack基础配置│   ├── webpack.dev.conf.js             <=  webpack开发配置│   └── webpack.prod.conf.js            <=  webpack生产配置├── config                              <=  工程构建配置：开发服务器端口、代理，静态资源打包位置等│   ├── dev.env.js                      <=  开发环境配置│   ├── index.js                        <=  入口│   ├── prod.env.js                     <=  生产环境配置│   └── test.env.js                     <=  测试环境配置├── index.html                          <=  单页应用入口├── package-lock.json                   <=  Npm Package 版本锁├── package.json                        <=  Npm Package 配置├── src                                 <=  项目源代码│   ├── App.vue                         <=  Vue 根组件│   ├── api.js                          <=  api 配置│   ├── assets                          <=  静态资源│   │   ├── font│   │   │   ├── iconfont.eot│   │   │   ├── iconfont.svg│   │   │   ├── iconfont.ttf│   │   │   └── iconfont.woff│   │   ├── images│   │   │   └── logo.png│   │   ├── logo.png│   │   └── styles│   │       └── base.css│   ├── config.js                       <=  项目配置│   ├── extend                          <=  Vue 扩展相关│   │   ├── filters.js                  <=  全局过滤器│   │   ├── directive.js                <=  全局指令│   │   └── index.js                    <=  扩展入口│   ├── layout                          <=  布局组件│   │   ├── container.vue│   │   ├── header.vue│   │   ├── index.vue│   │   ├── levelbar.vue│   │   └── navbar.vue│   ├── main.js                         <=  Vue 入口│   ├── mock                            <=  Mock│   ├── router                          <=  路由配置│   │   ├── index.js│   │   └── routes.js│   ├── store                           <=  Vuex│   │   ├── actions│   │   │   └── user.js│   │   ├── index.js│   │   ├── modules│   │   │   ├── app.js│   │   │   └── user.js│   │   └── mutation-types.js│   ├── style                           <=  样式文件 │   │   └── define.less│   ├── utils                           <=  utils│   │   ├── axios.js                    <=  axios│   │   ├── const.js                    <=  常量│   │   ├── index.js│   │   └── storage.js                  <=  storage│   └── widgets                         <=  可复用组件│   └── views                           <=  路由级别的组件│       ├── Login.vue│       ├── form│       │   └── index.vue│       ├── table│       │   └── index.vue│       └── test│           └── query.vue├── static                              <=  服务器静态资源│   └── favicon.ico└── test                                <=  测试文件夹      └── unit        ├── index.js        ├── karma.conf.js        └── specs            └── Hello.spec.js
```

#### 5、使用说明

开发环境：

```
npm run dev
```

生产环境：

```
npm run build
```

#### 6、效果图

总览

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHmicf8YiaSO32aPGYJ9JuPaXqFD7551xmvrj83jJOUzmmdmQyadUgalvhHYpNSehs5LgYFz8vBvbQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

登录

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHmicf8YiaSO32aPGYJ9JuParPs7EhXpak7y8lXQZgTKZ8ky6LT5JSgWW2xkNXiaqKgCLxmQwIffbIQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Table

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHmicf8YiaSO32aPGYJ9JuPagxerWhh2s007kyibr70DsaBs195gGFFqMTFw0wpbr8V67FC1zoetfVw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Form

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHmicf8YiaSO32aPGYJ9JuPatRF7b2sZyibiaGicvpg8c6AIictUVic0CWwPenIeQWgLzUSFYPTOt89PQ5g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)