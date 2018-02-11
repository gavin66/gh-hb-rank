<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// 接收微信消息
Route::any('/wechat', 'WechatController@serve');

// 授权,获取用户信息中间件
Route::group(['middleware' => ['web', 'wechat.oauth:default,snsapi_userinfo']], function () {

    // 开始游戏
    Route::get('/game', 'WechatController@game');

    // 总排行榜
    Route::get('/rank_all','WechatController@rankAll');

    // 个人排行榜
    Route::get('/rank','WechatController@rank');

    // 保存排行榜
    Route::post('/rank','WechatController@rankStore');

});

// github 钩子
Route::any('/github_hook', function (){
    echo shell_exec('cd /data/wwwroot/hb2.hnqxs.com');
    echo shell_exec('/usr/bin/git pull 2>&1');
});

// 设置公众号菜单,没有用了
//Route::get('/menu','WechatController@menu');
