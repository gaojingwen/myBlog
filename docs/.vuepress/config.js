module.exports = {
    title: '小三胖技术栈',
    description: '佛系前端大神',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['meta', { charset: 'UTF-8' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }] // 增加一个自定义的 favicon(网页标签的图标)
    ],
    // base: '/', // 这是部署到github相关的配置 下面会讲
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    // serviceWorker: true,
    // port: 6666,
    evergreen: true,
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间,
        // sidebar: 'auto',
        nav: [
            { text: 'Resume', link: '/recondRESUME/' }, // 内部链接 以docs为根目录
            { text: 'Css', link: '/recondCSS/' }, // 内部链接 以docs为根目录
            { text: 'Javascript', link: '/recondJAVASCRIPT/' }, // 外部链接
            { text: 'Vue', link: '/recondVUE/' }, // 外部链接
            { text: 'Node', link: '/recondNODE/' }, // 外部链接
            { text: 'Es6', link: '/recondES6/' }, // 外部链接
            { text: 'projectify', link: '/recondPROJECT/' }, // 外部链接
            { text: 'summary', link: '/recondSUMMARY/' }, // 外部链接
            { text: 'feature', link: '/recondFEATURE/' }, // 外部链接
            { text: 'git', link: '/recondGIT/' }, // 外部链接
            { text: 'other', link: '/recondOTHER/' }, // 外部链接
            // 下拉列表
            { text: 'GitHub地址', link: 'https://github.com/gaojingwen' }
        ],
        sidebar: {
            // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
            '/recondJAVASCRIPT/': jsSidebarConfig('Javascript'),
            '/recondVUE/': vueSidebarConfig('Vue'),
            '/recondNODE/': nodeSidebarConfig('Node'),
            '/recondES6/': es6SidebarConfig('Es6'),
            '/recondPROJECT/': projectSidebarConfig('projectify'),
            '/recondSUMMARY/': summarySidebarConfig('summary'),
            '/recondFEATURE/': featureSidebarConfig('feature'),
            '/recondGIT/': gitSidebarConfig('git'),
            '/recondOTHER/': otherSidebarConfig('other')
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
        '7分钟理解JS的节流、防抖及使用场景',
        'FormData 对象的使用',
        'JavaScript 运行原理解析',
        'js--API',
        'JS数组循环的性能和效率分析（for、while、forEach、map、for of）',
        '分享前端开发常用代码片段',
        '前端开发常用代码片段',
        '深入深入再深入 js 深拷贝对象',
        '请你实现一个深克隆'
      ]
    }
  ]
}

function vueSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'Vue.js最佳实践（五招让你成为Vue.js大师）',
                'vue2.0 项目开发小结',
                '一套 Vue 的单页模板：N3-admin',
                '当前 GitHub 上排名前十的热门 Vue 项目',
                '手摸手教你搭建一个类Vue文档风格的技术文档'
            ]
        }
    ]
}

function nodeSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                '《Node.js设计模式》使用流进行编码',
                '用 Node.js 的 16 行代码创建一个简单的天气 App'
            ]
        }
    ]
}

function es6SidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'ES2018 新特征之：异步迭代器 for-await-of',
                '从promise到async function'
            ]
        }
    ]
}

function projectSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'web 前端优化',
                '基于 webpack 的前后端分离开发环境实践',
                '很全很全的 JavaScript 模块讲解'
            ]
        }
    ]
}

function summarySidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                '(前端项目实战) 微信 H5音乐项目总结',
                'web前端知识体系精简',
                '如何让旧浏览器支持HTML5新标签'
            ]
        }
    ]
}

function featureSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                '扫码登录实现原理'
            ]
        }
    ]
}

function gitSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                '整理了一些常用的 Git 命令清单'
            ]
        }
    ]
}

function otherSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'MYSQL 入门全套',
                '一只猴子和那些超神的脚本',
                '居然是一个中文Github网站！该不会是个假的吧？',
                '常用的分布式事务解决方案',
                '浅谈浏览器http的缓存机制'
            ]
        }
    ]
}