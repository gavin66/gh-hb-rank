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

//    Route::get('/rank_test','WeChatController@rankStore');
});

// github 钩子
Route::any('/github_hook', function (){
    echo shell_exec('cd /data/wwwroot/gh-hb');
    echo shell_exec('sudo /usr/bin/git pull 2>&1');
});

// ajax 请求...
//Route::group(['middleware' => ['web', 'wechat_']],function (){
//    Route::get('/rank','WeChatController@rank');
//    Route::post('/rank','WeChatController@rank_store');
//});

//Route::any('/games', function (){
//    return view('game');
//});
