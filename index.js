// Your code here

// createEmployeeRecord
// •	Argument(s)
// o	A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// •	Returns
// o	JavaScript Object with keys:
// o	firstName
// o	familyName
// o	title
// o	payPerHour
// o	timeInEvents
// o	timeOutEvents
// •	Behavior
// o	Loads Array elements into corresponding Object properties. 
//     Additionally, initialize empty Arrays on the properties timeInEvents 
//     and timeOutEvents.

function createEmployeeRecord(array) {
    return  {firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// createEmployeeRecords
// •	Argument(s)
// o	Array of Arrays
// •	Returns
// o	Array of Objects
// •	Behavior
// o	Converts each nested Array into an employee record 
//     using createEmployeeRecord and accumulates it to a new Array

function createEmployeeRecords(array) {
    return array.map(element => {
        return createEmployeeRecord(element);
    })
}

// createTimeInEvent
// •	Argument(s)
// o	An employee record Object
// o	A date stamp ("YYYY-MM-DD HHMM")
// •	Returns
// o	The employee record
// •	Behavior
// o	Add an Object with keys to the timeInEvents Array on the 
//     record Object:
// o	type: Set to "TimeIn"
// o	hour: Derived from the argument
// o	date: Derived from the argument

function createTimeInEvent(obj, stamp) {
    obj.timeInEvents.push({type: "TimeIn", hour: parseInt(stamp.substr(-4)), date: stamp.substr(0, 10)})
    return obj;    
}

// createTimeOutEvent
// •	Argument(s)
// o	An employee record Object
// o	A date stamp ("YYYY-MM-DD HHMM")
// •	Returns
// o	The employee record
// •	Behavior
// o	Add an Object with keys to the timeOutEvents Array on the 
//     record Object:
// o	type: Set to "TimeOut"
// o	hour: Derived from the argument
// o	date: Derived from the argument

function createTimeOutEvent(obj, stamp) {
    obj.timeOutEvents.push({type: "TimeOut", hour: parseInt(stamp.substr(-4)), date: stamp.substr(0, 10)})
    return obj;   
}

// hoursWorkedOnDate
// •	Argument(s)
// o	An employee record Object
// o	A date of the form "YYYY-MM-DD"
// •	Returns
// o	Hours worked, an Integer
// •	Behavior
// o	Given a date, find the number of hours elapsed between that date's 
//     timeInEvent and timeOutEvent

function hoursWorkedOnDate(obj, stamp) {
    const timeOutDate = obj.timeOutEvents.find(element => {
        return element.date === stamp;
    });
    const timeOut = timeOutDate.hour;
    const timeInDate = obj.timeInEvents.find(element => {
        return element.date === stamp;
    })
    const timeIn = timeInDate.hour;
    return (timeOut - timeIn) / 100;
}

// wagesEarnedOnDate
// •	Argument(s)
// o	An employee record Object
// o	A date of the form "YYYY-MM-DD"
// •	Returns
// o	Pay owed
// •	Behavior
// o	Using hoursWorkedOnDate, multiply the hours by the record's 
//     payRate to determine amount owed. Amount should be returned as 
//     a number.

function wagesEarnedOnDate(obj, stamp) {
    const pay = obj.payPerHour;
    const hours = hoursWorkedOnDate(obj, stamp);
    return parseInt(pay * hours);
}

allWagesFor
// •	Argument(s)
// o	An employee record Object
// •	Returns
// o	Pay owed for all dates
// •	Behavior
// o	Using wagesEarnedOnDate, accumulate the value of all dates 
//     worked by the employee in the record used as context. 
//     Amount should be returned as a number. HINT: You will need 
//     to find the available dates somehow...

function allWagesFor(obj) {
    let total = 0;
    obj.timeOutEvents.forEach(event => { 
        total += wagesEarnedOnDate(obj, event.date)
    })
    return total;
}

// findEmployeeByFirstName
// •	Argument(s)
// o	srcArray: Array of employee records
// o	firstName: String representing a first name held in an 
//     employee record
// •	Returns
// o	Matching record or undefined
// •	Behavior
// o	Test the firstName field for a match with the firstName 
//     argument

function findEmployeeByFirstName(array, name) {
    return array.find(person => {
        return person.firstName === name;
    })
}

// calculatePayroll
// •	Argument(s)
// o	Array of employee records
// •	Returns
// o	Sum of pay owed to all employees for all dates, as a number
// •	Behavior
// o	Using wagesEarnedOnDate, accumulate the value of all dates 
// worked by the employee in the record used as context. Amount should 
//     be returned as a number.

function calculatePayroll(array) {
    let total = 0;
    array.forEach(employee => {
        employee.timeOutEvents.forEach(event => { 
            total += wagesEarnedOnDate(employee, event.date)
        })
    })
    return total;
}