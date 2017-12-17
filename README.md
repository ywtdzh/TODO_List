#Todo List

![Gif](https://github.com/ywtdzh/TODO_List/tree/master/Screenshots/GIF.gif)

##Deployment script

[Create a python virtualenv]

```shell
pip install -r requirements.txt 
npm install
webpack
python manage.py migrate
```

**非DEBUG模式需要配置额外的静态服务器**

##Functions

* 增加一个待办事项
* 删除一个待办事项
* 标记一个待办事项为已完成
* 编辑一个待办事项的具体内容
* 列出所有的待办事项
* 列表界面支持翻页
* 待办事项可以设置优先级
* 待办事项可以设置expire date
* 支持按照不同的方式排序，如优先级，expire date