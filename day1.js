var arr = [1, 2, 3, 4];

var arr1 = [];
arr.forEach(v => {
    arr1.push(v + 1)
});

var arr2 = arr.map(v => {
    return v + 1
})

var obj1 = { a: 1, b: 2 }
var obj2 = { c: 3, d: 4 }

var obj = { ...obj1, ...obj2 }
var obj3 = Object.assign(obj1, obj2)

var obj4 = { a: 1, b: 2, c: 3, d: 4 }

// 删除单个
// delete obj4.a
// console.log(obj4)
// var {a,b,...ddd}=obj4
// console.log(ddd)

//对象循环
var obj5 = { a: 1, b: 2, c: 3, d: 4 }
var newObj = {};
for (var key in obj5) {
    newObj[key] = obj5[key] + 1
}
// console.log(newObj)

var newObj1 = {}
Object.keys(obj5).forEach(v => {
    newObj1[v] = obj5[v] + 1
})
// console.log(newObj1,Object.keys(obj5))
// var pro = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         var res = 60;

//         if(res >= 60){
//             resolve()
//         }else{
//             reject();
//         }
//     }, 2000)
// })

// // pro当做axios
// pro.then(() => {
//     console.log("加鸡腿")
// }).catch(() => {
//     console.log("混合双打")
// })

function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = 60;
            if (res >= 60) {
                resolve()
            } else {
                reject()
            }
        }, 2000)
    })
}
test().then(() => {
    console.log("加鸡腿")
}).catch(() => {
    console.log("混合双打")
})

// 数学
function shuxue() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = 60;

            if (res >= 60) {
                resolve()
            } else {
                reject();
            }
        }, 2000)
    })
}

// 英语
function yingyu() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = 60;

            if (res >= 60) {
                resolve()
            } else {
                reject();
            }
        }, 2000)
    })
}
// yuwen
function yuwen() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = 60;

            if (res >= 60) {
                resolve()
            } else {
                reject();
            }
        }, 2000)
    })
}

var test = async function () {
    // promise对象的then函数返回一个promise
    await yuwen().then(() => {
        console.log("加鸡腿");
    });

    await shuxue().then(() => {
        console.log("加鸡腿,加鸡翅");
    })

    await yingyu().then(() => {
        console.log("加鸡腿,加鸡翅,加鸡头");
    })
}

// test();

function Parent(name, money){ 
    this.name = name; 
    this.money = money; 
    this.info = function(){ 
        console.log('姓名: '+this.name+' 钱: '+ this.money); 
    } 
}
//定义子类 
function Children(name){ 
    Parent.call(this, name); 
    this.info = function(){ 
        console.log('姓名: '+this.name); 
    } 
}
//实例化类 
var per = new Parent('parent', 800000000000);
 var chi = new Children('child');
 per.info(); 
 chi.info();