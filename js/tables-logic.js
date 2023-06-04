var states = document.getElementById("states")

console.log(states)

states.addEventListener("change", function(){
    alert(this.value)
},false)