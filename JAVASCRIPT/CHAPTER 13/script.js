console.log("Ritesh is a hacker");
console.log("Rahul is a hacker");

setTimeout(() => {
    console.log("I am inside Settimeout");
}, 2000);

const fn = () =>{
    console.log("Nothing")
}

const callback = (arg, fn) => {
    console.log(arg);
    fn()
};

const loadscript = (src, callback) => {
    const sc = document.createElement("script");

    sc.src = src;

    sc.onload = () => {
        callback("Ritesh",fn);
    };

    document.head.append(sc);
};

loadscript(
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
    callback
);

