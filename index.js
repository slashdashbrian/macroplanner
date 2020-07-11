import {
    result
} from './result.js'



// USER INTERFACE CONROLLER

var UI = (function () {




    return {



        // Getting the values of the input field
        getInput: function () {
            return {
                days: {
                    sunday: document.querySelector('.sunday').value,
                    monday: document.querySelector('.monday').value,
                    tuesday: document.querySelector('.tuesday').value,
                    wednesday: document.querySelector('.wednesday').value,
                    thursday: document.querySelector('.thursday').value,
                    friday: document.querySelector('.friday').value,
                    saturday: document.querySelector('.saturday').value
                },
                macros: {
                    protein: document.querySelector('.prot').value,
                    fat: document.querySelector('.fa').value,
                    carbs: document.querySelector('.car').value
                }

            }
        },
        // Pushing input values in arrays

        //   The calories of each day
        getDays: function (obj) {
            var days = Object.values(obj.days);
            var newDays = []
            for (var i = 0; i < days.length; i++) {
                newDays.push(parseInt(days[i]))
            }
            return newDays
        },
        //   The Macros
        getMacros: function (obj) {
            var macros = Object.values(obj.macros);
            var newMacros = []
            for (var i = 0; i < macros.length; i++) {
                newMacros.push(parseInt(macros[i]))
            }
            return newMacros
        },

        clear: function () {
            document.getElementById('clear').innerHTML = ""
        },

        showResult: function (obj, days, macros) {

            const arr = ['.sunday-container', '.monday-container', '.tuesday-container', '.wednesday-container', '.thursday-container', '.friday-container', '.saturday-container']
            const arr2 = ['.morning', '.lunch', '.dinner', '.snack', '.shake']
            const arr3 = ['-cal', '-protein', '-fat', '-carbs']
            const arr6 = [" .totalcal"," .protein", " .fat"," .carbs"
            ]



            let arr4 = []
            let arr5 = []



            function getStrings() {
                for (let j = 0; j < arr3.length; j++) {
                    for (let t = 0; t < arr2.length; t++) {
                        for (let i = 0; i < arr.length; i++) {
                            arr4.push(arr[i] + ' ' + arr2[t] + arr3[j])
                        }
                    }
                }
                return arr4
            }

            function getParts() {
                for (let v = 0; v < Object.values(obj.parts).length; v++) {
                    for (let k = 0; k < Object.values(obj.parts)[v].length; k++) {
                        arr5.push(Object.values(obj.parts)[v][k])
                    }
                }

                return arr5
            }

            function makeArr() {
                for (let i = 0; i < parts.length; i++) {
                    if (arr4[i].includes('-cal')) {
                        document.querySelector(arr4[i]).innerHTML = arr5[i] + ' Kcal'
                    } else if (arr4[i].includes('-protein') || arr4[i].includes('-fat') || arr4[i].includes('-carbs')) {
                        document.querySelector(arr4[i]).innerHTML = arr5[i] + ' g'
                    }

                }

            }

            function total() {
                for(let y = 0; y < arr.length; y++){
               for(let i = 0; i < arr6.length; i++){
                
                if(arr6[i].includes('totalcal')){
                    document.querySelector(arr[y] + arr6[i]).innerHTML = days[y] + ' Kcal'
                   
                }else if (arr6[i].includes('protein')){
                    document.querySelector(arr[y] + arr6[i]).innerHTML =Math.round((days[y] * (macros[0]/100))/4) + 'g'
                }
                else if (arr6[i].includes('fat')){
                    document.querySelector(arr[y] + arr6[i]).innerHTML =Math.round((days[y] * (macros[1]/100))/9) + 'g'
                
                }else if (arr6[i].includes('carbs')){
                    document.querySelector(arr[y] + arr6[i]).innerHTML = Math.round((days[y] * (macros[2]/100))/4) + 'g'
                }
               
               }
                      
                    

                }
            }

            let parts = getStrings()
            getParts()
            makeArr()
            total()
        },
        alert: () => {
            document.querySelector('.warning').classList.remove('visibility')
            window.scrollTo(0, 0)
        }

    //   Autocomplete other fields 

    };



})()

// DATA CONTROLLER
var Data = (function () {


    // Calculating the nutriton for parts of the day
    var partOfTheDay = {
        parts: {
            morningcal: [],
            lunchcal: [],
            dinnercal: [],
            snackcal: [],
            shakecal: [],
            morningprotein: [],
            lunchprotein: [],
            dinnerprotein: [],
            snackprotein: [],
            shakeprotein: [],
            morningfat: [],
            lunchfat: [],
            dinnerfat: [],
            snackfat: [],
            shakefat: [],
            morningcarbs: [],
            lunchcarbs: [],
            dinnercarbs: [],
            snackcarbs: [],
            shakecarbs: [],
        },

        empty: function () {
            Object.keys(partOfTheDay.parts).forEach(el => {
                el = []
            })
        }



    };



    return {

        calcPartsCal: function (days, macros) {
            partOfTheDay.empty()

            for (let i = 0; i < days.length; i++) {
                partOfTheDay.parts['morningcal'].push(Math.round(days[i] * (23 / 100)));
                partOfTheDay.parts['lunchcal'].push(Math.round(days[i] * (35 / 100)));
                partOfTheDay.parts['dinnercal'].push(Math.round(days[i] * (25 / 100)));
                partOfTheDay.parts['snackcal'].push(Math.round(days[i] * (10 / 100)));
                partOfTheDay.parts['shakecal'].push(Math.round(days[i] * (7 / 100)));

            }

            // Fat = 9 Cal
            // Protein = 4 Cal
            // Carbs = 4 Cal

            // 1897/9
            // 210g * 0,25
            // 52g * 0.23 
            // 11.96g

            for (let i = 0; i < days.length; i++) {
                partOfTheDay.parts['morningprotein'].push(Math.round(((days[i] / 4) * macros[0] / 100) * (23 / 100)));
                partOfTheDay.parts['morningfat'].push(Math.round(((days[i] / 9) * macros[1] / 100) * (23 / 100)));
                partOfTheDay.parts['morningcarbs'].push(Math.round(((days[i] / 4) * macros[2] / 100) * (23 / 100)));
                partOfTheDay.parts['lunchprotein'].push(Math.round(((days[i] / 4) * macros[0] / 100) * (35 / 100)));
                partOfTheDay.parts['lunchfat'].push(Math.round(((days[i] / 9) * macros[1] / 100) * (35 / 100)));
                partOfTheDay.parts['lunchcarbs'].push(Math.round(((days[i] / 4) * macros[2] / 100) * (35 / 100)));
                partOfTheDay.parts['dinnerprotein'].push(Math.round(((days[i] / 4) * macros[0] / 100) * (25 / 100)));
                partOfTheDay.parts['dinnerfat'].push(Math.round(((days[i] / 9) * macros[1] / 100) * (25 / 100)));
                partOfTheDay.parts['dinnercarbs'].push(Math.round(((days[i] / 4) * macros[2] / 100) * (25 / 100)));
                partOfTheDay.parts['snackprotein'].push(Math.round(((days[i] / 4) * macros[0] / 100) * (10 / 100)));
                partOfTheDay.parts['snackfat'].push(Math.round(((days[i] / 9) * macros[1] / 100) * (10 / 100)));
                partOfTheDay.parts['snackcarbs'].push(Math.round(((days[i] / 4) * macros[2] / 100) * (10 / 100)));
                partOfTheDay.parts['shakeprotein'].push(Math.round(((days[i] / 4) * macros[0] / 100) * (7 / 100)));
                partOfTheDay.parts['shakefat'].push(Math.round(((days[i] / 9) * macros[1] / 100) * (7 / 100)));
                partOfTheDay.parts['shakecarbs'].push(Math.round(((days[i] / 4) * macros[2] / 100) * (7 / 100)));
            }



            return partOfTheDay
        },
        getParts: function () {
            return partOfTheDay
        }
    };


})()

// GLOBAL APP CONTROLLER
var Global = (function (UICtrl, Data) {


    // Click event function
    function button() {
        // 1. Getting input value
        var data = UICtrl.getInput();
        // 2. Store days and macros in separate arrays
        var days = UICtrl.getDays(data);
        var macros = UICtrl.getMacros(data);
        // 3. Put the input values in one array
        const all = [...days, ...macros];
        // 4. Check if one of the values is not valid
        const is = all.findIndex(Number.isNaN);

        // If there is no empty field
        if (is === -1) {
            // 5. Calculate the calories and macros for each parts of the days
            var parts = Data.calcPartsCal(days, macros)
            // 6. Clear UI
            UICtrl.clear()
            // 7. Open the results 
           
            document.querySelector('.result').classList.remove('visibility')
            UICtrl.showResult(parts, days, macros)
            console.log(parts);
            console.log(days);
            console.log(macros);
        }
        // If there is an empty field warn the user
        else {
           UICtrl.alert()
        };

    };

    document.querySelector('.submit').addEventListener('click', button);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            button()


        }
    });




})(UI, Data);