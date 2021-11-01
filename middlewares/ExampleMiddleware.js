module.exports = {
    /**
     * @dev unlike controller middleware has another @param i.e. next but remember middleware is simply a controller
     */
    exampleMiddleware: (req, res, next) => {
        /**
         * * Condition is either true or false
         * * let it be true to access controller 
         */
        const letGo = false;

        if(letGo) next()
        else
        /**
         * @dev response is sented before controller is accessed
         */
        res.status(200).send("I'm not letting another controller to be accessed, unless condition is fulfilled!");
    }
}