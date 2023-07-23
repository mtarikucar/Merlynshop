const express = require("express");
var microtime = require("microtime");
var crypto = require("crypto");

var nodeBase64 = require("nodejs-base64-converter");
var request = require("request");

var path = require("path");
var app = express();

const { models } = require("../database");


// Şablon motorunu EJS olarak belirtin
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var merchant_id = process.env.merchant_id;
var merchant_key = process.env.merchant_key;
var merchant_salt = process.env.merchant_salt;

var basket = JSON.stringify([
  ["Örnek Ürün 1", "18.00", 1],
  ["Örnek Ürün 2", "33.25", 2],
  ["Örnek Ürün 3", "45.42", 1],
]);

var user_basket = nodeBase64.encode(basket);

// Sayfada görüntülenecek taksit adedini sınırlamak istiyorsanız uygun şekilde değiştirin.
// Sıfır (0) gönderilmesi durumunda yürürlükteki en fazla izin verilen taksit geçerli olur.
var max_installment = "0";
var no_installment = "1"; // Taksit yapılmasını istemiyorsanız, sadece tek çekim sunacaksanız 1 yapın.
var user_ip = "";
var email = "tarik@gmail.com"; // Müşterinizin sitenizde kayıtlı veya form vasıtasıyla aldığınız eposta adresi.
var payment_amount = 100; // Tahsil edilecek tutar. 9.99 için 9.99 * 100 = 999 gönderilmelidir.
var currency = "TL";
var test_mode = "1"; // Mağaza canlı modda iken test işlem yapmak için 1 olarak gönderilebilir.
var user_name = "admin tarik"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız ad ve soyad bilgisi
var user_address = "konya"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız adres bilgisi
var user_phone = "05555555555"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız telefon bilgisi

// Başarılı ödeme sonrası müşterinizin yönlendirileceği sayfa
// Bu sayfa siparişi onaylayacağınız sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
/* var merchant_ok_url = 'https://merlynclub.com/checkout-success'; */
var merchant_ok_url =`${process.env.DOMAIN_ADD}/checkout-success`;
// Ödeme sürecinde beklenmedik bir hata oluşması durumunda müşterinizin yönlendirileceği sayfa
// Bu sayfa siparişi iptal edeceğiniz sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
/* var merchant_fail_url = 'https://merlynclub.com/'; */
var merchant_fail_url = `${process.env.DOMAIN_ADD}`;
var timeout_limit = 30; // İşlem zaman aşımı süresi - dakika cinsinden
var debug_on = 1; // Hata mesajlarının ekrana basılması için entegrasyon ve test sürecinde 1 olarak bırakın. Daha sonra 0 yapabilirsiniz.
var lang = "tr"; // Türkçe için tr veya İngilizce için en gönderilebilir. Boş gönderilirse tr geçerli olur.

const router = express.Router();

router.post("/create-payment", function (req, res) {
  var merchant_oid = "IN" + microtime.now(); // Sipariş numarası: Her işlemde benzersiz olmalıdır!! Bu bilgi bildirim sayfanıza yapılacak bildirimde geri gönderilir.
  user_ip = req.ip;
  console.log(req.body);
  console.log(req.body.cart.cartItems);
  payment_amount = req.body.cart.cartTotalAmount * 100;


  email = req.body.user.email;
  user_name = req.body.values.name;
  user_address = req.body.values.address;
  user_phone = req.body.values.phoneNumber;

  var hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;

  var paytr_token = hashSTR + merchant_salt;

  var token = crypto
    .createHmac("sha256", merchant_key)
    .update(paytr_token)
    .digest("base64");

  var options = {
    method: "POST",
    url: "https://www.paytr.com/odeme/api/get-token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    formData: {
      merchant_id: merchant_id,
      merchant_key: merchant_key,
      merchant_salt: merchant_salt,
      email: email,
      payment_amount: payment_amount,
      merchant_oid: merchant_oid,
      user_name: user_name,
      user_address: user_address,
      user_phone: user_phone,
      merchant_ok_url: merchant_ok_url,
      merchant_fail_url: merchant_fail_url,
      user_basket: user_basket,
      user_ip: user_ip,
      timeout_limit: timeout_limit,
      debug_on: debug_on,
      test_mode: test_mode,
      lang: lang,
      no_installment: no_installment,
      max_installment: max_installment,
      currency: currency,
      paytr_token: token,
    },
  };

   request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    var res_data = JSON.parse(body);

    if (res_data.status == "success") {

      try {
        // create an order in the 'order' table
        const newOrder = await models.order.create({
          total_price: req.body.cart.cartTotalAmount,
          userId: req.body.user.id,
          payment_id: merchant_oid
        });
        /* console.log(newOrder, "newOrder"); */
        // iterate over the 'products' array and create an entry in the 'orderProduct' table for each product
        req.body.cart.cartItems.forEach(async (element) => {
          await models.order_product
            .create({
              orderId: newOrder.id,
              productId: element.id,
              quantity: element.cartQuantity,
            })
    
            .catch(() => {
              console.log("err");
            });
        });
    
        await models.location.create({
          orderId: newOrder.id,
          address: req.body.values.address,
        })
        /* console.log("lokasyon başarılı"); */
    
        // return the newly created order
      } catch (err) {
    
      }
      res.send({ url: res_data.token });
    } else {
      res.end(body);
    }
  });
});

router.post("/callback", async function (req, res) {
  // ÖNEMLİ UYARILAR!
  // 1) Bu sayfaya oturum (SESSION) ile veri taşıyamazsınız. Çünkü bu sayfa müşterilerin yönlendirildiği bir sayfa değildir.
  // 2) Entegrasyonun 1. ADIM'ında gönderdiğniz merchant_oid değeri bu sayfaya POST ile gelir. Bu değeri kullanarak
  // veri tabanınızdan ilgili siparişi tespit edip onaylamalı veya iptal etmelisiniz.
  // 3) Aynı sipariş için birden fazla bildirim ulaşabilir (Ağ bağlantı sorunları vb. nedeniyle). Bu nedenle öncelikle
  // siparişin durumunu veri tabanınızdan kontrol edin, eğer onaylandıysa tekrar işlem yapmayın. Örneği aşağıda bulunmaktadır.

  console.log("callback");
  var callback = req.body;
  // POST değerleri ile hash oluştur.
  paytr_token =
    callback.merchant_oid +
    merchant_salt +
    callback.status +
    callback.total_amount;
  var token = crypto
    .createHmac("sha256", merchant_key)
    .update(paytr_token)
    .digest("base64");

  // Oluşturulan hash'i, paytr'dan gelen post içindeki hash ile karşılaştır (isteğin paytr'dan geldiğine ve değişmediğine emin olmak için)
  // Bu işlemi yapmazsanız maddi zarara uğramanız olasıdır.

  if (token != callback.hash) {
    throw new Error("PAYTR notification failed: bad hash");
  }

  if (callback.status == "success") {
    console.log("success:",req.body);
    console.log("token:",token);
    try {
      // Find the order by orderId
      const order = await models.order.findOne({ where: { payment_id: callback.merchant_oid } });
    
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
    
      const feature = models.product_feature.findByPk(order.productId) // productID aslında burada featrueID sonra veritabanından ismini düzeltmeyi unutmayın

      feature.quantity -= 1
      
      await feature.save()
    
      // Set the payment_verify field to true
      order.payment_verify = true;
      await order.save();
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
    
  } else {
    //basarisiz
  }

  res.send("OK");
});

module.exports = router;


/* {
     hash: 'RLBSK9rktptGzQzgbExrfNlel2iQ6IQQsI1XwPjjsNc=',
     merchant_oid: 'IN1688819003009087',
     status: 'success',
     total_amount: '12300',
     payment_type: 'card',
     payment_amount: '12300',
     currency: 'TL',
     installment_count: '1',
     merchant_id: '342659',
     test_mode: '1'
   }
   success {
     hash: 'RLBSK9rktptGzQzgbExrfNlel2iQ6IQQsI1XwPjjsNc=',
     merchant_oid: 'IN1688819003009087',
     status: 'success',
     total_amount: '12300',
     payment_type: 'card',
     payment_amount: '12300',
     currency: 'TL',
     installment_count: '1',
     merchant_id: '342659',
     test_mode: '1'
   } */