<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="css/ani.css"/>
    <link rel="stylesheet" type="text/css" href="css/index.css"/>
    <title></title>
</head>
<script type="text/javascript">
  var rem = 100;
  rem = document.documentElement.clientWidth / 320 * 50;
  document.documentElement.style.fontSize = rem + 'px';
</script>
<body>
<div id="container">

    <div class="loading_div">
        <div class="loading_content">
            <div class="load_panda_div">
                <img src="img/load_panda.png" class="load_panda_img"/>
                <img src="img/load_panda_1.png" class="load_panda_img"/>
            </div>
            <div class="loading_out">
                <div class="loading_in">
                    <div class="loading_pre">

                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="kv_div">
        <img src="img/icon1.png" class="icon1"/>
        <img src="img/icon2.png" class="icon2"/>
        <img src="img/icon3.png" class="icon3"/>
        <img src="img/icon4.png" class="icon4"/>
        <img src="img/icon5.png" class="icon5"/>
        <img src="img/icon6.png" class="icon6"/>
        <img src="img/logo.png" class="logo_img"/>
        <img src="img/active.png" class="active_img"/>
        <img src="img/title.png" class="title_img"/>
        <img src="img/panda_kv.png" class="panda_kv_img"/>
        <img src="img/start.png" class="start_btn"/>

    </div>
    <!--游戏页-->
    <div class="play_div">
        <div class="countDown_div">
            <div class="text1">6</div>
            <div class="line"></div>
            <div class="text2">0</div>
            <div class="line_1"></div>
        </div>
        <div class="mark_div">
            <p class="mark_num">0</p>
        </div>

        <div class="arrow_left arrow_btn"><img src="img/left_arrow.png"/></div>
        <div class="arrow_right arrow_btn"><img src="img/right_arrow.png"/></div>
        <div class="play_content">
            <div class="panda_div">
                <img src="img/play_img/panda.png" class="panda_img"/>
                <img src="img/panda_1.png" class="panda_img"/>
            </div>
            <img src="img/red_pack_1.png" class="game_items pack_b"/>
        </div>
    </div>

    <!--结果页-->
    <div class="result_div">
        <img src="img/mark_word.png" class="mark_img"/>
        <div class="mark_pack_box">
            <img src="img/mark_pack.png"/>
            <p class="end_mark">999</p>
        </div>
        <img src="img/again_btn.png" class="again_btn"/>
        <div class="btn_div">
            <img src="img/person_center.png" class="person_img"/>
            <img src="img/ranking.png" class="ranking_img ranking_btn"/>
        </div>
        <img src="img/share_btn.png" class="share_btn share_click"/>
    </div>

    <!--个人中心-->
    <div class="person_div">
        <img src="img/logo.png" class="logo_img"/>
        <img src="img/active.png" class="active_img"/>
        <div class="head_div">
            <img src="{{ $avatar }}" class="head_img"/>
        </div>
        <p class="nickname">{{ $nickname }}</p>
        <div class="person_content">
            <img src="img/peson_title.png" class="person_title"/>
            <img src="img/p_title.png" class="p_title_img"/>
            <div class="mark_item">
                <p class="order">1</p>
                <p class="mark_number">999</p>
            </div>
            <div class="mark_item">
                <p class="order">2</p>
                <p class="mark_number">999</p>
            </div>
            <div class="mark_item">
                <p class="order">3</p>
                <p class="mark_number">999</p>
            </div>
            <div class="mark_item">
                <p class="order">4</p>
                <p class="mark_number">999</p>
            </div>
            <div class="mark_item">
                <p class="order">5</p>
                <p class="mark_number">999</p>
            </div>

        </div>
        <div class="btn_group">
            <img src="img/ranking.png" class="ranking_img_2 ranking_btn"/>
            <img src="img/gohome.png" class="gohome_img"/>
        </div>
        <img src="img/share_btn.png" class="share_btn_1 share_click"/>
    </div>

    <!--排行榜-->
    <div class="ranking_div">
        <img src="img/logo.png" class="logo_img"/>
        <img src="img/active.png" class="active_img"/>
        <div class="ranking_content">
            <img src="img/rank_title.png" class="rank_title"/>
            <img src="img/ranking_img.png" class="rank_img_img"/>
            <div class="ranking_name">
                <div class="items_1"><p class="place_num"><img src="img/first.png"/></p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num"><img src="img/second.png"/></p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num"><img src="img/third.png"/></p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">4</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">5</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">6</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">7</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">8</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">9</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">10</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">11</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">12</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">13</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
                <div class="items_1"><p class="place_num">14</p><p class="rank_nickname">wwww</p><p class="mark_num_1">999</p></div>
            </div>

        </div>
        <div class="btn_group_1">
            <img src="img/gohome.png" class="gohome_img_1"/>
            <img src="img/person_center.png" class="person_img_end"/>
        </div>
    </div>



    <!--说明-->
    <div class="word_div">
        <div class="word_content">
            <img src="img/x.png" class="close_img"/>
            <img src="img/word.png" class="word_img"/>
        </div>
    </div>

    <!--分享浮层-->
    <div class="share_div">
        <img src="img/share_icon.png" class="share_icon"/>
    </div>

</div>
</body>
<script src="js/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/catPlug.js" type="text/javascript" charset="utf-8"></script>
<script src="js/index.js" type="text/javascript" charset="utf-8"></script>
</html>
