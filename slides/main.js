let $buttons=$('#buttonWrapper>button')
let $slides=$('#slides')
let $images=$slides.children('img')
let current=0
makeFakeSlides()
$slides.css({transform:'translateX(-300px)'})
bindEvents()
//鼠标点击切换
$(next).on('click',function(){
    goToSlide(current+1)
})
$(previous).on('click',function(){
    goToSlide(current-1)
})
//每两秒滚动一次
let timer=setInterval(function(){
    goToSlide(current+1)
},2000)
//鼠标悬停停止滚动
$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
})
//鼠标离开开始滚动
$('.container').on('mouseleave',function(){
    timer=setInterval(function(){
        goToSlide(current+1)
    },2000)
})






function makeFakeSlides(){   //制造头尾虚假页面
    let $firstCopy=$images.eq(0).clone(true)
    let $lastCopy=$images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
function bindEvents(){     
    $('#buttonWrapper').on('click','button',function(e){
        let $button=$(e.currentTarget)
        let index=$button.index()
        goToSlide(index)
    })
}
function goToSlide(index){  //无缝轮播函数
    if(index>$buttons.length-1){
        index=0
    }else if(index<0){
        index=$buttons.length-1
    }
    if(current===$buttons.length-1&&index===0){
            //last to first
            $slides.css({transform:`translateX(${-($buttons.length+1)*300}px)`})
            .one('transitionend',function(){
                $slides.hide()
                    .offset()
                $slides.css({transform:`translateX(${-(index+1)*300}px)`})
                    .show()
            })
        }else if(current===0&&index===$buttons.length-1){
            //first to last
            $slides.css({transform:`translateX(0px)`})
            .one('transitionend',function(){
                $slides.hide()
                    .offset()
                $slides.css({transform:`translateX(${-(index+1)*300}px)`})
                    .show()
            })
        }else{
            $slides.css({transform:`translateX(${-(index+1)*300}px)`})
        }
        current=index
}