# 如何让旧浏览器支持HTML5新标签

原创： HTML5学堂 [HTML5学堂](javascript:void(0);) *2015-12-01*

![img](https://mmbiz.qpic.cn/mmbiz/iaXDmvibibwTLUAqg2cUWlqgcoLtmRHicBkdW9f5fYmSlleSlOP6PqNPeLbTx0MzKIlyKRH4CoriaMeNNTrIP6sofxg/640?tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

HTML5学堂：开发永远和理论不相同，一旦考虑IE低端浏览器，所有的HTML5新增功能都成了浮云~~~从HTML5新增标签的语义角度来说，是有利于网站SEO的，那么如果在高端浏览器中使用了新元素，应当如何让低端浏览器兼容呢？

**如何让旧浏览器支持HTML5新增标签**

HTML5出现也不短了，很多网站的页面都进行了改版，为了降低代码量（不需要起太多的类名），提升加载速度，提高标签的语义性，因此，在网页中大量使用了section，article，header等HTML5标签。自己最近在写响应式布局的范例，里面也使用到了header等标签。还是比较希望能够做成兼容“旧版浏览器”的，在此和大家共享一下，如何让旧浏览器支持HTML5新增标签。

书写的基本的HML代码：

1. <!doctype html>
2. <html>
3. <head>
4. <meta charset="UTF-8">
5. <title>让旧浏览器支持HTML5新增标签-独行冰海</title>
6. </head>
7. <body>
8. <header>顶部内容</header>
9. <nav>导航内容</nav>
10. <article>文章内容</article>
11. <footer>底部内容</footer>
12. </body>
13. </html>

Google等新浏览器中的表现：

![img](https://mmbiz.qpic.cn/mmbiz/p6DwiaCENIB5FIL5ZU7OQHiahtXLKtdW27vYZFf6Npz6HwrgkoYf6AXZW72T8Q9KMZNURhNOOU6z5UKuvo7fCqsQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

IE6中的表现：

![img](https://mmbiz.qpic.cn/mmbiz/p6DwiaCENIB5FIL5ZU7OQHiahtXLKtdW27nCia96UZDicfnYsm21GTX5SIsCicdseyqBH7cJyJwOX7A3w7kVT68f1vQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**具体步骤**

其实，让旧浏览器支持HTML5新增标签，听上去很难，操作起来很简单，只需要你懂DOM操作就足够了。

首先我们使用js进行标签的创建，为HTML文件创建我们需要的这几个HTML5标签。

1. <script>
2. document.createElement('header');
3. document.createElement('nav');
4. document.createElement('article');
5. document.createElement('footer');
6. </script>

接下来，我们需要使用css进行这几个HTML5标签的样式控制。这是因为，通过这种方法创建的新标签，默认是行内元素。因此需要添加如下代码：

1. <style>
2. article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary{
3. display: block;
4. }
5. </style>

对于代码位置，我们需要注意，要将script标签放置到head中，而不是body的后面，这是因为，浏览器从上到下进行代码的执行与解析，在已经渲染之后再执行js就没有任何意义和价值了。