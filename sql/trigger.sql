-- TRIGGER: sets default value of flight's cancellations to 0 (not cancelled) if the user adds flight data without specifying whether or not it was cancelled
DELIMITER //
CREATE TRIGGER CancelTrig
BEFORE INSERT ON Cancellations
FOR EACH ROW
BEGIN
	IF (NEW.Cancelled IS NULL) THEN
  SET NEW.Cancelled = 0;
 END IF;
END;
DELIMITER; 

