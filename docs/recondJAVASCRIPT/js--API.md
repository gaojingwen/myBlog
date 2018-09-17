# js--API

## js阻止默认事件

event.preventDefault() **阻止特定事件的默认行为**（只有 cancelable 设置为 true 的事件才可以使用），比如：点击 type="submit" 的 input 标签提交表单，你在 onclick 事件处理中调用 event.preventDefault()方法， 那么在点击 submit 后就不会自动提交表单了。但是并不阻止事件冒泡。

event.stopPropagation() 立即停止事件在 DOM 层次中的传播，即阻止事件冒泡。但是，并不阻止默认行为。

return false 之后的所有相关的触发事件和动作都不会被执行。阻止事件继续传播，事件冒泡和默认行为都被阻止。



