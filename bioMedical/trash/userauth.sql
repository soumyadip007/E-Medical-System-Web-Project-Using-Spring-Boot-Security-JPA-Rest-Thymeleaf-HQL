-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2019 at 04:30 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userauth`
--

-- --------------------------------------------------------

--
-- Table structure for table `app`
--

CREATE TABLE `app` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `date` text NOT NULL,
  `time` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `regtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app`
--

INSERT INTO `app` (`id`, `name`, `email`, `date`, `time`, `description`, `regtime`) VALUES
(16, 'Soumyadip Chowdhury', 'testUser@gmail.com', '6/20/2019', '10:00pm', 'Fever', '2019-06-08 12:22:26'),
(17, 'Soumyadip Chowdhury', 'testUser@gmail.com', '6/19/2019', '11:00pm', 'Fever', '2019-06-08 12:22:08'),
(18, 'Soumyadip Chowdhury', 'hello@gmail.com', '6/4/2019', '12:30am', 'Cold', '2019-06-08 13:04:17'),
(19, 'Soumyadip Chowdhury', 'abc@teamcg.com', '6/5/2019', '12:30am', 'Fever', '2019-06-14 11:40:45'),
(21, 'Soumyadip Chowdhury', 'testUser@gmail.com', '7/3/2019', '3:30am', 'Fever', '2019-07-03 08:36:17');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(22),
(22);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `lastseen` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `confirmation_token`, `username`, `enabled`, `first_name`, `gender`, `last_name`, `password`, `authority`, `lastseen`) VALUES
(1, '36983cce-975b-4a92-bf73-a4f41978e01c', 'soumyadip.note@gmail.com', b'1', 'Soumyadip', 'MALE', 'Chowdhury', 'soumyadip', 'ROLE_ADMIN', 'Sat Aug 10 16:42:45 IST 2019'),
(2, 'ByAdmin-Panel', 'soumyadip@gmail.com', b'1', 'Soumyadip', 'Male', 'Chowdhury', 'default', 'ROLE_DOCTOR', 'Fri Jun 14 17:11:47 IST 2019'),
(4, 'ByAdmin-Panel', 'a.note@gmail.com', b'1', 'Soumyadip', 'MALE', 'Chowdhury', 'default', 'ROLE_DOCTOR', 'Wed Jul 03 14:06:52 IST 2019'),
(6, 'ByAdmin-Panel', 'soumyadip.ote@gmail.com', b'1', 'Soumyadip', 'MALE', 'Chowdhury', 'default', 'ROLE_DOCTOR', 'Tue Aug 06 17:15:20 IST 2019'),
(7, 'ByAdmin-Panel', 'soumydip.cmp@gmail.com', b'1', 'Mr. Soumyadip', 'MALE', 'Chowdhury', 'default', 'ROLE_ADMIN', 'Sat Jun 08 18:25:03 IST 2019'),
(12, 'a6866ee4-f568-47a9-9a23-2297ec37c293', 'testUser@gmail.com', b'1', 'Soumyadip', 'Male', 'Chowdhury', 'soumyadip', 'ROLE_USER', 'Tue Aug 06 17:13:58 IST 2019'),
(20, 'ByAdmin-Panel', 's@teamcg.com', b'1', 'Sanket', 'Male', 'Sarkar', 'default', 'ROLE_DOCTOR', 'Fri Jun 14 17:14:51 IST 2019');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app`
--
ALTER TABLE `app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
