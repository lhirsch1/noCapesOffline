-- DROP DATABASE IF EXISTS nocapes_db;

-- CREATE DATABASE nocapes_db;

USE nocapes_db;


INSERT INTO Charities 
(name, streetAddress, city, zipCode, state, phoneNumber, charUrl, photo, email)
 VALUES 
 ('Groveland Food Shelf', '1900 Nicollet Ave', 'Minneapolis', '55408','MN', '1231231231', 'https://www.grovelandfoodshelf.org/','groveland.png','hi32@gmail.com'),
 ('Special Olympics ', '3000 Bde Maka Ska Parkway', 'Minneapolis', '55408','MN', '1231231231', 'https://specialolympicsminnesota.org/','specialOlympics.png','hi4@gmail.com'),
 ('Full Cycle', '3515 Chicago Ave', 'Minneapolis', '55407','MN', '1231231231', 'https://fullcyclebikeshop.org/','fullCycle.jpg','hi5@gmail.com'),
 ('No Capes', '3129 Aldrich Ave S', 'Minneapolis', '55408', 'MN', '1324142311', 'www.google.com', 'nocapes.png', 'nocapes@nocapes.org');


INSERT INTO Categories (name) VALUES ('donation'),('event'),('promotion');


INSERT INTO Tasks 
(CharityId,CategoryId,name, description, completionMessage, points,badge, confirmation) 
VALUES 
(1,1,'Canned Food Drive','Bring 5 canned food items', 'Thank you for your donation!',50,'/can.png', 0),
(2,2,'Buddy Walk','Walk around Bde Maka Ska On April 23rd to raise awareness for Down Syndrome!', 'Thank you for volunteering',50,'/walking.png',0),
(3,1,'Bike Drive','Bring gently used bikes and bike parts for donation!','Thank you for your donation!',50,'bike.png',1),
(4,1, 'Book Drive', 'Bring gently used books for donation to local shelters','Thank you for your donation!',100,'book.jpg',0);
