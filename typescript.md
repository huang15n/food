


## Overview 
it is free and open source developed by Microsoft which provides static typing support to javascript. 
it helps with IDE support such as code completion and debugging  and also add support for object oriented programming such as classes, objects, inheritance, interfaces 






for angular development, we can develop using various languages  such as JavScript , ECMAScript, which is standard version of JS. TypeScript which adds optional types to javascript 

TypeScript is a superset of js and ecmascript 

angular developers use typescript because it is strongly typed with compile time checking that increased developer productivity and efficiency 
the angular framework is internally developed using TypeScript 

the pratical result is to refer to complete reference 

TypeScript file have the .ts extension 

web browser do nto understand TypesScript natively , it have to convert typescript code to js code, it is called transpile 
transpiling is accomplished with the tsc command 
```shell
npm install typescript --save-dev

tsc xxx.ts

```


to run the js file we need the node command to run the generated javascript code .js file 

```shell

node xxx.js 
```
compiler is your friend that can find errors earlier at the compilation  as opposed to regular js 






# define variables 
we are using the new let keyword for variable as opposed to using traditinal js var keyword 
the javascript var keywrod had a number of gotchas and pitfalls such as scoping, capturing, shadowing and etc. the let keyword helps to elimiate those issues 



```TS
let variableName : type = initialValue;
```

```TS
let a : booolean = true;
let b : number = 100;
let c : string = "hello";
a = false;
b = 200;
c = "world";
```

typescript is strongly typed , compilers find errors at compilation time 



# type: any 
you can assign different values of any type, but be careful because you will lose type safety 
you want to use any for Generics, you can get really fancy 
```TS
let data : amy = 10.0;
data = false;
```

# template strings 
Concatnation can become clunky for long strings 
TypeScript uses backticks `  and reference variables with ${} to reference a variable 
```TS
"hi" + variable + "this is a long one"

```

we can make use of template strings 


```TS
let variable = "hello";
console.log(`{variable} hi this is a long one but with template`);

```





# loops ,arrays, conditionals  


## loops 
```TS
for(let i = 0; i < 10; i++>){

}

```


## arrays 
```TS
let array1: number[] = [1,2,3,4,5];
let array2 : string [] = ['a','b'];
for(let i = 0; i < array.length; i++>){

}

```

## simplied for loop

```TS
for(let element of array){

}
```

## conditionals 

```TS
if(a == 1){

}else if(a == 2){

}else{

}

```

## growable arrays 
arrays in typescript are always growable and dynami 

```TS
let array : string [] = ["a","b"];
array.push("c");
```

