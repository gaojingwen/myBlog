#  [web 前端优化](http://www.3xmq.com/article/1513878802938)

**woshipm**

 

 •  [**0** 回帖](http://www.3xmq.com/article/1513878802938#comments)  •  493 浏览  •  8 个月前 

via Mac OS

[web前端](http://www.3xmq.com/tag/webqianduan) 

语音预览 - [小薇](https://3xmq.com/member/v)

- 00:00 / 00:00 

 

## 前言

![img](http://img.3xmq.com/0e48810084344aefb8f7068fa68cbb14.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)
前端性能优化这是一个老生常谈的话题，但是还是有很多人没有真正的重视起来，或者说还没有产生这种意识。

当用户打开页面，首屏加载速度越慢，流失用户的概率就越大，在体验产品的时候性能和交互对用户的影响是最直接的，推广拉新是一门艺术，用户的留存是一门技术，拉进来留住用户，产品体验很关键，这里我以[美柚](http://www.3xmq.com/forward?goto=https%3A%2F%2Fwww.meiyou.com%2F)的页面为例子，用实例展开说明前端优化的基本套路（适合新手上车）。

------

## WEB 性能优化套路

### 基础套路 1：减少资源体积

- css

  - 压缩
  - 响应头 GZIP
    ![img](http://img.3xmq.com/eab9fba9d4f64cd3992f82100f11c048.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)

- js

  - 压缩
  - 响应头 GZIP
    ![img](http://img.3xmq.com/15e2af40040544ee96bc4f8d0744f8e8.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)

- html

  - 输出压缩
  - 响应头 GZIP
    ![img](http://img.3xmq.com/c4c0b316cf4648e3b6be1254bc914b0c.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)

- 图片

  - 压缩
  - 使用 Webp 格式

  ![img](http://img.3xmq.com/784504c9e57e45b2813cfcb713fe6765.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)

- cookie

  - 注意 cookie 体积，合理设置过期时间

------

### 基础套路 2：控制请求数

- js
  - 合并
- css
  - 合并
- 图片
  - 合并
    ![img](http://img.3xmq.com/fe9315225abe48bf84296c351e2acb3f.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)
  - base64(常用图标：如 logo 等)![img](http://img.3xmq.com/a59978170ec44539a095c215ff5de0e4.jpeg?imageView2/2/w/768/format/jpg/interlace/0/q)
- 接口
  - 数量控制
  - 异步 ajax
- 合理使用缓存机制
  - 浏览器缓存
- js 编码
  - 异步加载 js
    - Require.JS 按需加载
  - lazyload 图片

------

### 基础套路 3：静态资源 CDN

- 请求走 CDN
  - html
  - image
  - js
  - css

------

### 综合套路

- 图片地址独立域名
  - 与业务不同域名可以减少请求头里不必要的 cookie 传输
- 提高渲染速度
  - js 放到页面底部，body 标签底部
  - css 放到页面顶部，head 标签里
- 代码
  - 代码优化：css/js/html
  - 预加载，如：分页预加载，快滚动到底部的时候以前加载下一页数据