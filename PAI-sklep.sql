-- MySQL Script generated by MySQL Workbench
-- nie, 24 cze 2018, 15:17:24
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pai
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pai
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pai` DEFAULT CHARACTER SET utf8 ;
USE `pai` ;

-- -----------------------------------------------------
-- Table `pai`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `e-mail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`cart_ids`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`cart_ids` (
  `cart_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE INDEX `basket_id_UNIQUE` (`cart_id` ASC),
  INDEX `fk_basket_ids_1_idx` (`user_id` ASC),
  CONSTRAINT `fk_basket_ids_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pai`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`products` (
  `product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `price` FLOAT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `category` INT(11) NOT NULL,
  `image_path` VARCHAR(100) NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC),
  INDEX `fk_product_1_idx` (`category` ASC),
  CONSTRAINT `fk_product_1`
    FOREIGN KEY (`category`)
    REFERENCES `pai`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`cart_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`cart_products` (
  `cart` INT(11) NOT NULL,
  `product` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`cart`, `product`),
  INDEX `fk_basket_product_2_idx` (`product` ASC),
  CONSTRAINT `fk_basket_product_1`
    FOREIGN KEY (`cart`)
    REFERENCES `pai`.`cart_ids` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_basket_product_2`
    FOREIGN KEY (`product`)
    REFERENCES `pai`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`order` (
  `order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cart_id` INT(11) NOT NULL,
  `date` DATE NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE INDEX `order_id_UNIQUE` (`order_id` ASC),
  INDEX `fk_order_1_idx` (`cart_id` ASC),
  CONSTRAINT `fk_order_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `pai`.`cart_ids` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `pai`.`ordered_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pai`.`ordered_products` (
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  INDEX `fk_ordered_products_1_idx` (`order_id` ASC),
  INDEX `fk_ordered_products_2_idx` (`product_id` ASC),
  CONSTRAINT `fk_ordered_products_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `pai`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ordered_products_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `pai`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
