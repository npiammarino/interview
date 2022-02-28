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

var month= document.getElementById("month")
var date= document.getElementById("date")
var form= document.getElementById("date-form")


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



















//end
