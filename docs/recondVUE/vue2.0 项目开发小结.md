## vue2.0 项目开发小结

离尘不理人 [SegmentFault](javascript:void(0);) *2017-09-11*

#### 项目架构

项目目录

```
├── build├── config├── dist│   └── static│       ├── css│       ├── fonts│       ├── images│       ├── js│       └── lib├── src│   ├── api│   ├── assets│   │   ├── global│   │   └── images│   │       └── footer│   ├── components│   │   ├── common│   │   ├── news│   │   └── profile│   │       └── charge│   ├── config│   ├── mixin│   ├── router│   ├── service│   ├── store│   └── util└── static    ├── images    └── lib 
```

项目目录是采用 `vue-cli` 自动生成，其它按需自己新建就好了。

#### 开发实践

**动态修改 document title**

在不同的路由页面，我们需要动态的修改文档标题，可以将每个页面的标题配置在路由元信息 `meta` 里面带上，然后在 `router.beforeEach` 钩子函数中修改：

```
import Vue from 'vue';import Router from 'vue-router';Vue.use(Router);const router = new Router({  mode: 'history',  routes: [    { path: '/', component: Index, meta: { title: '推荐产品得丰厚奖金' } },    {      path: '/news',      component: News,      meta: { title: '公告列表' },      children: [        { path: '', redirect: 'list' },        { path: 'list', component: NewsList },        { path: 'detail/:newsId', component: NewsDetail, meta: { title: '公告详情' } }      ]    },    {      path: '/guide',      component: GuideProtocol,      meta: {        title: '新手指南'      }    }  ]});router.beforeEach((to, from, next) => {  let documentTitle = '商城会员平台';  // path 是多级的，遍历  to.matched.forEach((path) => {    if (path.meta.title) {      documentTitle += ` - ${path.meta.title}`;    }  });  document.title = documentTitle;  next();});
```

**Event Bus 使用场景**

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3pg5bicjq1iaSH7bt0mfYkBicrorUe45UutQ4kxSFMqBUBiclfq1n1kQp7qw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们在项目中引入了 `vuex` ，通常情况下是不需要使用 `eventbus` 的，但是有一种情况下我们需要使用它，那就是在路由钩子函数内部的时，在项目中，我们需要在 `beforeEnter` 路由钩子里面对外抛出事件，在这个钩子函数中我们无法去到 `this` 对象。

```
beforeEnter: (to, from, next) => {    const userInfo = localStorage.getItem(userFlag);    if (isPrivateMode()) {        EventBus.$emit('get-localdata-error');        next(false);        return;    }})
```

在 `App.vue` 的 `mouted` 方法中监听这个事件

```
EventBus.$on('get-localdata-error', () => {    this.$alert('请勿使用无痕模式浏览');});
```

**自定义指令实现埋点数据统计**

在项目中通常需要做数据埋点，这个时候，使用自定义指令将会变非常简单

在项目入口文件 `main.js` 中配置我们的自定义指令

```
// 坑位埋点指令Vue.directive('stat', {  bind(el, binding) {    el.addEventListener('click', () => {      const data = binding.value;      let prefix = 'store';      if (OS.isAndroid || OS.isPhone) {        prefix = 'mall';      }      analytics.request({        ty: `${prefix}_${data.type}`,        dc: data.desc || ''      }, 'n');    }, false);  }});
```

在组件中使用我们的自定义指令

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3pzNBdN7sHXnFXU4IT1iaGRVJibLqhTYDvr0ia5PzMxRHhWCYeZWXciaETSA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**使用过滤器实现展示信息格式化**

如下图中奖金数据信息，我们需要将后台返回的奖金格式化为带两位小数点的格式，同时，如果返回的金额是区间类型，需要额外加上 起 字和 ￥ 金额符号

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3pzNBdN7sHXnFXU4IT1iaGRVJibLqhTYDvr0ia5PzMxRHhWCYeZWXciaETSA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在入口文件 `main.js` 中配置我们自定义的过滤器

```
Vue.filter('money', (value, config = { unit: '￥', fixed: 2 }) => {  const moneyStr = `${value}`;  if (moneyStr.indexOf('-') > -1) {    const scope = moneyStr.split('-');    return `${config.unit}${parseFloat(scope[0]).toFixed(config.fixed).toString()} 起`;  } else if (value === 0) {    return value;  }  return `${config.unit}${parseFloat(moneyStr).toFixed(config.fixed).toString()}`;});
```

在组件中使用：

```
<p class="price">{{detail.priceScope | money}}</p><div :class="{singleWrapper: isMobile}">    <p class="rate">比率：{{detail.commissionRateScope}}%</p>    <p class="income">奖金：{{detail.expectedIncome | money}}</p></div>
```

**axios 使用配置**

在项目中，我们使用了 axios 做接口请求

在项目中全局配置 `/api/common.js`

```
import axios from 'axios';import qs from 'qs';import store from '../store';// 全局默认配置// 设置 POST 请求头axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';// 配置 CORS 跨域axios.defaults.withCredentials = true;axios.defaults.crossDomain = true;// 请求发起前拦截器axios.interceptors.request.use((config) => {  // 全局 loading 状态，触发 loading 效果  store.dispatch('updateLoadingStatus', {    isLoading: true  });  // POST 请求参数处理成 axios post 方法所需的格式  if (config.method === 'post') {    config.data = qs.stringify(config.data);  }  // 这句不能省，不然后面的请求就无法成功发起，因为读不到配置参数  return config;}, () => {  // 异常处理  store.dispatch('updateLoadingStatus', {    isLoading: false  });});// 响应拦截axios.interceptors.response.use((response) => {  // 关闭 loading 效果  store.dispatch('updateLoadingStatus', {    isLoading: false  });  // 全局登录过滤，如果没有登录，直接跳转到登录 URL  if (response.data.code === 300) {    // 未登录    window.location.href = getLoginUrl();    return false;  }  // 这里返回的 response.data 是被 axios 包装过的一成，所以在这里抽取出来  return response.data;}, (error) => {  store.dispatch('updateLoadingStatus', {    isLoading: false  });  return Promise.reject(error);});// 导出export default axios;
```

然后我们在接口中使用就方便很多了 `/api/xxx.js`

```
import axios from './common';const baseURL = '/api/profile';const USER_BASE_INFO = `${baseURL}/getUserBaseInfo.json`;const UPDATE_USER_INFO = `${baseURL}/saveUserInfo.json`;// 更新用户实名认证信息const updateUserInfo = userinfo => axios.post(UPDATE_USER_INFO, userinfo);// 获取用户基础信息const getUserBaseInfo = () => axios.get(USER_BASE_INFO);
```

**vuex 状态在响应式页面中的妙用**

由于项目是响应式页面，PC 端和移动端在表现成有很多不一致的地方，有时候单单通过 CSS 无法实现交互，这个时候，我们的 `vuex` 状态就派上用场了，

我们一开始在 `App.vue` 里面监听了页面的 `resize` 事件，动态的更新 `vuex` 里面 `isMobile`的状态值

```
window.onresize = throttle(() => { this.updatePlatformStatus({   isMobile: isMobile() });}, 500);
```

然后，我们在组件层，就能响应式的渲染不同的 `dom` 结构了。其中最常见的是 PC 端和移动端加载的图片需要不同的规格的，这个时候我们可以这个做

```
methods: {  loadImgAssets(name, suffix = '.jpg') {    return require(`../assets/images/${name}${this.isMobile ? '-mobile' : ''}${suffix}`);  },}<img class="feed-back" :src="loadImgAssets('feed-back')"<img v-lazy="{src: isMobile ? detail.imgUrlMobile : detail.imgUrlPc, loading: placeholder}">// 动态渲染不同规格的 dislog<el-dialog :visible.sync="dialogVisible" :size="isMobile ? 'full' : 'tiny'" top="30%" custom-class="unCertification-dialog"></el-dialog>
```

下图分别是 PC 端和移动短的表现形式，然后配合 CSS 媒体查询实现各种布局

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3pmib4BBBHvxQnfQDXWx2UQJ6W8ib5wibDHPvNwN1R6hGPgPX8wHdbUM3YA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3p8lbYhfTpia3HI7EKjxwDvfAgvjKmkO3WYQrmUSNLd4y6WnZXATyM2pQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

开发相关配置

**反向代理**

在项目目录的 `config` 文件下面的 `index.js` 配置我们的本地反向代理和端口信息

```
dev: {  env: require('./dev.env'),  port: 80,  autoOpenBrowser: true,  assetsSubDirectory: 'static',  assetsPublicPath: '/',  proxyTable: {    '/api/profile': {      target: '[真实接口地址]:[端口号]', // 例如： http://api.xxx.com      changeOrigin: true,      pathRewrite: {        '^/api/profile': '/profile'      }    }    ...  },
```

然后我们调用接口的形式就会变成如下映射，当我们调用 `/api/profile/xxxx` 的时候，其实是调用了 `[真实接口地址]/profile/xxxx`

```
/api/profile/xxxx => [真实接口地址]/profile/xxxx
```

**nginx 配置**

```
upstream api.xxx.com{ #ip_hash;  server [接口服务器 ip 地址]:[端口];}server {  ...  location ^~ /api/profile {    index index.php index.html index.html;    proxy_redirect off;    proxy_set_header Host $host;    proxy_set_header X-Real-IP $remote_addr;    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;    proxy_pass http://api.xxx.com;    rewrite ^/api/profile/(.*)$ /profile/$1 break;  }  ...}
```

**线上部署**

如果路由使用的是 `history` 模式的话，需要在 `nginx` 里面配置将所有的请求到转发到 `index.html` 去

在 `nginx.conf` 或者对应的站点 `vhost` 文件下面配置

```
location / {    try_files $uri $uri/ /index.html;}
```

#### 优化

**开启静态资源长缓存**

```
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|woff|ttf|eot|svg)$ {    expires 1y;}location ~ .*\.(js|css)$ {    expires 1y;}
```

**开启静态资源 gzip 压缩**

```
// 找到 nginx.conf 配置文件vim /data/nginx/conf/nginx.confgzip on;gzip_min_length  1k;gzip_buffers     4 8k;gzip_http_version 1.1;gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
```

开启了 gzip 压缩之后，页面资源请求大小将大大减小，如下图所示，表示已经开启了 `gzip`压缩

![img](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0cHx6kEIFfVV2Jo5lwyicic3pxBIBMrFYgJrpicialrfhgEhhDiarpzWibLBKXJdvONyt6ajFgjXLicqL9ibQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### Q&A

文章到这就结束了，如果有遗漏或者错误的地方，欢迎私信指出。希望这篇文章能带给大家一丝丝收获。

------