/*
 Navicat Premium Data Transfer

 Source Server         : shanzhong
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : 218.244.128.124
 Source Database       : guohang_hongbao

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : utf-8

 Date: 02/06/2018 14:42:34 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `gh_migrations`
-- ----------------------------
DROP TABLE IF EXISTS `gh_migrations`;
CREATE TABLE `gh_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `gh_rank`
-- ----------------------------
DROP TABLE IF EXISTS `gh_rank`;
CREATE TABLE `gh_rank` (
  `openid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `gh_rank_all`
-- ----------------------------
DROP TABLE IF EXISTS `gh_rank_all`;
CREATE TABLE `gh_rank_all` (
  `score` int(11) NOT NULL,
  `openid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `gh_users`
-- ----------------------------
DROP TABLE IF EXISTS `gh_users`;
CREATE TABLE `gh_users` (
  `openid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Procedure structure for `rank_all_update`
-- ----------------------------
DROP PROCEDURE IF EXISTS `rank_all_update`;
delimiter ;;
CREATE DEFINER=`root`@`%` PROCEDURE `rank_all_update`()
begin
delete from gh_rank_all;
INSERT INTO gh_rank_all 
select stab.score,utab.openid,utab.name,utab.nickname,utab.avatar,utab.city,utab.province,utab.country from gh_users utab 
join (select max(score) as score,openid from gh_rank  GROUP BY openid) stab 
on utab.openid = stab.openid order by stab.score desc limit 100;
end
 ;;
delimiter ;

-- ----------------------------
--  Event structure for `schedule_rank_all_10min`
-- ----------------------------
DROP EVENT IF EXISTS `schedule_rank_all_10min`;
delimiter ;;
CREATE DEFINER=`root`@`%` EVENT `schedule_rank_all_10min` ON SCHEDULE EVERY 10 MINUTE STARTS '2018-02-01 13:44:22' ON COMPLETION PRESERVE ENABLE DO call rank_all_update()
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
