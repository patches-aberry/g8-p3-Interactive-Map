// var states = document.getElementById("states");

// console.log(states);

// states.addEventListener("change", function(){
//     alert(this.value)
// },false);

// function getSelection(sel) {
//     var opts = [],
//       opt;
//     var len = sel.options.length;
//     for (var i = 0; i < len; i++) {
//       opt = sel.options[i];
  
//       if (opt.selected) {
//         opts.push(opt);
//         alert(opt.value);
//       }
//     }
  
//     return opts;
//   }

// var e1 = document.getElementById("states1");
// var value1 = e1.value;
// var text1 = e1.options[e1.selectedIndex].text;

// var e2 = document.getElementById("states2");
// var value2 = e2.value;
// var text2 = e2.options[e2.selectedIndex].text;

// console.log(value1)

var state1;
var state2;

function selectState1() {
    state1 = document.getElementById("statesList1").value;
    console.log(state1)
    //call API
 }

function selectState2() {
    state2 = document.getElementById("statesList2").value;
    console.log(state2)
    //call API
}

//build object from API response in JSON
//have var of object
//use object to set innerhtml/innervalue based on ID of HTML element in the table. 
