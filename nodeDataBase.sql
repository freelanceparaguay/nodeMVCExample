-- MySQL dump 10.14  Distrib 5.5.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: nodeDataBase
-- ------------------------------------------------------
-- Server version	5.5.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `nodeDataBase`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nodeDataBase` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `nodeDataBase`;

--
-- Table structure for table `group_has_module`
--

DROP TABLE IF EXISTS `group_has_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_has_module` (
  `group_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`module_id`),
  KEY `fk_modulos_has_perfiles_perfiles1_idx` (`group_id`),
  KEY `fk_modulos_has_perfiles_modulos1_idx` (`module_id`),
  CONSTRAINT `fk_modulos_has_perfiles_groups1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_modulos_has_perfiles_modules1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_has_module`
--

LOCK TABLES `group_has_module` WRITE;
/*!40000 ALTER TABLE `group_has_module` DISABLE KEYS */;
INSERT INTO `group_has_module` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,1),(2,6);
/*!40000 ALTER TABLE `group_has_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'admin'),(2,'users');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlModule` varchar(45) NOT NULL,
  `moduleName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'/dashboard','Dashboard'),(2,'/users','Usuarios'),(3,'/groups','Groups'),(4,'/modules','Modules'),(5,'/groupsmodules','Groups and Modules'),(6,'/apis','Test APIS');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password_hash` text NOT NULL,
  `password_salt` text NOT NULL,
  `status` enum('0','1') NOT NULL,
  `groups_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`groups_id`),
  KEY `fk_users_groups1_idx` (`groups_id`),
  CONSTRAINT `fk_users_groups1` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','UIspUPiQIDG0M1hJz6m6tqLcoMo1b6YD7aVxFRuTiSwZwPap02qrSluma8K5dopK60obaSbbbzUahc1eus8FhMsY+YZ+r2DQ4s2UFsQMhcpw7vSYHRWPnuqQw4cJuQWe0O8dbEadE9TLyfWLSkaBWjyK2pY/v07J0rB5zDrtIgw=','hPGb2DrvK9pNQQMEPrpuWQ9TKVu8P1fl5Iuz55MlTlqmWx/AxDiOaeIVvqRHzVyk1viXQmhlHwQSYr1EVUl4dcIXkJQsOWqF0rNZiZzXu6AS3gSrfAkJIeUkJEAqwfmkEAumeYnrhknHq0fTb1EpqSqU2tEIKI4M1OLpNM4wXaQ=','1',1),(2,'user','KoSTRA+ka5qyqFZDWCC9QZM0v1K1B4Zaqe5EOH5PEIzA+CDJIeeqlL0gWqUZJblk92yX4QItJx3M/npmIsgPZBTWKHJ5ZjaNPNP/o55CcRdd6B/0RypMVH8u6nguCTtQ6dYTR7P3c644LLOvNrEMrom/LyklDpvsspqoA/XGeag=','Dqy5Aw1411eXYrVgCJLvaseXLkkt3p//SNjuM4EyzcsPYxnxiz93hBeiVyyvHCht3VuioiQqeVixXbh9krZAVifX/eJBx0E9WhlM+y8z84LyG8Hf8ZfNtFztm4YygCGdkRVQvqUUEYgKwJlt84ZQn6xhiePAvi3DWBvh2xWE/0Q=','1',2);
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

-- Dump completed on 2014-07-28 18:11:46
