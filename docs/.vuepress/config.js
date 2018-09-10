module.exports = {
    title: '小三胖技术栈',
    description: '网站描述',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['meta', { charset: 'UTF-8' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }] // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/web_accumulate/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    serviceWorker: true,
    evergreen: true,
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间,
        // sidebar: 'auto',
        nav: [
            { text: 'css', link: '/recondCSS/' }, // 内部链接 以docs为根目录
            { text: 'javascript', link: '/recondJAVASCRIPT/' }, // 外部链接
            // 下拉列表
            { text: 'GitHub地址', link: 'https://github.com/gaojingwen' }
        ],
        sidebar: {
            // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
            '/recondJAVASCRIPT/': jsSidebarConfig('javascript')
        }
    }
};



function jsSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        '浅谈浏览器http的缓存机制',
        '7分钟理解JS的节流、防抖及使用场景',
        'ES2018 新特征之：异步迭代器 for-await-of'
      ]
    }
  ]
}
