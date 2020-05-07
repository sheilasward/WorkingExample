new Vue({
    el: '#app',
    data: {
        counter: 0,
        countr: 0,
        secondCountr: 0,
        thirdCountr: 0,
        resultForThird: "Less Than 5",
        x: 0,
        y: 0,
        value: "",
        value2: "",
        name: "",
        attachRed: false,
        color: 'green',
        color2: 'gray',
        width: 100
    },
    methods: {
        increase: function(step, event) {
            this.counter += step;
        },
        updateCoordinates: function(event) {
            this.x = event.clientX;
            this.y = event.clientY;
        },
        showAlert: function() {
            alert("Here is the alert...");
        },
        result: function() {
            console.log("result function ran");
            return this.countr > 5 ? 'Greater Than 5' : 'Less Than 5';
        }
    },
    computed: {
        divClasses: function() {
            return {
                red: this.attachRed,
                blue: !this.attachRed
            }
        },
        myStyle: function() {
            return {
                backgroundColor: this.color2,
                width: this.width + 'px'
            }
        },
        output: function() {
            console.log("output computation ran");
            return this.secondCountr > 5 ? 'Greater Than 5' : 'Less Than 5';
        }
    },
    watch: {
        thirdCountr: function(value) {
            var vm = this;
            setTimeout(function() {
                vm.resultForThird = vm.thirdCountr > 5 ? 'Greater Than 5' : 'Less Than 5';
            }, 2000);
        }
    }
});