jerryAnimate 为H5动画而生
====

## 灵感来源
之所以开发此框架，是因为项目对h5动画的需求量非常大，由一开始的手写`css`的`animation`到直接调用`animate.css`动画包，使得开发速度提高了很多，但随着对`h5`动画要求越来越高，这种定制的`animate.css`动画包越来越不适用了，于是又回到了重新手写`css`动画的时代。但是手写出来的动画只是跟`animate.css`包里的动画有稍微的区别而已，那时候就想，如果能继续调用动画包里的动画，只是设置一些动画参数去改变动画轨迹和一些效果，那么开发速度有提高了。于是，才有了现在的这个动画框架。总之，`jerryAnimate`的开发灵感来自`animate.css`动画包。

## 概述
`jerryAnimate`是一款快速开发h5动画的框架，动画调用DOM标签的特有属性来执行动画；
通过渲染之后，在我们需要播放动画的时候给其父节点加上`active`样式即可，这种调用方式跟`animate.css`是一致的。

## 框架的依赖和兼容性
由于是H5动画，所以框架只支持标准浏览器，选用了一款轻量级`Zepto`作为开发依赖，具体代码请下载本案例。调用方式如下：

```html
<script src="../js/zepto.min.js"></script>
<script src="../js/jerryAnimate-v2.0.js" data-autoRender="true"></script>
```

## 动画调用案例
标签属性`data-animate`，调用代码如下：

```html
<div id="area1" class="active">
    <div class="box" data-animate="{'animation':'slide', 'details':{'startX':'500px', 'targetY':'500px'}}"></div>
</div>
```

可以看到以上代码中，标签`data-animate`所装载的就是动画数据。其中，`slide`是动画模板的名称；`details`里面是对该动画模板的参数设置。
有关动画模板会在下方做详细解释。

动画的回调
注：回调功能必须用 `data-callback="true"`开启；循环动画将不会抛出回调事件
```js
$('.box').on('animateCallback', function() {
    console.log('box 动画完成');
});
```

## 动画渲染
框架会获取标签里的动画属性来动态生成css3的animation，当生成完毕之后，再把其样式加到该节点上。
框架提供了三种渲染方式：

1、自动渲染。`data-autoRender="true"`，默认为`false`；开启之后，DOM在抛出ready事件时会自动渲染所有动画数据。

```html
<script src="../js/jerryAnimate-v2.0.js" data-autoRender="true"></script>
```

2、手动渲染。此种方式的好处就是可以根据需求来限定渲染的范围（即选择器内的范围）

```js
jerryAnimate($('#area1')); //为id是area1的节点渲染动画数据
```

3、动态添加动画数据，并渲染。当需要动态计算动画数据时，可以采用这种方式去实现。

```js
var oBox = $('.box2').eq(2);
oBox.attr('data-animate', "{'animation':'fadeInRight', 'details':{'duration':2000, 'alternate':true}}");
jerryAnimate(oBox);
```


## 队列动画
队列动画是由多个单体动画组合而成的，从字面上就可以理解成单个动画排列成队，从前往后一一执行。
标签属性`data-queue`。

#### 需求范围
需要两个或以上动画才能实现效果，例如进场动画之后就是循环动画，此时需要调用动画框架中的队列动画方能实现效果。

#### 注意事项
1、当队列动画（`data-queue`）和普通动画（`data-animate`）共存时，只播放队列动画。<br>
2、在动画队列中，当前动画为循环动画时，队列将停留在当前动画，不会进入下一个动画。

#### 调用代码
```html
<div class="box box2" data-queue="{'slide':{'targetY':'500px'}}, {'slide':{'targetX':'400px', 'startY':'500px'}}, {'slide':{'startX':'400px', 'targetX':'400px', 'targetY':'500px'}}, {'zoomIn':null}" data-callback="true"></div>
```

#### 动画的回调。
注：回调功能必须用 `data-callback="true"`开启；循环动画将不会抛出回调事件
当队列中的每一个动画完成时，都会抛出一个回调事件，该回调中包含了该动画在队列中的序列号，调用如下：

```js
$('.box2').on('animateCallback', function(ev, index) {
    //队列序号从0开始算起
    console.log('box2 队列动画完成，完成当前动画的队列序号：' + index);
});
```

#### 重置队列动画
1、当切换回原来的页面之后，需要重新播放原来的队列动画。<br>
2、多个单一的动画组合，此时调用重置，可以做成一个循环动画。<br>
3、调用代码：

```js
jerryAnimate().resetQueue('#wrap'); //'#wrap'是选择器 或是 Zepto对象
```

## 动画模板
#### 概念
顾名思义，就是预先做好的动画模板，以备大量使用。<br>
动画模板的存在，极大的提高了开发h5动画的速度。<br>
在框架中内置了两个最常用的动画模板，即`fadeIn`和`slide`。

#### 模板的扩展
显然，框架中内置的两个动画模板是不能满足开发需求的。<br>
在实际的开发中，可能需要更多的动画模板。此处不希望所有的模板都放在框架内，有些模板并不是所有项目都需要的，也不希望框架因此变得冗长难以维护。所以，框架对外提供了模板的扩展方法。<br>
模板的扩展分以下两种情况：
1、引入`template.js`，此脚本中提供了项目中比较常用的模板。注：建议对比较常用的模板可以收集在此文件中，方便下次开发直接使用。
2、外部模板扩展。即该模板不在框架内，也不在`template.js`里面。好处是该模板只是在该项目中被大量使用，而不会污染`template.js`。代码如下：

```js
jerryAnimate().extendTemplate({
    'fadeInRight': {
        'defs': {
            'startX': '100%',
            'startY': 0,
            'startZ': 0,
            'targetX': 0,
            'targetY': 0,
            'targetZ': 0
        },
        'style': '@-webkit-keyframes #animationClass# {\n\
                      0% {\n\
                          opacity: #startOpacity#;\n\
                          -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                          transform: translate3d(#startX#, #startY#, #startZ#);\n\
                      }\n\
                      100% {\n\
                          opacity: #targetOpacity#;\n\
                          -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                          transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                      }\n\
                  }\n\
                  @keyframes #animationClass# {\n\
                      0% {\n\
                          opacity: #startOpacity#;\n\
                          -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                          transform: translate3d(#startX#, #startY#, #startZ#);\n\
                      }\n\
                      100% {\n\
                          opacity: #targetOpacity#;\n\
                          -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                          transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                      }\n\
                  }'
    }
});
```

#### 模板的制作
学会模板的制作，对开发的帮助非常大，同时也能帮助加深对框架的理解。<br>
看到这里，大家可能会对模板的制作非常感兴趣，下面说一下模板是怎么制作的。






