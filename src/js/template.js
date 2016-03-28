/**
 * Created by LinJe on 2015/11/30.
 * jerryAnimate.js 的模板扩展
 */
;(function( jerryAnimate ) {

    jerryAnimate().extendTemplate({

        //旋转
        'rotate': {
            'defs': {
                'startAngle': '0deg',
                'targetAngle': '360deg'
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#);\n\
                                transform: rotate(#startAngle#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#);\n\
                                transform: rotate(#targetAngle#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#);\n\
                                transform: rotate(#startAngle#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#);\n\
                                transform: rotate(#targetAngle#);\n\
                            }\n\
                        }'
        },

        //直线高光
        'lineLight': {
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
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            50% {\n\
                                opacity: 1;\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            50% {\n\
                                opacity: 1;\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        //旋转缩放
        'rotateScale': {
            'defs': {
                'startAngle': 0,
                'targetAngle': 0,
                'startScale': 1,
                'targetScale': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#) scale(#startScale#);\n\
                                transform: rotate(#startAngle#) scale(#startScale#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                                transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#) scale(#startScale#);\n\
                                transform: rotate(#startAngle#) scale(#startScale#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                                transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                            }\n\
                        }'
        },

        /////////////////////////animate.css 动画包////////////////////////
        'bounceIn': {
            'defs': {},
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0%, 20%, 40%, 60%, 80%, 100% {\n\
                                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                            }\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: scale3d(.3, .3, .3);\n\
                                transform: scale3d(.3, .3, .3);\n\
                            }\n\
                            20% {\n\
                                -webkit-transform: scale3d(1.1, 1.1, 1.1);\n\
                                transform: scale3d(1.1, 1.1, 1.1);\n\
                            }\n\
                            40% {\n\
                                -webkit-transform: scale3d(.9, .9, .9);\n\
                                transform: scale3d(.9, .9, .9);\n\
                            }\n\
                            60% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1.03, 1.03, 1.03);\n\
                                transform: scale3d(1.03, 1.03, 1.03);\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale3d(.97, .97, .97);\n\
                                transform: scale3d(.97, .97, .97);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1, 1, 1);\n\
                                transform: scale3d(1, 1, 1);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0%, 20%, 40%, 60%, 80%, 100% {\n\
                                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                            }\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: scale3d(.3, .3, .3);\n\
                                transform: scale3d(.3, .3, .3);\n\
                            }\n\
                            20% {\n\
                                -webkit-transform: scale3d(1.1, 1.1, 1.1);\n\
                                transform: scale3d(1.1, 1.1, 1.1);\n\
                            }\n\
                            40% {\n\
                                -webkit-transform: scale3d(.9, .9, .9);\n\
                                transform: scale3d(.9, .9, .9);\n\
                            }\n\
                            60% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1.03, 1.03, 1.03);\n\
                                transform: scale3d(1.03, 1.03, 1.03);\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale3d(.97, .97, .97);\n\
                                transform: scale3d(.97, .97, .97);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1, 1, 1);\n\
                                transform: scale3d(1, 1, 1);\n\
                            }\n\
                        }'
        },

        'zoomIn': {
            'defs': {
                'startOpacity': 0,
                'targetOpacity': 1,
                'startZoom': 0.3,
                'targetZoom': 1
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }'
        },

        'zoomInSlide': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0,
                'startZoom': 0.3,
                'targetZoom': 1
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: scale(#startZoom#) translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: scale(#startZoom#) translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: scale(#targetZoom#) translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: scale(#targetZoom#) translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: scale(#startZoom#) translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: scale(#startZoom#) translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: scale(#targetZoom#) translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: scale(#targetZoom#) translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        'zoomGiveIn': {
            'defs': {
                'startOpacity': 0,
                'targetOpacity': 1,
                'startZoom': 0.3,
                'giveZoom': 1.05,
                'targetZoom': 1
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale(#giveZoom#);\n\
                                transform: scale(#giveZoom#);\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale(#giveZoom#);\n\
                                transform: scale(#giveZoom#);\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }'
        },

        'fadeOut': {
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
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        'shake': {
            'defs': {
                'degree': '10px'
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0%, 100% {\n\
                                -webkit-transform: translate3d(0, 0, 0);\n\
                                transform: translate3d(0, 0, 0);\n\
                            }\n\
                            10%, 30%, 50%, 70%, 90% {\n\
                                -webkit-transform: translate3d(-#degree#, 0, 0);\n\
                                transform: translate3d(-#degree#, 0, 0);\n\
                            }\n\
                            20%, 40%, 60%, 80% {\n\
                                -webkit-transform: translate3d(#degree#, 0, 0);\n\
                                transform: translate3d(#degree#, 0, 0);\n\
                            }\n\
                      }\n\
                      @keyframes #animationClass# {\n\
                            0%, 100% {\n\
                                -webkit-transform: translate3d(0, 0, 0);\n\
                                transform: translate3d(0, 0, 0);\n\
                            }\n\
                            10%, 30%, 50%, 70%, 90% {\n\
                                -webkit-transform: translate3d(-#degree#, 0, 0);\n\
                                transform: translate3d(-#degree#, 0, 0);\n\
                            }\n\
                            20%, 40%, 60%, 80% {\n\
                                -webkit-transform: translate3d(#degree#, 0, 0);\n\
                                transform: translate3d(#degree#, 0, 0);\n\
                            }\n\
                      }'
        }

    });

})( jerryAnimate );