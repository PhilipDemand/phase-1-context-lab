function createEmployeeRecord(array) {
    const employeeObject = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return employeeObject;
  };

function createEmployeeRecords(array) {
  const multipleObjects = array.map(createEmployeeRecord)
  return multipleObjects
}

function createTimeInEvent(dateStamp) {
  let hourIn = Number(dateStamp.slice(11,dateStamp.length))
  let dateIn = dateStamp.slice(0,10)
  const obj = { type: "TimeIn", hour: hourIn, date: dateIn}
  this.timeInEvents.push(obj)
  return this
}

function createTimeOutEvent(dateStamp) {
  let hourOut = Number(dateStamp.slice(11,dateStamp.length))
  let dateOut = dateStamp.slice(0,10)
  const obj = { type: "TimeOut", hour: hourOut, date: dateOut}
  this.timeOutEvents.push(obj)
  return this
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(element => element.date === date).hour
  const timeOut = this.timeOutEvents.find(element => element.date === date).hour
  const hoursWorked = timeOut - timeIn
  return hoursWorked / 100
}

function wagesEarnedOnDate(date) {
  const rate = this.payPerHour
  const term = hoursWorkedOnDate.call(this, date)
  const payAmount = rate * term
  return payAmount
}

function findEmployeeByFirstName (srcArray, firstNameString) {
  const found = srcArray.find(element => element.firstName === firstNameString);
  return found
}

function calculatePayroll(array) {
 const valuesArray = array.map(employeeObject => allWagesFor.call(employeeObject));
 let sum = valuesArray.reduce(function (a, b) { return a + b; }, 0);
 return sum
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

