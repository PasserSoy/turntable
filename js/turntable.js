$(function(){
  $('#root').on('click','.turn-btn',function(){
    // 开始转动
    // 定义常量
    var dom = {
      t_ul: $('.turntable-ul'),
      t_num: $('.turn-num'),
      times:10,
      num:1,
      mine:$(this)
    };console.log($(this))
    dom.mine.addClass('disabled').off('click');
    /* 开始运动,即将div的active移动到下一个turn-num中 */
    var len = dom.t_ul.find('.turn-num').length;// 选项个数
    var index = 1;// 开始下标
    index = sessionStorage.getItem('index');
    var n= 0;//圈数计数器
    var m = 5;// 所转圈数
    var cir = setInterval(function(){
      // 转 n 圈后，判断随机事件成立，停止转动.随机事件：随机数等于下标
     // var randoms = Math.ceil(Math.random()*8);
      // =1的概率x/10000000
    var arr1 = [1,2,3,4,5,6,7,8];
    var arr2 = [0.00000001,0.0000001,0.000001,0.00001,0.0001,0.001,0.01,0.1];
    var randoms = random(arr1,arr2);
      if(n >= m && index==randoms){
        sessionStorage.setItem('index',index);// 写入缓存
        clearInterval(cir);
        dom.mine.on('click').removeClass('disabled');
      }
      dom.t_num.removeClass('active');
      $('[data-index="'+index+'"]').addClass('active');
      index >= len ? (index=1,n++) : index++;// 循环
    },50);
  });
  // 随机事件
  function random(arr1, arr2) {
    var sum = 0,
      factor = 0,
      random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
      sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = arr2.length - 1; i >= 0; i--) {
      factor += arr2[i];
      if (random <= factor)
        return arr1[i];
    };
    return null;
  };
})