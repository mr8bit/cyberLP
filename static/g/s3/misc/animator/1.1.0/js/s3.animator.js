(function ($, window, document, undefined) {
    var $window = $(window);
    var $document = $(document);
    var countUp = window.countUp;

    function Element(el) {
        var num;
        var cls;
        var parent;
        this.el = el;
        this.$el = $(el);
        this.data = this.$el.data('s3-animator');
        this.params = this.data.split(/\s+/);
        if (~this.params.indexOf('counter') && countUp) {
            this.type = 'counter';
            num = Number(this.$el.text().replace(/\D/g, '')) || 0;
            this.counter = new countUp(this.el, 0, num, 0, 10, {separator: ' ', useGrouping: true, useEasing: true});
        } else {
            this.type = 'animate';
            cls = this.params.map(function (param) {
                return 's3-animator-' + param;
            });
            cls.push('s3-animator');
            this.cls = cls.join(' ');
        }
        if (~this.data.indexOf('bar')) {
            parent = this.$el.parent();
            this.height = parent.height();
            this.top = parent.offset().top;
        } else {
            this.height = this.$el.height();
            this.top = this.$el.offset().top;
        }
    }

    Element.prototype.play = function () {
        this.working = true;
        if (this.type == 'counter') {
            this.counter.start();
        } else {
            this.$el.removeClass('s3-animator-hide').addClass(this.cls);
        }
    };
    Element.prototype.stop = function () {
        this.working = false;
        if (this.type == 'counter') {
            this.counter.reset();
        } else {
            this.$el.addClass('s3-animator-hide').removeClass(this.cls);
        }
    };
    function Animator() {
        var self = this;
        this.offset = 10;
        this.refresh();
        $document.on('scroll.s3_animator', function () {
            self.check();
        });
        $window.on('resize.s3_animator', function () {
            self.windowHeight = $window.height();
            self.check();
        }).trigger('resize.s3_animator');
    }

    Animator.prototype.check = function () {
        var self = this;
        var scrollTop = $document.scrollTop();
        $.each(this.elements, function () {
            if (this.top + this.height > scrollTop + self.offset && this.top < scrollTop + self.windowHeight - self.offset) {
                if (!(self.once && this.working)) {
                    this.play();
                }
            } else {
                if (!(self.once && this.working)) {
                    this.stop();
                }
            }
        });
    };
    Animator.prototype.refresh = function () {
        var self = this;
        this.elements = [];
        $('[data-s3-animator]').each(function () {
            self.elements.push(new Element(this));
        });
    };
    window.s3Animator = new Animator();
})(jQuery, window, document);