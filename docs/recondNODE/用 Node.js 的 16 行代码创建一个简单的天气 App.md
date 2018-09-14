## 用 Node.js 的 16 行代码创建一个简单的天气 App

景朝阳 [AutoCFE](javascript:void(0);) *2017-09-01*

原文地址：https://codeburst.io/build-a-simple-weather-app-with-node-js-in-just-16-lines-of-code-32261690901d

仅15分钟学会使用 API 调用并建立一个命令行天气应用程序。

本教程的范围

欢迎！这是多篇教程中的第一篇文章！

在本教程中,您将学习如何调

用 OpenWeatherMap.org API 并把结果输出到控制台。

\- 20 秒快速注册 OpenWeatherMap.org 账户。

\- Node.js : 如果没有安装 Node，请到官网 Node.js website 下载并安装。如果这样的项目你感兴趣并且你也在寻找 Node 更深入的教程请查看另一篇文章 Top Three Node.js courses

第一步：OpenWeatherMap

当你想玩玩 API ，OpenWeatherMap 是一个不错的地方。实际上有关于天气的11种不同的api供您访问。

对于这个项目我们将使用免费的 Current Weather API, 点击此处注册账号。

登陆之后， 点击 API keys, 在页面的右侧你可以创建一个 key，输入一个名称(任何)并选择生成。在页面左侧可以看到生成的 API Key。

![img](https://mmbiz.qpic.cn/mmbiz_png/gb0VkRWbm2PyX0Yic6WOSciciaibUe1K1tOdNuU6ANS5l6IUupKxOwibMvaWicKNlvpBN5Mxc3v5RLHMKAiboYahZlorw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

太棒了,现在我们有API密匙，可以开始创建我们的应用程序。

第二步：Setting up the project

\1. 创建 node-weather 文件夹然后执行：

npm init

\2. 填写所需的信息来初始化我们的项目

以下是我的 package.json 文件初始化后的样子。

注意:你本地的跟我的看起来略有不同,没关系。

{

  "name": "simple-nodejs-weather-app",

  "version": "1.0.0",

  "description": "",

  "main": "index.js",

  "scripts": {

​    "test": "echo \"Error: no test specified\" && exit 1"

  },

  "repository": {

​    "type": "git",

​    "url": "git+https://github.com/bmorelli25/simple-nodejs-weather-app.git"

  },

  "author": "brandon morelli",

  "license": "ISC",

  "bugs": {

​    "url": "https://github.com/bmorelli25/simple-nodejs-weather-app/issues"

  },

  "homepage": "https://github.com/bmorelli25/simple-nodejs-weather-app#readme",

  "dependencies": {

  }

}

\3.  创建 index.js 文件，此文件将包含应用程序的代码。

Making the API call

API调用，我们将使用一个受欢迎的npm模块 request 调用。 request 已经有数以百万的下载，是一个简化 http 请求的模块。

npm install request --save

就像我说的, request 很容易使用。我们只需要传惨 url，request 返回一个回调函数。

const request = require('request');

request(url, function (err, response, body) {

  if(err){

​    console.log('error:', error);

  } else {

​    console.log('body:', body);

  }

});

让我们分解这个代码

\1. 引入 request 包

\2. 传 url ，request 返回一个回调函数，其中参数为 err 、 response 、body

\3. 在请求中检查错误， 如果有 error ，输出到控制台

\4. 如果没有 error, 将 body 输出。

太棒啦，不过 url 是什么呢？

通过阅读OpenWeatherMap(https://openweathermap.org/current)  文档，能够确定 url 是什么。http://api.openweathermap.org/data/2.5/weather 需要两个必须的参数。已键值对形式通过 url 传递城市以及 API Key 。

let apiKey = '****************************';

let city = 'portland';

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

上述代码做了3件事

\1. 声明变量 apiKey 存放 API Key

\2. 声明变量  city 存放城市。

\3. 声明变量 url 存放接口地址，? 后面是查询参数，以 key = value 形式存在，不同参数间以 & 连接

代码整合后如下：

let request = require('request');

let apiKey = '*****************************';

let city = 'portland';

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {

  if(err){

​    console.log('error:', error);

  } else {

​    console.log('body:', body);

  }

});

控制台输入运行代码：

node index.js

// the following is returned:

body: {"coord":{"lon":-122.68,"lat":45.52},"weather":  [{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":302.15,"pressure":1014,"humidity":51,"temp_min":301.15,"temp_max":303.15},"visibility":16093,"wind":{"speed":2.6,"deg":320},"clouds":{"all":20},"dt":1497905580,"sys":{"type":1,"id":2274,"message":0.0042,"country":"US","sunrise":1497874905,"sunset":1497931383},"id":5746545,"name":"Portland","cod":200}

我们成功的请求了 OpenWeatherMap’s API 并返回了数据。数据里有好多信息，比如 温度、湿度、风速等等

重要提示：你永远不会像这样在你的代码中公开你的API密钥。为了简洁起见，我像这样把它放在公开的地方。在以后的教程中，我将向您展示如何使用环境变量隐藏 API 。现在，只需要知道像这样公开 API 密钥是不标准的。

整理返回数据

这个应用程序还不能用。返回的数据混乱杂乱令人讨厌。让我们把整理下。

我们需要做的第一件事是将返回字符串 json 转换成 JavaScript 对象。

我们用以下代码转换：

let weather = JSON.parse(body)

现在我们有了 JavaScript 对象，我们可以用点或括号符号来访问对象中的数据。下面，我们通过访问天气对象中的数据构造消息字符串。

let message = `It's ${weather.main.temp} degrees in${weather.name}!`;

console.log(message);

执行程序，输出如下：

node index.js

// It's 300.4 degrees in Portland

稍等。程序没有错，OpenWeatherMap  默认返回 Kelvin 温度。如果需要华氏温度添加参数 units=imperial。

执行代码：

node index.js

// It's 70.1 degrees in Portland

修改后代码如下：

let request = require('request');

let apiKey = '***********************************';

let city = 'portland';

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {

  if(err){

​    console.log('error:', error);

  } else {

​    let weather = JSON.parse(body)

​    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

​    console.log(message);

  }

});

添加交互性

我们的应用程序仍然很无聊。我们只能访问波特兰俄勒冈的天气。让我们添加一些互动。为此，我们将使用yargs(https://www.npmjs.com/package/yargs)。 Yargs是交互式命令行接口工具。或者更简单地说，它允许我们从命令行定义变量。

安装 yargs :

npm install yargs --save

yargs 将控制台输入的变量放在 argv 对象里。我们设置和访问这个对象如下：

const argv = require('yargs').argv;

我们将使用 c 表示城市:

修改 city 变量为 argv.c 。如果没有输入变量，默认为 Portland 。如下：

let city = argv.c || 'portland';

运行程序:

node index.js

我们需要传递一个名为 c 的变量，如下所示

node index.js -c Boston

// It's 85 degrees in Boston

我们使用一个标志表示传递的变量。因为我们将变量设置为字母 c，所以我们用 c 传递变量。c 后面可以跟任何我们想要的城市名称！

node index.js -c Anchorage

// It's 47 degrees in Anchorage

在这一点上，我们的代码入下：

const request = require('request');

const argv = require('yargs').argv;

let apiKey = '*****************************';

let city = argv.c || 'portland';

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {

  if(err){

​    console.log('error:', error);

  } else {

​    let weather = JSON.parse(body)

​    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

​    console.log(message);

  }

});

你做到了！