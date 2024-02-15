/*Author: Juan Figueroa
ISU Netid : jupiter1@iastate.edu
Date : February 15th, 2024 */

function maxOfTwo(n1, n2) {
    if (n2 >= n1) {
        return n2;
    }
    return n1;
}

function maxofArray(array) {
    let max = array[0];
    array.forEach((value) => {
        if (value > max) {
            max = value;
        }
    });
    return max;
}

function showProperties(movie) {
    console.log("List of Keys :");
    for (let key in movie) {
        console.log(key);
    }
    console.log("List of Values :");
    for (let key in movie) {
        console.log(movie[key]);
    }
}

const circle = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius
    }
};

const circle2 = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius
    },
    get radiusValue() {
        return this.radius;
    },
    set radiusValue(value) {
        this.radius = value;
    }

};

const circle3 = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius
    },
    getRadiusValue: function () {
        return this.radius;
    },
    setRadiusValue: function (value) {
        this.radius = value;
    }

};



//TEST
const numbers = [10, 20, 30, 10, 50];
console.log(maxofArray(numbers));
const movie = {
    title: 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
};
showProperties(movie);

console.log(circle.area())

console.log(`Area with ${circle2.radiusValue} :`, circle2.area());
circle2.radiusValue = 3;
console.log(`Area with ${circle2.radiusValue} :`, circle2.area());

console.log(`Area with ${circle3.getRadiusValue()} :`, circle3.area());
circle3.setRadiusValue(3);
console.log(`Area with ${circle3.getRadiusValue()} :`, circle3.area());