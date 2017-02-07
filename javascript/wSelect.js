/*! wSelect - v1.2.1 - 2014-04-08 */

!
function(a) {
    function b(b, c) {
        this.$el = a(b);
        this.id = Math.random();
        this.options = c;
        this.multiple = this.$el.prop("multiple");
        this.activeOpt = null;
        this.widthSet = !1;
        this.generate();
    }
    function c(b, c) {
        this.$el = a(b);
        this.wSelect = c;
    }
    b.prototype = {
        generate: function() {
            if (!this.$select) {
                var b = this;
                this.$select = a('<div class="wSelect"><div class="wSelect-arrow"></div></div>'),
				a(this.$select).attr('id',(this.$el[0].id + '_wSelect')),
                this.$optionsHolder = a('<div class="wSelect-options-holder"></div>'),
                this.$options = a('<div class="wSelect-options"></div>'),
                a.support.placeholder || this.$select.css("zIndex", 100 - this.$el.index());
                var c = function(c) {
                    c.stopPropagation(),
                    a("select").each(function() {
                        var c = a(this).data("wSelect");
                        c && c.id !== b.id && (c.multiple, c.onBlur())
                    }),
                    b.multiple || b.onClick(c),
                    b.$el.focus()
                };
                this.multiple ? (this.$select.addClass("wSelect-multiple"), this.$optionsHolder.click(c)) : (this.$selected = a('<div class="wSelect-selected"></div>'), this.$select.append(this.$selected), this.$select.click(c), this.$optionsHolder.click(function(a) {
                    a.stopPropagation(),
                    b.$el.focus()
                })),
                this.$el.addClass("wSelect-el").change(function() {
                    b.change()
                }).focus(function() {
                    b.onFocus()
                }).keydown(function(a) {
                    b.keydown(a)
                }).keyup(function(a) {
                    b.keyup(a)
                }),
                a(document).click(function() {
                    b.multiple;
                    b.onBlur();
                }),
                this.widthSet = this.$select.width() > 0,
                this.setTheme(this.options.theme),
                this.setSize(this.options.size),
                this.reset(),
                this.$optionsHolder.append(this.$options),
                this.$select.append(this.$optionsHolder),
                this.$el.after(this.$select)
            }
            return this.$select
        },
        reset: function() {
            var b = this;
            this.$options.children().remove(),
            this.$el.children().each(function() {
                var d = new c(this, b);
                a.data(this, "wSelect-option", d),
                b.$options.append(d.generate())
            }),
            this.$options.children().removeClass("wSelect-option-last").last().addClass("wSelect-option-last"),
            this.setSize(this.options.size)
        },
        change: function() {
            this.$options.children().removeClass("wSelect-option-selected wSelect-option-active");
            this.$el.children(":selected").each(function() {
                a(this).data("wSelect-option").select();
            })
        },
        keydown: function(a) {
            9 === a.keyCode && (this.$optionsHolder.hide(), this.onBlur())
        },
        keyup: function(a) {
            if (13 === a.keyCode) this.$optionsHolder.hide();
            else if (a.keyCode >= 37 && a.keyCode <= 40) {
                this.change();
                var b = this.$options.find(".wSelect-option-selected:last"),
                c = this.$options.scrollTop(),
                d = b.position().top + c,
                e = this.$options.height(),
                f = b.outerHeight(!0);

                0 > d - c ? this.$options.scrollTop(d) : d + f - c > e && this.$options.scrollTop(d - e + f)
            }
        },
        onClick: function(e) {
			if(this.$select[0].className.match('active-')){
				$(this.$select[0]).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate');
			}else if(this.$select[0].className.match('-active')){
				$(this.$select[0]).removeClass('is-active');
			}else{
				$('.rj-dropdown').each(function(){
					$(this).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');
				});
				
				if(this.options.fade && this.options.animate){
					$(this.$select[0]).addClass('active-fade-animate');
				}else if(this.options.fade){
					$(this.$select[0]).addClass('active-fade');
				}else if(this.options.animate){
					$(this.$select[0]).addClass('active-animate');
				}else{
					$(this.$select[0]).addClass('is-active');
				}
			}
			
			if(e.stopPropagation){
			    e.stopPropagation();	
			}else{
			    e.cancelBubble = true;	
			}
        },
        onFocus: function(a) {
            /*a = a || "active",
            this.options.highlight && this.$select.addClass("wSelect-" + a)*/
        },
        onBlur: function(a) {
            a = a || "active",
            this.options.highlight && this.$select.removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');
        },
        setTheme: function(a) {
            this.$select.attr("class", this.$select.attr("class").replace(/wSelect-theme-.+\s|wSelect-theme-.+$/, "")),
            this.$select.addClass("wSelect-theme-" + a)
        },
        setSize: function(b) {
            var c, d = this.$options.children(":first").clone().css({
                position: "absolute",
                left: -1e4
            });
            e = this.$el.children().length;
            a("body").append(d);
            c = d.outerHeight();
            d.remove();
            !this.multiple && b > e && (b = e);
            this.$options.height(c * b + 3);
        }
    },
    c.prototype = {
        generate: function() {
            var b = this;
            if (!this.$option) {
                var v = this.$el.attr("value"),
				i = this.$el.attr("data-icon");
                this.$option = a('<div class="wSelect-option"></div>');
                this.$value = a('<div class="wSelect-option-value"></div>');
                this.$option.append(this.$value);
                "string" == typeof v && (this.$value.attr('value',v));
				"string" == typeof i && (this.$value.addClass("wSelect-option-icon"), this.$value.css("backgroundImage", "url(" + i + ")"));
            }
            return this.$el.prop("selected") && this.select(),
            this.$el.prop("disabled") ? this.$option.addClass("wSelect-option-disabled") : (this.$option.removeClass("wSelect-option-disabled"), this.$option.unbind("click").click(function(a) {
                b.onClick(a)
            })),
            this.$value.html(this.$el.html()),
            this.setWidth(),
            this.$option
        },
        select: function() {
			
            if (this.wSelect.activeOpt || (this.wSelect.activeOpt = this), !this.wSelect.multiple) {
                var v = this.$el.attr("value"),
				i = this.$el.attr("data-icon");
                if("string" == typeof a){
				     this.wSelect.$selected.attr('value',v);
				}
				"string" == typeof i ? (this.wSelect.$selected.addClass("wSelect-option-icon"), this.wSelect.$selected.css("backgroundImage", "url(" + i + ")")) : (this.wSelect.$selected.removeClass("wSelect-option-icon"), this.wSelect.$selected.css("backgroundImage", ""));
                this.wSelect.$selected.html(this.$el.html());
            }
            this.$option.addClass("wSelect-option-selected")
        },
        onClick: function(b) {
            var c = null;
            if (this.wSelect.multiple && (b.ctrlKey || b.shiftKey)) {
                if (b.ctrlKey || !this.wSelect.activeOpt) {
                    c = this.wSelect.$el.val() || [];
                    var d = this.$el.val(),
                    e = a.inArray(d, c); - 1 === e ? (c.push(this.$el.val()), this.wSelect.activeOpt = this) : c.splice(e, 1)
                } else if (b.shiftKey) {
                    var f = this.wSelect.activeOpt.$el.index(),
                    g = this.$el.index(),
                    h = 0,
                    i = 0,
                    j = null;
                    g > f ? (h = f, i = g) : (h = g, i = f),
                    c = [];
                    for (var k = h; i >= k; k++) j = this.wSelect.$el.children(":eq(" + k + ")"),
                    j.is(":not(:disabled)") && c.push(j.val())
                }
            } else c = this.$el.val(),
			
			$(this.wSelect.$select).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');
            this.wSelect.$el.val(c).change()
        },
        setWidth: function() {
            if (this.wSelect.multiple || this.wSelect.widthSet) return ! 0;
            this.$option.hide().appendTo("body");
            var a = this.$option.width();
            a > this.wSelect.$select.width() ? this.wSelect.$select.css('minWidth',a) : null;
            this.$option.detach().show();
        }
    },
    a.support.placeholder = "placeholder" in document.createElement("input"),
    a.fn.wSelect = function(c, d) {
        function e(d) {
            var e = a.data(d, "wSelect");
            if (!e) {
                var f = jQuery.extend(!0, {},
                c);
                f.size = a(d).prop("size") || f.size,
                e = new b(d, f),
                a.data(d, "wSelect", e)
            }
            return e
        }
		function dropdown(ele,c){
			$(ele).find('.rj-dropdown-btn').click(function(e){
				if(ele.className.match('active-')){
					$(ele).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate');
				}else if(ele.className.match('-active')){
					$(ele).removeClass('is-active');
				}else{
					$('.rj-dropdown').each(function(){
						$(this).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');
					});
					$('.wSelect').each(function(e){
						$(this).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');
					});
					
					if(c.fade && c.animate){
						$(ele).addClass('active-fade-animate');
					}else if(c.fade){
						$(ele).addClass('active-fade');
					}else if(c.animate){
						$(ele).addClass('active-animate');
					}else{
						$(ele).addClass('is-active');
					}
				}
				
				if(e.stopPropagation){
					e.stopPropagation();	
				}else{
					e.cancelBubble = true;	
				}
			});
			a(document).click(function(){
			    $(ele).removeClass('active-fade-animate').removeClass('active-fade').removeClass('active-animate').removeClass('is-active');	
			});
		}
        if ("string" == typeof c) {
            var f = [],
            g = this.each(function() {
                var b = a(this).data("wSelect");
                if (b) {
                    var e = (d ? "set": "get") + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase();
                    b[c] ? b[c].apply(b, [d]) : d ? (b[e] && b[e].apply(b, [d]), b.options[c] && (b.options[c] = d)) : b[e] ? f.push(b[e].apply(b, [d])) : b.options[c] ? f.push(b.options[c]) : f.push(null)
                }
            });
            return 1 === f.length ? f[0] : f.length > 0 ? f: g
        }
        return c = a.extend({},
        a.fn.wSelect.defaults, c),
		$('[data-rj-select]').each(function() {
		    e(this);
		}),
		$('[data-rj-dropdown]').each(function(){
		    dropdown(this,c);	
		})
    },
    a.fn.wSelect.defaults = {
        theme: "classic",
        size: "4",
        highlight: !0,
		fade: false,
		animate: false
    }
} (jQuery);