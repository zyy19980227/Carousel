function activeButton($button){   //按钮变色函数
    $button.addClass('yellow')
    .siblings('.yellow').removeClass('yellow')
}
function playSlide(index){     //播放函数
    allButton.eq(index).trigger('click')
}
function setTimer(x){      //定时函数
    return setInterval(()=>{
        n+=1
        playSlide(n%size)
    },x)
}

//轮播
var allButton=$('#buttons > button')
for(let i=0;i<allButton.length;i++){
    $(allButton[i]).on('click',function(x){
        var index = $(x.currentTarget).index()
        var  p=index*(-300)
        $('#images').css({
            transform:'translate('+p+'px)'
        })
        n=index
        activeButton(allButton.eq(n))
    })
}

//自动播放
var n=0;
var size=allButton.length
playSlide(n%size)
var timerId=setTimer(2000)
//鼠标移入
$('.window').on('mouseenter',function(){
    window.clearInterval(timerId)
})
//鼠标移出
$('.window').on('mouseleave',function(){
    timerId=setTimer(2000)
})

