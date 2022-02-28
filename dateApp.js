const months= {
  0: ["January", "31"],
  1: ["February", "28"],
  2: ["March", "31"],
  3: ["April", "30"],
  4: ["May", "31"],
  5: ["June", "30"],
  6: ["July", "31"],
  7: ["August", "31"],
  8: ["September", "30"],
  9: ["October", "31"],
  10: ["November", "30"],
  11: ["December", "31"],
}

const holidays=[
  new Date(2021, 10, 24), //November 24-25: Thanksgiving Break (2 days)
  new Date(2021, 10, 25),
  new Date(2021, 11, 26), //December 26-30: Holiday Break (5 days)
  new Date(2021, 11, 27),
  new Date(2021, 11, 28),
  new Date(2021, 11, 29),
  new Date(2021, 11, 30),
  new Date(2022, 1, 21), //February 21: Washington's Birthday
  new Date(2022, 3, 15), //April 15: Good Friday
  new Date(2022, 4, 30), //May 30: Memorial Day
  new Date(2022, 5, 20), //June 20: Juneteenth
  new Date(2022, 6, 4), //July 4: Independence Day
  new Date(2022, 8, 5), //September 5: Labor Day
  new Date(2022, 9, 10), //October 10: Columbus Day
  new Date(2022, 10, 24), //November 24-25: Thanksgiving Break (2 days)
  new Date(2022, 10, 25),
  new Date(2022, 11, 26), //December 26-30: Holiday Break (5 days)
  new Date(2022, 11, 27),
  new Date(2022, 11, 28),
  new Date(2022, 11, 29),
  new Date(2022, 11, 30),
  new Date(2023, 1, 21), //February 21: Washington's Birthday
]

var month= document.getElementById("month")
var date= document.getElementById("date")
var form= document.getElementById("date-form")
var closestDate= document.getElementById("closest")
var happinessScore= document.getElementById("happiness")


//populate select boxes
Object.keys(months).forEach(x => {
  month.innerHTML+= `<option value=${x}>${months[x][0]}</option>`
})
for(let i=1; i <= 31; i++){
  date.innerHTML+= `<option>${i}</option>`
}

//link date to month
const populateDate= m => {
  date.innerHTML=''
  let bound= months[m][1]

  for(let i=1; i <= bound; i++){
    date.innerHTML+= `<option>${i}</option>`
  }
}

month.addEventListener("change", e => {
  e.preventDefault()
  let m= e.target.value
  populateDate(m)

})

//calculate results
const getResults= e => {
  e.preventDefault()

  let inputDate= new Date(2022, month.value, date.value)
  console.log(inputDate)

  //get differences within 90 day window, can result in non-integer diff due
  //  to daylight savings, but this should not effect results since we perform no
  //  arithmatic with this value
  let diffs= {}
  holidays.forEach( h => {
    let diff= (h- inputDate) / (1000 * 60 * 60 * 24)
    if(Math.abs(diff) <= 90){
      diffs[diff]= h
    }
  })

  //get score and closest
  let keySet= Object.keys(diffs)
  let closest= 90
  let score= 0

  for(let i=0; i <= keySet.length; i++){
    let diff= keySet[i]

    if(Math.abs(diff) < Math.abs(closest)){//improve this
      closest= diff
    }
    if(diff >= 0){
      score+= (diff <= 60 ? (diff <= 30 ? 10 : 5) : 1)
    }
  }
  console.log(diffs)
  closestDate.innerHTML= "Closest Holiday: " + diffs[closest].toLocaleDateString()
  happinessScore.innerHTML= "Happiness Score: " + score.toString()
}

//get input date
form.addEventListener('submit', getResults)


//bonus functions
const findExtrema= () => {
  let truncHolidays= holidays.slice(7, holidays.length)
  let dateS= new Date(2022,0,1)
  let results={}

  while(dateS.getFullYear() === 2022){
    let score= 0
    let next
    let toRemove= 0

    for(let i=0; i<truncHolidays.length; i++){
      let diff= (truncHolidays[i] - dateS) / (1000 * 60 * 60 * 24)
      if(diff > 90){
        next= truncHolidays[i]
        console.log(next.toDateString())
        break
      }

      if(diff < 0){
        toRemove++
      } else {
        score+= (diff <= 60 ? (diff <= 30 ? 10 : 5) : 1)
      }
    }

    if(!next){break}

    results[score] = dateS
    dateS= new Date(next.setDate(next.getDate() - 90))
    console.log(dateS.toDateString() + '\n')
    truncHolidays= truncHolidays.slice(toRemove, truncHolidays.length)
  }

  console.log(results)
}



















//end
