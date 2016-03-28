/**
 * Created by LinJe on 2015/11/26.
 * H5 Animation 动画框架
 * 依赖 zepto.js
 */
;(function( $, window, document, undefined ) {

    //用于html中的标签，此标签保存了所有的动画数据
    var animateTag = 'data-animate',
        queueTag = 'data-queue',
        autoRenderTag = 'data-autoRender',
        callBackTag = 'data-callback',
        styleTag = document.createElement('style'),
        styleStr = '';

    //生成的唯一动画存储到缓存中，确保其唯一性
    var cacheAnimation = {};

    //记录每个标签的队列动画的class名，每个标签的所有队列动画是一个数组
    var queueDictionary = {};

    /**
     * 基础模板
     * 可在模板的基础上调整动画细节
     */
    var template = {
        'animationDefs': {
            'duration': 1000,
            'function': 'ease',
            'fillMode': 'both',
            'infinite': false,
            'alternate': false
        },

        //滑动效果
        'slide': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        //淡出效果
        'fadeIn': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0,
                'startOpacity': 0,
                'targetOpacity': 1
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
    };

    //扩展模板
    $.extend(template, {
        'fadeInLeft': {
            'defs': {
                'startX': '-100%',
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': template.fadeIn.style
        }
    });

    //定义基础对象原型
    var superBase = function() {
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        _this.styleInfoQueue = [];
        $.extend(_this.defs, template.animationDefs);
    };

    superBase.prototype.handleStyle = function( style, animationClass ) {
        var _this = this,
            newStyle = style.replace(/(#\w+#)/g, function($0) {
                var attr = $0.replace(/#/g, '');
                return attr != 'animationClass' ? _this.defs[attr] : animationClass;
            });

        return newStyle;
    };

    //为兼容css样式命名书写规范，分别处理%号、贝塞尔格式、去掉 "."
    superBase.prototype.filterSpecial = function( animationClass ) {
        animationClass = animationClass.replace(/\%|\.|\(.+\)/g, function($0) {
            var result;
            if ( $0.indexOf('%') == -1 ) {
                result = $0.replace(/\(|\)|\,|\s|\./g, '');
            } else if ( $0.indexOf('.') != -1 ) {
                result = '';
            } else {
                result = 'percent';
            }
            return result;
        });
        return animationClass;
    };

    superBase.prototype.getStyle = function( type ) {
        return type != 'queue' ? this.styleInfo : this.styleInfoQueue;
    };

    superBase.prototype.addAnimate = function( opts ) {
        var _this = this,
            defs = _this.defs,
            animationName = opts.animation,
            animationClass = animationName,
            curTemplate = template[animationName],
            duration,
            timingFunction,
            fillMode,
            infinite,
            alternate,
            delay;

        $.extend(defs, curTemplate.defs); //合并默认参数
        $.extend(defs, opts.details); //动画数据参数覆盖默认参数

        duration = defs.duration;
        timingFunction = defs.function;
        fillMode = defs.fillMode;
        delay = defs.delay;
        infinite = defs.infinite ? '-webkit-animation-iteration-count:infinite; animation-iteration-count:infinite;\n' : '';
        alternate = defs.alternate ? '-webkit-animation-direction:alternate; animation-direction:alternate;\n' : '';
        delay = delay ? '-webkit-animation-delay:'+delay+'ms; animation-delay:'+delay+'ms;\n' : '';

        $.each(defs, function(attr, key) {
            animationClass += key;
        });

        //为兼容css样式命名书写规范，分别处理%号、贝塞尔格式、去掉 "."
        animationClass = _this.filterSpecial(animationClass);

        _this.styleInfo = {
            'animationClass': animationClass,
            'style': '\n' + _this.handleStyle(curTemplate.style, animationClass) +
                            '\n.active>.'+ animationClass +' {\n\
                                -webkit-animation-name: '+ animationClass +';\n\
                                animation-name: '+ animationClass +';\n\
                                -webkit-animation-timing-function: '+ timingFunction +';\n\
                                animation-timing-function: '+ timingFunction +';\n\
                                -webkit-animation-duration: '+ duration +'ms;\n\
                                animation-duration: '+ duration +'ms;\n\
                                -webkit-animation-fill-mode: '+ fillMode +';\n\
                                animation-fill-mode: '+ fillMode +';\n\
                                '+ infinite + alternate + delay +'\n\
                            }'
        };

        return _this;
    };

    superBase.prototype.addQueue = function( opts ) {
        var _this = this,
            defs,
            animationName,
            animationClass,
            curTemplate,
            duration,
            timingFunction,
            fillMode,
            infinite,
            alternate,
            delay;

        //清空容器
        _this.styleInfoQueue.length = 0;

        $.each(opts, function(key, value) {
            _this.resetConfig();
            defs = _this.defs;

            for ( var attr in value ) {
                animationName = attr;
            }
            animationClass = animationName;
            curTemplate = template[animationName];

            $.extend(defs, curTemplate.defs); //合并默认参数
            $.extend(defs, value[animationName]); //动画数据参数覆盖默认参数
            //console.log(JSON.stringify(_this.defs));

            duration = defs.duration;
            timingFunction = defs.function;
            fillMode = defs.fillMode;
            delay = defs.delay;
            infinite = defs.infinite ? '-webkit-animation-iteration-count:infinite; animation-iteration-count:infinite;\n' : '';
            alternate = defs.alternate ? '-webkit-animation-direction:alternate; animation-direction:alternate;\n' : '';
            delay = delay ? '-webkit-animation-delay:'+delay+'ms; animation-delay:'+delay+'ms;\n' : '';

            $.each(defs, function(key, value) {
                animationClass += value;
            });

            //为兼容css样式命名书写规范，分别处理%号、贝塞尔格式、去掉 "."
            animationClass = _this.filterSpecial(animationClass);

            _this.styleInfoQueue.push({
                'animationClass': animationClass,
                'style': '\n' + _this.handleStyle(curTemplate.style, animationClass) +
                '\n.active>.'+ animationClass +' {\n\
                                -webkit-animation-name: '+ animationClass +';\n\
                                animation-name: '+ animationClass +';\n\
                                -webkit-animation-timing-function: '+ timingFunction +';\n\
                                animation-timing-function: '+ timingFunction +';\n\
                                -webkit-animation-duration: '+ duration +'ms;\n\
                                animation-duration: '+ duration +'ms;\n\
                                -webkit-animation-fill-mode: '+ fillMode +';\n\
                                animation-fill-mode: '+ fillMode +';\n\
                                '+ infinite + alternate + delay +'\n\
                            }'
            });
        });

        return _this;
    };

    superBase.prototype.resetConfig = function(){
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        $.extend(_this.defs, template.animationDefs);
    };

    //字符串转json数据
    superBase.prototype.strToJson = function(str){
        return (new Function("return " + str))();
    };

    //模板继承扩展
    superBase.prototype.extendTemplate = function( newTemplate ) {
        $.extend(template, newTemplate);
        return this;
    };

    //生成唯一标识符 guid
    superBase.prototype.generateGuid = function() {
        var guid = '';

        for (var i = 1; i <= 32; i++) {
            guid += Math.floor(Math.random() * 16.0).toString(16);
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
        }
        return guid;
    };

    //重置队列动画
    superBase.prototype.resetQueue = function() {
        var _this = this, $context, children;

        $context = arguments.length > 1 ? $(arguments[0], arguments[1]) : $(arguments[0]);
        children = $context.find('['+queueTag+']');

        $($context.concat(children)).each(function() {
            var thisTag = $(this),
                queueId = thisTag.attr('_queueid');

            if ( queueId ) {
                var thisQueue = queueDictionary[queueId];

                $.each(thisQueue, function(key, value) {
                    thisTag.hasClass(value) && thisTag.removeClass(value);
                });
                thisQueue.index = -1;
                thisTag.addClass(thisQueue[0]);
            }
        });

        return _this;
    };

    //渲染队列动画
    superBase.prototype.renderQueue = function( thisTag ) {
        var _this = this,
            dataQueue = [],
            styleInfoQueue,
            queueClass = [],
            style,
            aQueueTags = thisTag.attr(queueTag).split('}},'),
            tagLength = aQueueTags.length;

        $.each(aQueueTags, function(index, value) {
            var queryValue = index < tagLength-1 ? value+'}}' : value;
            dataQueue.push(_this.strToJson($.trim(queryValue)));
        });

        if ( dataQueue ) {
            styleInfoQueue = _this.addQueue(dataQueue).getStyle('queue');

            //将动画的css数据缓存
            styleInfoQueue.forEach(function(item, index) {
                //将动画的css数据缓存
                queueClass.push(item.animationClass);
                style = item.style;

                index == 0 && thisTag.addClass(queueClass[0]);
                if ( !cacheAnimation[queueClass[index]] ) {
                    styleStr += style;
                    cacheAnimation[queueClass[index]] = style;
                }
            });

            //监视队列中的动画清空
            if ( styleInfoQueue.length ) {
                var queueLength = queueClass.length,
                    queueId = _this.generateGuid();

                queueClass.index = -1;
                queueDictionary[queueId] = queueClass;
                thisTag.attr('_queueid', queueId).on('webkitAnimationEnd animationend', function() {
                    queueClass.index ++;
                    thisTag.attr(callBackTag)=='true' && thisTag.trigger('animateCallback', queueClass.index); //对外抛出事件
                    if ( queueClass.index < queueLength-1 ) {
                        thisTag.removeClass(queueClass[queueClass.index]).addClass(queueClass[queueClass.index+1]);
                    } else {
                        queueClass.index = -1;
                    }
                });
            }

            return _this;
        }
    };

    //渲染普通动画
    superBase.prototype.renderAnimate = function( thisTag ) {
        var _this = this,
            dataAnimate,
            styleInfo,
            animationClass,
            style;

        _this.resetConfig();
        dataAnimate = _this.strToJson(thisTag.attr(animateTag));

        if ( dataAnimate ) {
            styleInfo = _this.addAnimate(dataAnimate).getStyle();

            //将动画的css数据缓存
            animationClass = styleInfo.animationClass;
            style = styleInfo.style;

            if ( !cacheAnimation[animationClass] ) {
                styleStr += style;
                cacheAnimation[animationClass] = style;
            }

            thisTag.addClass(animationClass);
            if ( thisTag.attr(callBackTag) == 'true' ) {
                thisTag.on('webkitAnimationEnd animationend', function() {
                    thisTag.trigger('animateCallback'); //对外抛出事件
                });
            }
        }

        return _this;
    };

    /**
     * 动画渲染
     * 1、获取页面中所有动画数据
     * 2、添加动画样式
     * 3、渲染到每个标签的class上
     */
    superBase.prototype.render = function() {
        var _this = this, $context, children;

        $context = arguments.length > 1 ? $(arguments[0], arguments[1]) : $(arguments[0]);
        children = $context.find('['+queueTag+'],['+animateTag+']');

        $($context.concat(children)).each(function() {
            var thisTag = $(this);

            if ( thisTag.attr(queueTag) ) {
                //队列动画
                _this.renderQueue(thisTag);
            } else {
                //普通动画
                _this.renderAnimate(thisTag);
            }
        });

        styleTag.innerHTML = styleStr;
        $(styleTag).remove();
        $('head').append(styleTag);

        return _this;
    };


    var baseAnimate = new superBase();

    //公开对外方法
    window.jerryAnimate = function() {
        if ( arguments.length != 0 ) {
            if ( arguments.length > 1 ) {
                baseAnimate.render(arguments[0], arguments[1]);
            } else {
                baseAnimate.render(arguments[0]);
            }
        }
        return baseAnimate;
    };

    jerryAnimate.template = template;


    //是否自动渲染动画
    $(document).ready(function() {
        $('body').find('['+ autoRenderTag +']').each(function() {
            var thisScript = $(this);
            if ( thisScript.attr(autoRenderTag) == 'true' ) {
                jerryAnimate('body');
                return;
            };
        });
    });

})( Zepto, window, document );