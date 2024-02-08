const MathUtil = (function () {
    function RandRange(max) {
        return Math.floor(Math.random() * max);
    }

    return { RandRange };
})();

export default MathUtil