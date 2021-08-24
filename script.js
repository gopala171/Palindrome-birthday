//reversing the string
function reverseString(str) {
  return str.split('').reverse().join('');
}

//checking for palindrome
function isPalindrome(str) {
  var reversedVersion = reverseString(str);
  return str === reversedVersion;
}
//check
//console.log(isPalindrome('racecar'));


//this function converst date(int) to string
function dateNumToString(date) {
  var dateStr = {day:'', month:'',year:''};
  if (date.day < 10) {
    dateStr.day = '0'+date.day; 
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month <10) {
    dateStr.month = '0'+date.month;
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
//check
// date = { day:14 , month:9 , year:2020};
// console.log(dateNumToString(date));

//this function creates various date formats in string
function dateVariations(date) {
  var dateStr = dateNumToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy =  dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
// check
// var date = { day:10 , month:9 , year:2020};
// console.log(dateVariations(date));

//function to check if the date is palindrome
function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = dateVariations(date);
  
  for (var i=0; i<listOfPalindromes.length; i++) {
     if(isPalindrome(listOfPalindromes[i])) {
       return true;
       break;
     }
  }
  return false;
}

//check 
// var date = { day:12, month:02, year:2021};
// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year){
  if(year%400===0) {
    return true;
  }
  
  if(year%100===0) {
    return false;
  }
  
  if(year%4===0) {
    return true;
  }

  return false;
} 

//function to get next date and it checks for exceptions too
function getNextDate(date) {
  var day = date.day +1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (month===2) {
    if(isLeapYear(year)) {
      if(day > 29){
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  else {
    if (day > daysInMonth[month-1]) {
      day = 1;
      month++;
    }
  }
  
  if(month>12) {
    month=1;
    year++;
  }

  return {
    day:day,
    month:month,
    year:year
  }
}


//function to find next palindrome date
function nextPalindromeDate(date) {
  var nextDate = getNextDate(date);

  var counter = 0;

  while (1) {
    counter++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

//check
//  date = {
//   davary: 5,
//   month: 1,
//   year: 2020
// }
//console.log(nextPalindromeDate(date));

const inputDate = document.querySelector('#input-date');
const checkPalindrome = document.querySelector('#check-btn');
const output = document.querySelector('#output');

function checkPalindromeOrNot() {
  var bdate = inputDate.value;
  if (bdate != '') {
    var listOfDate = bdate.split('-');
    var date = {
      day:Number(listOfDate[2]),
      month:Number(listOfDate[1]),
      year:Number(listOfDate[0])
    };
    var isPalindrome = checkPalindromeForAllDateFormats(date);
    if(isPalindrome) {
      output.innerText = "YAY! your birthday is a palindrome 😉"
    }
    else {
      var[counter, nextDate] = nextPalindromeDate(date);
      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days 😔`
    }
  }
}
checkPalindrome.addEventListener("click", checkPalindromeOrNot)


