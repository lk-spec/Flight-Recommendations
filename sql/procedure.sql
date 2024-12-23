-- STORED PROCEDURE1: each time a user adds a flight to our database, this stored procedure will update our "most reliable airlines" list based on the new data 
DELIMITER //
CREATE PROCEDURE Result1 (IN Airline_ VARCHAR(10))
BEGIN
	DECLARE varCancelled REAL;
	DECLARE varDelay REAL;
	DECLARE varAirline VARCHAR(10);
    DECLARE varGoodAirline INT;
	DECLARE exit_loop BOOLEAN DEFAULT FALSE;

	DECLARE rel_cur CURSOR FOR (
		SELECT Airline, AVG(ArrivalDelay), AVG(Cancelled) FROM Flights NATURAL JOIN Delays NATURAL JOIN Cancellations
		WHERE Airline = Airline_
		GROUP BY Airline
	);
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    
	OPEN rel_cur;
	cloop: LOOP
	FETCH rel_cur INTO varAirline, varDelay, varCancelled;
	IF exit_loop THEN
		LEAVE cloop;
	END IF;
	
	IF varCancelled < 0.01 AND varDelay < 5 THEN
		SET varGoodAirline = 1;
	ELSE
		SET varGoodAirline = 0;
	END IF;
	
	UPDATE Reliability SET Status_ = varGoodAirline, avgDelay = varDelay, avgCancel = varCancelled WHERE Airline = Airline_;
	
	END LOOP cloop;
	CLOSE rel_cur;
        
	SELECT Airline, avgDelay, avgCancel FROM Reliability WHERE Status_ = 1 LIMIT 3;
END;
DELIMITER;

-- STORED PROCEDURE2: each time a user deletes their flight data, this stored procedure will update our "most reliable airlines" list based on the removed data
DELIMITER //
CREATE PROCEDURE Result2 ()
BEGIN
	DECLARE varCancelled REAL;
	DECLARE varDelay REAL;
	DECLARE varAirline VARCHAR(10);
    DECLARE varStatus INT;
	DECLARE exit_loop BOOLEAN DEFAULT FALSE;

	DECLARE rel_cur CURSOR FOR (
		SELECT Airline, AVG(ArrivalDelay), AVG(Cancelled) FROM Flights NATURAL JOIN Delays NATURAL JOIN Cancellations
		GROUP BY Airline
	);
    
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    
	OPEN rel_cur;
	cloop: LOOP
	FETCH rel_cur INTO varAirline, varDelay, varCancelled;
	IF exit_loop THEN
		LEAVE cloop;
	END IF;
	
	IF varCancelled < 0.01 AND varDelay < 5 THEN
		SET varStatus = 1;
	ELSE
		SET varStatus = 0;
	END IF;
	
	UPDATE Reliability SET Status_ = varStatus, avgDelay = varDelay, avgCancel = varCancelled WHERE Airline = Airline_;
	
	END LOOP cloop;
	CLOSE rel_cur;
        
	SELECT Airline, avgDelay, avgCancel FROM Reliability WHERE Status_ = 1 LIMIT 3;
END;
DELIMITER;