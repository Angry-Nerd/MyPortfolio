var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, Math.max(this.txt.length - 1, 1));
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 100;


    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt.length === 1) {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

let pages = {
    0: {
        leftSlide: [
            {
                node: '.primary-headline',
                animation: 'slide-right 1s forwards'
            }, 
            {
                node: '.secondary-headline',
                animation: 'slide-right 1s forwards'
            }
        ],
        rightSlide: [ 
            {
                node: '.portfolio-container',
                animation: 'slide-left 1s forwards'
            }
        ]
    },
    1: {
        leftSlide: [
            {
                node: '.education-heading',
                animation: 'slide-right 1s forwards'
            }, 
            {
                node: '.education-tile',
                animation: 'slide-right 1s forwards'
            }
        ],
        rightSlide: []
    }, 
    2: {
        leftSlide: [],
        rightSlide: []
    }
};
let currentSlide = 0, prevSlide = 0;
$(document).ready( function() {
    document.querySelector('.banner').style.animation = 'slide-up .8s forwards';
	let slide = $.fn.fsvs({
        speed : 1000,
        beforeSlide: function(index) {
            let page = pages[index];
            let leftSlides = page.leftSlide;
            let rightSlide = page.rightSlide;
            let i = 0.0;
            for (let slide of leftSlides) {
                for (let node of document.querySelectorAll(slide.node)) {
                    node.style.animation = slide.animation;
                    node.style.animationDelay = (i + 's');
                    i += .1;
                }
            }
            i = 0.0;
            for (let slide of rightSlide) {
                for (let node of document.querySelectorAll(slide.node)) {
                    node.style.animation = slide.animation;
                    node.style.animationDelay = (i + 's');
                    i += .1;
                }
            }
            setTimeout(() => {
                for (let p in pages) {
                    if (p != index) {
                        let prevPage = pages[p];
                        leftSlides = prevPage.leftSlide;
                        rightSlide = prevPage.rightSlide;
                        for (let slide of leftSlides) {
                            for (let node of document.querySelectorAll(slide.node)) {
                                node.style.animation = 'none';
                                node.style.transform = 'translateX(-100%)';
                            }
                        }
                        for (let slide of rightSlide) {
                            for (let node of document.querySelectorAll(slide.node)) {
                                node.style.animation = 'none';
                                node.style.transform = 'translateX(100%)';
                            }
                        }
                    }
                }
                
            }, 1000); 
        }
    });
    slide.slideToIndex(0);
});