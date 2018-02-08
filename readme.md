# Readme

* mysql 定时调度程序,总排行榜更新
```sql

-- 定时任务是否启动
show variables like '%event_sche%';

-- 启动定时任务
set global event_scheduler=1;

-- 排行榜更新的存储过程
delimiter //
create procedure rank_all_update()
begin
delete from gh_rank_all;
INSERT INTO gh_rank_all 
select stab.score,utab.openid,utab.name,utab.nickname,utab.avatar,utab.city,utab.province,utab.country from gh_users utab 
join (select max(score) as score,openid from gh_rank  GROUP BY openid) stab 
on utab.openid = stab.openid order by stab.score desc limit 100;
end//
delimiter ;

-- 定时任务
create event schedule_rank_all_1min
on schedule every 1 minute
on completion preserve enable
do call rank_all_update();

-- 开启定时任务
alter event schedule_rank_all_1min on completion preserve enable;

-- 关闭定时任务
alter event schedule_rank_all_1min on completion preserve disable;

-- 查看定时任务
SELECT event_name,event_definition,interval_value,interval_field,status FROM information_schema.EVENTS;

```
