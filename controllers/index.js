"use strict";
var express     = require("express"),
    router      = express.Router();

/**
 * @description
 * Sending navigation list
 */
router.get('/nav', function(req, res) {
    res.send([
        {
            name : 'Dla członków',
            shortcut: 'dlaczłonków',
            pos : 0,
            subMenu : [
                {name : '2', category : "blog", shortcut: '2', pos : 1},
                {name : 'lorem', category : "gallery", shortcut: 'lorem', pos : 0}
            ]
        },
        {
            name : 'Dla kadry',
            shortcut: 'dlakadry',
            pos : 1,
            subMenu : [
                {name : 'lorem', category : "page", shortcut: 'lorem', pos : 0}
            ]
        },
        {
            name : 'Dla rodziców',
            shortcut: 'dlarodziców',
            pos : 2,
            subMenu : [
                {name : '1', category : "blog", shortcut: '1', pos : 0},
                {name : '2', category : "gallery", shortcut: '2', pos : 1},
                {name : 'lorem', category : "page", shortcut: 'lorem', pos : 2}
            ]
        },
        {
            name : 'Bazy',
            shortcut: 'bazy',
            pos : 3,
            subMenu : [
                {name : '1', category : "page", shortcut: '1', pos : 0},
                {name : '2', category : "page", shortcut: '2', pos : 1}
            ]
        }
    ]);
});

/**
 * @description
 * Sending contact information object
 */
router.get('/contact', function(req, res) {
    res.send({
        "admin" : "Imię i nazwisko",
        "phone" : "test",
        "mail" : "test",
        "address" : "test",
        "facebook" : "test",
        "twitter" : "test",
        "youtube" : "test",
        "facture" : {
            "number" : 234234234
        }
    })
});

module.exports = router;