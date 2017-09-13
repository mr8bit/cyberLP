;(function ($, undefined) {

    /***/
    var objs = {
        '.block-51': 'fadeInDown',
        '.widget-26': 'fadeInUp d1',
        '.widget-75': 'fadeInDown',
        '.blocklist-113 .item': 'fadeInUp d1',
        '.editable_block-147 .header': 'fadeInLeft',
        '.editable_block-147 .text': 'fadeInLeft',
        '.editable_block-147 .more': 'fadeInLeft',
        '.block-35': 'fadeInUp d1',
        '.widget-125': 'fadeInRight',
        '.widget-128': 'fadeInLeft',
        '.widget-84': 'fadeInLeft',
        '.block-20': 'fadeInDown'


    };


    $(function () {
        for (var i in objs) {
            $(i).attr('data-s3-animator', objs[i]);
        }
    })
    var url = '/static/g/s3/misc/animator/1.0.0/css/s3.animator.scss.css';
    $.get(url, function () {
        $('<link>', {rel: 'stylesheet', type: 'text/css', 'href': url}).appendTo('head');
        if (!window.s3Animator) {
            $.getScript('/static/g/s3/misc/animator/1.1.0/js/s3.animator.js').done(function () {
                window.s3Animator.once = true;
            });
        }
    });
})(jQuery)