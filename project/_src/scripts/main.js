var $g, console, document, window;

//=include ../../../node_modules/jquery/dist/jquery.min.js
//=include ../../libs/owl.carousel/owl.carousel.js

(function () {
    "use strict";
    
    $g = {
        methos: {}
    };
    
    $g.methos.suit = function () {
        var Elems = document.querySelectorAll('[suit]');
        
        Elems.forEach(function (elem) {
            var getSetHeight = elem.getAttribute('suit') || window.innerHeight;
            
            setHeight(elem, getSetHeight);
            responsive(elem);
        });

        function responsive(elem) {
            window.addEventListener('resize', function () {
                setHeight(elem, window.innerHeight);
            });
        }

        function setHeight(elem, height) {
            elem.style.height = height + 'px';
        }
    };
    
    $g.methos.owl = function () {
        var Elems = $("[owl]"),
            sets = {};
        
        sets.default = {
            loop: true,
            items: 1,
            nav: true,
            dots: true
        };
        
        sets.set1 = {
            loop: true,
            items: 1,
            nav: true,
            dots: true,
            navText: ["", ""],
            navClass: ["owl-prev anim500ms", "owl-next anim500ms"],
            autoHeight: true
        };
            
        Elems.each(function (i, elem) {
            var getSet = $(elem).attr("owl"),
                getTarget = $(elem).attr("target"),
                set = getSet !== "" ? sets[getSet] : sets['default'];
            
            if (getTarget === "this" || getTarget === "") {
                $(elem).owlCarousel(set);
            } else {
                $(elem).find(getTarget).owlCarousel(set);
            }
        });
    };
    
    $g.methos.applyBackground = function () {
        var Elems = $("[apply-bg]");
        
        Elems.each(function (i, elem) {
            var getSource = $(this).attr("apply-bg"),
                getPosition = $(this).attr("bg-pos") || "center center",
                getSize = $(this).attr("bg-size") || "cover",
                getRepeat = $(this).attr("bg-repeat") || "no-repeat";
            
            $(this).css({
                "background-image": "url(" + getSource + ")",
                "background-position": getPosition,
                "background-size": getSize,
                "background-repeat": getRepeat
            });
        });
    };
    
    $g.methos.include = function () {
        var Elem = $("[include]");
        
        Elem.each(function (i, elem) {
            var currentElem = $(this),
                getSrc = currentElem.attr('include');
            
            getSrc = getSrc === "" ? "/undefined" : getSrc;
            
            $.get(getSrc, function (response) {
                currentElem.html(response);
            }, 'text').fail(function () {
                currentElem.html("<i style='display:block;text-align:center;font-size:0.7rem'>Error load include</i>").css({"border": "1px solid red", "color": "red"});
            });
        });
    };
    
    $g.methos.gotoScroll = function () {
        $("body").on("click", "a[href^='#']", function () {
            actionScroll($(this).attr("href"));
        });
        
        function actionScroll(target) {
            var getTarget = $("[data-sec='" + target + "']"),
                getPosition;
            
            if (getTarget.length) {
                getPosition = getTarget.offset().top;
                $("html, body").stop().animate({scrollTop: getPosition}, 1000);
            }
        }
        
        actionScroll(window.location.hash);
    };
    
    $g.methos.nav = {
        Nav: undefined,
        navHeight: undefined,
        isMobile: false,
        stickyIsExecute: false,
        
        sticky: function () {
            var self = this;
            
            $(window).scroll(function () {
                var winScrollTop = $(window).scrollTop(),
                    hasFixed = self.Nav.hasClass("fixed");
                
                if (!self.isMobile) {
                    if (winScrollTop >= self.navHeight && !hasFixed) {
                        self.Nav.addClass("fixed")
                            .css("top", "-100%")
                            .animate({top: "0%"}, 500);
                        self.Nav.find(".hide").css("display", "");

                    } else if (winScrollTop < self.navHeight && hasFixed) {
                        self.Nav.removeClass("fixed").css({"top": ""});
                        self.Nav.find(".hide").css("display", "none");
                    }
                }
            });
        },
        
        pipe: function (windowWidth) {
            var self = this;
            
            if (windowWidth >= 1028 && self.isMobile) {
                self.isMobile = false;
                
            } else if (windowWidth < 1028 && !self.isMobile) {
                self.isMobile = true;
            }
            
            if (!self.stickyIsExecute && !self.isMobile) {
                self.sticky();
                self.stickyIsExecute = true;
            }
        },
        
        init: function (selector) {
            var self = this;
            
            //Set nav DOM Element
            self.Nav = $(selector);
            
            //Get height nav and save in variable
            self.navHeight = self.Nav.outerHeight() || 80;
            
            //Execute Pipe function
            self.pipe(window.innerWidth);
            
            $(window).on("resize", function () {
                self.pipe(this.innerWidth);
            });
        }
    };
    
    /* Init */
    $g.methos.suit();
    $g.methos.owl();
    $g.methos.include();
    $g.methos.gotoScroll();
    $g.methos.applyBackground();
    $g.methos.nav.init(".nav-site");
    
})();