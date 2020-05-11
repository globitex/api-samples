let client = require('./rest-client');
let crypto = require('crypto');


let PATH_TIME                               = "/api/1/public/time";
let PATH_SYMBOLS                            = "/api/1/public/symbols";
let PATH_ORDER_BOOK                         = "/api/1/public/orderbook";
let PATH_TICKER_FOR_SYMBOL                  = "/api/1/public/ticker";
let PATH_TICKER                             = "/api/1/public/ticker";
let PATH_TRADES_FOR_SYMBOL                  = "/api/1/public/trades";

let PATH_TRADES                             = "/api/1/trading/trades";
let PATH_ACTIVE_ORDERS                      = "/api/1/trading/orders/active";
let PATH_RECENT_ORDERS                      = "/api/1/trading/orders/recent";
let PATH_USER_ORDER                         = "/api/1/trading/order";
let PATH_NEW_ORDER                          = "/api/1/trading/new_order";
let PATH_CANCEL_ORDER                       = "/api/2/trading/cancel_order";
let PATH_CANCEL_ALL_ORDERS                  = "/api/1/trading/cancel_orders";

let PATH_PAYMENT_ACCOUNTS                   = "/api/1/payment/accounts";
let PATH_PAYMENT_TRANSACTIONS               = "/api/1/payment/transactions";

let PATH_PAYMENT_CRYPTO_CREATE              = "/api/1/payment/payout/crypto";
let PATH_PAYMENT_BANK_CREATE                = "/api/1/payment/payout/bank";
let PATH_PAYMENT_EXCHANGE_TRANSFER_CREATE   = "/api/1/payment/payout/exchange";
let PATH_PAYMENT_INTERNAL_TRANSFER_CREATE   = "/api/1/payment/internal";

let PATH_EW_PAYMENT_CREATE                  = "/api/1/eurowallet/payments";

let tradeAccountNumber  = "ZAN189A01";
let tradeAccountNumber2 = "ZAN189A02";

let apiKey                  = "40afac12fa7515b5f108e84c06710b68";
let apiSecret               = "7829d11fa04e4316b5c6486d9c5a7c9a5b90af0fec601fd46e0fe8f0b9141dea";
let apiTransactionSecret    = "003c585b08c337416acfa5958d39fe5bd494c4f283edcbf0ae84b8786ef28d0b";

let BASE_URL = "api.globitex.com";
let PORT = 443;

/**
 *  uncomment methods to make api calls
 */


/**
 * Public trade market data API
 */
getTime();
// getSymbol();
// getTickerForSymbol();
// getTicker();
// getOrderBookForSymbol();
// getTradesForSymbol();


/**
 * Trading API
 */
// getActiveOrders();
// getMyTrades();
// newOrder();
// getRecentOrders();
// getUserOrder();
// cancelOrder();
// cancelAllOrders();


/**
 * Globitex Payment API
 */
// getAccountsAndBalance();
// getTransactions();
// createCryptoWithdrawal();
// createCryptoTransfer();
// createBankTransfer();
// createInternalTransfer();
// createExchangeTransfer();

/**
 * EuroWallet API
 */
// createEwPayment();


//################################# Public Market Data API methods ##################################

function getTime() {
    client.get(BASE_URL, PATH_TIME, PORT);
}

function getSymbol() {
    client.get(BASE_URL, PATH_SYMBOLS, PORT);
}

function getTickerForSymbol() {
    let symbol = "BTCEUR";
    client.get(BASE_URL, PATH_TICKER_FOR_SYMBOL + "/" + symbol, PORT);
}

function getTicker() {
    client.get(BASE_URL, PATH_TICKER, PORT);
}

function getOrderBookForSymbol() {
    let symbol = "BTCEUR";
    client.get(BASE_URL, PATH_ORDER_BOOK + "/" + symbol, PORT);
}

function getTradesForSymbol() {
    let symbol = "BTCEUR";
    client.get(BASE_URL, PATH_TRADES_FOR_SYMBOL + "/" + symbol, PORT);
}

//################################# Trading API methods ##################################

function getActiveOrders() {
    let nonce = (new Date).getTime();
    let path = PATH_ACTIVE_ORDERS;

    let parameters = {
        //symbols: "BTCEUR",
        account: tradeAccountNumber//,
        //orderSource: "FIX",
        //clientOrderId: "REST1496764162189"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function getMyTrades() {
    let nonce = (new Date).getTime();
    let path = PATH_TRADES;

    let parameters = {
        by: "trade_id",
        startIndex: "0",
        maxResults: "100",
        sort: "desc",
        account: tradeAccountNumber//,
        //symbols: "BTCEUR",
        //from: "2145314",
        //till: "2145315",
        //orderSources: "FIX"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {
        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function newOrder() {
    let nonce = (new Date).getTime();
    let path = PATH_NEW_ORDER;

    let parameters = {
        account: tradeAccountNumber,
        clientOrderId: "REST" + nonce,
        symbol: "BTCEUR",
        side: "buy",
        price: "1.25",
        quantity: "0.11" //,
        //stopPrice: "480.0",
        //type: "stopLimit",
        //timeInForce: "GTD",
        //expireTime: "1497601440"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {
        client.post(BASE_URL, path, PORT, parameters, header)
    }
}

function getRecentOrders() {
    let nonce = (new Date).getTime();
    let path = PATH_RECENT_ORDERS;

    let parameters = {
        account: tradeAccountNumber,
        maxResults: "1000",
        startIndex: "1"//,
        //sort: "desc",
        //symbols: "BTCEUR,BTCUSD",
        //orderSource: "FIX",
        //isTrades: "true",
        //statuses: "suspended,new"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function getUserOrder() {
    let nonce = (new Date).getTime();
    let path = PATH_USER_ORDER;

    let parameters = {
        account: tradeAccountNumber,
        clientOrderId: "REST1497863742503"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function cancelOrder() {
    let nonce = (new Date).getTime();
    let path = PATH_CANCEL_ORDER;

    let parameters = {
        clientOrderId: "REST1588076190771",
        account: tradeAccountNumber
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.post(BASE_URL, path, PORT, parameters, header)
    }
}

function cancelAllOrders() {
    let nonce = (new Date).getTime();
    let path = PATH_CANCEL_ALL_ORDERS;

    let parameters = {
        account: tradeAccountNumber
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.post(BASE_URL, path, PORT, parameters, header)
    }
}

//################################# Globitex Payment methods ##################################

function getAccountsAndBalance() {
    let nonce = (new Date).getTime();
    let path = PATH_PAYMENT_ACCOUNTS;

    let parameters = {};

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {

        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function getTransactions() {
    let nonce = (new Date).getTime();
    let path = PATH_PAYMENT_TRANSACTIONS;

    let parameters = {
        //transactionCode: "d33cd983bd434dbf816a33b8b321fd4e",
        //from: "1495549487841",
        //currency: "BTC",
        //direction: "out",
        //paymentType: "bank",
        //status: "unconfirmed"
    };

    getHeaders(nonce, path, parameters, callback);

    function callback(header) {
        client.get(BASE_URL, path, PORT, parameters, header)
    }
}

function createCryptoTransfer() {
    let nonce = (new Date).getTime();
    let parameters = {
        requestTime: nonce,
        amount: "0.1",
        currency: "BTC",
        account: tradeAccountNumber,
        address: "2MtNtLcUVS37Tc31JaFSwHNeUq8Rx5EEADY",      //testnet address (use main net address for production)
        // notes:,
        // commissionSource: "account",
        commission: 0.0001,
        // clientTransId: "testCrypto" + nonce,
        // feeId: 1111
    };
    buildTransactionSignature(parameters, apiTransactionSecret, setSignature);

    function setSignature(txSignature) {
        parameters["transactionSignature"] = txSignature;

        getHeaders(nonce, PATH_PAYMENT_CRYPTO_CREATE, parameters, callback);

        function callback(header) {
            client.post(BASE_URL, PATH_PAYMENT_CRYPTO_CREATE, PORT, parameters, header)
        }
    }
}

function createBankTransfer() {
    let nonce = (new Date).getTime();
    let parameters = {
        requestTime: nonce,
        amount: "30",
        currency: "EUR",
        // currencyOut: "USD",
        account: tradeAccountNumber,
        paymentType: "sepa",
        // beneficiaryAccountType: "other",
        // beneficiaryName: "Beneficiary name",
        beneficiaryAccount: "LT103080010000000095",
        beneficiarySwiftCode: "NEUALT21XXX",
        beneficiaryReference: "Test transfer",
        // intermediaryAccount: "Intermediary account",
        // intermediarySwiftCode: "Intermediary swift code",
        // commissionSource: "account",
        // clientTransId: "BankTxCode" + nonce,
    };

    buildTransactionSignature(parameters, apiTransactionSecret, setSignature);

    function setSignature(txSignature) {
        parameters["transactionSignature"] = txSignature;

        getHeaders(nonce, PATH_PAYMENT_BANK_CREATE, parameters, callback);

        function callback(header) {
            client.post(BASE_URL, PATH_PAYMENT_BANK_CREATE, PORT, parameters, header)
        }
    }
}

function createExchangeTransfer() {
    let nonce = (new Date).getTime();
    let parameters = {
        requestTime: nonce,
        accountFrom: tradeAccountNumber,
        amount: "0.1",
        currency: "BTC",
        // beneficiaryName: "Beneficiary name",
        // beneficiaryEmail: "beneficiary@gmail.com",
        beneficiaryAccount: "TRA592A01",
        // beneficiaryReference: "Test exchange transfer",
        // clientTransId: "ExchangeTransfer" + nonce,
    };

    buildTransactionSignature(parameters, apiTransactionSecret, setSignature);
    function setSignature(txSignature) {
        parameters["transactionSignature"] = txSignature;

        getHeaders(nonce, PATH_PAYMENT_EXCHANGE_TRANSFER_CREATE, parameters, callback);

        function callback(header) {
            client.post(BASE_URL, PATH_PAYMENT_EXCHANGE_TRANSFER_CREATE, PORT, parameters, header)
        }
    }
}


function createInternalTransfer() {
    let nonce = (new Date).getTime();
    let parameters = {
        accountFrom: tradeAccountNumber,
        accountTo: tradeAccountNumber2,
        amount: "40.00",
        currency: "EUR",
        // clientTransId: "InternalTransfer" + nonce,
    };

    getHeaders(nonce, PATH_PAYMENT_INTERNAL_TRANSFER_CREATE, parameters, callback);

    function callback(header) {
        client.post(BASE_URL, PATH_PAYMENT_INTERNAL_TRANSFER_CREATE, PORT, parameters, header)
    }
}

//################################# EuroWallet methods ##################################

function createEwPayment() {
    let nonce = (new Date).getTime();
    let parameters = {
        requestTime: nonce,
        account: "LT103080010000000095",
        amount: "10.0",
        beneficiaryName: "Some beneficiary name",
        beneficiaryAccount: "LT693080010000000294",
        beneficiaryReference: "Some reference text",
        externalPaymentId: "API_T_" + nonce,
        useGbxForFee: false
    };
    buildTransactionSignature(parameters, apiTransactionSecret, setSignature);

    function setSignature(txSignature) {
        parameters["transactionSignature"] = txSignature;

        getHeaders(nonce, PATH_EW_PAYMENT_CREATE, parameters, callback);

        function callback(header) {
            client.post(BASE_URL, PATH_EW_PAYMENT_CREATE, PORT, parameters, header)
        }
    }
}


//################################# Utility methods ##################################

function getHeaders(nonce, path, parameters, callback) {
    let sigStr = apiKey + '&' + nonce + path;
    if (parameters) {
        sigStr += '?';
    }

    for (let key in parameters) {
        //console.log('par2: ' + key + ": " + parameters[key]);
        sigStr += key + "=" + parameters[key] + "&";
    }

    if (parameters) {
        sigStr = sigStr.substr(0, sigStr.length - 1);
    }

    // console.log("sigStr: " + sigStr);

    let hmac = crypto.createHmac('sha512', apiSecret);

    hmac.on('readable', () => {
        let signature = hmac.read();
        if (signature) {
            sigHex = signature.toString('hex')
            //console.log(sigHex);
            let header = {
                'X-API-Key': apiKey,
                'X-Signature': sigHex,
                'X-Nonce': nonce
            };
            callback(header);
        }
    });

    hmac.write(sigStr);
    hmac.end();
}

function buildTransactionSignature(parameters, transactionSecret, callback) {
    let sigStr = "";
    for (let key in parameters) {
        sigStr += key + "=" + parameters[key] + "&";
    }
    if (sigStr.length > 0) {
        sigStr = sigStr.substring(0, sigStr.length - 1);
    }
    let hmac = crypto.createHmac('sha512', transactionSecret);

    // console.log("tx sig str: " + sigStr);

    hmac.on('readable', () => {
        let signature = hmac.read();
        if (signature) {
            sigHex = signature.toString('hex');
            console.log(sigHex);
            callback(sigHex);
        }
    });

    hmac.write(sigStr);
    hmac.end();
}