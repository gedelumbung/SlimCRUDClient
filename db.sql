CREATE TABLE IF NOT EXISTS `tbl_customer` (
`id_customer` INT( 5 ) NOT NULL AUTO_INCREMENT ,
`nama_customer` VARCHAR( 100 ) NOT NULL ,
`alamat` TEXT NOT NULL ,
`telepon` VARCHAR( 50 ) NOT NULL ,
`tempat_lahir` VARCHAR( 100 ) NOT NULL ,
`tgl_lahir` VARCHAR( 100 ) NOT NULL ,
PRIMARY KEY ( `id_customer` )
) 

CREATE TABLE IF NOT EXISTS `tbl_api_reg` (
`id_api_reg` INT( 5 ) NOT NULL AUTO_INCREMENT ,
`email` VARCHAR( 50 ) NOT NULL ,
`api_key` VARCHAR( 50 ) NOT NULL ,
PRIMARY KEY ( `id_api_reg` )
)
