;              
--CREATE USER IF NOT EXISTS SA SALT 'cb9e2cc6cfabff00' HASH '017ed17b9dc7fb55b2f957198b54cac2ca472005877d5a2d4780ddecfb4810ef' ADMIN;            
CREATE SEQUENCE PUBLIC.HIBERNATE_SEQUENCE START WITH 171;      
CREATE CACHED TABLE PUBLIC.ANSWER(
    ANSWER_ID INTEGER NOT NULL,
    QUESTIONID INTEGER,
    OPTION VARCHAR(255)
);          
ALTER TABLE PUBLIC.ANSWER ADD CONSTRAINT PUBLIC.CONSTRAINT_7 PRIMARY KEY(ANSWER_ID);           
-- 25 +/- SELECT COUNT(*) FROM PUBLIC.ANSWER;  
INSERT INTO PUBLIC.ANSWER(ANSWER_ID, QUESTIONID, OPTION) VALUES
(1, 1, '"print(\"Hello World\")" '),
(2, 2, '"#This is a comment"'),
(3, 3, '"my-var"'),
(4, 4, '"Both the other answers are correct"'),
(5, 5, '".py"'),
(6, 6, '"Both the other answers are correct"'),
(7, 7, '"print(type(x))"'),
(8, 8, '"def myFunction():"'),
(9, 9, ' "True"'),
(10, 10, '"x = \"Hello\"[0]"'),
(11, 11, '"strip()"'),
(12, 12, '"upper()"'),
(13, 13, '"replace()"'),
(14, 14, '"*"'),
(15, 15, '"=="'),
(16, 16, '"[\"apple\", \"banana\", \"cherry\"]"'),
(17, 17, '"(\"apple\", \"banana\", \"cherry\")"'),
(18, 18, '"{\"apple\", \"banana\", \"cherry\"}" '),
(19, 19, '"{\"name\": \"apple\", \"color\": \"green\"}"'),
(20, 20, '"LIST"'),
(21, 21, '"SET"'),
(22, 22, '"if x > y:"'),
(23, 23, '"while x > y:"'),
(24, 24, '"for x in y:"'),
(25, 25, '"break"');             
CREATE CACHED TABLE PUBLIC.SCORE(
    SID BIGINT NOT NULL,
    TID BIGINT,
    UID BIGINT,
    TIMESTMP TIMESTAMP
);           
ALTER TABLE PUBLIC.SCORE ADD CONSTRAINT PUBLIC.CONSTRAINT_4 PRIMARY KEY(SID);  
-- 22 +/- SELECT COUNT(*) FROM PUBLIC.SCORE;   
INSERT INTO PUBLIC.SCORE(SID, TID, UID, TIMESTMP) VALUES
(11, 3, 1, TIMESTAMP '2019-02-14 12:28:18.658'),
(49, 1, 1, TIMESTAMP '2019-02-19 16:59:01.366'),
(53, 2, 1, TIMESTAMP '2019-02-21 10:50:29.153'),
(62, 4, 1, TIMESTAMP '2019-02-22 15:53:34.096'),
(65, 1, 64, TIMESTAMP '2019-02-24 12:50:51.024'),
(66, 2, 64, TIMESTAMP '2019-02-24 12:50:59.159'),
(68, 3, 64, TIMESTAMP '2019-02-24 14:11:54.002'),
(101, 1, 100, TIMESTAMP '2019-02-26 14:45:04.436'),
(108, 0, 107, TIMESTAMP '2019-02-26 16:23:26.064'),
(110, 0, 109, TIMESTAMP '2019-02-26 16:28:39.662'),
(112, 0, 111, TIMESTAMP '2019-02-26 21:25:04.131'),
(113, 2, 111, TIMESTAMP '2019-02-26 21:25:47.831'),
(114, 3, 111, TIMESTAMP '2019-02-27 13:07:58.194'),
(116, 0, 115, TIMESTAMP '2019-03-01 22:21:55.532'),
(118, 1, 115, TIMESTAMP '2019-03-01 22:24:21.286'),
(121, 0, 120, TIMESTAMP '2019-03-02 12:49:51.427'),
(132, 1000, 1, TIMESTAMP '2019-03-04 21:10:12.402'),
(136, 0, 135, TIMESTAMP '2019-03-06 11:02:52.359'),
(138, 0, 137, TIMESTAMP '2019-03-06 11:09:29.733'),
(139, 1000, 111, TIMESTAMP '2019-03-06 11:34:44.79'),
(149, 1, 111, TIMESTAMP '2019-03-06 12:39:11.818'),
(153, 6, 111, TIMESTAMP '2019-03-06 12:55:56.918');              
CREATE CACHED TABLE PUBLIC.TUTORIAL(
    TID BIGINT NOT NULL,
    LEVEL INTEGER NOT NULL,
    POINTS INTEGER NOT NULL,
    TITLE VARCHAR(255)
);               
ALTER TABLE PUBLIC.TUTORIAL ADD CONSTRAINT PUBLIC.CONSTRAINT_3 PRIMARY KEY(TID);               
-- 8 +/- SELECT COUNT(*) FROM PUBLIC.TUTORIAL; 
INSERT INTO PUBLIC.TUTORIAL(TID, LEVEL, POINTS, TITLE) VALUES
(0, 0, 20, 'Registration'),
(1, 1, 20, 'Simple Programs'),
(2, 1, 30, 'Variables'),
(3, 1, 35, 'Loops'),
(4, 2, 45, 'Functions'),
(5, 2, 45, 'Tuples, Lists & Dicts.'),
(6, 2, 55, 'For loops'),
(1000, 3, 100, 'Quiz Completed');               
CREATE CACHED TABLE PUBLIC.USER(
    UID BIGINT NOT NULL,
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(255),
    USERNAME VARCHAR(255),
    AVATAR VARCHAR(255)
);             
ALTER TABLE PUBLIC.USER ADD CONSTRAINT PUBLIC.CONSTRAINT_2 PRIMARY KEY(UID);   
-- 5 +/- SELECT COUNT(*) FROM PUBLIC.USER;     
INSERT INTO PUBLIC.USER(UID, EMAIL, PASSWORD, USERNAME, AVATAR) VALUES
(1, 'zs@m.com', '$2a$10$hypd7SYaVmnNOmFjGYAdC.Soo5zYXTVPquQXyUYEOLtZGCRuNRvaa', 'Lizzy', '../../assets/katie.png'),
(99, 't@test.com', '$2a$10$SaGFRFJg7vaJoMF/RXEc0e5Vruz66//1el7dcZ0eihyNvD5IwoZ9W', 'Tester2', '../../assets/katie.png'),
(111, 't@t.com', '$2a$10$bR5ZGgwLA4l2TV6Jn1xsAO7ElpamXj.OdLUqe7RVCLA.LHDTFWKzm', 'Tester5', '../../assets/bughunt.png'),
(115, 'tostspam@t', '$2a$10$s2AFj72LXqUMwbmN7StdqO./12Cz8ectks8fHDZhL/zsdv75u/bcq', 'Angry_mouse', '../../assets/bughunt.png'),
(120, 't2@t.com', '$2a$10$Qj8JdLbwY8vqHuqZfmsliOyGuM1LAiyoB6ElEg1jlPLw8KzDLbnxu', 'Test6', '../../assets/katie.png');             
CREATE CACHED TABLE PUBLIC.OPTION(
    OPTIONID INTEGER NOT NULL,
    OPTION VARCHAR(255)
);   
ALTER TABLE PUBLIC.OPTION ADD CONSTRAINT PUBLIC.CONSTRAINT_8 PRIMARY KEY(OPTIONID);            
-- 4 +/- SELECT COUNT(*) FROM PUBLIC.OPTION;   
INSERT INTO PUBLIC.OPTION(OPTIONID, OPTION) VALUES
(1, STRINGDECODE('{ \t\"opt1\": \"echo \\\"Hello World\\\"\", \t\"opt2\": \"echo(\\\"Hello World\\\");\", \t\"opt3\": \"p(\\\"Hello World\\\")\", \t\"opt4\": \"print(\\\"Hello World\\\")\" }')),
(2, 'echo("Hello World");'),
(3, 'p("Hello World")'),
(4, 'print("Hello World")');       
CREATE CACHED TABLE PUBLIC.QUESTION(
    QUESTIONID INTEGER NOT NULL,
    QUESTION VARCHAR(255),
    OPTIONS VARCHAR(255)
);   
ALTER TABLE PUBLIC.QUESTION ADD CONSTRAINT PUBLIC.CONSTRAINT_E PRIMARY KEY(QUESTIONID);        
-- 25 +/- SELECT COUNT(*) FROM PUBLIC.QUESTION;
INSERT INTO PUBLIC.QUESTION(QUESTIONID, QUESTION, OPTIONS) VALUES
(1, 'What is a correct syntax to output "Hello World" in Python?', '{     "opt1": "echo \"Hello World\"",     "opt2": "echo(\"Hello World\");",     "opt3": "p(\"Hello World\")",     "opt4": "print(\"Hello World\")" }'),
(2, 'How do you insert COMMENTS in Python code?', STRINGDECODE('{ \t\"opt1\": \"#This is a comment\", \t\"opt2\": \"//This is a comment\", \t\"opt3\": \"/*This is a comment*/\" }')),
(3, 'Which one is NOT a legal variable name?', STRINGDECODE('{ \t\"opt1\": \"my-var\", \t\"opt2\": \"my_var\", \t\"opt3\": \"_myvar\", \t\"opt4\": \"Myvar\" }')),
(4, 'How do you create a variable with the numeric value 5?', STRINGDECODE('{ \t\"opt1\": \"x = 5\", \t\"opt2\": \"x = int(5)\", \t\"opt3\": \"Both the other answers are correct\" }')),
(5, 'What is the correct file extension for Python files?', STRINGDECODE('{ \t\"opt1\": \".py\", \t\"opt2\": \".pyt\", \t\"opt3\": \".pt\", \t\"opt4\": \".pyth\" }')),
(6, 'How do you create a variable with the floating number 2.8?', STRINGDECODE('{ \t\"opt1\": \"Both the other answers are correct\", \t\"opt2\": \"x = 2.8\", \t\"opt3\": \"x = float(2.8)\" }')),
(7, 'What is the correct syntax to output the type of a variable or object in Python?', STRINGDECODE('{ \t\"opt1\": \"print(typeof(x))\", \t\"opt2\": \"print(type(x))\", \t\"opt3\": \"print(typeof x)\", \t\"opt4\": \"print(typeOf(x))\" }')),
(8, 'What is the correct way to create a function in Python?', STRINGDECODE('{ \t\"opt1\": \"def myFunction():\", \t\"opt2\": \"create myFunction():\", \t\"opt3\": \"function myfunction():\" }')),
(9, 'In Python, ''Hello'', is the same as "Hello"', STRINGDECODE('{ \t\"opt1\": \"True\", \t\"opt2\": \"False\" }')),
(10, 'What is a correct syntax to return the first character in a string?', STRINGDECODE('{ \t\"opt1\": \" x = \\\"Hello\\\".sub(0, 1)\", \t\"opt2\": \"x = \\\"Hello\\\"[0]\", \t\"opt3\": \"x = sub(\\\"Hello\\\", 0, 1)\" }')),
(11, 'Which method can be used to remove any whitespace from both the beginning and the end of a string?', STRINGDECODE('{ \t\"opt1\": \"strip()\", \t\"opt2\": \"ptrim()\", \t\"opt3\": \"len()\", \t\"opt4\": \"trim()\" }')),
(12, 'Which method can be used to return a string in upper case letters?', STRINGDECODE('{ \t\"opt1\": \"uppercase()\", \t\"opt2\": \"upperCase()\", \t\"opt3\": \"toUpperCase()\", \t\"opt4\": \"upper()\" }')),
(13, 'Which method can be used to replace parts of a string?', STRINGDECODE('{ \t\"opt1\": \"replace()\", \t\"opt2\": \"switch()\", \t\"opt3\": \"repl()\", \t\"opt4\": \"replaceString()\" }')),
(14, 'Which operator is used to multiply numbers?', STRINGDECODE('{ \t\"opt1\": \"*\", \t\"opt2\": \"%\", \t\"opt3\": \"x\", \t\"opt4\": \"#\" }')),
(15, 'Which operator can be used to compare two values?', STRINGDECODE('{ \t\"opt1\": \"==\", \t\"opt2\": \"=\", \t\"opt3\": \"<>\", \t\"opt4\": \"><\" }')),
(16, 'Which of these collections defines a LIST?', STRINGDECODE('{ \t\"opt1\": \"[\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"]\", \t\"opt2\": \"(\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\")\", \t\"opt3\": \"{\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"}\", \t\"opt4\": \"{\\\"name\\\": \\\"apple\\\", \\\"color\\\": \\\"green\\\"}\" }')),
(17, 'Which of these collections defines a TUPLE?', STRINGDECODE('{ \t\"opt1\": \"{\\\"name\\\": \\\"apple\\\", \\\"color\\\": \\\"green\\\"}\", \t\"opt2\": \"[\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"]\", \t\"opt3\": \"(\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\")\", \t\"opt4\": \"{\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"}\"  }')),
(18, 'Which of these collections defines a SET?', STRINGDECODE('{ \t\"opt1\": \"{\\\"name\\\": \\\"apple\\\", \\\"color\\\": \\\"green\\\"}\", \t\"opt2\": \"[\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"]\", \t\"opt3\": \"(\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\")\", \t\"opt4\": \"{\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"}\"  }')),
(19, 'Which of these collections defines a DICTIONARY?', STRINGDECODE('{ \t\"opt1\": \"{\\\"name\\\": \\\"apple\\\", \\\"color\\\": \\\"green\\\"}\", \t\"opt2\": \"[\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"]\", \t\"opt3\": \"(\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\")\", \t\"opt4\": \"{\\\"apple\\\", \\\"banana\\\", \\\"cherry\\\"}\"  }')); 
INSERT INTO PUBLIC.QUESTION(QUESTIONID, QUESTION, OPTIONS) VALUES
(20, 'Which collection is ordered, changeable, and allows duplicate members?', STRINGDECODE('{ \t\"opt1\": \"LIST\", \t\"opt2\": \"TUPLE\", \t\"opt3\": \"DICTIONARY\", \t\"opt4\": \"SET\" }')),
(21, 'Which collection does not allow duplicate members?', STRINGDECODE('{ \t\"opt1\": \"LIST\", \t\"opt2\": \"TUPLE\", \t\"opt3\": \"SET\" }')),
(22, 'How do you start writing an if statement in Python?', STRINGDECODE('{ \t\"opt1\": \"if (x > y)\", \t\"opt2\": \"if x > y:\", \t\"opt3\": \"if x > y then:\" }')),
(23, 'How do you start writing a while loop in Python?', STRINGDECODE('{ \t\"opt1\": \"while x > y:\", \t\"opt2\": \"x > y while {\", \t\"opt3\": \"while (x > y)\", \t\"opt4\": \"while x > y {\" }')),
(24, 'How do you start writing a for loop in Python?', STRINGDECODE('{ \t\"opt1\": \"for x in y:\", \t\"opt2\": \"for x > y:\", \t\"opt3\": \"for each x in y:\" }')),
(25, 'Which statement is used to stop a loop?', STRINGDECODE('{ \t\"opt1\": \"break\", \t\"opt2\": \"exit\", \t\"opt3\": \"return\", \t\"opt4\": \"stop\" }'));  
CREATE CACHED TABLE PUBLIC.QUIZ_RESULT(
    RID INTEGER NOT NULL,
    RESULT DOUBLE NOT NULL,
    UID BIGINT
);
ALTER TABLE PUBLIC.QUIZ_RESULT ADD CONSTRAINT PUBLIC.CONSTRAINT_36 PRIMARY KEY(RID);           
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.QUIZ_RESULT;              
INSERT INTO PUBLIC.QUIZ_RESULT(RID, RESULT, UID) VALUES
(131, 100.0, 1),
(140, 48.0, 111);     
ALTER TABLE PUBLIC.USER ADD CONSTRAINT PUBLIC.UNIQUE_EMAIL UNIQUE(EMAIL);      
ALTER TABLE PUBLIC.SCORE ADD CONSTRAINT PUBLIC.UKF78YFE7172CO96DFGKEJ5PIMW UNIQUE(UID, TID);   
ALTER TABLE PUBLIC.QUIZ_RESULT ADD CONSTRAINT PUBLIC.FK223W5BSPWCUVHO1PVW3RI5WX FOREIGN KEY(UID) REFERENCES PUBLIC.USER(UID) NOCHECK;          
ALTER TABLE PUBLIC.ANSWER ADD CONSTRAINT PUBLIC.FKQN39WGJYOMDPTXXKRFC79PJS1 FOREIGN KEY(QUESTIONID) REFERENCES PUBLIC.QUESTION(QUESTIONID) NOCHECK;            
ALTER TABLE PUBLIC.SCORE ADD CONSTRAINT PUBLIC.FKR66Y5QJ4UVQJ305QQ4WLYWN48 FOREIGN KEY(TID) REFERENCES PUBLIC.TUTORIAL(TID) NOCHECK;           
