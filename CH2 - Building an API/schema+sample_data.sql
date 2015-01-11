# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.22)
# Database: dindin
# Generation Time: 2015-01-11 12:02:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table recipes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recipes`;

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cooking_time` varchar(255) DEFAULT NULL,
  `prep_time` varchar(255) DEFAULT NULL,
  `serves` int(11) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `ingredients` text,
  `directions` text,
  `stars` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipes_users_idx` (`user_id`),
  CONSTRAINT `fk_recipes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;

INSERT INTO `recipes` (`id`, `name`, `cooking_time`, `prep_time`, `serves`, `cuisine`, `ingredients`, `directions`, `stars`, `user_id`)
VALUES
	(1,'Golden Chicken With Tomatoes and Olives','30mins','20mins',4,'Italian','1 cup long-grain rice, 2 tablespoons olive oil, 1 pound chicken breasts cut, kosher salt, black pepper, 1 large onion, tomatoes, 1 cup large olives, 2 cloves garlic, 3/4 cup dry white wine, flat-leaf parsley','1) Cook the rice according to the package directions.\n2) Heat the oil in a large skillet over medium heat. Season the chicken with ½ teaspoon each salt and pepper. Cook until golden brown, 3 to 4 minutes per side. Transfer to a plate.\n3) Add the onion to the skillet and cook, stirring occasionally, until soft, 5 to 6 minutes.\n4) Add the tomatoes, olives, and garlic and cook, stirring, for 2 minutes.\n5) Return the chicken to the skillet and add the wine. Simmer until the chicken is cooked through and the sauce has slightly thickened, 4 to 6 minutes.\n6) Stir in the parsley. Serve with the rice.',0,1),
	(2,'Nigerian suya','20mins','90mins',8,'Nigerian','1 kg fillet of beef, trimmed, 500 g ripe tomatoes, (mixed colours if possible), ½ red cabbage, ½ white cabbage, 1 red onion, 1 cucumber, 2 lemons, extra virgin olive oil, sea salt, freshly ground black pepper, olive oil','1) Soak 32 wooden skewers in plenty of cold water.\n2) Very finely slice the beef\n3) Chop the onion, garlic and ginger. Trim and deseed the chillies and pepper, then roughly chop. Trim and roughly chop the spring onion. Add it all to the liquidiser and blitz until smooth. Transfer the mixture to the ground spices and stir well. Turn the beef in the marinade until well coated, then thread 4 to 5 slices onto each soaked skewer. Place on a tray, cover and pop in the fridge to marinate for around 3 hours.\n4) Prepare a salad\n5) Place on the griddle for 1 to 2 minutes, or until golden, turning regularly\n6) Drizzle olive oil, then serve with the salad and lemon juice',0,2),
	(3,'Southwestern Beef Chili With Corn','30mins','10mins',4,'American','1 tablespoon olive oil, 2 carrots, 1 onion, 1 bell pepper, 1/2 pound ground beef, 2 tablespoons tomato paste, 2 15-ounce cans black beans, 1 tablespoon chili powder, kosher salt and black pepper, 1/2 cup corn kernels, 1/2 cup grated Cheddar, 2 scallions','1) Heat the oil in a large saucepan over medium-high heat. Add the carrots, onion, and poblano and cook, stirring, for 3 minutes.\n2) Add the beef and cook, breaking it up with a spoon, until no longer pink, 3 to 5 minutes.\n3) Add the tomato paste and cook, stirring, until it is slightly darkened, 1 minute.\n4) Stir in the beans, chili powder, 3 cups water, ½ teaspoon salt, and ¼ teaspoon pepper.\n5) Simmer over medium heat until the vegetables are tender, 8 to 10 minutes. Stir in the corn.\n6) Divide the chili among bowls and top with the Cheddar and scallions.',0,1),
	(4,'Cherry cheesecake','3hrs','30mins',6,'English','125 grams digestive biscuits, 75 grams soft butter, 300 grams cream cheese, 60 grams icing sugar, 1 teaspoon vanilla extract, 1/2 teaspoon lemon juice, 250 ml double cream, 1 x 284 grams jar black cherry spread','1) Crush the biscuits into to crumbs, then add the butter and mix again\n2) Press this mixture into a 20cm / 8 inch springform tin; press a little up the sides to form a slight ridge.\n3) Beat together the cream cheese, icing sugar, vanilla extract and lemon juice in a bowl until smooth.\n4) Whip the double cream, and then mix it into the cheese mixture.\n5) Put the filling on top of the base and smooth with a spatula. \n6) Put it in the fridge for 3 hours or overnight.\n7) When ready, spread the cherry topping',0,2);

/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1,'john','$2a$10$R4cP8DMzU1ahZz8Rcv8bZ.yrSKD9ZMwmRDiE0rcMqKeDn7cPYTvDS'),
	(2,'jane','$2a$10$GoeZczQ/OiEmdv96gDwdBe.210qO3OmmRuGr6dm5w18Tj.L1r75Vi');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
