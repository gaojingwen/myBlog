# 从promise到async function

     事实上async function只不过是对Promise一个很好的封装，从es6到es7，而async异步方法确实实现起来 也可以让代码变得很优雅，下面就由浅到深具体说说其中的原理。

## 长篇预警

     promise是es6中实现的一个对象，它接收一个函数作为参数。这个函数又有两个参数，分别是 resolve和reject。

```
const a = new Promise(function(resolve, reject){
	console.log(1)
	resolve(3)
	reject(5) 
	console.log(4)
})
console.log('outter')
console.log(a) 
	    
复制代码
```

结果如下：

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb5abc1577b92?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 

这里先提一个关键resolve与reject两个方法事实上对应着两个出口，是为了传递我们在方法中的参数(这里对应3和5)。不太了解也没事，下面会一直用到我这里说的概念。

```
console.log(4)
```

 

也就是说Promise对象可以从pending状态 变化为resolved状态或者是rejected状态，但是resolved状态和rejected状态之间可没办法相互转化（已经从出口出去了）

```
const a = new Promise(function(resolve, reject){
	console.log(1)
	setTimeout( () => {
		resolve('inner')
	})
})
console.log('outter')
console.log(a)

复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb64c6435f20e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

对于任意一个已经成为resolved状态或者是rejected状态的promise对象（这里就是a）。我们都可以用then方法来接收。而这个then方法，它就是异步的。

```
const a = new Promise(function(resolve, reject){
		console.log(1)		//1 
		
		resolve('inner') 
})
console.log('outter') //2

a.then(v => {
	console.log(v) //4
})

console.log(a) //3
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb6d3d6ce783b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
const a = new Promise(function(resolve, reject){
	console.log(1)		
	resolve('inner') 
})

const b = a.then(v => {
	console.log(v) 
})

setTimeout( () => {
	console.log(b)
})
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb74ec31c3eee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

     首先说明一下，所有的setTimeout（包括setInterval）都默认至少有一个4ms,就算你不写。并且setTimeout是浏览器提供的另一个线程来实现，而promise则是作为es6的规范。（如果用node就好解释了，我更倾向于认为Promise是类似于nexttick之类的接口。浏览器环境下的js并不像node具有多个队列，只有一个主线程运行队列，Promise一定会在当前主线程队列运行完毕的最后一个）。不了解的node也无所谓，这里只需要记住promise一定比setTimeout快！setTimeout有4ms呢！言归正传，实质上这里是帮我们返回了一个已经是resolved状态的Promise（具体规则见mdn），并且因为我们并没有传递参数，因此这里接收到的参数就是undefined。接着看代码

```
const a = new Promise(function(resolve, reject){		
	resolve('inner') 
})

const b = a.then(v => {
	return new Promise((resolve, reject) => {
	    resolve(v)
	})
})

setTimeout( () => {
	console.log(b)
},1000)

复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb77c2700f598?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
a.then(v => {
	return new Promise((resolve, reject) => {
		resolve(v)
	})
}).then(v => {

}).then(v =>{

})
复制代码
```

      哎哟，then一多，好丑啊。代码一点也不优雅，是的。这确实是个问题，这才引出了async的解决方案，但还不到谈那个的时间。让我们先把promise说完。
      可能有小伙伴发现了，reject你一直都没说呢？是的，先说完resolve再说这个，其实我个人理解rejcet为抛出一个异常，我们可以在then中去处理，但是我们也可以在catch中处理（我推荐这种，至于为什么，我把两种写法列出来你就明白了）。
     现在假设有一个业务逻辑，需要判断之后我们再决定走哪个出口。下面第一种是用then的

```
const a = new Promise(function(resolve, reject){	
	if(0)	{
		resolve('成功了') 
	} else {
		reject('错误了')
	}			
})


a.then( v => {
	console.log(v)
	return new Promise((resolve, reject) => {
		resolve(v)
	})
}, e => {
	console.log(e)
})
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cb85826104222?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```
a.then( v => {
	console.log(v)
	return new Promise((resolve, reject) => {
		resolve(v)
	})
}).catch(e => {
	console.log(e)
})
复制代码
```

结果图如上，我就不贴了。是不是很优雅？（额。。。。单纯指的是相对then来说。）
     总而言之，resolve，reject。对应两种状态，两种出口，出口中传递参数。出口之前都为同步。出口之后,then,catch都是异步，并且我们可以在then和catch中接收之前同步的传出来的参数。并且要注意的是resolve状态和reject两种出口我们要用不同的方式来接收。一种我认为是成功，一种是异常，异常必须要去捕获。
     说到这里其实promise也差不多了，再提两个方法，一个是Promise.race，一个是Promise.all。注意了，这两个都是类方法。Promise.race方法是将多个 Promise 实例，包装成一个新的 Promise 实例。

```
const result = Promise.race([a, b, c]);
复制代码
```

     a,b,c都是promise的实例，这三个实例哪一个先结束，就先返回一个。result就变成哪一个。举个场景就明白了。现在我们需要一张图片，这个图片异步加载，但是它是哪张我不关心（只要是给定的三张中的一张），我定了三个异步任务，先返回的那张我放到html上。嗯，就这么简单。但是要注意，如果第一个结束的是错误的，一样也是算作跑最快的那个，返回给result。因此外面应该用catch接收一下，同时自行判断逻辑（可能因为网络的原因需要我们再执行一遍啦还是啥）
     Promise.all。他必须要接收的promise实例全部变为resolve才返回（返回这些promise实例中resolve中的参数组成的数组），有一个变成reject，它就返回这个reject的参数。直接举例子。我们需要异步加载三张图片，但是我必须要三张全部加载完我一起显示，我不要一张一张的出来。三张都出来就是resolve，任意一张失败了不好意思我就都不给你显示。
     剩下的还有一些promise方法我就不多说了，用的也不多，直接看文档就好了。

## 重头戏来了,async function!

     实际上，async function的使用方法跟普通函数一模一样，如果你在async function中没有使用await关键字 的话，从某种程度上来说它就是普通函数。。。。先来个代码压压惊。

```
async function test() {
	console.log(1)
	const a = await new Promise(function(resolve, reject){
		resolve(3)
	})
	console.log(a)
}

test()
console.log(2)
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cba2b4c21b070?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

     还是一样，代码说话

```
async function test() {
	console.log(1)
	const a = await new Promise(function(resolve, reject){
		resolve(3)
	})
	console.log('我是被处理后的：', a)
}

const b = test()
console.log('我是还没被处理后的：', b)

复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cba8be1bd0753?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

async function只是把我们这一整个函数用promise包装了一下

```
resolve(3)
```

是不是异步极其优雅的实现方法!!!

     有的同学就问了，那么await只能处理promise对象吗，不是的。见代码

```
async function test() {
	console.log(1)
	const b = await '我常常因为自己不够优秀而感到恐慌'
	console.log(b)
	const a = await new Promise(function(resolve, reject){
		resolve(3)
	})
	console.log('我是被处理后的：', a)
}

const b = test()
console.log('我是还没被处理后的：', b)

复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cbb23f0d34a6b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

无敌

```
async function test() {
	const a = await new Promise(function(resolve, reject){
		reject(3)
	})	
}
test()
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cbb6bb3ed5e6a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

报错了。。咋办呢。。。

```
async function test() {
	try {
		const a = await new Promise(function(resolve, reject){
			reject('完蛋，我会被捕获')
		})		
	} catch(e) {
		console.log(e)
	}

}
test()
复制代码
```

![img](https://user-gold-cdn.xitu.io/2018/7/24/164cbb7ec68dca78?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

     很好，下面来个再度进阶的，也是我个人之前遇到的一个坑。场景是这样的，我做了一个非常简单的爬虫(puppeteer)，主要就是爬取图片然后下载到本地。 场景中有这样一段代码。

```
	srcs.forEach( async(src) => {
		await srcImages(srcs[i], config.cat)
		console.log(1)
		page.waitfor(200)
	})
	async srcImages(){conole.log(2)//balabalabalabala具体逻辑就略过了} 
复制代码
```

     大概意思就是我爬取了每个图片的网址，放在一个数组里，然后对数组里面每个地址都调用一个函数，这个函数负责下载。并且这个函数就是用async包裹的，（还记得async就是把一整个函数用Promise包裹吗），然后每一次下载完我都等待200ms，避免操作太频繁把我IP封了。问题来了，小伙伴猜猜输出？？？？
     结果证明，我一开始的想法完全错误，这些1是连续打出来的。嘿嘿嘿，为什么会这样呢？我来捋一捋，我们一开始对数组第一项进行操作，遇到了第一个await，很好，后面代码全部异步等待。**关键来了**,主线任务接着运行，开始操作数组的第二项。。。。。就这样，把数组全部遍历完毕之后，我们再全部一起下载（之前都全部挂在异步等待同步的主线程运行结束呢）。。。。。全部下载完后，我们打印所有的2。。。。然后我们再我们打印所有的1。。。我们再等待200ms * 数组长度的时间。。 。饿。。。坑人。。。那么我最后是怎么解决的？

```
		async function test() {
			for(let i = 0; i < srcs.length; i++) {
				await srcImages(srcs[i], config.cat)
				await page.waitfor(200)
			}
		}
		test()
复制代码
```

     嘿嘿嘿，还是用for循环来代替forEach好一些。这里也给我提了个警钟，当传统的那些forEach,map之流遇到async的时候，还是应该注意一下的，可能会跟预想的逻辑不一样哦。

     在这篇文章之后，后续的文章我应该都只会发到自己的[博客](https://link.juejin.im/?target=https%3A%2F%2Fcyboning.github.io%2F)上。每次发的时候应该都会在掘金沸点更新一下。但如果文章较长的话我应该也会先在掘金上更新一下（毕竟图片多了的话。掘金上外链直接生成，而不是存在本地）。

     好了，到这里也就结束了。不了解node的小伙伴们可以撤了。下面贴一个在node中自己实现的promisify方法。

```
const fs = require('fs');
    
function promisify(f) {
	return function() { //虽然这里函数没参数，但运行时肯定会有参数哦
		let args = Array.prototype.slice.call(arguments)
		return new Promise((resolve,reject) => {
			args.push((err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
			f.apply(null, args)
		})
	}
}
  readFile = promisify(fs.readFile);
  
 //基础版
 readFile('./app.js').then( data => {
 	console.log(data.toString())
 }).catch(e => {
 	console.log(e)
 })
 
//进阶版！ 使用async await
async funtion test() {
    try {
        const content = await readFile('./app.js')
        console.log(content)
    } catch(e) {
            
    }
}    

复制代码
```

     回调地狱问题在node中非常明显，而我们通过promisify可以将一个函数转化为Promise对象。node中任何一个函数的最后一个回调函数一定是`(err, data) => {}`。因此这里我们就把其作为数组的最后一项。如果err我们就从reject出口 出去，如果成功就从resolve出口出去。而第一步promisify则是有点像是函数柯里化，返回一个函数地址。好了文章到这里就结束了。