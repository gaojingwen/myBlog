# JS数组循环的性能和效率分析（for、while、forEach、map、for of）

## 前言

前端开发中经常涉及到数组的相关操作：去重、过滤、求和、数据二次处理等等。都需要我们对数组进行循环。为了满足各种需求，JS除了提供最简单的`for`循环，在`ES6`和后续版本中也新增的诸如：`map、filter、some、reduce`等实用的方法。因为各个方法作用不同，简单的对所有涉及到循环的方法进行执行速度比较，是不公平的，也是毫无意义的。那么我们就针对**最单纯的以取值为目的的循环**进行一次性能和效率测试，用肉眼可见的方式，对JS中常见的这些数组循环方式进行一次探讨。

## 从最简单的for循环说起

#### `for`循环常见的四种写法，不啰嗦，直接上代码

```
const persons = ['郑昊川', '钟忠', '高晓波', '韦贵铁', '杨俊', '宋灿']
// 方法一
for (let i = 0; i < persons.length; i++) {
  console.log(persons[i])
}
// 方法二
for (let i = 0, len = persons.length; i < len; i++) {
  console.log(persons[i])
}
// 方法三
for (let i = 0, person; person = persons[i]; i++) {
  console.log(person)
}
// 方法四
for (let i = persons.length; i--;) {
  console.log(persons[i])
}
复制代码
```

1. 第一种方法是最常见的方式，不解释。

2. 第二种方法是将`persons.length`缓存到变量`len`中,这样每次循环时就不会再读取数组的长度。

3. 第三种方式是将取值与判断合并，通过不停的枚举每一项来循环，直到枚举到空值则循环结束。执行顺序是：

   - 第一步：先声明索引`i = 0`和变量`person`

   - 第二步：取出数组的第`i`项`persons[i]`赋值给变量`person`并判断是否为[Truthy](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FGlossary%2FTruthy)

   - 第三步：执行循环体，打印`person`

   - 第四步：

     ```
     i++
     ```

     。

     > 当第二步中`person`的值不再是[Truthy](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FGlossary%2FTruthy)时，循环结束。方法三甚至可以这样写

     ```
     for (let i = 0, person; person = persons[i++];) {
       console.log(person)
     }
     复制代码
     ```

4. 第四种方法是倒序循环。执行的顺序是：

   - 第一步：获取数组长度，赋值给变量`i`

   - 第二步：判断`i`是否大于0并执行`i--`

   - 第三步：执行循环体，打印

     ```
     persons[i]
     ```

     ，此时的

     ```
     i
     ```

     已经

     ```
     -1
     ```

     了

     > 从后向前，直到`i === 0`为止。这种方式不仅去除了每次循环中读取数组长度的操作,而且只创建了一个变量`i`。

#### 四种`for`循环方式在数组浅拷贝中的性能和速度测试

先造一个足够长的数组作为要拷贝的目标(如果`i`值过大，到亿级左右，可能会抛出JS堆栈跟踪的报错)

```
const ARR_SIZE = 6666666
const hugeArr = new Array(ARR_SIZE).fill(1)
复制代码
```

然后分别用四种循环方式，把数组中的每一项取出，并添加到一个空数组中，也就是一次数组的浅拷贝。并通过[console.time](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FConsole%2Ftime)和[console.timeEnd](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FConsole%2FtimeEnd)记录每种循环方式的整体执行时间。通过[process.memoryUsage()](https://link.juejin.im/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2017%2F04%2Fmemory-leak.html)比对执行前后内存中已用到的堆的差值。

```
/* node环境下记录方法执行前后内存中已用到的堆的差值 */
function heapRecord(fun) {
  if (process) {
    const startHeap = process.memoryUsage().heapUsed
    fun()
    const endHeap = process.memoryUsage().heapUsed
    const heapDiff = endHeap - startHeap
    console.log('已用到的堆的差值: ', heapDiff)
  } else {
    fun()
  }
}
复制代码
```

```
// 方法一，普通for循环
function method1() {
  var arrCopy = []
  console.time('method1')
  for (let i = 0; i < hugeArr.length; i++) {
    arrCopy.push(hugeArr[i])
  }
  console.timeEnd('method1')
}
// 方法二，缓存长度
function method2() {
  var arrCopy = []
  console.time('method2')
  for (let i = 0, len = hugeArr.length; i < len; i++) {
    arrCopy.push(hugeArr[i])
  }
  console.timeEnd('method2')
}
// 方法三，取值和判断合并
function method3() {
  var arrCopy = []
  console.time('method3')
  for (let i = 0, item; item = hugeArr[i]; i++) {
    arrCopy.push(item)
  }
  console.timeEnd('method3')
}
// 方法四，i--与判断合并，倒序迭代
function method4() {
  var arrCopy = []
  console.time('method4')
  for (let i = hugeArr.length; i--;) {
    arrCopy.push(hugeArr[i])
  }
  console.timeEnd('method4')
}
复制代码
```

分别调用上述方法，每个方法重复执行12次,去除一个最大值和一个最小值，求平均值(四舍五入)，最终每个方法执行时间的结果如下表(测试机器：`MacBook Pro (15-inch, 2017) 处理器：2.8 GHz Intel Core i7 内存：16 GB 2133 MHz LPDDR3` 执行环境：`node v10.8.0`)：

| -        | 方法一               | 方法二               | 方法三               | 方法四               |
| -------- | ----------------- | ----------------- | ----------------- | ----------------- |
| 第一次      | 152.201ms         | 156.990ms         | 152.668ms         | 152.684ms         |
| 第二次      | 150.047ms         | 159.166ms         | 159.333ms         | 152.455ms         |
| 第三次      | 155.390ms         | 151.823ms         | 159.365ms         | 149.809ms         |
| 第四次      | 153.195ms         | 155.994ms         | 155.325ms         | 150.562ms         |
| 第五次      | 151.823ms         | 154.689ms         | 156.483ms         | 148.067ms         |
| 第六次      | 152.715ms         | 154.677ms         | 153.135ms         | 150.787ms         |
| 第七次      | 152.084ms         | 152.587ms         | 157.458ms         | 152.572ms         |
| 第八次      | 152.509ms         | 153.781ms         | 153.277ms         | 152.263ms         |
| 第九次      | 154.363ms         | 156.497ms         | 151.002ms         | 154.310ms         |
| 第十次      | 153.784ms         | 155.612ms         | 161.767ms         | 153.487ms         |
| **平均耗时** | **152.811ms**     | **155.182ms**     | **155.981ms**     | **151.700ms**     |
| **用栈差值** | **238511136Byte** | **238511352Byte** | **238512048Byte** | **238511312Byte** |

意不意外？惊不惊喜？想象之中至少方法二肯定比方法一更快的！但事实并非如此，不相信眼前事实的我又测试了很多次，包括改变被拷贝的数组的长度，长度从百级到千万级。最后发现：在`node`下执行完成同一个数组的浅拷贝任务，耗时方面四种方法的差距微乎其微，有时候排序甚至略有波动。 内存占用方面：**方法一 < 方法四 < 方法二 < 方法三**，但差距也很小。

`v8引擎`新版本针对**对象取值**等操作进行了最大限度的性能优化，所以方法二中缓存数组的长度到变量`len`中，并不会有太明显的提升。即使是百万级的数据，四种`for循环`的耗时差距也只是毫秒级，内存占用上四种for循环方式也都非常接近。在此感谢[YaHuiLiang](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fuser%2F5881e022128fe100682735aa)、[七秒先生](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fuser%2F58bf96c844d90400696b4c9b)、[戈寻谋doxP](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fuser%2F5aa5d7fa5188255579184954)、[超级大柱子](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fuser%2F57a1e90c5bbb500064ffc8c0%2Fposts)的帮助和指正，如果大佬们有更好的见解也欢迎评论留言。

同样是`v8引擎`的`谷歌浏览器`，测试发现四种方法也都非常接近。

但是在`火狐浏览器`中的测试结果：**方法二 ≈ 方法三 ≈ 方法四 < 方法一**，表明二三四这三种写法都可以在一定程度上优化`for循环`

而在`safari浏览器下`：**方法四 < 方法一 ≈ 方法二 ≈ 方法三**，只有**方法四**体现出了小幅度的优化效果。

#### 小结

考虑到在不同环境或浏览器下的性能和效率：

`推荐`：**第四种**`i--`倒序循环的方式。在奇舞团的这篇文章——[嗨，送你一张Web性能优化地图](https://link.juejin.im/?target=https%3A%2F%2Fjuejin.im%2Fentry%2F5b4da7efe51d45198f5c6234)的`2.3 流程控制`小节里也略有提及这种方式。

`不推荐`：**第三种**方式。主要是因为当数组里存在非`Truthy`的值时，比如`0`和`''`，会导致循环直接结束。

## `while`循环以及`ES6+的新语法forEach`、`map`和`for of`，会更快吗？

不啰嗦，实践是检验真理的唯一标准

```
// 方法五，while
function method5() {
  var arrCopy = []
  console.time('method5')
  let i = 0
  while (i < hugeArr.length) {
    arrCopy.push(hugeArr[i++])
  }
  console.timeEnd('method5')
}
// 方法六,forEach
function method6() {
  var arrCopy = []
  console.time('method6')
  hugeArr.forEach((item) => {
    arrCopy.push(item)
  })
  console.timeEnd('method6')
}
// 方法七,map
function method7() {
  var arrCopy = []
  console.time('method7')
  arrCopy = hugeArr.map(item => item)
  console.timeEnd('method7')
}
// 方法八,for of
function method8() {
  var arrCopy = []
  console.time('method8')
  for (let item of hugeArr) {
    arrCopy.push(item)
  }
  console.timeEnd('method8')
}
复制代码
```

测试方法同上，测试结果：

| -        | 方法五               | 方法六               | 方法七              | 方法八               |
| -------- | ----------------- | ----------------- | ---------------- | ----------------- |
| 第一次      | 151.380ms         | 221.332ms         | 875.402ms        | 240.411ms         |
| 第二次      | 152.031ms         | 223.436ms         | 877.112ms        | 237.208ms         |
| 第三次      | 150.442ms         | 221.853ms         | 876.829ms        | 253.744ms         |
| 第四次      | 151.319ms         | 222.672ms         | 875.270ms        | 243.165ms         |
| 第五次      | 150.142ms         | 222.953ms         | 877.940ms        | 237.825ms         |
| 第六次      | 155.226ms         | 225.441ms         | 879.223ms        | 240.648ms         |
| 第七次      | 151.254ms         | 219.965ms         | 883.324ms        | 238.197ms         |
| 第八次      | 151.632ms         | 218.274ms         | 878.331ms        | 240.940ms         |
| 第九次      | 151.412ms         | 223.189ms         | 873.318ms        | 256.644ms         |
| 第十次      | 155.563ms         | 220.595ms         | 881.203ms        | 234.534ms         |
| **平均耗时** | **152.040ms**     | **221.971ms**     | **877.795ms**    | **242.332ms**     |
| **用栈差值** | **238511400Byte** | **238511352Byte** | **53887824Byte** | **191345296Byte** |

在`node`下，由上面的数据可以很明显的看出，`forEach`、`map`和`for of` 这些`ES6+`的语法并没有传统的`for`循环或者`while`循环快，特别是`map`方法。但是由于`map`有返回值，无需额外调用新数组的`push`方法，所以在执行浅拷贝任务上，内存占用很低。而`for of`语法在内存占用上也有一定的优势。顺便提一下：`for循环 while循环 for of 循环`是可以通过`break`关键字跳出的，而`forEach map`这种循环是无法跳出的。

但是随着执行环境和浏览器的不同，这些语法在执行速度上也会出现偏差甚至反转的情况，直接看图：

`谷歌浏览器`

`火狐浏览器`

`safari浏览器下`

可以看出：

1. 谷歌浏览器中`ES6+`的循环语法会普遍比传统的循环语法慢，但是火狐和safari中情况却几乎相反。
2. 谷歌浏览器的各种循环语法的执行耗时上差距并不大。但`map`特殊，速度明显比其他几种语法慢，而在火狐和safari中却出现了反转，`map`反而比较快！
3. 苹果大法好

## 总结

之前有听到过诸如“缓存数组长度可以提高循环效率”或者“ES6的循环语法更高效”的说法。说者无心，听者有意，事实究竟如何，实践出真知。抛开业务场景和使用便利性，单纯谈性能和效率是没有意义的。 ES6新增的诸多数组的方法确实极大的方便了前端开发，使得以往复杂或者冗长的代码，可以变得易读而且精炼，而好的`for`循环写法，在大数据量的情况下，确实也有着更好的兼容和多环境运行表现。当然本文的讨论也只是基于观察的一种总结，并没有深入底层。而随着浏览器的更新，这些方法的孰优孰劣也可能成为玄学。目前发现在`Chrome Canary 70.0.3513.0`下`for of` 会明显比`Chrome 68.0.3440.84`快。如果你有更深入的见解或者文章，也不妨在评论区分享，小弟的这篇文章也权当抛砖引玉。如果你对数组的其他循环方法的性能和效率也感兴趣，不妨自己动手试一试，也欢迎评论交流。