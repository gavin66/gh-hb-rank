var loadingTimer;
var $loading = $('.loading_div');
var prg = 0;
progress(90, 100);

function progress(dist, delay, callback) {
  window.clearInterval(loadingTimer);
  loadingTimer = window.setInterval(function () {
    if (prg >= dist) {
      window.clearInterval(loadingTimer);
      prg = dist;
      callback && callback();
    } else {
      prg++;
    }
    var prg_1 = (100 - prg) * -1;
    document.querySelector(".load_panda_div").style.left = prg + '%';
    document.querySelector(".loading_pre").style.left = prg_1 + "%";
  }, delay);
}

//游戏变量
var game = {

  WIDTH: 640,
  HEIGHT: 1038,
  mark: 0,
  WINDOW_WIDTH: $(window).width(),
  WINDOW_HEIGHT: $(window).height(),
  IMGURL: 'img/play_img/',
  flag: false,
  g: 4,//降落速度
  vy: 0.01,//重力
  p_x: 100,//熊猫平移x轴坐标
  vx: 3,//熊猫左右移速
  panda_WIDTH: 0,
  itemNumber: 800,//降落物生成频率


}
var ITEMTIMER;//下落定时器
var CREATE;//创建定时器


var load_img = document.querySelectorAll(".load_panda_img");
var load_index = 0;
setInterval(function () {

  $(".load_panda_img").eq(load_index).addClass("show").siblings().removeClass("show");
  $(".panda_img").eq(load_index).addClass("show").siblings().removeClass("show");
  load_index++;
  if (load_index == load_img.length) {
    load_index = 0;
  }
}, 500)


var box = document.querySelector(".play_content");


//预加载图片路径
var imgObj = {
  bg: game.IMGURL + 'play_bg.jpg',
  redpack_1: 'img/red_pack_1.png',
  redpack_2: 'img/red_pack_2.png',
  godpack_1: 'img/god_pack_1.png',
  godpack_2: "img/god_pack_2.png",
  ice: 'img/ice.png',
  panda: game.IMGURL + 'panda.png'
}

function preloadImg(arrobj, callback, stepCallback) {

  var arrobjLength = 0;

  for (var k in arrobj) {
    arrobjLength++;
  }

  var newimages = {},
      loadedimages = 0;

  function imageloadpost() {
    loadedimages++;
    stepCallback(loadedimages, arrobjLength);
    if (loadedimages == arrobjLength) {
      callback(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
    }
  }

  for (var k in arrobj) {
    newimages[k] = new Image();
    newimages[k].src = arrobj[k];
    newimages[k].onload = function () {
      imageloadpost();
    }
    newimages[k].onerror = function () {
      imageloadpost();
    }
  }
}

var imgBox;
preloadImg(imgObj, function (newimagesobj) {
  imgBox = newimagesobj;
}, function (loadedimages, length) {

})


window.onload = function () {
  var audio = document.getElementById("audio");
  var audio1 = document.getElementById("audio1");
  var audio2 = document.getElementById("audio2");
  var audio3 = document.getElementById("audio3");

  function audioAutoPlay() {
    audio.play();
    audio1.play();
    audio1.pause();
    audio2.play();
    audio2.pause();
    audio3.play();
    audio3.pause();
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
      audio1.play();
      audio1.pause();
      audio2.play();
      audio2.pause();
      audio3.play();
      audio3.pause();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
      audio.play();
      audio1.play();
      audio1.pause();
      audio2.play();
      audio2.pause();
      audio3.play();
      audio3.pause();
    }, false);
  }

  audioAutoPlay();


  progress(100, 50, function () {
    $(".kv_div").show();
    $loading.hide()
  });

  $(".title_img").addClass("swing");
  setTimeout(function () {
    $(".start_btn").addClass("rubberBand");
  }, 1000);


  var speedTimer;

  function pandaMove() {
    var w = document.querySelector(".panda_div").offsetWidth;
    var max_left = game.WINDOW_WIDTH - w;

    function set_location(left_x) {
      document.querySelector(".panda_div").style.left = left_x + "px";
    }

    set_location(game.p_x);

    //items


    //按下左边按钮
    $(".touch_div_left").on("touchstart", function (e) {
      e.preventDefault();
      $(".arrow_left").addClass("arrow_ani");
      clearInterval(speedTimer);
      speedTimer = setInterval(function () {
        if (game.p_x < 0) {
          return false;
        } else {
          game.p_x = game.p_x - game.vx;
        }
        ;
        set_location(game.p_x);
      }, 10)
    });
    //抬起左边按钮
    $(".touch_div_left").on("touchend", function (e) {
      e.preventDefault();
      $(".arrow_left").removeClass("arrow_ani");
      clearInterval(speedTimer);
    });
    //按下右按钮
    $(".touch_div_right").on("touchstart", function (e) {
      e.preventDefault();
      $(".arrow_right").addClass("arrow_ani");
      clearInterval(speedTimer);
      speedTimer = setInterval(function () {

        if (game.p_x > max_left) {
          return false;
        } else {
          game.p_x = game.p_x + game.vx;
          ;
        }
        ;
        set_location(game.p_x);
      }, 10);
    });
    //抬起右按钮
    $(".touch_div_right").on("touchend", function (e) {
      e.preventDefault();
      $(".arrow_right").removeClass("arrow_ani");
      clearInterval(speedTimer);
    });
  };


  $(".active_img").on("click", function () {
    $(".word_div").fadeIn();
  });
  //关闭按钮
  $(".close_img").on("click", function () {
    $(".word_div").fadeOut();
  });


  //倒计时
  function countDown() {
    var time = 60;
    var counTimer = setInterval(function () {
      time = time - 1;
      var newTime = time.toString();
      if (newTime < 10) {
        newTime = '0' + newTime
      }
      $(".text1").html(newTime.split('')[0]);
      $(".text2").html(newTime.split('')[1]);
      if (time == 10) {
        game.vy = 0.05;
//				game.itemNumber = 1000;
      } else if (time == 35) {
        game.vy = 0.025;
//				game.itemNumber = 1000;
      }
      if (time == 0) {
        $(".end_mark").html(game.mark);

        clearInterval(counTimer);//清空倒计时
        clearInterval(CREATE);//清空创建元素
        clearInterval(ITEMTIMER);//清空下落动画定时器
        gameOver();
      }
    }, 1000)
  };


  //创建掉落物体
  function createGameItem() {
    var obj = {
      x: Math.floor(Math.random() * (game.WINDOW_WIDTH - 100)),
      num: Math.floor(Math.random() * 12),
    };

    if (obj.num == 0) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.godpack_1);
      img.setAttribute("class", "game_items pack_b");
      img.setAttribute("data-mark", "50");

    } else if (obj.num == 1) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.godpack_2);
      img.setAttribute("class", "game_items pack_b");
      img.setAttribute("data-mark", "50");
    } else if (obj.num == 2 || obj.num == 3 || obj.num == 4) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.redpack_1);
      img.setAttribute("class", "game_items pack_b");
      img.setAttribute("data-mark", "5");
    } else if (obj.num == 5 || obj.num == 6 || obj.num == 7) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.redpack_2);
      img.setAttribute("class", "game_items pack_b");
      img.setAttribute("data-mark", "5");
    } else if (obj.num == 8 || obj.num == 9) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.ice);
      img.setAttribute("class", "game_items ice_b");
      img.setAttribute("data-mark", "-20");
    } else if (obj.num == 10 || obj.num == 11) {
      var img = document.createElement("img");
      img.style.left = obj.x + "px";
      img.setAttribute("src", imgObj.ice);
      img.setAttribute("class", "game_items ice_s");
      img.setAttribute("data-mark", "-10");
    }

    box.appendChild(img);
    startMove(img);

  };

  function startMove(obj) {
    var poY = obj.offsetTop;//获取对象到顶部的距离；
    var poX = obj.offsetLeft;
    var poY_1 = obj.offsetHeight;
    var poX_1 = obj.offsetWidth;
    var pandaX_1 = document.querySelector(".panda_div").offsetWidth;
    var moveTimer = null;
    var objg = game.g;

    function move() {
      var pandaY = document.querySelector(".panda_div").offsetTop;
      var pandaX = document.querySelector(".panda_div").offsetLeft;

      var pX = pandaX + pandaX_1 / 2;
      var pY = pandaY - 50;
      objg += game.vy;
      poY += objg;
      obj.style.top = poY + "px";
      console.log(objg);
      if (poY > game.WINDOW_HEIGHT - 10) {//出屏幕
        clearInterval(moveTimer);
        box.removeChild(obj);
      } else if (pandaY - poY_1 <= poY && poX + poX_1 >= pandaX && poX <= pandaX + pandaX_1) {//撞击发生
        var data_mark = parseInt(obj.dataset.mark);
        if (data_mark == '50') {
          audio1.play();
        } else if (data_mark == '5') {
          audio2.play();
        } else if (data_mark == '-20' || data_mark == '-10') {
          audio3.play();
        }
        if (data_mark > 0) {
          var p_mark = '+' + data_mark;
          var p = $('<p class="markXianshi" style = "left:' + pX + 'px;top:' + pY + 'px;color:red;">' + p_mark + '</p>');
        } else {

          var p_mark = data_mark;
          var p = $('<p class="markXianshi" style = "left:' + pX + 'px;top:' + pY + 'px;color:#000000;">' + p_mark + '</p>');
        }

//				console.log(data_mark)

        $('.play_content').append(p);
        var pTimer = setTimeout(function () {
          $('.markXianshi').remove();
          clearTimeout(pTimer);
        }, 500)
        game.mark = game.mark + data_mark;
        if (game.mark < 0) {
          game.mark = 0;
        }
        $(".mark_num").html(game.mark)
        clearInterval(moveTimer);
        box.removeChild(obj);
      }
    }

    moveTimer = setInterval(move, 30)
  }

  //页面逻辑
  $(".start_btn").on("click", function () {
    _hmt.push(['_trackEvent', '首页_开抢', 'event']);
    $(".play_div").show();
    pandaMove();
    countDown();

    $(".kv_div").hide();
    CREATE = setInterval(function () {
      createGameItem();
    }, game.itemNumber);

  });

  $(".again_btn").on("click", function () {
    clearInterval(speedTimer);
    game.vy = 0.01;
//		game.itemNumber = 1000;
    $(".play_div").show();
    $('.result_div').hide();
    $('.mark_num').html('0');
    pandaMove();
    countDown();
    $(".kv_div").hide();
    CREATE = setInterval(function () {
      createGameItem();
    }, game.itemNumber);

  })

  //数据请求
  function getJson(url, method, callback) {
    $.ajax({
      type: method,
      url: url,
      async: true,
      dataType: 'json',
      success: callback,

    });
  };

  //去排行榜
  //调用总排行榜接口；
  $(".ranking_img_2").on("click", function () {

    $(".ranking_div").show();
    $(".person_div").hide();
  });
  //去排行榜
  //调用总排行榜接口；
  $('.ranking_img').on("click", function () {
    $('.ranking_name').empty();
    getJson("/rank_all", 'get', function (data) {
      for (var i = 0; i < data.length; i++) {
        var j = i + 1;
        if (i == 0) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/first.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else if (i == 1) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/second.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else if (i == 2) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/third.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else {
          var div = $('<div class="items_1"><p class="place_num">' + j + '</p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>')
        }
        $('.ranking_name').append(div);
      }
      ;
    });
    $('.ranking_div').show();
    $('.result_div').hide();
  });

  //去首页
  $(".gohome_img_1").on("click", function () {
    $(".kv_div").show();
    $('.ranking_div').hide();
  });
  $('.gohome_img').on("click", function () {
    $(".kv_div").show();
    $('.person_div').hide();
  });


  //去个人中心
  //调用个人排行榜接口
  $('.person_img').on("click", function () {
    $('.person_div').show();
    $('.result_div').hide();
  });

  //去个人中心
  //调用个人排行榜接口
  $('.person_img_end').on("click", function () {
    $(".mark_item").remove();
    getJson('/rank', 'get', function (data) {
      for (var i = 0; i < data.length; i++) {
        var div = $('<div class="mark_item"><p class="order">' + (i + 1) + '</p><p class="mark_number">' + data[i].score + '</p></div>')
        $(".person_content").append(div);
      }
      ;
    });
    $('.person_div').show();
    $('.ranking_div').hide();
  });
  //分享
  var shareTimer = null;
  $(".share_click").on("click", function () {
    _hmt.push(['_trackEvent', '游戏结束页_分享好友', 'event']);
    $(".share_div").show();
    shareTimer = setTimeout(function () {
      $(".share_div").hide();
    }, 3000)
  });
  $(".share_div").on("click", function () {
    $(".share_div").hide();
    clearTimeout(shareTimer);
  });

  function gameOver() {
    //分数提交接口
    $.ajax({
      type: "post",
      data: {score: game.mark},
      url: "/rank",
      async: true,
      dataType: 'json',
      success: function (data) {
        if (parseInt(data.code) !== 0) {
          console.log(data.msg);
          window.location.href = '/game';
        }
      }
    });

    $('.game_items').remove();
    $(".mark_num").html('0');
    game.mark = 0;
    game.vy = 0.01;
    $(".result_div").show();
    $(".play_div").hide();
    $('.ranking_name').empty();
    getJson("/rank_all", 'get', function (data) {
      for (var i = 0; i < data.length; i++) {
        var j = i + 1;
        if (i == 0) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/first.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else if (i == 1) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/second.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else if (i == 2) {
          var div = $('<div class="items_1"><p class="place_num"><img src="img/third.png"/></p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>');
        } else {
          var div = $('<div class="items_1"><p class="place_num">' + j + '</p><p class="rank_nickname">' + data[i].nickname + '</p><p class="mark_num_1">' + data[i].score + '</p></div>')
        }
        $('.ranking_name').append(div);
      }
      ;
    });

    $(".mark_item").remove();
    getJson('/rank', 'get', function (data) {
      for (var i = 0; i < data.length; i++) {
        var div = $('<div class="mark_item"><p class="order">' + (i + 1) + '</p><p class="mark_number">' + data[i].score + '</p></div>')
        $(".person_content").append(div);
      }
      ;
    });
  };
}

