-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for book
CREATE DATABASE IF NOT EXISTS `book` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `book`;

-- Dumping structure for table book.books
CREATE TABLE IF NOT EXISTS `books` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_name` varchar(255) NOT NULL COMMENT 'ชื่อหนังสือ',
  `types` varchar(100) NOT NULL COMMENT 'ประเภทหนังสือ',
  `profile_path` text NOT NULL COMMENT 'รูปปกหนังสือ',
  PRIMARY KEY (`b_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table book.books: ~18 rows (approximately)
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`b_id`, `b_name`, `types`, `profile_path`) VALUES
	(5, 'ฮิโนะมารุ ซูโม่กะเปี๊ยกฟัดโลก เล่ม 18', 'การ์ตูน', '1000230131_front_XXL.jpg'),
	(6, 'ฮิโนะมารุ ซูโม่กะเปี๊ยกฟัดโลก เล่ม 17', 'การ์ตูน', '1000226986_front_XXXL.jpg'),
	(8, 'ฮิโนะมารุ ซูโม่กะเปี๊ยกฟัดโลก เล่ม 16', 'การ์ตูน', '1000226032_front_XXXL.jpg'),
	(10, 'ฮิโนะมารุ ซูโม่กะเปี้ยกฟัดโลก เล่ม 15', 'สารคดี', '1000223420_front_XXXL.jpg'),
	(12, 'ฮิโนะมารุ ซูโม่กะเปี๊ยกฟัดโลก เล่ม 14 (ฉบับการ์ตูน)', 'การ์ตูน', '1000220789_front_XXXL.jpg'),
	(13, 'การินจูเนียร์ คดีที่ 1 ไขคดีปรากฏการณ์ผีโลกเร้นลับ', 'การ์ตูน', '1000204739_front_XXXL.jpg'),
	(14, 'ปรมาจารย์ลัทธิมาร เล่ม 1', 'นิยาย', 'ปรมาจารย์ลัทธิมาร เล่ม 1.jpg'),
	(15, 'ปรมาจารย์ลัทธิมาร เล่ม 2', 'นิยาย', 'ปรมาจารย์ลัทธิมาร เล่ม 2.jpg'),
	(16, 'ปรมาจารย์ลัทธิมาร เล่ม 3', 'นิยาย', 'ปรมาจารย์ลัทธิมาร เล่ม 3.jpg'),
	(32, 'ลิ่วเหยา เล่ม 1', 'นิยาย', '1000229867_front_XXXL.jpg'),
	(33, 'เรื่องนี้...หนูตอบได้! รอบรู้เรื่องพลาสติก', 'การ์ตูน', '1000230497_front_XXXL.jpg'),
	(34, 'ISSAK วีรบุรุษสมรภูมิเดือด เล่ม 1', 'การ์ตูน', '1000230706_front_XXXL.jpg'),
	(35, 'ปรสิต REVERSI เล่ม 1', 'การ์ตูน', '1000230705_front_XXXL.jpg'),
	(36, 'คุกกี้รันวิทย์ สวนสนุกวิทย์สุดมัน', 'การ์ตูน', '1000230392_front_XXXL.jpg'),
	(37, 'Black or White เลวแค่ไหนก็ต้องรัก', 'นิยาย', '1000226028_front_XXXL.jpg'),
	(38, 'สวรรค์ประทานพร เล่ม 3', 'นิยาย', '1000244627_front_XXXL.jpg'),
	(39, 'ฮัสกี้หน้าโง่กับอาจารย์เหมียวขาวของเขา เล่ม 9', 'นิยาย', '1000245327_front_XXXL.jpg'),
	(42, 'Kamisato Ayaka', 'การ์ตูน', '91316581_p0.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- Dumping structure for table book.staff
CREATE TABLE IF NOT EXISTS `staff` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสพนักงาน',
  `s_user` varchar(50) NOT NULL,
  `s_pw` varchar(200) NOT NULL,
  `s_fname` varchar(100) NOT NULL COMMENT 'ชื่อ',
  `s_lname` varchar(100) NOT NULL COMMENT 'สกุล',
  `s_tel` text NOT NULL COMMENT 'เบอร์โทร',
  `position` int(11) DEFAULT NULL COMMENT 'ตำแหน่ง',
  PRIMARY KEY (`s_id`) USING BTREE,
  UNIQUE KEY `f_name` (`s_fname`) USING BTREE,
  KEY `position` (`position`),
  CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`position`) REFERENCES `ap_stat` (`id_stat`)
) ENGINE=InnoDB AUTO_INCREMENT=2008 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table book.staff: ~4 rows (approximately)
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` (`s_id`, `s_user`, `s_pw`, `s_fname`, `s_lname`, `s_tel`, `position`) VALUES
	(2002, 'user', 'user', 'kkkk', 'c', '0965421679', 2),
	(2003, 'user2', 'user', 'สมมุต', 'เอา', '0652945530', 1),
	(2006, 'admin', 'admin', 'lnww', '-', '088888888', 1),
	(2007, 'admin2', 'admin2', 'a1', 'a2', '123456789', 1);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;

-- Dumping structure for table book.user
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'รหัสผู้ใช้',
  `u_user` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใขช้',
  `u_pw` varchar(200) NOT NULL COMMENT 'รหัสผ่าน',
  `u_fname` varchar(100) NOT NULL COMMENT 'ชื่อ',
  `u_lname` varchar(100) NOT NULL COMMENT 'สกุล',
  `u_tel` text NOT NULL COMMENT 'เบอร์โทร',
  PRIMARY KEY (`u_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1010 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table book.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`u_id`, `u_user`, `u_pw`, `u_fname`, `u_lname`, `u_tel`) VALUES
	(1001, 'nopparat609', '12345678', 'nopparat', 'khamkokaew', '0652945530'),
	(1002, 'nopkub', '$2b$10$qFX.Et6rSyNNTX/JIc6q5ubEZn.hREBpsc52HPKFOwiWbXaxeTEBS', 'นพรัตน์', 'คำโกแก้ว', '0652945530'),
	(1009, 'nok', '$2b$10$qFX.Et6rSyNNTX/JIc6q5ubEZn.hREBpsc52HPKFOwiWbXaxeTEBS', 'nopp', 'kham', '12234');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
- Dumping structure for table book.lends
CREATE TABLE IF NOT EXISTS `lends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `b_id` int(11) NOT NULL COMMENT 'ไอดีหนังสือ',
  `u_id` int(11) NOT NULL COMMENT 'ไอดีผู้ยืม',
  `Borrow_date` datetime NOT NULL COMMENT 'วันที่ยืม',
  `s_id` int(11) DEFAULT NULL COMMENT 'ไอดีเจ้าหน้าที่',
  `Time_allowed` datetime DEFAULT NULL COMMENT 'เวลาที่อนุญาต',
  `Date_night` datetime DEFAULT NULL COMMENT 'วันที่คืน',
  PRIMARY KEY (`id`),
  KEY `id_book` (`b_id`) USING BTREE,
  KEY `id_user` (`u_id`) USING BTREE,
  KEY `id_staff` (`s_id`) USING BTREE,
  CONSTRAINT `FK_lends_books` FOREIGN KEY (`b_id`) REFERENCES `books` (`b_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_lends_staff` FOREIGN KEY (`s_id`) REFERENCES `staff` (`s_id`),
  CONSTRAINT `FK_lends_user` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table book.lends: ~19 rows (approximately)
/*!40000 ALTER TABLE `lends` DISABLE KEYS */;
INSERT INTO `lends` (`id`, `b_id`, `u_id`, `Borrow_date`, `s_id`, `Time_allowed`, `Date_night`) VALUES
	(84, 6, 1001, '2020-02-07 13:55:02', NULL, NULL, NULL),
	(86, 5, 1002, '2020-02-12 14:37:41', 2006, '2020-02-16 21:50:49', '2020-02-16 21:51:23'),
	(87, 5, 1002, '2020-02-12 14:39:42', 2006, '2020-02-16 21:50:50', '2020-02-16 21:51:24'),
	(88, 10, 1002, '2020-02-12 14:40:12', 2006, '2020-02-16 21:50:51', '2020-02-16 21:51:24'),
	(91, 16, 1002, '2020-02-13 10:11:56', 2006, '2020-02-16 22:05:22', NULL),
	(92, 14, 1002, '2020-02-13 10:12:02', 2002, '2020-02-16 18:05:06', '2020-02-16 21:51:26'),
	(95, 36, 1002, '2020-02-13 18:40:11', 2002, '2020-02-16 18:05:07', '2020-02-16 21:51:28'),
	(99, 37, 1002, '2020-02-13 19:24:43', NULL, NULL, NULL),
	(101, 37, 1002, '2020-02-13 19:29:44', NULL, NULL, NULL),
	(105, 5, 1002, '2020-02-15 16:31:44', NULL, NULL, NULL),
	(106, 36, 1002, '2020-02-15 16:42:00', NULL, NULL, NULL),
	(107, 37, 1002, '2020-02-15 16:42:32', 2002, '2022-03-08 20:27:11', NULL),
	(108, 6, 1002, '2020-02-15 17:03:51', 2002, '2022-03-07 00:50:19', NULL),
	(110, 35, 1002, '2020-02-15 17:05:46', 2002, '2022-03-07 00:49:30', '2022-03-07 00:50:00'),
	(111, 37, 1001, '2020-02-16 20:09:28', 2002, '2022-03-07 00:49:26', NULL),
	(112, 37, 1001, '2020-02-16 20:09:32', 2002, '2022-03-07 23:52:19', NULL),
	(117, 39, 1009, '2022-03-07 21:09:31', 2002, '2022-03-07 21:09:49', '2022-03-07 21:09:59'),
	(119, 42, 1009, '2022-03-08 20:23:35', 2006, '2022-03-09 14:18:56', NULL),
	(120, 42, 1009, '2022-03-09 05:55:51', NULL, NULL, NULL);
/*!40000 ALTER TABLE `lends` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
