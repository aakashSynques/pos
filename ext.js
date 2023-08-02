function addProductInCart(jsn, apID = null) {
  if (typeof jsn == "string") {
    jsn = JSON.parse(jsn);
  }
  //var rateChart=getMyProductRateFromChart(parseInt(jsn.prod_id));
  /*if(dkotids.length>0)
{
new PNotify({ text: 'Can\'t add product while KOT bills in processing.', type: 'error',width:'210',delay:1500});
}
else */
  //if(jsn['outlet_id_'+outlet_id+'_stockin']==0)
  //if(rateChart.stock_availability==0)
  if (
    jsn.rate_chart[outlet_id][rateChart_PaymodeID]["stock_availability"] == 0
  ) {
    new PNotify({
      text: "Out of stock " + jsn.prod_name,
      type: "error",
      width: "210",
      delay: 1500,
    });
  } else {
    var rc_prod_rate = parseFloat(
      jsn.rate_chart[outlet_id][rateChart_PaymodeID]["prod_rate"]
    );
    if (
      parseInt(jsn.rate_chart[outlet_id][rateChart_PaymodeID]["tax_way"]) == 2
    ) {
      rc_prod_rate = Math.round((rc_prod_rate / 1.05) * 1000) / 1000;
    }
    var rc_offered_discount = parseFloat(
      jsn.rate_chart[outlet_id][rateChart_PaymodeID]["prod_offered_discount"]
    );
    if (rc_offered_discount > 0) {
      rc_offered_discount =
        Math.round(((rc_prod_rate * rc_offered_discount * -1) / 100) * 1000) /
        1000;
    }
    var pJsn = {};
    $.each(jsn, function (i, v) {
      pJsn[i] = v;
    });

    var newProdId = parseInt(jsn.prod_id);
    var alreadyInList = -1;
    var urnoVal = 0;
    var prod_qty = 1;
    var prod_discount = parseFloat(rc_offered_discount);
    var complementaryVal = 0;
    var complementaryNote = "";
    var prodNoteVal = pJsn.prod_Customized_status == 1 ? 1 : 0;
    var prodNote = "";
    var parcelVal = cartSumUp.deliveryMode <= 2 ? 0 : 1;
    if (pJsn.prod_Parcel_status == "0") {
      parcelVal = 0;
    }
    ///----Check Duplicate
    if (apID == null && productsInCart.length > 0) {
      $.each(productsInCart, function (k, v) {
        if (v.associated_prod_urno == "") {
          v.associated_prod_urno = null;
        }
        if (!v.toppings) {
          v["toppings"] = new Array();
        }
        if (!v.customized) {
          v["customized"] = new Array();
        }
        if (
          urnoVal == 0 &&
          newProdId == parseInt(v.prod_id) &&
          parseInt(v.is_parcel) == parcelVal &&
          v.associated_prod_urno == null &&
          v.toppings.length == 0 &&
          v.customized.length == 0
        ) {
          prod_qty += parseInt(v.prod_qty);
          prod_discount += parseFloat(v.prod_discount);
          alreadyInList = k;
          urnoVal = v.urno;
          complementaryVal = v.is_complementary;
          complementaryNote = v.is_complementary_note;
          prodNoteVal = v.is_note;
          prodNote = v.is_prod_note;
          return false;
        }
      });
    }
    //pJsn['prod_rate']=pJsn['outlet_id_'+outlet_id+'_prod_rate'];
    pJsn["prod_rate"] = rc_prod_rate;
    pJsn["is_parcel"] = parcelVal; //on the table
    pJsn["is_complementary"] = complementaryVal;
    pJsn["is_complementary_note"] = complementaryNote;
    pJsn["is_note"] = prodNoteVal;
    pJsn["is_prod_note"] = prodNote;
    pJsn["prod_Discount_status"] = jsn.prod_Discount_status; //Apply Discount
    pJsn["prod_Complementary_status"] = jsn.prod_Complementary_status; //Complementary Status
    pJsn["prod_qty"] = prod_qty;
    pJsn["prod_discount"] =
      cartSumUp.discountType == "inRupee" ? 0.0 : prod_discount;
    pJsn["prod_discount_offered"] = parseFloat(rc_offered_discount);
    pJsn["total_amount"] =
      Math.round(pJsn.prod_qty * pJsn.prod_rate * 1000) / 1000;
    pJsn["KOT_pick"] = 0;
    pJsn["KOT_ready"] = 0;
    pJsn["KOT_dispatch"] = 0;
    pJsn["urno"] = urnoVal;
    if (alreadyInList == -1) {
      var newRandNo = Math.random().toString();
      var nRnFFDigits = parseInt(newRandNo.substr(2, 4));
      var nRnlFDigits = parseInt(newRandNo.substr(-4, 4));
      pJsn["urno"] = (parseInt(nRnFFDigits + nRnlFDigits) * newProdId)
        .toString()
        .substr(0, 4);
      //0.04628456688512017 = 462 + 2017 * 567 = 1405
    }
    //pJsn['urno']=((alreadyInList==-1)?(parseInt(Math.random().toString().substring(2, 6))*1):urnoVal);
    pJsn["associated_prod_urno"] = apID;
    pJsn["toppings"] = new Array();
    pJsn["customized"] = new Array();
    if (pJsn.category_heads == "Icing") {
      pJsn["message_on_card"] = "";
      pJsn["message_on_cake"] = "";
    }
    if (apID != null && apID != "" && apID >= 0) {
      $.each(productsInCart, function (k, v) {
        if (v.urno == apID && v.associated_prod_urno == null) {
          productsInCart[k].toppings.push(pJsn.urno);
          pJsn["is_parcel"] = v.is_parcel;
          pJsn["is_complementary"] = v.is_complementary;
          pJsn["prod_qty"] = v.prod_qty;
          pJsn["total_amount"] = 0.0;
          pJsn["prod_discount"] = 0.0;
          if (pJsn.is_complementary == 0) {
            pJsn["total_amount"] =
              Math.round(pJsn.prod_qty * pJsn.prod_rate * 1000) / 1000;
            if (cartSumUp.discountType != "inRupee") {
              if (
                pJsn.prod_Discount_status == 1 &&
                pJsn.prod_discount_offered < 0
              ) {
                pJsn["prod_discount"] =
                  Math.round(
                    pJsn.prod_qty * pJsn.prod_discount_offered * 1000
                  ) / 1000;
              } else if (
                pJsn.prod_Discount_status == 1 &&
                cartSumUp.discountPercent < 0
              ) {
                pJsn["prod_discount"] =
                  Math.round(
                    ((pJsn.total_amount * cartSumUp.discountPercent) / 100) *
                      1000
                  ) / 1000;
              }
            }
          }
          return false;
        }
      });
    }
    $.each(outletsAllList, function (ii, vv) {
      //if(outlet_id==v.outlet_id) { jsn['prod_rate']=jsn['outlet_id_'+v.outlet_id+'_prod_rate']; }
      delete pJsn["outlet_id_" + vv.outlet_id + "_prod_rate"];
      delete pJsn["outlet_id_" + vv.outlet_id + "_stockin"];
    });
    delete pJsn["rate_chart"];
    if (alreadyInList == -1) {
      productsInCart.push(pJsn);
    } else {
      productsInCart[alreadyInList] = pJsn;
    }
    if (apID == null) {
      new PNotify({
        text: "+1 pc(s) " + pJsn.prod_name,
        type: "info",
        width: "210",
        delay: 1500,
      });
      drawProductCartList();
      trollProductList("DOWN");
      trollProductList("UP");
      $("#productCartList").parent().scrollTop(5000);
    }
  }
}




aaa srif
safsadf44