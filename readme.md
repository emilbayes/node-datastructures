###Various datastructures for use in Node.js and the browser

Only a single one so far, Timed Hash Table. I will add more as I have several laying around.

####Example

######Timed Hash Table

    var ths = new TimedHashtable(/* default lifetime of data in ms */);

    ths.set('hash1', 'value1' /*, timeout */) //can be chained
       .size(); // === 1
    ths.contains('hash1'); // === true

    ths.get('hash1'); // === 'value1'

    ths.remove('hash1').purge()
