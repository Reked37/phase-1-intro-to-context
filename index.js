// part 1
function createEmployeeRecord(employeeArray){
    let employeeInfo = {
        firstName:'',
        familyName:'',
        title:'',
        payPerHour:'',
        timeInEvents:'',
        timeOutEvents:'',
    }
    employeeInfo.firstName = employeeArray[0]
    employeeInfo.familyName = employeeArray[1]
    employeeInfo.title = employeeArray[2]
    employeeInfo.payPerHour = employeeArray[3]
    employeeInfo.timeInEvents = []
    employeeInfo.timeOutEvents = []
    return employeeInfo
}
//part 2
function createEmployeeRecords(employeeArray) {
     return employeeArray.map(createEmployeeRecord)
}

function createTimeInEvent(employee,timeIn){
    const timeSplit = timeIn.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: timeSplit[0],
        hour: parseInt(timeSplit[1]),
        
    })
    return employee
}

function createTimeOutEvent(employee,timeOut){
    const timeSplit = timeOut.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: timeSplit[0],
        hour: parseInt(timeSplit[1])
        
    })
    return employee
}

function hoursWorkedOnDate(employee, expectedDate) {
  //for(let i=0; i<employee.timeInEvents;i++){}
    let timeIn = employee.timeInEvents.find(timeInObj => timeInObj.date === expectedDate).hour
  let timeOut = employee.timeOutEvents.find(timeOutObj => timeOutObj.date === expectedDate).hour
  const hoursWorked = Math.abs(timeIn - timeOut)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee, expectedDate){
    const payRate = employee.payPerHour
    return hoursWorkedOnDate(employee, expectedDate) * payRate
}

function allWagesFor(employee){
   const timeInVar = employee.timeInEvents.map(timeInObject=>timeInObject.date)
   console.log(timeInVar)
   const dateMap = timeInVar.map(date=>wagesEarnedOnDate(employee, date))
//  const wages = wagesEarnedOnDate(employee)
//  console.log(wages)
    return sumArray(dateMap)
}

function sumArray(array){
    let sum = 0
    for(let i=0; i<array.length;i++){
    sum += array[i]
    }
    return sum
}

function calculatePayroll(arrayEmployees){
    const allEmployeesWages = arrayEmployees.map(allWagesFor)
     return sumArray(allEmployeesWages)
}