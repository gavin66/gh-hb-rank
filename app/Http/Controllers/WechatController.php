<?php

namespace App\Http\Controllers;

use EasyWeChat;
use App\User;
use App\Rank;
use App\RankAll;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class WechatController extends Controller
{
    private $jsonStru = [
        'code' => 0,
        'msg' => '',
        'data' => [],
    ];

    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function serve()
    {
        $officialAccount = EasyWeChat::officialAccount(); // 公众号
        $officialAccount->server->push(function($message){
//            switch ($message['MsgType']) {
//                case 'event':
//                    return '收到事件消息';
//                    break;
//                case 'text':
//                    return '收到文字消息';
//                    break;
//                case 'image':
//                    return '收到图片消息';
//                    break;
//                case 'voice':
//                    return '收到语音消息';
//                    break;
//                case 'video':
//                    return '收到视频消息';
//                    break;
//                case 'location':
//                    return '收到坐标消息';
//                    break;
//                case 'link':
//                    return '收到链接消息';
//                    break;
//                // ... 其它消息
//                default:
//                    return '收到其它消息';
//                    break;
//            }

            // 什么都不回复
            return '';
        });

        return $officialAccount->server->serve();
    }

    /**
     * 开始游戏
     *
     * @return string
     */
    public function game(){
        $userData = session('wechat.oauth_user.default'); // 拿到授权用户资料

        // 新增一个新用户
        try{
            $user = User::findOrFail($userData['id']);
        }catch (ModelNotFoundException $exception){
            $user = new User;
            $user->openid = $userData['id'];
            $user->name = $userData['name'];
            $user->nickname = $userData['nickname'];
            $user->avatar = $userData['avatar'];
            $user->city = $userData['original']['city'];
            $user->province = $userData['original']['province'];
            $user->country = $userData['original']['country'];
            $user->original = json_encode($userData['original']);
            $isSuccess = $user->save();
        }

        // 返回游戏 blade
        return view('game',$user);
    }

    /**
     * 总排行榜
     */
    public function rankAll(){
        $rankAll = RankAll::select('score','nickname')->orderBy('score','desc')->limit(10)->get();

        return response()->json($rankAll);
    }

    /**
     * 个人排行榜
     *
     * @return string
     */
    public function rank(){
        $userData = session('wechat.oauth_user.default'); // 拿到授权用户资料

        $rank = Rank::select('score')->where('openid',$userData['id'])->orderBy('score','desc')->limit(10)->get();
//        $rank = Rank::select('score')->where('openid',$userData['id'])->get();

        return response()->json($rank);
    }

    /**
     * 保存个人得分记录
     *
     * @param Request $request
     *
     * @return string
     */
    public function rankStore(Request $request){
        // 返回 blade
        if($request->has('score') == false){
            $re = $this->jsonStru;
            $re['code'] = 1;
            $re['msg'] = '分数未上传';
            return response()->json($re);
        }

        $userData = session('wechat.oauth_user.default'); // 拿到授权用户资料

        $rank = new Rank;
        $rank->openid = $userData['id'];
        $rank->score = intval($request->input('score'));
        $isSuccess = $rank->save();

        if($isSuccess == false){
            $re = $this->jsonStru;
            $re['code'] = 1;
            $re['msg'] = '未知错误';
            return response()->json($re);
        }

        return response()->json($this->jsonStru);
    }
}
