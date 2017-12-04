/**
 * Created by andruhovski on 6/16/2017.
 */

let assert = require('chai').assert;
let http = require('http');
let rest = require('restler');
let base = 'http://localhost:3000/api/v1';

suite('API Tests', function() {
    test('Проверка тайм-аута', function(done) {
        rest.get(base + '/pages', { timeout: 10000 }).on('timeout', function(ms) {
            console.log('did not return within ' + ms + ' ms');
            assert(false);
        }).on('complete', function(data) {
            //console.log('Did not time out!');
            assert(true);
        });
        done();
    });

    test('Проверка возможности извлечения списка страниц',
        function(done) {
            rest.get(base + '/pages').on('success', function(data) {
                assert(Array.isArray(data));
                assert(data.length > 0);
                done();
            });
        });

    // test('Проверка наличия в списке страницы с названием about',
    //     function(done) {
    //         rest.get(base + '/page/5a14763acc03e0076c8faa99').on('success', function(data) {
    //             assert(data.name === 'about');
    //             done();
    //         });
    //     });

    test('Проверка возможности получения кода ошибки',
        function(done) {
            rest.get(base + '/page/a').on('complete', function(data) {
                assert(!data.success);
                done();
            });
        });


});

suite('Робота з валютою', function() {
    let id = "";
    test('Проверка возможности создания валюты',
        function(done) {
            // rest.post(base + '/page/a').on('complete', function(data) {
            //     assert(!data.success);
            //     done();
            // });
            rest.post(base + '/money', {
                data: { currencyName: 'USD', currencyPrice: 26.9 },
            }).on('complete', function(data, response) {
                assert(response.statusCode == 200);
                assert(data.currencyName === 'USD');
                assert(data.currencyPrice == 26.9);
                id = data._id;
            });
            done();
        });
    test('Проверка возможности корректного создания валюты',
        function(done) {
            rest.post(base + '/money', {
                data: { currencyName: 'USD', currencyPrice: -26.9 },
            }).on('complete', function(data, response) {
                assert(response.statusCode == 500);
            });
            done();
        });

    test('Проверка возможности корректного чтения валюты',
        function(done) {
            rest.get(base + '/currency/' + id).on('success',
                function(data, response) {
                    assert(response.statusCode == 200);
                    assert(data.currencyName === 'USD');
                    assert(data.currencyPrice == 26.9);
                });
            done();
        });

    test('Проверка возможности корректного обновления валюты',
        function(done) {
            rest.put(base + '/currency/' + id, {
                data: { currencyPrice: 27.9 },
            }).on('complete', function(data, response) {
                assert(response.statusCode == 200);
                assert(data.currencyPrice == 27.9);
            });
            done();
        });

    test('Проверка возможности корректного удаения валюты',
        function(done) {
            rest.del(base + '/currency/' + id)
                .on('complete', function(data, response) {
                    assert(response.statusCode == 200);
                });
            done();
        });
});

suite('Робота з СП', function() {
    let id = "";
    test('Проверка тайм-аута', function(done) {
        rest.get(base + '/lists', { timeout: 10000 }).on('timeout', function(ms) {
            console.log('did not return within ' + ms + ' ms');
            assert(false);
        }).on('complete', function(data) {
            //console.log('Did not time out!');
            assert(true);
        });
        done();
    });
    test('Проверка возможности создания СП',
        function(done) {
            rest.post(base + '/lists/', {
                data: { company: "test", representative: "test", adress: "test", valid: "test" },
            }).on('complete', function(data, response) {
                assert(response.statusCode == 200);
                assert(data.company === "test");
                assert(data.representative == "test");
                assert(data.adress == "test");
                assert(data.valid == "test");
                id = data._id;
            });
            done();
        });

    test('Проверка возможности корректного чтения СП',
        function(done) {
            rest.get(base + '/lists/' + id).on('success',
                function(data, response) {
                    assert(response.statusCode == 200);
                    assert(data.company === "test");
                    assert(data.representative == "test");
                    assert(data.adress == "test");
                    assert(data.valid == "test");
                });
            done();
        });

    test('Проверка возможности корректного обновления СП',
        function(done) {
            rest.put(base + '/lists/' + id, {
                data: { company: "EtoTest" },
            }).on('complete', function(data, response) {
                assert(response.statusCode == 200);
                assert(response.statusCode == 200);
                assert(data.company === "test");
                assert(data.representative == "test");
                assert(data.adress == "test");
                assert(data.valid == "test");
            });
            done();
        });

    // test('Проверка возможности корректного удаления СП',
    //     function(done) {
    //         rest.del(base + '/lists/' + id)
    //             .on('complete', function(data, response) {
    //                 assert(response.statusCode == 200);
    //             });
    //         done();
    //     });
});