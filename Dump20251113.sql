-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: store
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billing_details`
--

DROP TABLE IF EXISTS `billing_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `billing_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_details`
--

LOCK TABLES `billing_details` WRITE;
/*!40000 ALTER TABLE `billing_details` DISABLE KEYS */;
INSERT INTO `billing_details` VALUES (1,1,'max','pathumn071@gmail.com','+94 71 915 85 14','Annsigala\nKegalle1','Kegalle','71000','Sri Lanka','2025-11-12 06:10:32'),(2,2,'max','pathumn071@gmail.com','+94 71 915 85 14','Annsigala\nKegalle1','Kegalle','71000','Sri Lanka','2025-11-12 06:14:05'),(3,3,'max','pathumn071@gmail.com','+94 71 915 85 14','Annsigala\nKegalle1','Kegalle','71000','Sri Lanka','2025-11-12 06:15:02'),(4,4,'max','pathumn071@gmail.com','+94 71 915 85 14','Annsigala\nKegalle1','Kegalle','71000','Sri Lanka','2025-11-12 06:41:58'),(5,5,'Pathum','pathum@gmail.com','121212','sdsadsa','fd','dfdf','fdd','2025-11-13 05:13:18');
/*!40000 ALTER TABLE `billing_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) NOT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` float NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'3',1,23,'pending','2025-11-12 06:10:32'),(2,'3',1,23,'pending','2025-11-12 06:14:05'),(3,'3',1,23,'pending','2025-11-12 06:15:02'),(4,'PROD-40D9A65E',1,23,'pending','2025-11-12 06:41:58'),(5,'PROD-0EA7703E',1,10000,'pending','2025-11-13 05:13:18');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_basic`
--

DROP TABLE IF EXISTS `product_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_basic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_product_basic_product_id` (`product_id`),
  UNIQUE KEY `idx_product_id` (`product_id`),
  KEY `ix_product_basic_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_basic`
--

LOCK TABLES `product_basic` WRITE;
/*!40000 ALTER TABLE `product_basic` DISABLE KEYS */;
INSERT INTO `product_basic` VALUES (1,'PROD-704AC6FC','test21','TEST','ej'),(2,'PROD-890F1E61','test21','TEST','ej'),(3,'PROD-40D9A65E','test21','TEST','ej'),(4,'PROD-30AD538E','ELECTRIC','CLOCK','CLOACK'),(7,'PROD-61380ACE','ELECTRIC','Smart Watch','CLOACK'),(8,'PROD-B61D4073','ELECTRIC','Smart Watch','CLOACK'),(9,'PROD-10B383B2','ELECTRIC','Smart Watch','CLOACK'),(10,'PROD-A07AB262','ELECTRIC','TEST 01','CLOACK'),(11,'PROD-0EA7703E','ELECTRIC','TEST CLOAK','CLOACK'),(12,'PROD-DE71FE77','ELECTRIC','Smart Watch','CLOACK'),(13,'PROD-F1AA3B2D','ELECTRIC','Smart Watch','CLOACK'),(14,'PROD-039F7050','ELECTRIC','Smart Watch ee','CLOACK'),(15,'PROD-168DF254','ELECTRIC','Smart Watch ee','CLOACK'),(16,'PROD-0D81C2FE','ELECTRIC','TEST 01','CLOACK');
/*!40000 ALTER TABLE `product_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `products_id` int NOT NULL,
  `description` text,
  `features` json DEFAULT NULL,
  `specifications` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `price` float NOT NULL,
  `actual_price` float NOT NULL,
  `profit` float NOT NULL,
  `margin` float NOT NULL,
  `points` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_id` (`products_id`),
  KEY `ix_product_details_id` (`id`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `product_basic` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,1,'hELLO TEST',NULL,'null','[\"http://localhost:8080/admin\"]',23,233,-210,-90.1288,3),(2,2,'hELLO TEST',NULL,'null','[\"http://localhost:8080/admin\"]',23,233,-210,-90.1288,3),(3,3,'hELLO TEST',NULL,'null','[\"http://localhost:8080/admin\"]',23,233,-210,-90.1288,3),(4,4,'NEW CLOAK',NULL,'null','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',100,80,20,25,20),(5,7,'test','null','[{\"label\": \"tes\", \"value\": \"34\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,45,9955,22122.2,45),(6,8,'TEST DOC','null','[{\"label\": \"WEIGHT\", \"value\": \"100g\"}]','[\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\"]',10000,233,9767,4191.85,2),(7,9,'teter','null','[{\"label\": \"dasd\", \"value\": \"43\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,3444,6556,190.36,3),(8,10,'TEEST ','null','[{\"label\": \"WEIGHT\", \"value\": \"100g\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,2333,7667,328.633,23),(9,11,'test','[\"Brand New\"]','[{\"label\": \"kight\", \"value\": \"22\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,232,9768,4210.34,23),(10,12,'test','[\"Brand New\"]','[{\"label\": \"kight\", \"value\": \"22\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,232,9768,4210.34,23),(11,13,'test','null','[{\"label\": \"kight\", \"value\": \"22\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,232,9768,4210.34,23),(12,14,'test','[\"test\"]','[{\"label\": \"test\", \"value\": \"1\"}]','[\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\"]',10000,1233,8767,711.03,2),(13,15,'test','null','[{\"label\": \"test\", \"value\": \"1\"}]','[\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400\"]',10000,1233,8767,711.03,2),(14,16,'tres','[\"test\"]','[{\"label\": \"tes\", \"value\": \"2\"}]','[\"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400\"]',10000,343,9657,2815.45,4334);
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referrer_id` int NOT NULL,
  `new_user_id` int NOT NULL,
  `timestamp` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `referrer_id` (`referrer_id`),
  KEY `new_user_id` (`new_user_id`),
  KEY `ix_referrals_id` (`id`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`referrer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`new_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrals`
--

LOCK TABLES `referrals` WRITE;
/*!40000 ALTER TABLE `referrals` DISABLE KEYS */;
/*!40000 ALTER TABLE `referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_store`
--

DROP TABLE IF EXISTS `user_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `ix_user_store_user_id` (`user_id`),
  KEY `ix_user_store_id` (`id`),
  CONSTRAINT `user_store_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_basic` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_store`
--

LOCK TABLES `user_store` WRITE;
/*!40000 ALTER TABLE `user_store` DISABLE KEYS */;
INSERT INTO `user_store` VALUES (2,'user_123','TEST','PROD-40D9A65E','test21','ej'),(3,'user_123','CLOCK','PROD-30AD538E','ELECTRIC','CLOACK'),(4,'user_123','Smart Watch','PROD-61380ACE','ELECTRIC','CLOACK'),(5,'user_123','TEST 01','PROD-0D81C2FE','ELECTRIC','CLOACK'),(6,'user_123','Smart Watch ee','PROD-168DF254','ELECTRIC','CLOACK'),(7,'user_123','Smart Watch ee','PROD-039F7050','ELECTRIC','CLOACK'),(8,'user_123','TEST CLOAK','PROD-0EA7703E','ELECTRIC','CLOACK');
/*!40000 ALTER TABLE `user_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile_no` varchar(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `referral_code` varchar(20) NOT NULL,
  `referred_by` varchar(20) DEFAULT NULL,
  `points` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_no` (`mobile_no`),
  UNIQUE KEY `referral_code` (`referral_code`),
  KEY `ix_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'0719158514','max',NULL,'$2b$12$jF.OvF9Odhzp7bUkHzRBTeodL6WzQFab.8gqwtjHv6LkUYoSvtr/S',0,'670775','',NULL,0),(3,'0711411308','PATHUM',NULL,'$2b$12$RuapvMW5qHyrZOK2/vvsb.e/Zk4UqvC/PfYMbXu2RbKgP5D2v4gBG',0,'274809','PATA9TD',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-13 11:41:20
