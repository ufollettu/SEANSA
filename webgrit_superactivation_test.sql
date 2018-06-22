-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mar 05, 2018 alle 08:35
-- Versione del server: 10.0.31-MariaDB-cll-lve
-- Versione PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webgrit_superactivation`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_CLIENTI`
--

CREATE TABLE `SA_CLIENTI` (
  `SC_ID` int(10) UNSIGNED NOT NULL,
  `SC_NOME` varchar(100) NOT NULL,
  `SC_PIVA` varchar(50) DEFAULT NULL,
  `SC_COD_FISCALE` varchar(50) DEFAULT NULL,
  `SC_INDIRIZZO` varchar(200) DEFAULT NULL,
  `SC_EMAIL` varchar(50) DEFAULT NULL,
  `SC_TELEFONO` varchar(20) DEFAULT NULL,
  `SC_REFERENTE_NOME` varchar(100) DEFAULT NULL,
  `SC_TEL_REFERENTE` varchar(100) DEFAULT NULL,
  `SC_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `SC_DELETED` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_CLIENTI`
--

INSERT INTO `SA_CLIENTI` (`SC_ID`, `SC_NOME`, `SC_PIVA`, `SC_COD_FISCALE`, `SC_INDIRIZZO`, `SC_EMAIL`, `SC_TELEFONO`, `SC_REFERENTE_NOME`, `SC_TEL_REFERENTE`, `SC_TS`, `SC_DELETED`) VALUES
(9, 'GR s.r.l.', '', '', 'Via Primo Maggio 5/2', 'info@grsrl.net', '051 845 111', 'Uff. Ricerca e Sviluppo', 'ricercaesviluppo@grsrl.net', '2017-07-12 06:44:09', 0),
(10, 'Raniero carrelli elevatori', '', '', 'Via Delle Industrie 12', 'info@raniero-carrelli.com', '0423948542', 'Daniele M.', 'daniele@raniero-carrelli.com', '2017-08-22 08:50:03', 0),
(12, 'E Van Gent (Olanda)', '', '', '', '', '', ' ', '', '2017-07-12 06:44:08', 0),
(13, 'STE Verona', '', '', '', 'steverona.sas@gmail.com', '', 'Tiziano', 'steverona.sas@gmail.com', '2017-07-12 06:44:10', 0),
(14, 'Florian Legno SPA', '', '', 'Via Castellana ', 'officina.officina@florianinc.com', '3478951662', 'Valter', '', '2017-07-12 06:44:07', 0),
(15, 'MATL & BULA (CZ)', '', '', '', '', '', '', '', '2017-07-28 08:08:12', 0),
(16, 'FLORIAN BERGER GmbH', '', '', '', '', '', '', '', '2017-09-20 14:20:18', 0),
(17, 'Adamo Pasqualino', '', '', 'Lamezia Terme', '', '', '', '', '2017-11-13 13:52:53', 0),
(18, 'Red Diamont Distribution', '', '', '', '', '', '', '', '2017-12-05 15:33:36', 0),
(19, 'STAPLERPROFI', '', '', '', '', '', '', '', '2017-12-21 09:34:11', 0),
(20, 'PETZ', '', '', '', '', '', '', '', '2018-01-18 14:26:22', 0),
(21, 'HCH Cristian', '', '', '', '', '', '', '', '2018-01-18 14:27:17', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_MATRICOLE`
--

CREATE TABLE `SA_MATRICOLE` (
  `sm_id` int(11) NOT NULL,
  `SM_MATRICOLA` int(11) NOT NULL,
  `SM_SS_ID` int(11) NOT NULL,
  `SM_DETTAGLI` varchar(255) DEFAULT NULL,
  `SM_CREATION_DATE` datetime NOT NULL,
  `SM_LAST_UPDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_MATRICOLE`
--

INSERT INTO `SA_MATRICOLE` (`sm_id`, `SM_MATRICOLA`, `SM_SS_ID`, `SM_DETTAGLI`, `SM_CREATION_DATE`, `SM_LAST_UPDATE`) VALUES
(1, 123456789, 33, 'Test matricola', '2018-03-05 08:32:10', '2018-03-05 07:32:10');

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_PC`
--

CREATE TABLE `SA_PC` (
  `SP_ID` int(10) UNSIGNED NOT NULL,
  `SP_HW_ID` varchar(10) NOT NULL,
  `SP_LAST_RX` datetime DEFAULT NULL,
  `SP_IP` varchar(20) DEFAULT NULL,
  `SP_STATUS` tinyint(1) NOT NULL DEFAULT '0',
  `SP_PC_DATE_TIME` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_PC`
--

INSERT INTO `SA_PC` (`SP_ID`, `SP_HW_ID`, `SP_LAST_RX`, `SP_IP`, `SP_STATUS`, `SP_PC_DATE_TIME`) VALUES
(10, 'PFXJT028J4', '2018-03-03 11:21:01', '95.227.218.39', 0, '2018-03-03'),
(9, '4805420112', '2018-02-28 16:45:05', '80.86.155.16', 0, '2018-02-28'),
(8, 'None123456', '2017-02-22 05:40:37', '87.10.57.101', 1, '2017-02-22'),
(7, 'PFKBPG31W9', '2018-03-05 08:33:24', '92.223.209.171', 0, '2018-03-05'),
(11, 'PELVKI41W8', '2018-01-09 10:57:23', '95.227.218.39', 0, '2018-01-09'),
(12, 'BSN1234567', '2018-01-10 09:52:17', '82.52.16.129', 0, '2018-01-10'),
(13, 'PELVKI41V8', '2017-03-14 06:03:53', '151.38.32.53', 0, '2017-03-14'),
(14, 'B5 N5VK123', '2017-12-15 17:14:45', '5.168.11.93', 0, '2017-12-15'),
(16, 'PFDVA018J9', '2018-02-27 12:28:02', '80.86.155.16', 0, '2018-02-27'),
(15, 'PCWBB1B2G4', '2018-02-22 15:37:03', '77.60.255.156', 0, '2018-02-22'),
(17, 'NBG5C11001', '2017-04-15 11:08:03', '80.86.155.16', 0, '2017-04-15'),
(21, 'PCSTQB97V3', '2017-10-30 15:13:49', '37.180.90.243', 0, '2017-10-30'),
(18, 'LXAKR0X041', '2017-11-23 16:18:14', '31.159.207.171', 0, '2017-11-23'),
(19, 'R90N0W8X12', '2017-12-11 15:23:23', '89.96.246.132', 0, '2017-12-11'),
(20, 'QB08004238', '2018-02-13 12:25:39', '81.19.12.74', 0, '2018-02-13'),
(23, '1ZLEH24G4N', '2018-02-19 15:53:11', '79.10.241.117', 0, '2018-02-19'),
(22, ' 123456789', '2018-02-01 09:42:59', '82.50.22.125', 0, '2018-02-01'),
(24, 'PEJGN00WD7', '2018-01-12 09:59:06', '92.207.194.254', 0, '2018-01-12'),
(25, '$$C0A144YK', '2018-02-13 09:37:07', '213.162.73.172', 0, '2018-02-13'),
(26, '1ZLMB31B37', '2018-03-01 08:10:36', '95.227.218.39', 0, '2018-03-01'),
(27, '/G8LNQJ2/C', '2018-01-26 15:22:53', '217.9.199.93', 0, '2018-01-26'),
(28, 'PF0LMSG112', '2018-02-10 13:28:16', '91.112.155.234', 0, '2018-02-10'),
(29, '0123456789', '2018-01-26 16:45:18', '217.236.43.92', 0, '2018-01-26'),
(30, 'PGEAB028J8', '2018-03-03 11:40:57', '80.86.155.16', 0, '2018-03-03');

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_RINNOVI`
--

CREATE TABLE `SA_RINNOVI` (
  `SR_ID` int(10) UNSIGNED NOT NULL,
  `SR_SS_ID` int(11) NOT NULL,
  `SR_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_RINNOVI`
--

INSERT INTO `SA_RINNOVI` (`SR_ID`, `SR_SS_ID`, `SR_TS`) VALUES
(38, 33, '2017-03-14 13:15:02'),
(39, 26, '2017-03-16 10:42:59'),
(40, 26, '2017-03-16 10:46:10'),
(41, 37, '2017-04-27 08:35:54'),
(42, 46, '2017-07-31 14:54:29'),
(43, 48, '2017-08-22 06:06:52'),
(44, 52, '2017-10-25 11:42:09'),
(45, 64, '2017-12-27 08:43:30'),
(46, 71, '2018-01-19 14:07:42');

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_SKS`
--

CREATE TABLE `SA_SKS` (
  `SS_ID` int(10) UNSIGNED NOT NULL,
  `SS_KEY` varchar(500) NOT NULL DEFAULT '',
  `SS_OEM` tinyint(1) NOT NULL DEFAULT '0',
  `SS_ACTIVATION_DATE` timestamp NULL DEFAULT NULL,
  `SS_EXPIRE` date DEFAULT NULL,
  `SS_CREATED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `SS_LAST_EDIT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `SS_MISMATCH_COUNT` int(11) NOT NULL DEFAULT '0',
  `SS_STATUS` tinyint(2) NOT NULL DEFAULT '1',
  `SS_SC_ID` int(10) UNSIGNED DEFAULT NULL,
  `SS_SP_ID` int(11) NOT NULL,
  `SS_ACTIVATED_BY` varchar(50) DEFAULT NULL,
  `SS_ACTIVATION_REFERENT` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_SKS`
--

INSERT INTO `SA_SKS` (`SS_ID`, `SS_KEY`, `SS_OEM`, `SS_ACTIVATION_DATE`, `SS_EXPIRE`, `SS_CREATED`, `SS_LAST_EDIT`, `SS_MISMATCH_COUNT`, `SS_STATUS`, `SS_SC_ID`, `SS_SP_ID`, `SS_ACTIVATED_BY`, `SS_ACTIVATION_REFERENT`) VALUES
(38, 'w7lSDJcJaiYt6gBSRxUahgRUQ', 0, '2017-03-14 13:02:45', '2018-03-15', '2017-03-14 12:48:22', '2017-03-14 14:38:43', 0, 1, 10, 13, 'Lampocar s.r.l.  (PC Florin)', 'Florin '),
(33, 'uMuxbIjBqMQTrf6iRoAYXraz7', 12, '2018-03-05 07:22:12', '2019-01-01', '2017-02-22 14:33:16', '2018-03-05 07:22:12', 3, 1, 9, 7, 'GR s.r.l.', 'Daniele Parazza - '),
(34, 'HlbSOxyrKDYakwYKnSgqJgJAj', 0, '2017-03-14 10:42:59', '2050-02-22', '2017-02-22 15:05:34', '2017-07-27 14:29:37', 0, 1, 10, 10, 'Lampocar s.r.l. (Notebook HP Daniele)', ' Daniele -                          daniele@raniero-carrelli.com'),
(35, 'qKs1HrZwtymAfhZWK31ryvacf', 0, '2017-08-22 09:24:04', '2020-02-22', '2017-02-22 15:48:50', '2017-08-22 09:24:04', 1, -1, 10, 12, 'Mátl & Bula', 'Martin Potá? - martin.potac@matl-bula.cz'),
(36, 'mQXfBr8HsLhelCCTpGTD9aTnj', 0, '2017-03-23 07:35:35', '2020-12-12', '2017-02-27 13:59:47', '2017-03-23 07:35:35', 0, 1, 10, 11, 'Lampocar s.r.l.', 'Luca - '),
(37, 'YfIhKiGZjE3xu31I9LSqLev53', 0, '2017-05-23 07:19:35', '2020-01-01', '2017-03-07 13:47:41', '2017-05-23 07:19:35', 0, 1, 9, 12, 'GR di Gigli Norberto s.r.l. (PC Venus)', 'Carlo Petrelli - ricercaesviluppo@grsrl.net'),
(39, 'TGKve1dk0pMh0Qd03budWPqPZ', 0, '2017-03-21 08:32:37', '2018-03-21', '2017-03-21 08:29:11', '2017-03-21 08:32:37', 0, 1, 10, 14, 'Lanpocar S.r.l.', 'Florin - PC Fujitsu Prova'),
(40, 'iOV0l9QSoIQF1tIYMrzbcr2jG', 0, '2017-03-23 09:44:23', '2018-03-23', '2017-03-23 09:35:18', '2017-03-27 07:55:53', 0, 1, 12, 15, 'Lampocar s.r.l.', 'Perry'),
(41, 'uP0bzXNTJgQkn3vxOuHzfP7hS', 0, '2017-03-28 14:07:01', '2020-01-10', '2017-03-28 13:55:24', '2017-03-28 14:07:01', 0, 1, 10, 16, 'Lampocar S.r.l.', 'Massimo - massimo@raniero-carelli.com'),
(42, 'acDeIagS6GVmCtTwiAyQALznP', 0, '2017-04-05 09:08:53', '2018-04-05', '2017-04-05 09:06:51', '2017-04-05 09:29:40', 0, 1, 10, 12, 'Lampocar S.r.l. (Bililio)', 'Noteboock ASUS - Service'),
(43, 'yHMpIwxzWyjAavCMRN3nf54KJ', 0, '2017-04-15 09:07:47', '2020-02-22', '2017-04-15 08:30:57', '2017-05-16 11:39:56', 0, 1, 10, 17, 'Lampocar S.r.l.', 'Daniele - daniele@raniero-carrelli.com'),
(44, '2SKIO94u8Jq3P7kb9yRJRpkVl', 1, '2017-05-16 07:24:04', '2018-05-16', '2017-05-16 06:25:52', '2017-05-16 11:39:55', 0, 1, 13, 18, 'Lampocar S.r.l.', 'Tiziano - steverona.sas@gmail.com'),
(45, 'afQatg3WMSMaHw56TKjRnPwEZ', 2, '2017-07-12 07:02:57', '2018-07-12', '2017-07-12 06:46:28', '2017-07-12 07:06:22', 0, 1, 14, 19, 'FLORIAN LEGNO SRL', 'VALTER - '),
(46, 'RxJ4S7bdAn1i6rCJyl6B8RWCx', 3, '2017-08-22 10:21:48', '2018-07-31', '2017-07-28 08:08:47', '2017-08-22 10:21:48', 1, 0, 15, 20, 'Matl & Bula', ' - '),
(47, 'rfiIr0jcIOxKsbVZrR3yWxwNg', 3, NULL, '0000-00-00', '2017-07-28 08:08:54', '2017-07-31 14:53:43', 0, -1, 15, 0, '', ''),
(50, '1ILNXSLW2u9ytTCJITlyJrhDk', 3, NULL, '2018-09-01', '2017-08-22 11:38:12', '2017-08-22 11:38:12', 0, 1, 15, 0, '', ''),
(48, 'IxrI9iUzXRI4iRYaNvETl3hrC', 3, '2017-08-22 11:25:30', '2018-08-21', '2017-08-01 09:09:04', '2017-08-22 11:25:30', 0, 1, 15, 20, 'Mátl & Bula', ' - '),
(49, 'itEh7h2BwrwMiQyw7iUV0PvwZ', 0, '2017-08-22 08:44:30', '2050-02-22', '2017-08-22 08:43:11', '2017-08-22 08:44:30', 0, 1, 10, 9, 'Lampocar S.r.l.', 'Daniele PC Fujitsu - daniele@raniero-carrelli.com'),
(51, 'FPxG2znElAJkdTkWLjdcAgYDp', 2, '2017-09-20 14:44:56', '2018-09-20', '2017-09-20 13:57:43', '2017-09-20 14:44:56', 0, 1, 16, 21, 'FLORIAN BERGER GmbH', ' - ch.z@berger-maschinen-at'),
(52, 'nc6M0yaj5ZT1CMPBC1Q1s2ktm', 10, '2018-03-01 15:44:50', '2020-01-01', '2017-10-23 15:12:37', '2018-03-01 15:44:50', 0, 1, 9, 7, 'awesrdtfgtdrse', ' - '),
(53, 'tUBRrsfcmFuUwgbEIE2lO5kYw', 10, '2017-10-26 14:21:56', '2020-01-01', '2017-10-26 14:20:20', '2017-10-26 14:21:56', 0, 1, 9, 22, 'GR s.r.l.', 'Carlo Petrelli - '),
(54, 'fkbrzvqkxt1hCPCoYLVQNyLmL', 10, '2017-11-06 15:37:44', '2050-01-01', '2017-10-27 13:42:59', '2017-11-06 15:37:44', 0, 1, 10, 9, 'Raniero', ' - '),
(55, '1HXOLqCYH6BQDWHnYWXp4bzb9', 10, '2017-10-27 13:56:02', '2050-01-01', '2017-10-27 13:54:13', '2017-10-27 13:56:02', 0, 1, 10, 10, 'Lampocar SRL', 'Daniele - PC_Notebook'),
(56, 'HY8demSnJinibbss3qSxyhLRg', 10, '2017-10-30 14:12:37', '0000-00-00', '2017-10-30 14:05:55', '2017-10-30 14:12:37', 0, 1, 16, 21, 'Berger', ' - '),
(57, 'B7UHbzF9SUM07kIEf4loZ5pQ6', 10, '2017-11-02 08:20:44', '2050-02-22', '2017-11-02 08:18:50', '2017-11-02 08:20:44', 0, 1, 10, 16, 'Raniero', 'Giorgio - '),
(58, 'i2QsI2tqplRCjo4ga5TUa1mDW', 10, '2017-11-09 15:36:36', '2050-11-03', '2017-11-09 15:33:48', '2017-11-09 15:36:36', 0, 1, 10, 11, 'Raniero', 'el cojon de nash - '),
(59, '0lNXra1DPTs5C0IBcwsHCmVNb', 10, '2018-03-01 15:46:18', '2050-11-11', '2017-11-13 07:28:10', '2018-03-01 15:46:18', 1, -1, 10, 7, 'wdwefdfrewfdfrewfd', ' - '),
(60, 'ydBPaWjngkuRHLncQgCNIr4GM', 3, '2017-11-13 14:06:56', '2018-11-15', '2017-11-13 13:53:18', '2017-11-13 14:06:56', 0, 1, 17, 23, 'Adamo Pasqualino', 'Giovanni - '),
(61, 'iYSNuNeaK93SddUHD0SOXmPYC', 10, '2017-12-05 16:23:31', '2018-12-05', '2017-12-05 15:35:40', '2017-12-11 13:19:33', 0, 1, 18, 24, 'Alto Handling', ' - '),
(62, 'mXzjs8zrT1g3N7GMdRZ4qFggr', 10, '2017-12-14 12:28:40', '2020-01-01', '2017-12-14 12:27:49', '2017-12-14 12:28:40', 0, 1, 9, 22, 'GR gierro', 'PC PANTOGRAFO - '),
(63, 'bNDaYV1DnJQJ2djJn8f7cIJje', 10, '2017-12-21 09:44:50', '2018-12-21', '2017-12-21 09:34:45', '2017-12-21 09:44:50', 0, 1, 19, 25, 'Staplerprofi GmbH', 'Mario Clerc - clerc@staplerprofi.co.at'),
(64, '8T2vTafYDpgZ5rOvx6t6YEbDz', 10, '2017-12-27 08:36:17', '2018-12-10', '2017-12-22 07:55:38', '2017-12-27 08:43:30', 0, 1, 10, 26, 'Giorgio', ' - '),
(65, '6HwmZ3SAB78NJU7J2AG7w8q4X', 10, '2018-01-08 13:28:10', '2019-01-08', '2018-01-08 13:21:36', '2018-01-08 13:28:10', 0, 1, 18, 27, 'Hannaman', 'Steve Doweney - sdd@hannaman.co.uk'),
(66, 'EGvBhLLD5RocLTHo24bA0mzfC', 0, '2018-01-09 09:28:59', '2050-02-22', '2018-01-09 09:26:37', '2018-01-09 09:28:59', 0, 1, 10, 16, 'Lampocar SRL', 'NASH - PC nuovo 2018'),
(67, 'kSS9FMddCXxe6Hr14YLdAu8x8', 11, '2018-01-26 15:43:27', '2019-01-20', '2018-01-18 14:27:36', '2018-01-26 15:43:27', 0, 1, 21, 29, 'Hummelbrunner', 'Christian - Hans'),
(68, '9GwYZodmHMPw5o3VwHxw4jsDD', 10, NULL, '2019-01-20', '2018-01-18 14:28:35', '2018-01-19 14:00:34', 0, -1, 20, 0, '', ''),
(69, 'J0H6nD6x3btUAIyW0YziZlvkD', 0, NULL, '2019-01-20', '2018-01-19 11:31:04', '2018-01-23 16:27:57', 0, -1, 20, 0, '', ''),
(70, 'XIEGfVJNNKwJxyv2Jcc18VHk0', 10, NULL, '2019-01-20', '2018-01-19 13:50:02', '2018-01-19 14:00:47', 0, -1, 20, 0, '', ''),
(71, 'Gl73GUCHmh98XnGmARHDVLwTu', 10, '2018-01-19 14:02:52', '2019-01-20', '2018-01-19 14:01:06', '2018-01-19 14:07:42', 0, 1, 20, 28, 'PETZ AU', ' - '),
(72, 'a3vuIExD4U42fkmJJx5hOPhdw', 0, '2018-03-03 09:45:22', '2019-01-20', '2018-03-03 09:42:13', '2018-03-03 09:45:22', 0, 1, 10, 30, 'Lampocar', 'Massimo - massiomo@raniero-carrelli.com'),
(73, 'YQwvkPpmaY3V3r3DfsUAL7FeV', 10, '2018-03-03 10:04:18', '2019-01-20', '2018-03-03 10:01:16', '2018-03-03 10:04:18', 0, 1, 10, 30, 'Lampocar', 'Massimo - massimo@raniero-carrelli.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `SA_UTENTI`
--

CREATE TABLE `SA_UTENTI` (
  `SU_ID` int(11) NOT NULL,
  `SU_UNA` varchar(40) NOT NULL,
  `SU_PAW` varchar(100) NOT NULL,
  `SU_LEVEL` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `SU_LAST_LOGIN` timestamp NULL DEFAULT NULL,
  `SU_CREATION` timestamp NULL DEFAULT NULL,
  `SU_LAST_EDIT` timestamp NULL DEFAULT NULL,
  `SU_DELETED` tinyint(1) NOT NULL DEFAULT '0',
  `SU_LAST_IP` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `SA_UTENTI`
--

INSERT INTO `SA_UTENTI` (`SU_ID`, `SU_UNA`, `SU_PAW`, `SU_LEVEL`, `SU_LAST_LOGIN`, `SU_CREATION`, `SU_LAST_EDIT`, `SU_DELETED`, `SU_LAST_IP`) VALUES
(28, 'lampocar', 'd98f23c21645a261c85968bc708462419220327c', 1, '2017-03-16 12:04:46', '2017-02-22 14:30:39', '2017-03-16 12:04:36', 1, '87.11.50.83'),
(27, 'daniele@raniero-carrelli.com', 'd98f23c21645a261c85968bc708462419220327c', 65535, '2018-03-03 09:54:51', '2017-02-22 10:21:22', '2018-03-05 07:23:19', 0, '95.227.218.39'),
(26, 'ricercaesviluppo@grsrl.net', '14c14cc54ecfe01ed5b302432c8bcb74785d2cc6', 65535, '2018-03-05 07:23:33', NULL, '2018-03-05 07:23:14', 0, '92.223.209.171'),
(29, 'testGR', '08651fa06a6c072447a9b5d95687e369c8c9ccdf', 16, '2017-10-19 07:44:09', '2017-03-14 12:19:41', '2017-09-11 12:58:39', 0, '82.48.35.3'),
(30, 'ciccio', 'c3240b9898aede89ba5730b4b028355257d7f1d2', 0, '2017-09-05 11:24:01', '2017-09-05 11:23:46', NULL, 0, '87.6.61.195');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `SA_CLIENTI`
--
ALTER TABLE `SA_CLIENTI`
  ADD PRIMARY KEY (`SC_ID`);

--
-- Indici per le tabelle `SA_MATRICOLE`
--
ALTER TABLE `SA_MATRICOLE`
  ADD PRIMARY KEY (`sm_id`);

--
-- Indici per le tabelle `SA_PC`
--
ALTER TABLE `SA_PC`
  ADD PRIMARY KEY (`SP_ID`);

--
-- Indici per le tabelle `SA_RINNOVI`
--
ALTER TABLE `SA_RINNOVI`
  ADD PRIMARY KEY (`SR_ID`);

--
-- Indici per le tabelle `SA_SKS`
--
ALTER TABLE `SA_SKS`
  ADD PRIMARY KEY (`SS_ID`),
  ADD UNIQUE KEY `SS_KEY` (`SS_KEY`),
  ADD UNIQUE KEY `SS_KEY_2` (`SS_KEY`);

--
-- Indici per le tabelle `SA_UTENTI`
--
ALTER TABLE `SA_UTENTI`
  ADD PRIMARY KEY (`SU_ID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `SA_CLIENTI`
--
ALTER TABLE `SA_CLIENTI`
  MODIFY `SC_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `SA_MATRICOLE`
--
ALTER TABLE `SA_MATRICOLE`
  MODIFY `sm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `SA_PC`
--
ALTER TABLE `SA_PC`
  MODIFY `SP_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT per la tabella `SA_RINNOVI`
--
ALTER TABLE `SA_RINNOVI`
  MODIFY `SR_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT per la tabella `SA_SKS`
--
ALTER TABLE `SA_SKS`
  MODIFY `SS_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT per la tabella `SA_UTENTI`
--
ALTER TABLE `SA_UTENTI`
  MODIFY `SU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
