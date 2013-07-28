var TimedHashTable = module.exports = function(defaultTimeout){
    this.defaultTimeout = defaultTimeout;

    this.table  = {};
    this.timers = {};
    this.size   = 0;
}

TimedHashTable.prototype.get = function(hash) {
    return this.table[hash];
};

TimedHashTable.prototype.set = function(hash, value, timeout) {
    timeout = timeout != null ? timeout : this.defaultTimeout;


    if(!this.has(hash))   ++this.size;
    else                  clearTimeout(this.timers[hash]);
    

    this.table[hash]    = value;
    this.timers[hash]   = setTimeout(this.remove.bind(this), timeout, hash);

    return this;
};

TimedHashTable.prototype.has = function(hash) {
    return this.table[hash] != null;
};

TimedHashTable.prototype.size = function() {
    return this.size;
};

TimedHashTable.prototype.remove = function(hash) {
    if(this.has(hash)) {
        clearTimeout(this.timers[hash]);
        delete this.table[hash];
        delete this.timers[hash];

        --this.size;
    }

    return this;
};

TimedHashTable.prototype.purge = function() {
    for (timer in this.timers)
        if(this.timers.hasOwnProperty(timer))
            clearTimeout(timer);

    delete this.table;
    delete this.timers;
    delete this.size;

    this.table = {};
    this.timers = {};
    this.size = 0;

    return this;
};
