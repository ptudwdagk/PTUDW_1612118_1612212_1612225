-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 11, 2019 lúc 08:33 PM
-- Phiên bản máy phục vụ: 10.3.15-MariaDB
-- Phiên bản PHP: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hhdexpress`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baibao`
--

CREATE TABLE `baibao` (
  `idBaiBao` int(11) NOT NULL,
  `TenBaiBao` varchar(200) NOT NULL,
  `ChuyenMuc` int(11) NOT NULL,
  `TacGia` int(11) NOT NULL,
  `NgayDang` date NOT NULL,
  `TrangThai` int(11) NOT NULL,
  `NoiDung` mediumtext NOT NULL,
  `TomTat` varchar(1200) NOT NULL,
  `AnhDaiDien` varchar(1000) NOT NULL,
  `Premium` int(11) NOT NULL,
  `LuotXem` int(11) DEFAULT NULL,
  `Tag` int(11) NOT NULL,
  `NguyenNhanKhongDuyet` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binhluan`
--

CREATE TABLE `binhluan` (
  `idBinhLuan` int(11) NOT NULL,
  `NoiDung` text NOT NULL,
  `BaiBao` int(11) NOT NULL,
  `NguoiBinhLuan` int(11) NOT NULL,
  `NgayDang` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenmuc`
--

CREATE TABLE `chuyenmuc` (
  `idChuyenMuc` int(11) NOT NULL,
  `TenChuyenMuc` varchar(100) NOT NULL,
  `NguoiQuanLiChuyenMuc` int(11) NOT NULL,
  `LoaiChuyenMuc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `chuyenmuc`
--

INSERT INTO `chuyenmuc` (`idChuyenMuc`, `TenChuyenMuc`, `NguoiQuanLiChuyenMuc`, `LoaiChuyenMuc`) VALUES
(1, '', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phanhe`
--

CREATE TABLE `phanhe` (
  `idPhanHe` int(11) NOT NULL,
  `TenPhanHe` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tagbaibao`
--

CREATE TABLE `tagbaibao` (
  `idTag` int(11) NOT NULL,
  `TenTag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhvien`
--

CREATE TABLE `thanhvien` (
  `idThanhVien` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `NgaySinh` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `NgayKichHoat` date NOT NULL,
  `NgayHetHan` date NOT NULL,
  `MatKhau` varchar(50) NOT NULL,
  `ButDanh` varchar(100) NOT NULL,
  `PhanHe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthai`
--

CREATE TABLE `trangthai` (
  `idTrangThai` int(11) NOT NULL,
  `TenTrangThai` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `baibao`
--
ALTER TABLE `baibao`
  ADD PRIMARY KEY (`idBaiBao`);

--
-- Chỉ mục cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`idBinhLuan`);

--
-- Chỉ mục cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  ADD PRIMARY KEY (`idChuyenMuc`);

--
-- Chỉ mục cho bảng `tagbaibao`
--
ALTER TABLE `tagbaibao`
  ADD PRIMARY KEY (`idTag`,`TenTag`);

--
-- Chỉ mục cho bảng `thanhvien`
--
ALTER TABLE `thanhvien`
  ADD PRIMARY KEY (`idThanhVien`);

--
-- Chỉ mục cho bảng `trangthai`
--
ALTER TABLE `trangthai`
  ADD PRIMARY KEY (`idTrangThai`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `idBinhLuan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  MODIFY `idChuyenMuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `tagbaibao`
--
ALTER TABLE `tagbaibao`
  MODIFY `idTag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thanhvien`
--
ALTER TABLE `thanhvien`
  MODIFY `idThanhVien` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `trangthai`
--
ALTER TABLE `trangthai`
  MODIFY `idTrangThai` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
