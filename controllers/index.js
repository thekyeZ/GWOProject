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
            title : 'Dla członków',
            link : false,
            menu : [
                {title : '2', link: '2', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]},
                {title : 'lorem', link: 'lorem', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]}
            ]
        },
        {
            title : 'Dla kadry',
            link : false,
            menu : [
                {title : 'lorem', link: 'lorem', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]}
            ]
        },
        {
            title : 'Dla rodziców',
            link : false,
            menu : [
                {title : '1', link: '1', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]},
                {title : '2', link: '2', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]},
                {title : 'lorem', link: 'lorem', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]}
            ]
        },
        {
            title : 'Bazy',
            link : false,
            menu : [
                {title : '1', link: '1', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]},
                {title : '2', link: '2', menu : [
                    {title : '1', link: '1'},
                    {title : '2', link: '2'}
                ]}
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