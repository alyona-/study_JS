const moduleOne = () => {
    setInterval(() => {
        document.body.innerHTML = "Hello World";
    }, 1000);
};

module.exports = moduleOne;