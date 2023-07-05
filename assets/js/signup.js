var signup = {
  checkEmail: function () {
    var userEmail = $("#userEmail").val();
    var userBrand = $("#brd").val();
    var result = "";
    $.ajax({
      url: "/cfc/signup.cfc?method=validateUserEmailSimple",
      type: "POST",
      async: false,
      data: { userEmail: userEmail, brd: userBrand },
      success: function (strData) {
        result = strData;
      },
    });
    return result;
  },
  checkLogin: function (login) {
    $.ajax({
      url: "/cfc/signup.cfc?method=validateLogin",
      type: "POST",
      async: false,
      data: { login: login },
      success: function (strData) {
        result = strData;
      },
    });
    return result;
  },
  checkPasswordPolicy: function (password) {
    $.ajax({
      url: "/cfc/controller.cfc?method=passwordPolicy",
      type: "POST",
      async: false,
      data: { name: "MA", userPassword: password },
      success: function (strData) {
        result = strData;
      },
    });
    return result;
  },
  checkUniqueness: function (field_name, field_val) {
    var result = "";
    $.ajax({
      url: "/cfc/controller.cfc?method=checkUniqueness",
      type: "POST",
      async: false,
      data: { field_name: field_name, field_val: field_val },
      success: function (strData) {
        result = strData;
      },
    });
    return result;
  },
  checkRegistrationForm: function (customRegex) {
    var can_register = true;
    var account =
      $("#individual").length &&
      !$("#individual").prop("checked") &&
      $("#company").length &&
      !$("#company").prop("checked")
        ? 0
        : 1;
    if (account != 0) {
      $("#account_missing").addClass("hidden");
    } else {
      $("#account_missing").removeClass("hidden");
      can_register = false;
    }
    $("input.agreement[type=checkbox],input.digital-agreement").each(
      function () {
        if ($(this).prop("checked")) {
          $(this).closest(".form-group").removeClass("has-error");
          $(this).closest(".form-group").find(".help-block").addClass("hidden");
          $(this)
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
        } else {
          $(this).closest(".form-group").addClass("has-error");
          $(this)
            .closest(".form-group")
            .find(".help-block")
            .removeClass("hidden");
          var errmsg =
            $(this).hasClass("digital-agreement") == true
              ? "Digital signature is required"
              : $(this)
                  .closest(".form-group")
                  .find(".pop_me_over")
                  .attr("data-missing");
          $(this)
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $(this)
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
    );
    var regex_string =
      customRegex.length > 0
        ? customRegex
        : /^[\sA-Za-z\-\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/;
    var company_name_check =
      /^[\sA-Za-z\-\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC0-9]+$/;
    var alphanumersSpace = new RegExp(regex_string);
    var loginReg = /^(?![0-9])\w+$/;
    var alphanumersNoSpace = /^([0-9\-])+(\w)*$/;
    var alphanumerNoSpace = /^[a-zA-Z0-9]+([ \t-]?[a-zA-Z0-9]+)*$/;
    var generic_regex = /^[A-Za-z0-9'\.\-\s\,\/\\\@]+$/;
    var company = $("#company").prop("checked") ? 1 : 0;
    if (company != 0) {
      var company_name = $("#company_name").val();
      company_name =
        typeof company_name == "undefined" || company_name == null
          ? ""
          : company_name.trim();
      if (company_name != "") {
        var check_company_name = company_name_check.test(company_name);
        console.log(check_company_name);
        if (!check_company_name) {
          $("#company_invalid").removeClass("hidden");
          $("#company_name").closest(".form-group").addClass("has-error");
          var errmsg = $("#company_name")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#company_name")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#company_name")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#company_invalid").addClass("hidden");
          $("#company_name")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#company_name").closest(".form-group").removeClass("has-error");
        }
        $("#company_missing").addClass("hidden");
        if (can_register) {
          $("#company_name")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#company_name").closest(".form-group").removeClass("has-error");
        }
      } else {
        $("#comnpany_invalid").addClass("hidden");
        $("#company_missing").removeClass("hidden");
        $("#company_name").closest(".form-group").addClass("has-error");
        var errmsg = $("#company_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#company_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#company_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if (
      $("#login").closest(".form-group").length == 1 &&
      $("#login").closest(".form-group").hasClass("hidden") == false
    ) {
      var login = $("#login").val();
      login = typeof login == "undefined" || login == null ? "" : login.trim();
      if (login != "") {
        $(".username-error").closest(".row").addClass("hidden");
        var check_login = loginReg.test(login);
        if (check_login) {
          var valid_login = signup.checkLogin(login);
          if (valid_login == "success") {
            $("#login")
              .closest(".form-group")
              .find(".pop_me_over")
              .addClass("hidden");
            $("#login").closest(".form-group").removeClass("has-error");
          } else {
            var errmsg = $("#login").data("error_exists");
            $("#login")
              .removeClass("hidden")
              .closest(".form-group")
              .addClass("has-error");
            $("#login")
              .closest(".form-group")
              .find(".pop_me_over")
              .removeClass("hidden")
              .attr("data-content", errmsg);
            $(".username-error").closest(".row").removeClass("hidden").fadeIn();
            $(".username-error").html(errmsg);
            can_register = false;
          }
        } else {
          var errmsg = $("#login").data("error_invalid");
          $("#login")
            .removeClass("hidden")
            .closest(".form-group")
            .addClass("has-error");
          $("#login")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden")
            .attr("data-content", errmsg);
          $(".username-error").closest(".row").removeClass("hidden").fadeIn();
          $(".username-error").html(errmsg);
          can_register = false;
        }
      } else {
        var errmsg = $(".username-error").data("error_missing");
        $("#login")
          .removeClass("hidden")
          .closest(".form-group")
          .addClass("has-error");
        $("#login")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden")
          .attr("data-content", errmsg);
        $(".username-error").closest(".row").removeClass("hidden").fadeIn();
        $(".username-error").html(errmsg);
        can_register = false;
      }
    }
    var fname = $("#fname").val();
    fname = typeof fname == "undefined" || fname == null ? "" : fname.trim();
    if (fname != "") {
      var check_fname = alphanumersSpace.test(fname);
      if (!check_fname) {
        $("#fname_invalid").removeClass("hidden");
        $("#fname").closest(".form-group").addClass("has-error");
        var errmsg = $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      } else {
        $("#fname_invalid").addClass("hidden");
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#fname").closest(".form-group").removeClass("has-error");
      }
      $("#fname_missing").addClass("hidden");
      if (can_register) {
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#fname").closest(".form-group").removeClass("has-error");
      }
    } else {
      $("#fname_invalid").addClass("hidden");
      $("#fname_missing").removeClass("hidden");
      $("#fname").closest(".form-group").addClass("has-error");
      var errmsg = $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var lname = $("#lname").val();
    lname = typeof lname == "undefined" || lname == null ? "" : lname.trim();
    if (lname != "") {
      var check_lname = alphanumersSpace.test(lname);
      if (!check_lname) {
        $("#lname_invalid").removeClass("hidden");
        $("#lname").closest(".form-group").addClass("has-error");
        var errmsg = $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      } else {
        $("#lname_invalid").addClass("hidden");
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#lname").closest(".form-group").removeClass("has-error");
      }
      $("#lname_missing").addClass("hidden");
      if (can_register) {
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#lname").closest(".form-group").removeClass("has-error");
      }
    } else {
      $("#lname_invalid").addClass("hidden");
      $("#lname_missing").removeClass("hidden");
      $("#lname").closest(".form-group").addClass("has-error");
      var errmsg = $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    if ($("#address").length) {
      var address = $("#address").val();
      address =
        typeof address == "undefined" || address == null ? "" : address.trim();
      if (address != "") {
        var check_address = generic_regex.test(address);
        if (!check_address) {
          $("#address_invalid").removeClass("hidden");
          $("#address").closest(".form-group").addClass("has-error");
          var errmsg = $("#address")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#address")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#address")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#address_invalid").addClass("hidden");
          $("#address")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#address").closest(".form-group").removeClass("has-error");
        }
        $("#address_missing").addClass("hidden");
        if (can_register) {
          $("#address")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#address").closest(".form-group").removeClass("has-error");
        }
      } else {
        $("#address_invalid").addClass("hidden");
        $("#address_missing").removeClass("hidden");
        $("#address").closest(".form-group").addClass("has-error");
        var errmsg = $("#address")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#address")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#address")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#city").length) {
      var city = $("#city").val();
      city = typeof city == "undefined" || city == null ? "" : city.trim();
      if (city != "") {
        var check_city = alphanumersSpace.test(city);
        if (!check_city) {
          $("#city_invalid").removeClass("hidden");
          $("#city").closest(".form-group").addClass("has-error");
          var errmsg = $("#city")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#city")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#city")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#city_invalid").addClass("hidden");
          $("#city")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#city").closest(".form-group").removeClass("has-error");
        }
        $("#city_missing").addClass("hidden");
        if (can_register) {
          $("#city")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#city").closest(".form-group").removeClass("has-error");
        }
      } else {
        $("#city_invalid").addClass("hidden");
        $("#city_missing").removeClass("hidden");
        $("#city").closest(".form-group").addClass("has-error");
        var errmsg = $("#city")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#city")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#city")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#zip").length) {
      var zip = $("#zip").val();
      zip = typeof zip == "undefined" || zip == null ? "" : zip.trim();
      const alphanumers = XRegExp("[^p{L}p{N}p{s}]");
      if (zip != "") {
        var check_zip = alphanumers.test(zip);
        if (!check_zip) {
          $("#zip_invalid").removeClass("hidden");
          $("#zip").closest(".form-group").addClass("has-error");
          var errmsg = $("#zip")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#zip")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#zip")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#zip_invalid").addClass("hidden");
          $("#zip")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#zip").closest(".form-group").removeClass("has-error");
        }
        $("#zip_missing").addClass("hidden");
        if (can_register) {
          $("#zip")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#zip").closest(".form-group").removeClass("has-error");
        }
      } else {
        $("#zip_invalid").addClass("hidden");
        $("#zip_missing").removeClass("hidden");
        $("#zip").closest(".form-group").addClass("has-error");
        var errmsg = $("#zip")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#zip")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#zip")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#province").length) {
      var province = $("#province").val();
      province =
        typeof province == "undefined" || province == null
          ? ""
          : province.trim();
      if (province != "") {
        var check_province = alphanumersSpace.test(province);
        if (!check_province) {
          $("#province_invalid").removeClass("hidden");
          $("#province").closest(".form-group").addClass("has-error");
          var errmsg = $("#province")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#province")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#province")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#province_invalid").addClass("hidden");
          $("#province")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#province").closest(".form-group").removeClass("has-error");
        }
        $("#province_missing").addClass("hidden");
        if (can_register) {
          $("#province")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#province").closest(".form-group").removeClass("has-error");
        }
      } else {
        $("#province_invalid").addClass("hidden");
        $("#province_missing").removeClass("hidden");
        $("#province").closest(".form-group").addClass("has-error");
        var errmsg = $("#province")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#province")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#province")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#mname").length) {
      var mname = $("#mname").val();
      mname = typeof mname == "undefined" || mname == null ? "" : mname.trim();
      if (mname != "") {
        var check_mname = alphanumersSpace.test(mname);
        if (!check_mname) {
          $("#mname_invalid").removeClass("hidden");
          $("#mname").closest(".form-group").addClass("has-error");
          var errmsg = $("#mname")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#mname")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#mname")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#mname_invalid").addClass("hidden");
          $("#mname")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#mname").closest(".form-group").removeClass("has-error");
        }
      }
    }
    if ($("#building_no").length) {
      var building_no = $("#building_no").val();
      building_no =
        typeof building_no == "undefined" || building_no == null
          ? ""
          : building_no.trim();
      if (building_no != "") {
        var check_building_no = generic_regex.test(building_no);
        if (!check_building_no) {
          $("#building_no_invalid").removeClass("hidden");
          $("#building_no").closest(".form-group").addClass("has-error");
          var errmsg = $("#building_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#building_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#building_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#building_no_invalid").addClass("hidden");
          $("#building_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#building_no").closest(".form-group").removeClass("has-error");
        }
      }
    }
    if ($("#province_id").length) {
      var province_id = $("#province_id").val();
      province_id =
        typeof province_id == "undefined" || province_id == null
          ? ""
          : province_id.trim();
      if (province_id != 0) {
        $("#province_missing").addClass("hidden");
        $("#province_id").closest(".form-group").removeClass("has-error");
        $("#province_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#province_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .addClass("hidden");
      } else {
        $("#province_missing").removeClass("hidden");
        $("#province_id").closest(".form-group").addClass("has-error");
        $("#province_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        $("#province_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .removeClass("hidden");
        var errmsg = $("#province_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#province_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        can_register = false;
      }
    }
    if ($("#identification_type").length) {
      var identification_type = $("#identification_type").val();
      identification_type =
        typeof identification_type == "undefined" || identification_type == null
          ? ""
          : identification_type.trim();
      if (identification_type != "") {
        $("#identification_type_missing").addClass("hidden");
        $("#identification_type")
          .closest(".form-group")
          .removeClass("has-error");
        $("#identification_type")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
      } else {
        if ($("#identification_type").is(":visible")) {
          $("#identification_type_missing").removeClass("hidden");
          $("#identification_type")
            .closest(".form-group")
            .addClass("has-error");
          $("#identification_type")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          var errmsg = $("#identification_type")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#identification_type")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          can_register = false;
        }
      }
    }
    if ($("#passport_no:visible").length) {
      var passport_no = $("#passport_no").val();
      passport_no =
        typeof passport_no == "undefined" || passport_no == null
          ? ""
          : passport_no.trim();
      $("#idnum_exists").addClass("hidden");
      $("#passport_no_exists").addClass("hidden");
      if (passport_no != "") {
        var passport_no = alphanumerNoSpace.test(passport_no);
        if (!passport_no) {
          $("#passport_no_invalid").removeClass("hidden");
          $("#passport_no").closest(".form-group").addClass("has-error");
          var errmsg = $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          var passport_no_is_unique = signup.checkUniqueness(
            "ni",
            $("#passport_no").val()
          );
          if (passport_no_is_unique == "true") {
            $("#passport_no_invalid").addClass("hidden");
            $("#passport_no_exists").addClass("hidden");
            $("#passport_no")
              .closest(".form-group")
              .find(".pop_me_over")
              .addClass("hidden");
            $("#passport_no").closest(".form-group").removeClass("has-error");
          } else {
            $("#passport_no_exists").removeClass("hidden");
            $("#passport_no").closest(".form-group").addClass("has-error");
            var errmsg = $("#passport_no")
              .closest(".form-group")
              .find(".pop_me_over")
              .attr("data-exist");
            $("#passport_no")
              .closest(".form-group")
              .find(".pop_me_over")
              .attr("data-content", errmsg);
            $("#passport_no")
              .closest(".form-group")
              .find(".pop_me_over")
              .removeClass("hidden");
            can_register = false;
          }
        }
      } else {
        if ($("#passport_no").is(":visible")) {
          $("#passport_no_missing").removeClass("hidden");
          $("#passport_no").closest(".form-group").addClass("has-error");
          var errmsg = $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#passport_no")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
    }
    if ($("#idnum:visible").length) {
      var idnum = $("#idnum").val();
      idnum = typeof idnum == "undefined" || idnum == null ? "" : idnum.trim();
      $("#idnum_exists").addClass("hidden");
      $("#passport_no_exists").addClass("hidden");
      if (idnum != "") {
        var idnum = alphanumersNoSpace.test(idnum);
        if (!idnum) {
          $("#idnum_invalid").removeClass("hidden");
          $("#idnum").closest(".form-group").addClass("has-error");
          var errmsg = $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          var idnum_is_unique = signup.checkUniqueness(
            "identification",
            $("#idnum").val()
          );
          if (idnum_is_unique == "true") {
            $("#idnum_invalid").addClass("hidden");
            $("#idnum_exists").addClass("hidden");
            $("#idnum")
              .closest(".form-group")
              .find(".pop_me_over")
              .addClass("hidden");
            $("#idnum").closest(".form-group").removeClass("has-error");
          } else {
            $("#idnum_exists").removeClass("hidden");
            $("#idnum").closest(".form-group").addClass("has-error");
            var errmsg = $("#idnum")
              .closest(".form-group")
              .find(".pop_me_over")
              .attr("data-exist");
            $("#idnum")
              .closest(".form-group")
              .find(".pop_me_over")
              .attr("data-content", errmsg);
            $("#idnum")
              .closest(".form-group")
              .find(".pop_me_over")
              .removeClass("hidden");
            can_register = false;
          }
        }
      } else {
        if ($("#idnum").is(":visible")) {
          $("#idnum_missing").removeClass("hidden");
          $("#idnum").closest(".form-group").addClass("has-error");
          var errmsg = $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#idnum")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
    }
    if ($("#bank_name").length) {
      var bank_name = $("#bank_name").val();
      bank_name =
        typeof bank_name == "undefined" || bank_name == null
          ? ""
          : bank_name.trim();
      if (bank_name != "") {
        $("#bank_name_missing").addClass("hidden");
        $("#bank_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#bank_name").closest(".form-group").removeClass("has-error");
      } else {
        $("#bank_name_missing").removeClass("hidden");
        $("#bank_name").closest(".form-group").addClass("has-error");
        var errmsg = $("#bank_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#bank_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#bank_name")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#bank_account").length) {
      var bank_account = $("#bank_account").val();
      bank_account =
        typeof bank_account == "undefined" || bank_account == null
          ? ""
          : bank_account.trim();
      if (bank_account != "") {
        $("#bank_account_missing").addClass("hidden");
        $("#bank_account")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#bank_account").closest(".form-group").removeClass("has-error");
      } else {
        if ($("#bank_account").is(":visible")) {
          $("#bank_account_missing").removeClass("hidden");
          $("#bank_account").closest(".form-group").addClass("has-error");
          var errmsg = $("#bank_account")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#bank_account")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#bank_account")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
    }
    var userEmail = $("#userEmail").val();
    userEmail =
      typeof userEmail == "undefined" || userEmail == null
        ? ""
        : userEmail.trim();
    if (userEmail != "") {
      var valid_email = signup.checkEmail();
      if (valid_email == "success") {
        $("#email_missing").addClass("hidden");
        $("#email_exists").addClass("hidden");
        if (can_register) {
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#userEmail").closest(".form-group").removeClass("has-error");
        }
        var testEmail = /\S+@\S+\.\S+/;
        if (testEmail.test(userEmail)) {
          $("#invalid_email").addClass("hidden");
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#userEmail").closest(".form-group").removeClass("has-error");
        } else {
          $("#invalid_email").removeClass("hidden");
          $("#userEmail").closest(".form-group").addClass("has-error");
          var errmsg = $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      } else {
        $("#email_exists").removeClass("hidden");
        $("#userEmail").closest(".form-group").addClass("has-error");
        var errmsg = $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-exist");
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    } else {
      $("#email_missing").removeClass("hidden");
      $("#userEmail").closest(".form-group").addClass("has-error");
      var errmsg = $("#userEmail")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#userEmail")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#userEmail")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var userPassword = $("#userPassword").val();
    can_register &= signup.checkPassword();
    var tel_pc = $("#tel_provider_code").val();
    tel_pc =
      typeof tel_pc == "undefined" || tel_pc == null ? "" : tel_pc.trim();
    if (tel_pc != "") {
      var reg = /^\d+$/;
      if (!reg.test(tel_pc)) {
        $("#tel_invalid").removeClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .addClass("has-error");
        var errmsg = $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      } else {
        $("#tel_invalid").addClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .removeClass("has-error");
      }
    } else {
      if (!$(".tel_provider_code").hasClass("hidden")) {
        $("#tel_missing").removeClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .addClass("has-error");
        var errmsg = $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      } else {
        $("#tel_missing").addClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#tel_provider_code")
          .closest(".tel_provider_code")
          .removeClass("has-error");
      }
    }
    var tel = $("#tel").val();
    tel = typeof tel == "undefined" || tel == null ? "" : tel.trim();
    if (tel != "" && tel.length > 3) {
      var reg = /^\d+$/;
      if (!reg.test(tel)) {
        $("#tel_invalid").removeClass("hidden");
        $("#tel").closest(".tel_number").addClass("has-error");
        var errmsg = $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      } else {
        $("#tel_invalid").addClass("hidden");
        $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#tel").closest(".tel_number").removeClass("has-error");
      }
    } else {
      $("#tel_missing").removeClass("hidden");
      $("#tel").closest(".tel_number").addClass("has-error");
      var errmsg = $("#tel")
        .closest(".tel_number")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#tel")
        .closest(".tel_number")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#tel")
        .closest(".tel_number")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var cou_id = $("#cou_id").val();
    cou_id =
      typeof cou_id == "undefined" || cou_id == null ? "" : cou_id.trim();
    if (cou_id != "") {
      $("#country_missing").addClass("hidden");
      $("#cou_id").closest(".form-group").removeClass("has-error");
      $("#cou_id")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#cou_id")
        .closest(".form-group")
        .find(".dropdown-custom")
        .addClass("hidden");
    } else {
      $("#country_missing").removeClass("hidden");
      $("#cou_id").closest(".form-group").addClass("has-error");
      $("#cou_id")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      $("#cou_id")
        .closest(".form-group")
        .find(".dropdown-custom")
        .removeClass("hidden");
      var errmsg = $("#cou_id")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#cou_id")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      can_register = false;
    }
    if ($("#bank_name_drop").length) {
      var bank_name_drop = $("#bank_name_drop").val();
      bank_name_drop =
        typeof bank_name_drop == "undefined" || bank_name_drop == null
          ? ""
          : bank_name_drop.trim();
      if (bank_name_drop != "") {
        $("#bank_name_missing").addClass("hidden");
        $("#bank_name_drop").closest(".form-group").removeClass("has-error");
        $("#bank_name_drop")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
      } else {
        $("#bank_name_missing").removeClass("hidden");
        $("#bank_name_drop").closest(".form-group").addClass("has-error");
        $("#bank_name_drop")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        var errmsg = $("#bank_name_drop")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#bank_name_drop")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        can_register = false;
      }
    }
    var currency = $("#currency").val();
    currency =
      typeof currency == "undefined" || currency == null ? "" : currency.trim();
    if (currency != "") {
      $("#currency_missing").addClass("hidden");
      $("#currency")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#currency")
        .closest(".form-group")
        .find(".dropdown-custom")
        .addClass("hidden");
      $("#currency").closest(".form-group").removeClass("has-error");
    } else {
      $("#currency_missing").removeClass("hidden");
      $("#currency").closest(".form-group").addClass("has-error");
      var errmsg = $("#currency")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#currency")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#currency")
        .closest(".form-group")
        .find(".dropdown-custom")
        .removeClass("hidden");
      $("#currency")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var over_18 = $("#over_18").length ? $("#over_18").prop("checked") : true;
    if (over_18) {
      $("#over_18_missing").addClass("hidden");
      $("#over_18")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#over_18").closest(".form-group").removeClass("has-error");
    } else {
      $("#over_18_missing").removeClass("hidden");
      $("#over_18").closest(".form-group").addClass("has-error");
      var errmsg = $("#over_18")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#over_18")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var non_us_citizen = $("#non_us_citizen").length
      ? $("#non_us_citizen").prop("checked")
      : true;
    if (non_us_citizen) {
      $("#non_us_citizen_missing").addClass("hidden");
      $("#non_us_citizen")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#non_us_citizen").closest(".form-group").removeClass("has-error");
    } else {
      $("#non_us_citizen_missing").removeClass("hidden");
      $("#non_us_citizen").closest(".form-group").addClass("has-error");
      var errmsg = $("#non_us_citizen")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#non_us_citizen")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var confirm_documents = $("#confirm_documents").length
      ? $("#confirm_documents").prop("checked")
      : true;
    if (confirm_documents) {
      $("#confirm_documents_missing").addClass("hidden");
      $("#confirm_documents")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#confirm_documents").closest(".form-group").removeClass("has-error");
    } else {
      $("#confirm_documents_missing").removeClass("hidden");
      $("#confirm_documents").closest(".form-group").addClass("has-error");
      var errmsg = $("#confirm_documents")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#confirm_documents")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var confirm_risk = $("#confirm_risk").length
      ? $("#confirm_risk").prop("checked")
      : true;
    if (confirm_risk) {
      $("#confirm_risk_missing").addClass("hidden");
      $("#confirm_risk")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#confirm_risk").closest(".form-group").removeClass("has-error");
    } else {
      $("#confirm_risk_missing").removeClass("hidden");
      $("#confirm_risk").closest(".form-group").addClass("has-error");
      var errmsg = $("#confirm_risk")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#confirm_risk")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var client_agreement = $("#confirm_client_agreement").length
      ? $("#confirm_client_agreement").prop("checked")
      : true;
    if (client_agreement) {
      $("#confirm_client_agreement_missing").addClass("hidden");
      $("#confirm_client_agreement")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#confirm_client_agreement")
        .closest(".form-group")
        .removeClass("has-error");
    } else {
      $("#confirm_client_agreement_missing").removeClass("hidden");
      $("#confirm_client_agreement")
        .closest(".form-group")
        .addClass("has-error");
      var errmsg = $("#confirm_client_agreement")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#confirm_client_agreement")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var gdpr_agreement = $("#signup_gdpr").length
      ? $("#signup_gdpr").prop("checked")
      : true;
    if (gdpr_agreement) {
      $("#signup_gdpr_missing").addClass("hidden");
      $("#signup_gdpr")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#signup_gdpr").closest(".form-group").removeClass("has-error");
    } else {
      $("#signup_gdpr_missing").removeClass("hidden");
      $("#signup_gdpr").closest(".form-group").addClass("has-error");
      var errmsg = $("#signup_gdpr")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#signup_gdpr")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var tel_country_code_state = $("input#tel_country_code").prop("readonly");
    if (tel_country_code_state == false) {
      var country_code_re = /^[+]{0,1}[0-9]*$/;
      if (
        country_code_re.test($("input#tel_country_code").val()) &&
        $("input#tel_country_code").val().length >= 1
      ) {
        $("#tel_country_code_invalid").addClass("hidden");
        $("#tel_country_code")
          .closest(".tel_country_code")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#tel_country_code")
          .closest(".tel_country_code")
          .removeClass("has-error");
      } else {
        $("#tel_country_code_invalid").removeClass("hidden");
        $("#tel_country_code")
          .closest(".tel_country_code")
          .addClass("has-error");
        var errmsg = $("#tel_country_code")
          .closest(".tel_country_code")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#tel_country_code")
          .closest(".tel_country_code")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#tel_country_code")
          .closest(".tel_country_code")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if ($("#at_id_real").length) {
      var at_id_real = $("#at_id_real").val();
      at_id_real =
        typeof at_id_real == "undefined" ||
        at_id_real == null ||
        at_id_real == ""
          ? 0
          : at_id_real;
      if (can_register && parseInt(at_id_real) !== 0) {
        var tp_currency_real = $("#tp_currency_real").val();
        tp_currency_real =
          typeof tp_currency_real == "undefined" ||
          tp_currency_real == null ||
          tp_currency_real == ""
            ? 0
            : tp_currency_real;
        if (parseInt(tp_currency_real) == 0) {
          $("#currency_missing_real").removeClass("hidden");
          can_register = false;
        }
      }
      if (can_register && parseInt(at_id_real) !== 0) {
        var as_id_real = $("#as_id_real").val();
        as_id_real =
          typeof as_id_real == "undefined" ||
          as_id_real == null ||
          as_id_real == ""
            ? 0
            : as_id_real;
        if (parseInt(as_id_real) == 0) {
          $("#account_type_missing_real").removeClass("hidden");
          can_register = false;
        }
      }
      if (can_register && parseInt(at_id_real) !== 0) {
        var leverage_real = $("#leverage_real").val();
        leverage_real =
          typeof leverage_real == "undefined" ||
          leverage_real == null ||
          leverage_real == ""
            ? 0
            : leverage_real;
        if (parseInt(leverage_real) == 0) {
          $("#select_leverage_error_real").removeClass("hidden");
          can_register = false;
        }
      }
    }
    if ($("#at_id_demo").length) {
      var at_id_demo = $("#at_id_demo").val();
      at_id_demo =
        typeof at_id_demo == "undefined" ||
        at_id_demo == null ||
        at_id_demo == ""
          ? 0
          : at_id_demo;
      if (can_register && parseInt(at_id_demo) !== 0) {
        var tp_currency_demo = $("#tp_currency_demo").val();
        tp_currency_demo =
          typeof tp_currency_demo == "undefined" ||
          tp_currency_demo == null ||
          tp_currency_demo == ""
            ? 0
            : tp_currency_demo;
        if (parseInt(tp_currency_demo) == 0) {
          $("#currency_missing_demo").removeClass("hidden");
          can_register = false;
        }
      }
      if (can_register && parseInt(at_id_demo) !== 0) {
        var as_id_demo = $("#as_id_demo").val();
        as_id_demo =
          typeof as_id_demo == "undefined" ||
          as_id_demo == null ||
          as_id_demo == ""
            ? 0
            : as_id_demo;
        if (parseInt(as_id_demo) == 0) {
          $("#account_type_missing_demo").removeClass("hidden");
          can_register = false;
        }
      }
      if (can_register && parseInt(at_id_demo) !== 0) {
        var leverage_demo = $("#leverage_demo").val();
        leverage_demo =
          typeof leverage_demo == "undefined" ||
          leverage_demo == null ||
          leverage_demo == ""
            ? 0
            : leverage_demo;
        if (parseInt(leverage_demo) == 0) {
          $("#select_leverage_error_demo").removeClass("hidden");
          can_register = false;
        }
      }
      if (can_register && parseInt(at_id_demo) !== 0) {
        var initial_deposit_demo = $("#initial_deposit_demo").val();
        initial_deposit_demo =
          typeof initial_deposit_demo == "undefined" ||
          initial_deposit_demo == null ||
          initial_deposit_demo == ""
            ? 0
            : initial_deposit_demo;
        if (parseInt(initial_deposit_demo) == 0) {
          $("#initial_deposit_missing_demo").removeClass("hidden");
          can_register = false;
        }
      }
    }
    if ($("#service_id").length) {
      var service_id = $("#service_id").val();
      service_id =
        typeof service_id == "undefined" ||
        service_id == null ||
        service_id == ""
          ? 0
          : service_id;
      if (service_id != 0) {
        $("#service_missing").addClass("hidden");
        $("#service_id").closest(".form-group").removeClass("has-error");
        $("#service_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#service_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .addClass("hidden");
      } else {
        $("#service_missing").removeClass("hidden");
        $("#service_id").closest(".form-group").addClass("has-error");
        $("#service_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        $("#service_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .removeClass("hidden");
        var errmsg = $("#service_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#service_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        can_register = false;
      }
    }
    return can_register;
  },
  completeRegistration: function (action, customRegex, captcha_secret_key) {
    var can_register = false;
    can_register = signup.checkRegistrationForm(customRegex);
    captcha_secret_key =
      typeof captcha_secret_key == "undefined" || captcha_secret_key == null
        ? ""
        : captcha_secret_key.trim();
    if (can_register) {
      if (captcha_secret_key == "") {
        can_register = true;
      } else {
        var captcha_val = $("#g-recaptcha-response").val();
        if (captcha_val == "") {
          can_register = false;
          $("#no_robot_missing").removeClass("hidden");
        } else {
          can_register = signup.checkValidCaptcha(
            captcha_val,
            captcha_secret_key
          );
          if (can_register) {
            $("#no_robot_missing").addClass("hidden");
          } else {
            $("#no_robot_missing").removeClass("hidden");
          }
        }
      }
    }
    if (can_register) {
      $("#register_new").button("loading");
      var account =
        !$("#individual").prop("checked") && !$("#company").prop("checked")
          ? 0
          : 1;
      var company = $("#company_name").val();
      company =
        typeof company == "undefined" || company == null ? "" : company.trim();
      var login = $("#login").val();
      login = typeof login == "undefined" || login == null ? "" : login.trim();
      var fname = $("#fname").val();
      fname = typeof fname == "undefined" || fname == null ? "" : fname.trim();
      var lname = $("#lname").val();
      lname = typeof lname == "undefined" || lname == null ? "" : lname.trim();
      var mname = $("#mname").val();
      mname = typeof mname == "undefined" || mname == null ? "" : mname.trim();
      var address = $("#address").val();
      address =
        typeof address == "undefined" || address == null ? "" : address.trim();
      var building_no = $("#building_no").val();
      building_no =
        typeof building_no == "undefined" || building_no == null
          ? ""
          : building_no.trim();
      var city = $("#city").val();
      city = typeof city == "undefined" || city == null ? "" : city.trim();
      var zip = $("#zip").val();
      zip = typeof zip == "undefined" || zip == null ? "" : zip.trim();
      var province = $("#province").val();
      province =
        typeof province == "undefined" || province == null
          ? ""
          : province.trim();
      var province_id = $("#province_id").val();
      province_id =
        typeof province_id == "undefined" || province_id == null
          ? ""
          : province_id.trim();
      var passport_no = $("#passport_no").val();
      passport_no =
        typeof passport_no == "undefined" || passport_no == null
          ? ""
          : passport_no.trim();
      var idnum = $("#idnum").val();
      idnum = typeof idnum == "undefined" || idnum == null ? "" : idnum.trim();
      var bank_name = $("#bank_name").val();
      bank_name =
        typeof bank_name == "undefined" || bank_name == null
          ? ""
          : bank_name.trim();
      var bank_account = $("#bank_account").val();
      bank_account =
        typeof bank_account == "undefined" || bank_account == null
          ? ""
          : bank_account.trim();
      var userEmail = $("#userEmail").val();
      userEmail =
        typeof userEmail == "undefined" || userEmail == null
          ? ""
          : userEmail.trim();
      var userPassword = $("#userPassword").val();
      userPassword =
        typeof userPassword == "undefined" || userPassword == null
          ? ""
          : userPassword.trim();
      var tel = $("#tel").val();
      tel = typeof tel == "undefined" || tel == null ? "" : tel.trim();
      var cou_id = $("#cou_id").val();
      cou_id =
        typeof cou_id == "undefined" || cou_id == null ? "" : cou_id.trim();
      var currency = $("#currency").val();
      currency =
        typeof currency == "undefined" || currency == null
          ? ""
          : currency.trim();
      var tel_pc = $("#tel_provider_code").val();
      tel_pc =
        typeof tel_pc == "undefined" || tel_pc == null ? "" : tel_pc.trim();
      var telcode = $("#tel_country_code").val();
      telcode =
        typeof telcode == "undefined" || telcode == null ? "" : telcode.trim();
      var google_id = $("#google_id").val();
      google_id =
        typeof google_id == "undefined" || google_id == null
          ? ""
          : google_id.trim();
      var facebook_id = $("#facebook_id").val();
      facebook_id =
        typeof facebook_id == "undefined" || facebook_id == null
          ? ""
          : facebook_id.trim();
      var valid_password = $("#valid_password").val().trim();
      var ib_id = $("#ib_id").val().trim();
      var sidi = $("#sidi").val().trim();
      var sidc = $("#sidc").val().trim();
      var slink_id =
        typeof $("#slink_id").val() === "undefined"
          ? 0
          : $("#slink_id").val().trim();
      var su_id = $("#su_id").val().trim();
      var is_ib = $("#is_ib").val().trim();
      var targetval = $("#targetval").val().trim();
      var langReg = $("#langReg").val().trim();
      var create_company = $("#company").prop("checked") ? 1 : 0;
      var lead_method = $("#leadmethd").val();
      var autoresponder =
        typeof $("#autoresponder").val() === "undefined"
          ? "PROFILECREATED"
          : $("#autoresponder").val();
      var autoresponder =
        autoresponder == "" ? "PROFILECREATED" : autoresponder;
      var tc_confirmed = $("#confirm_documents").length
        ? $("#confirm_documents").prop("checked")
          ? 1
          : 0
        : 1;
      var best_interest = $("#confirm_risk").length
        ? $("#confirm_risk").prop("checked")
          ? 1
          : 0
        : 1;
      var client_agreement = $("#confirm_client_agreement").length
        ? $("#confirm_client_agreement").prop("checked")
          ? 1
          : 0
        : 1;
      var agreement_id_list = $("#agreement_id_list").length
        ? $("#agreement_id_list").val()
        : "";
      var label = $("#label").val();
      var brd = $("#brd").val();
      brd = typeof brd == "undefined" || brd == null ? "" : brd.trim();
      var give_bonus = $("#give_bonus").length
        ? $("#give_bonus").prop("checked")
          ? 1
          : 0
        : 0;
      var as_id_real = $("#as_id_real").val();
      as_id_real =
        typeof as_id_real == "undefined" ||
        as_id_real == null ||
        as_id_real == ""
          ? 0
          : as_id_real;
      var leverage_real = $("#leverage_real").val();
      leverage_real =
        typeof leverage_real == "undefined" ||
        leverage_real == null ||
        leverage_real == ""
          ? 0
          : leverage_real;
      var as_id_demo = $("#as_id_demo").val();
      as_id_demo =
        typeof as_id_demo == "undefined" ||
        as_id_demo == null ||
        as_id_demo == ""
          ? 0
          : as_id_demo;
      var leverage_demo = $("#leverage_demo").val();
      leverage_demo =
        typeof leverage_demo == "undefined" ||
        leverage_demo == null ||
        leverage_demo == ""
          ? 0
          : leverage_demo;
      var initial_deposit_demo = $("#initial_deposit_demo").val();
      initial_deposit_demo =
        typeof initial_deposit_demo == "undefined" ||
        initial_deposit_demo == null ||
        initial_deposit_demo == ""
          ? 0
          : initial_deposit_demo;
      if ($("#yes_email").val()) {
        var no_email = $("#yes_email").prop("checked") ? 0 : 1;
      } else {
        if ($("#no_email").val()) {
          $("#no_email").prop("checked") ? 1 : 0;
        } else {
          var no_email = 0;
        }
      }
      var cstt_id = $("#cstt_id").length ? $("#cstt_id").val() : 0;
      var service_id = $("#service_id").val();
      service_id =
        typeof service_id == "undefined" || service_id == null ? 0 : service_id;
      var c_utm_log_id = $("#c_utm_log_id").val();
      c_utm_log_id =
        typeof c_utm_log_id == "undefined" || c_utm_log_id == null
          ? 0
          : c_utm_log_id;
      var referral_key = $("#referral_key").val();
      referral_key = typeof referral_key == "undefined" ? "" : referral_key;
      var tel1_verify = $("#tel1_verify").attr("data-tel1_verify");
      tel1_verify = typeof tel1_verify !== "undefined" ? tel1_verify : 0;
      var click_id = $("#click_id").val();
      click_id = typeof click_id == "undefined" ? "" : click_id;
      $.ajax({
        url: "/cfc/signup.cfc?method=completeReagistration",
        type: "POST",
        data: {
          account: account,
          create_company: create_company,
          company: company,
          fname: fname,
          lname: lname,
          mname: mname,
          email: userEmail,
          password: userPassword,
          tel: tel,
          tel_pc: tel_pc,
          telcode: telcode,
          cou_id: cou_id,
          currency: currency,
          ib_id: ib_id,
          sidi: sidi,
          sidc: sidc,
          slink_id: slink_id,
          is_ib: is_ib,
          su_id: su_id,
          emailInstantNotification: autoresponder,
          targetval: targetval,
          lead_method: lead_method,
          langReg: langReg,
          tc_confirmed: tc_confirmed,
          best_interest: best_interest,
          client_agreement: client_agreement,
          no_email: no_email,
          label: label,
          passport_no: passport_no,
          idnum: idnum,
          bank_name: bank_name,
          bank_account: bank_account,
          as_id_real: as_id_real,
          leverage_real: leverage_real,
          as_id_demo: as_id_demo,
          leverage_demo: leverage_demo,
          initial_deposit_demo: initial_deposit_demo,
          brd: brd,
          service_id: service_id,
          login: login,
          give_bonus: give_bonus,
          cstt_id: cstt_id,
          address: address,
          building_no: building_no,
          city: city,
          zip: zip,
          province: province,
          province_id: province_id,
          c_utm_log_id: c_utm_log_id,
          agreement_id_list: agreement_id_list,
          referral_key: referral_key,
          tel1_verify: tel1_verify,
          google_id: google_id,
          facebook_id: facebook_id,
          click_id: click_id,
        },
      })
        .done(function (data) {
          if (data == "-1") {
            $("#email_exists").removeClass("hidden");
            valid_email = false;
          } else {
            $("#email_exists").addClass("hidden");
            valid_email = true;
            $("#registerForm").attr("action", action);
            $("#registerForm").attr("target", targetval);
            $("#registerForm").submit();
            var agreement_id_arr = [];
            var signatured_id_arr = [];
            var i = 0;
            var customer_no =
              typeof data == "string" ? "CU" + parseInt(data) : "";
            $("input.agreement[type=checkbox],input.digital-agreement").each(
              function () {
                if ($(this).prop("checked")) {
                  var agreement_id = $(this).data("agreement_id");
                  agreement_id_arr[i] = agreement_id;
                  if ($(this).hasClass("digital-agreement")) {
                    signatured_id_arr.push(agreement_id);
                  }
                  i++;
                }
              }
            );
            $.ajax({
              url: "/cfc/controller.cfc?method=setCustomerAgreements",
              type: "POST",
              data: {
                agreement_id_list: agreement_id_arr.toString(),
                signatured_id_list: signatured_id_arr.toString(),
                customer_no: customer_no,
              },
            })
              .done(function (result) {})
              .fail(function () {});
            if (signatured_id_arr.length > 0) {
              signup.updateCustomerSignature(userEmail, customer_no);
            }
          }
        })
        .fail(function () {
          valid_email = false;
        })
        .always(function () {});
    }
  },
  setCustomerAgreements: function (customer_no) {
    var agreement_id_arr = [];
    var signatured_id_arr = [];
    var i = 0;
    $("input.agreement[type=checkbox],input.digital-agreement").each(
      function () {
        if ($(this).prop("checked")) {
          var agreement_id = $(this).data("agreement_id");
          agreement_id_arr[i] = agreement_id;
          if ($(this).hasClass("digital-agreement")) {
            signatured_id_arr.push(agreement_id);
          }
          i++;
        }
      }
    );
    $.ajax({
      url: "/cfc/controller.cfc?method=setCustomerAgreements",
      type: "POST",
      data: {
        agreement_id_list: agreement_id_arr.toString(),
        signatured_id_list: signatured_id_arr.toString(),
        customer_no: customer_no,
      },
    })
      .done(function (result) {})
      .fail(function () {});
    if (signatured_id_arr.length > 0) {
      signup.updateCustomerSignature(userEmail, customer_no);
    }
  },
  checkValidCaptcha: function (captcha_val, captcha_secret_key) {
    var captcha_valid = false;
    $.ajax({
      url: "/cfc/controller.cfc?method=checkValidCaptcha",
      type: "POST",
      async: false,
      data: {
        captcha_val: captcha_val,
        captcha_secret_key: captcha_secret_key,
      },
      success: function (data) {
        captcha_valid = data;
      },
    });
    return captcha_valid;
  },
  checkFastRegistrationForm: function (skipdetails) {
    var skipdetail = typeof skipdetails !== "undefined" ? skipdetails : 0;
    var can_register = true;
    var fname = $("#fname").val();
    fname = typeof fname == "undefined" || fname == null ? "" : fname.trim();
    const alphanumers = XRegExp("[^p{L}p{N}p{s}]");
    if (fname != "") {
      var check_fname = alphanumers.test(fname);
      if (!check_fname) {
        can_register = false;
        $("#fname_invalid").removeClass("hidden");
        $("#fname").closest(".form-group").addClass("has-error");
        var errmsg = $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
      } else {
        $("#fname_invalid").addClass("hidden");
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#fname").closest(".form-group").removeClass("has-error");
      }
      $("#fname_missing").addClass("hidden");
      if (can_register) {
        $("#fname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#fname").closest(".form-group").removeClass("has-error");
      }
    } else {
      $("#fname_invalid").addClass("hidden");
      $("#fname_missing").removeClass("hidden");
      $("#fname").closest(".form-group").addClass("has-error");
      var errmsg = $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#fname")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var lname = $("#lname").val();
    lname = typeof lname == "undefined" || lname == null ? "" : lname.trim();
    if (lname != "") {
      var check_lname = alphanumers.test(lname);
      if (!check_lname) {
        can_register = false;
        $("#lname_invalid").removeClass("hidden");
        $("#lname").closest(".form-group").addClass("has-error");
        var errmsg = $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-valid");
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
      } else {
        $("#lname_invalid").addClass("hidden");
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#lname").closest(".form-group").removeClass("has-error");
      }
      $("#lname_missing").addClass("hidden");
      if (can_register) {
        $("#lname")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#lname").closest(".form-group").removeClass("has-error");
      }
    } else {
      $("#lname_invalid").addClass("hidden");
      $("#lname_missing").removeClass("hidden");
      $("#lname").closest(".form-group").addClass("has-error");
      var errmsg = $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#lname")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register = false;
    }
    var userEmail = $("#userEmail").val();
    userEmail =
      typeof userEmail == "undefined" || userEmail == null
        ? ""
        : userEmail.trim();
    if ($("#bind_on_existing_profile").length) {
      if ($("#bind_on_existing_profile").val().trim() == 1) {
        var skipEmailTest = true;
      } else {
        var skipEmailTest = false;
      }
    } else {
      var skipEmailTest = false;
    }
    if (userEmail != "" && skipEmailTest == false) {
      var valid_email = signup.checkEmail();
      if (valid_email == "success") {
        $("#email_missing").addClass("hidden");
        $("#email_exists").addClass("hidden");
        if (can_register) {
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#userEmail").closest(".form-group").removeClass("has-error");
        }
        var testEmail = /\S+@\S+\.\S+/;
        if (testEmail.test(userEmail)) {
          $("#invalid_email").addClass("hidden");
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#userEmail").closest(".form-group").removeClass("has-error");
        } else {
          can_register = false;
          $("#invalid_email").removeClass("hidden");
          $("#userEmail").closest(".form-group").addClass("has-error");
          var errmsg = $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#userEmail")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
        }
      } else {
        $("#email_exists").removeClass("hidden");
        $("#userEmail").closest(".form-group").addClass("has-error");
        var errmsg = $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-exist");
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    } else {
      if (skipEmailTest == false) {
        $("#email_missing").removeClass("hidden");
        $("#userEmail").closest(".form-group").addClass("has-error");
        var errmsg = $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#userEmail")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
    }
    if (skipdetail == 0) {
      var tel_pc = $("#tel_provider_code").val();
      tel_pc =
        typeof tel_pc == "undefined" || tel_pc == null ? "" : tel_pc.trim();
      if (tel_pc != "") {
        var reg = /^\d+$/;
        if (!reg.test(tel_pc)) {
          $("#tel_invalid").removeClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .addClass("has-error");
          var errmsg = $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#tel_invalid").addClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .removeClass("has-error");
        }
      } else {
        if (!$(".tel_provider_code").hasClass("hidden")) {
          $("#tel_missing").removeClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .addClass("has-error");
          var errmsg = $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#tel_missing").addClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#tel_provider_code")
            .closest(".tel_provider_code")
            .removeClass("has-error");
        }
      }
      var tel = $("#tel").val();
      tel = typeof tel == "undefined" || tel == null ? "" : tel.trim();
      if (tel != "") {
        var reg = /^\d+$/;
        if (!reg.test(tel)) {
          $("#tel_invalid").removeClass("hidden");
          $("#tel").closest(".tel_number").addClass("has-error");
          var errmsg = $("#tel")
            .closest(".tel_number")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#tel")
            .closest(".tel_number")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#tel")
            .closest(".tel_number")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        } else {
          $("#tel_invalid").addClass("hidden");
          $("#tel")
            .closest(".tel_number")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#tel").closest(".tel_number").removeClass("has-error");
        }
      } else {
        $("#tel_missing").removeClass("hidden");
        $("#tel").closest(".tel_number").addClass("has-error");
        var errmsg = $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#tel")
          .closest(".tel_number")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var cou_id = $("#cou_id").val().trim();
      if (cou_id != "") {
        $("#country_missing").addClass("hidden");
        $("#cou_id").closest(".form-group").removeClass("has-error");
        $("#cou_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#cou_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .addClass("hidden");
      } else {
        $("#cou_id").closest(".form-group").addClass("has-error");
        $("#cou_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        $("#cou_id")
          .closest(".form-group")
          .find(".dropdown-custom")
          .removeClass("hidden");
        var errmsg = $("#cou_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#cou_id")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        can_register = false;
      }
      var currency = $("#currency").val();
      currency =
        typeof currency == "undefined" || currency == null
          ? ""
          : currency.trim();
      if (currency != "") {
        $("#currency_missing").addClass("hidden");
        $("#currency")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#currency")
          .closest(".form-group")
          .find(".dropdown-custom")
          .addClass("hidden");
        $("#currency").closest(".form-group").removeClass("has-error");
      } else {
        $("#currency_missing").removeClass("hidden");
        $("#currency").closest(".form-group").addClass("has-error");
        var errmsg = $("#currency")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#currency")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#currency")
          .closest(".form-group")
          .find(".dropdown-custom")
          .removeClass("hidden");
        $("#currency")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      if ($("#confirm_risk").length && $("#confirm_risk").is(":visible")) {
        var confirm_risk = $("#confirm_risk").prop("checked");
        if (confirm_risk) {
          $("#confirm_risk_missing").addClass("hidden");
          $("#confirm_risk")
            .closest(".form-group")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#confirm_risk").closest(".form-group").removeClass("has-error");
        } else {
          $("#confirm_risk_missing").removeClass("hidden");
          $("#confirm_risk").closest(".form-group").addClass("has-error");
          var errmsg = $("#confirm_risk")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-missing");
          $("#confirm_risk")
            .closest(".form-group")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#confirm_risk")
            .closest(".form-group")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
      var tel_country_code_state = $("input#tel_country_code").prop("readonly");
      if (tel_country_code_state == false) {
        var country_code_re = /^[+]{0,1}[0-9]*$/;
        if (country_code_re.test($("input#tel_country_code").val())) {
          $("#tel_country_code_invalid").addClass("hidden");
          $("#tel_country_code")
            .closest(".tel_country_code")
            .find(".pop_me_over")
            .addClass("hidden");
          $("#tel_country_code")
            .closest(".tel_country_code")
            .removeClass("has-error");
        } else {
          $("#tel_country_code_invalid").removeClass("hidden");
          $("#tel_country_code")
            .closest(".tel_country_code")
            .addClass("has-error");
          var errmsg = $("#tel_country_code")
            .closest(".tel_country_code")
            .find(".pop_me_over")
            .attr("data-valid");
          $("#tel_country_code")
            .closest(".tel_country_code")
            .find(".pop_me_over")
            .attr("data-content", errmsg);
          $("#tel_country_code")
            .closest(".tel_country_code")
            .find(".pop_me_over")
            .removeClass("hidden");
          can_register = false;
        }
      }
      if ($("#at_id_demo").length) {
        var at_id_demo = $("#at_id_demo").val();
        at_id_demo =
          typeof at_id_demo == "undefined" ||
          at_id_demo == null ||
          at_id_demo == ""
            ? 0
            : at_id_demo;
        if (parseInt(at_id_demo) == 0) {
          $("#at_id_demo").parent(".form-group").addClass("has-error");
          can_register = false;
        } else {
          $("#at_id_demo").parent(".form-group").removeClass("has-error");
        }
      }
      if ($("#tp_currency_demo").length) {
        var tp_currency_demo = $("#tp_currency_demo").val();
        tp_currency_demo =
          typeof tp_currency_demo == "undefined" ||
          tp_currency_demo == null ||
          tp_currency_demo == ""
            ? 0
            : tp_currency_demo;
        if (parseInt(tp_currency_demo) == 0) {
          $("#tp_currency_demo").parent(".form-group").addClass("has-error");
          can_register = false;
        } else {
          $("#tp_currency_demo").parent(".form-group").removeClass("has-error");
        }
      }
      if ($("#as_id_demo").length) {
        var as_id_demo = $("#as_id_demo").val();
        as_id_demo =
          typeof as_id_demo == "undefined" ||
          as_id_demo == null ||
          as_id_demo == ""
            ? 0
            : as_id_demo;
        if (parseInt(as_id_demo) == 0) {
          $("#as_id_demo").parent(".form-group").addClass("has-error");
          can_register = false;
        } else {
          $("#as_id_demo").parent(".form-group").removeClass("has-error");
        }
      }
      if ($("#leverage_demo").length) {
        var leverage_demo = $("#leverage_demo").val();
        leverage_demo =
          typeof leverage_demo == "undefined" ||
          leverage_demo == null ||
          leverage_demo == ""
            ? 0
            : leverage_demo;
        if (parseInt(leverage_demo) == 0) {
          $("#leverage_demo").parent(".form-group").addClass("has-error");
          can_register = false;
        } else {
          $("#leverage_demo").parent(".form-group").removeClass("has-error");
        }
      }
      if ($("#initial_deposit_demo").length) {
        var initial_deposit_demo = $("#initial_deposit_demo").val();
        initial_deposit_demo =
          typeof initial_deposit_demo == "undefined" ||
          initial_deposit_demo == null ||
          initial_deposit_demo == ""
            ? 0
            : initial_deposit_demo;
        if (parseInt(initial_deposit_demo) == 0) {
          $("#initial_deposit_demo")
            .parent(".form-group")
            .addClass("has-error");
          can_register = false;
        } else {
          $("#initial_deposit_demo")
            .parent(".form-group")
            .removeClass("has-error");
        }
      }
      var over_18 = $("#over_18").length ? $("#over_18").prop("checked") : true;
      if (over_18) {
        $("#over_18_missing").addClass("hidden");
        $("#over_18")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#over_18").closest(".form-group").removeClass("has-error");
      } else {
        $("#over_18_missing").removeClass("hidden");
        $("#over_18").closest(".form-group").addClass("has-error");
        var errmsg = $("#over_18")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#over_18")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var non_us_citizen = $("#non_us_citizen").length
        ? $("#non_us_citizen").prop("checked")
        : true;
      if (non_us_citizen) {
        $("#non_us_citizen_missing").addClass("hidden");
        $("#non_us_citizen")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#non_us_citizen").closest(".form-group").removeClass("has-error");
      } else {
        $("#non_us_citizen_missing").removeClass("hidden");
        $("#non_us_citizen").closest(".form-group").addClass("has-error");
        var errmsg = $("#non_us_citizen")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#non_us_citizen")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var confirm_documents = $("#confirm_documents").length
        ? $("#confirm_documents").prop("checked")
        : true;
      if (confirm_documents) {
        $("#confirm_documents_missing").addClass("hidden");
        $("#confirm_documents")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#confirm_documents").closest(".form-group").removeClass("has-error");
      } else {
        $("#confirm_documents_missing").removeClass("hidden");
        $("#confirm_documents").closest(".form-group").addClass("has-error");
        var errmsg = $("#confirm_documents")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#confirm_documents")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var confirm_risk = $("#confirm_risk").length
        ? $("#confirm_risk").prop("checked")
        : true;
      if (confirm_risk) {
        $("#confirm_risk_missing").addClass("hidden");
        $("#confirm_risk")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#confirm_risk").closest(".form-group").removeClass("has-error");
      } else {
        $("#confirm_risk_missing").removeClass("hidden");
        $("#confirm_risk").closest(".form-group").addClass("has-error");
        var errmsg = $("#confirm_risk")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#confirm_risk")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var client_agreement = $("#confirm_client_agreement").length
        ? $("#confirm_client_agreement").prop("checked")
        : true;
      if (client_agreement) {
        $("#confirm_client_agreement_missing").addClass("hidden");
        $("#confirm_client_agreement")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#confirm_client_agreement")
          .closest(".form-group")
          .removeClass("has-error");
      } else {
        $("#confirm_client_agreement_missing").removeClass("hidden");
        $("#confirm_client_agreement")
          .closest(".form-group")
          .addClass("has-error");
        var errmsg = $("#confirm_client_agreement")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#confirm_client_agreement")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      var gdpr_agreement = $("#signup_gdpr").length
        ? $("#signup_gdpr").prop("checked")
        : true;
      if (gdpr_agreement) {
        $("#signup_gdpr_missing").addClass("hidden");
        $("#signup_gdpr")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#signup_gdpr").closest(".form-group").removeClass("has-error");
      } else {
        $("#signup_gdpr_missing").removeClass("hidden");
        $("#signup_gdpr").closest(".form-group").addClass("has-error");
        var errmsg = $("#signup_gdpr")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missing");
        $("#signup_gdpr")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register = false;
      }
      $("input.agreement[type=checkbox],input.digital-agreement").each(
        function () {
          if ($(this).prop("checked")) {
            $(this).closest(".form-group").removeClass("has-error");
            $(this)
              .closest(".form-group")
              .find(".help-block")
              .addClass("hidden");
            $(this)
              .closest(".form-group")
              .find(".pop_me_over")
              .addClass("hidden");
          } else {
            $(this).closest(".form-group").addClass("has-error");
            $(this)
              .closest(".form-group")
              .find(".help-block")
              .removeClass("hidden");
            var errmsg = $(this).hasClass("digital-agreement")
              ? "Digital signature is required"
              : $(this)
                  .closest(".form-group")
                  .find(".pop_me_over")
                  .attr("data-missing");
            $(this)
              .closest(".form-group")
              .find(".pop_me_over")
              .attr("data-content", errmsg);
            $(this)
              .closest(".form-group")
              .find(".pop_me_over")
              .removeClass("hidden");
            can_register = false;
          }
        }
      );
    }
    return can_register;
  },
  completeFastRegistration: function (action, captcha_secret_key, skipdetails) {
    var can_register = false;
    var skipdetail = typeof skipdetails !== "undefined" ? skipdetails : 0;
    can_register = signup.checkFastRegistrationForm(skipdetail);
    if (can_register) {
      if (captcha_secret_key == "") {
        can_register = true;
      } else {
        var captcha_val = $("#g-recaptcha-response").val();
        if (captcha_val == "") {
          can_register = false;
          $("#no_robot_missing").removeClass("hidden");
        } else {
          can_register = signup.checkValidCaptcha(
            captcha_val,
            captcha_secret_key
          );
          if (can_register) {
            $("#no_robot_missing").addClass("hidden");
          } else {
            $("#no_robot_missing").removeClass("hidden");
          }
        }
      }
    }
    if (can_register) {
      $("#fast_register").loader();
      var fname = $("#fname").val();
      fname = typeof fname == "undefined" || fname == null ? "" : fname.trim();
      var lname = $("#lname").val();
      lname = typeof lname == "undefined" || lname == null ? "" : lname.trim();
      var userEmail = $("#userEmail").val();
      userEmail =
        typeof userEmail == "undefined" || userEmail == null
          ? ""
          : userEmail.trim();
      var userPassword = $("#userPassword").val();
      userPassword =
        typeof userPassword == "undefined" || userPassword == null
          ? ""
          : userPassword.trim();
      var tel = $("#tel").val();
      tel = typeof tel == "undefined" || tel == null ? "" : tel.trim();
      var cou_id = $("#cou_id").val();
      cou_id =
        typeof cou_id == "undefined" || cou_id == null ? "" : cou_id.trim();
      var telcode = $("#tel_country_code").val();
      telcode =
        typeof telcode == "undefined" || telcode == null ? "" : telcode.trim();
      var tel_pc = $("#tel_provider_code").val();
      tel_pc =
        typeof tel_pc == "undefined" || tel_pc == null ? "" : tel_pc.trim();
      var province_id = $("#province_id").val();
      province_id =
        typeof province_id == "undefined" || province_id == null
          ? ""
          : province_id.trim();
      var ib_id = $("#ib_id").val();
      var sidi = $("#sidi").val().trim();
      var sidc = $("#sidc").val().trim();
      var slink_id =
        typeof $("#slink_id").val() === "undefined"
          ? 0
          : $("#slink_id").val().trim();
      var su_id = $("#su_id").val().trim();
      var is_ib = $("#is_ib").val();
      var brd = $("#brd").val();
      brd = typeof brd == "undefined" || brd == null ? "" : brd.trim();
      var currency = $("#currency").val();
      currency =
        typeof currency == "undefined" || currency == null
          ? ""
          : currency.trim();
      var targetval = $("#targetval").val();
      var no_email = $("#no_email").prop("checked") ? 1 : 0;
      var su_id = $("#su_id").val().trim();
      var lead_method = $("#leadmethd").val();
      var tc_confirmed = $("#confirm_documents").length
        ? $("#confirm_documents").prop("checked")
          ? 1
          : 0
        : 1;
      var best_interest = $("#confirm_risk").length
        ? $("#confirm_risk").prop("checked")
          ? 1
          : 0
        : 1;
      var client_agreement = $("#confirm_client_agreement").length
        ? $("#confirm_client_agreement").prop("checked")
          ? 1
          : 0
        : 1;
      var label = $("#label").val();
      var langReg = $("#langReg").val().trim();
      var cstt_id = $("#cstt_id").length ? $("#cstt_id").val() : 0;
      var referral_key = $("#referral_key").val();
      referral_key = typeof referral_key == "undefined" ? "" : referral_key;
      var service_id = $("#service_id").val();
      service_id = typeof service_id == "undefined" ? 0 : service_id;
      var as_id_demo = $("#as_id_demo").val();
      as_id_demo =
        typeof as_id_demo == "undefined" ||
        as_id_demo == null ||
        as_id_demo == ""
          ? 0
          : as_id_demo;
      var leverage_demo = $("#leverage_demo").val();
      leverage_demo =
        typeof leverage_demo == "undefined" ||
        leverage_demo == null ||
        leverage_demo == ""
          ? 0
          : leverage_demo;
      var initial_deposit_demo = $("#initial_deposit_demo").val();
      initial_deposit_demo =
        typeof initial_deposit_demo == "undefined" ||
        initial_deposit_demo == null ||
        initial_deposit_demo == ""
          ? 0
          : initial_deposit_demo;
      var click_id = $("#click_id").val();
      click_id = typeof click_id == "undefined" ? "" : click_id;
      $.ajax({
        url: "/cfc/signup.cfc?method=completeReagistration",
        type: "POST",
        data: {
          fname: fname,
          lname: lname,
          email: userEmail,
          password: userPassword,
          tel: tel,
          telcode: telcode,
          tel_pc: tel_pc,
          cou_id: cou_id,
          ib_id: ib_id,
          sidi: sidi,
          sidc: sidc,
          slink_id: slink_id,
          is_ib: is_ib,
          su_id: su_id,
          currency: currency,
          emailInstantNotification: "PROFILECREATED",
          targetval: targetval,
          create_company: 0,
          tc_confirmed: tc_confirmed,
          best_interest: best_interest,
          client_agreement: client_agreement,
          no_email: no_email,
          su_id: su_id,
          is_signup_complete: 0,
          lead_method: lead_method,
          langReg: langReg,
          label: label,
          brd: brd,
          cstt_id: cstt_id,
          province_id: province_id,
          service_id: service_id,
          referral_key: referral_key,
          as_id_demo: as_id_demo,
          leverage_demo: leverage_demo,
          initial_deposit_demo: initial_deposit_demo,
          click_id: click_id,
        },
      })
        .done(function (data) {
          if (data == "-1") {
            $("#email_exists").removeClass("hidden");
            valid_email = false;
          } else {
            $("#email_exists").addClass("hidden");
            valid_email = true;
            $("#registerForm").attr("action", action);
            $("#registerForm").attr("target", targetval);
            $("#registerForm").submit();
            var agreement_id_arr = [];
            var signatured_id_arr = [];
            var i = 0;
            var customer_no =
              typeof data == "string" ? "CU" + parseInt(data) : "";
            $("input.agreement[type=checkbox],input.digital-agreement").each(
              function () {
                if ($(this).prop("checked")) {
                  var agreement_id = $(this).data("agreement_id");
                  agreement_id_arr[i] = agreement_id;
                  if ($(this).hasClass("digital-agreement")) {
                    signatured_id_arr.push(agreement_id);
                  }
                  i++;
                }
              }
            );
            $.ajax({
              url: "/cfc/controller.cfc?method=setCustomerAgreements",
              type: "POST",
              data: {
                agreement_id_list: agreement_id_arr.toString(),
                signatured_id_list: signatured_id_arr.toString(),
                customer_no: customer_no,
              },
            })
              .done(function (result) {})
              .fail(function () {});
            if (signatured_id_arr.length > 0) {
              signup.updateCustomerSignature(userEmail, customer_no);
            }
          }
        })
        .fail(function () {
          valid_email = false;
        })
        .always(function () {});
    }
  },
  completeEventRegistration: function (args) {
    var can_register = false;
    can_register = signup.checkFastRegistrationForm();
    if (can_register) {
      if (args.captcha_secret_key == "") {
        can_register = true;
      } else {
        var captcha_val = $("#g-recaptcha-response").val();
        if (captcha_val == "") {
          can_register = false;
          $("#no_robot_missing").removeClass("hidden");
        } else {
          can_register = signup.checkValidCaptcha(
            captcha_val,
            args.captcha_secret_key
          );
          if (can_register) {
            $("#no_robot_missing").addClass("hidden");
          } else {
            $("#no_robot_missing").removeClass("hidden");
          }
        }
      }
    }
    if (can_register) {
      var fname = $("#fname").val();
      fname = typeof fname == "undefined" || fname == null ? "" : fname.trim();
      var lname = $("#lname").val();
      lname = typeof lname == "undefined" || lname == null ? "" : lname.trim();
      var userEmail = $("#userEmail").val();
      userEmail =
        typeof userEmail == "undefined" || userEmail == null
          ? ""
          : userEmail.trim();
      var userPassword = $("#userPassword").val();
      userPassword =
        typeof userPassword == "undefined" || userPassword == null
          ? ""
          : userPassword.trim();
      var tel = $("#tel").val();
      tel = typeof tel == "undefined" || tel == null ? "" : tel.trim();
      var cou_id = $("#cou_id").val();
      cou_id =
        typeof cou_id == "undefined" || cou_id == null ? "" : cou_id.trim();
      var telcode = $("#tel_country_code").val();
      telcode =
        typeof telcode == "undefined" || telcode == null ? "" : telcode.trim();
      var tel_pc = $("#tel_provider_code").val();
      tel_pc =
        typeof tel_pc == "undefined" || tel_pc == null ? "" : tel_pc.trim();
      var ib_id = $("#ib_id").val();
      var sidi = $("#sidi").val().trim();
      var sidc = $("#sidc").val().trim();
      var slink_id =
        typeof $("#slink_id").val() === "undefined"
          ? 0
          : $("#slink_id").val().trim();
      var su_id = $("#su_id").val().trim();
      var is_ib = $("#is_ib").val();
      var brd = $("#brd").val();
      brd = typeof brd == "undefined" || brd == null ? "" : brd.trim();
      var currency = $("#currency").val();
      currency =
        typeof currency == "undefined" || currency == null
          ? ""
          : currency.trim();
      var targetval = $("#targetval").val();
      var lead_method = $("#leadmethd").val();
      var event_campaign_id = $("#event_campaign_id").val();
      var no_email = $("#no_email").prop("checked") ? 1 : 0;
      var best_interest = $("#confirm_risk").length
        ? $("#confirm_risk").prop("checked")
          ? 1
          : 0
        : 1;
      var client_agreement = $("#confirm_client_agreement").length
        ? $("#confirm_client_agreement").prop("checked")
          ? 1
          : 0
        : 1;
      var tc_confirmed = $("#confirm_documents").length
        ? $("#confirm_documents").prop("checked")
          ? 1
          : 0
        : 1;
      var langReg = $("#langReg").val().trim();
      var label = $("#label").val();
      var cstt_id = $("#cstt_id").length ? $("#cstt_id").val() : 0;
      var valid_email = signup.checkEmail();
      var referral_key = $("#referral_key").val();
      referral_key = typeof referral_key == "undefined" ? "" : referral_key;
      var click_id = $("#click_id").val();
      click_id = typeof click_id == "undefined" ? "" : click_id;
      if (valid_email == "success") {
        $.ajax({
          url: "/cfc/signup.cfc?method=completeReagistration",
          type: "POST",
          data: {
            fname: fname,
            lname: lname,
            email: userEmail,
            password: userPassword,
            tel: tel,
            telcode: telcode,
            tel_pc: tel_pc,
            cou_id: cou_id,
            ib_id: ib_id,
            sidi: sidi,
            sidc: sidc,
            slink_id: slink_id,
            is_ib: is_ib,
            su_id: su_id,
            currency: currency,
            emailInstantNotification: "PROFILECREATED",
            targetval: targetval,
            create_company: 0,
            best_interest: best_interest,
            client_agreement: client_agreement,
            tc_confirmed: tc_confirmed,
            no_email: no_email,
            is_signup_complete: 0,
            lead_method: lead_method,
            event_campaign_id: event_campaign_id,
            langReg: langReg,
            label: label,
            brd: brd,
            cstt_id: cstt_id,
            referral_key: referral_key,
            click_id: click_id,
          },
        })
          .done(function (data) {
            $("#registerForm").addClass("hidden");
            if (parseInt(data) == 0) {
              $("#event_registration_response").removeClass("hidden");
              $("#event_campaign_id_missing").addClass("hidden");
              $("#event_registration_response_message")
                .addClass("alert-danger")
                .removeClass("alert-info")
                .html(lang.string("event_registration_fail"));
              return false;
            } else {
              $.ajax({
                url: "/cfc/controller.cfc?method=checkEventRegistration",
                type: "POST",
                data: {
                  event_campaign_id: args.event_campaign_id,
                  campaignl_id: args.campaignl_id,
                  campaign_channelm_id: args.campaign_channelm_id,
                  fname: fname,
                  lname: lname,
                  userEmail: userEmail,
                  tel: tel,
                  telcode: telcode,
                  customer_no: args.customer_no,
                },
              })
                .done(function (result) {
                  $("#event_registration_response").removeClass("hidden");
                  $("#event_campaign_id_missing").addClass("hidden");
                  $("#event_registration_response_message")
                    .addClass("alert-info")
                    .removeClass("alert-danger")
                    .html(result);
                  return false;
                })
                .fail(function () {});
            }
          })
          .fail(function () {
            valid_email = false;
          })
          .always(function () {});
      } else {
        $.ajax({
          url: "/cfc/controller.cfc?method=checkEventRegistration",
          type: "POST",
          data: {
            event_campaign_id: args.event_campaign_id,
            campaignl_id: args.campaignl_id,
            campaign_channelm_id: args.campaign_channelm_id,
            fname: fname,
            lname: lname,
            userEmail: userEmail,
            tel: tel,
            telcode: telcode,
          },
        })
          .done(function (result) {
            $("#registerForm").addClass("hidden");
            $("#event_registration_response").removeClass("hidden");
            $("#event_campaign_id_missing").addClass("hidden");
            $("#event_registration_response_message")
              .addClass("alert-info")
              .removeClass("alert-danger")
              .html(result);
            return false;
          })
          .fail(function () {});
      }
    }
  },
  checkPassword: function () {
    var userPassword = $("#userPassword").val();
    var confirmUserPassword = $("#confirmUserPassword").val();
    var can_register = true;
    var valid_password = true;
    if (userPassword == "") {
      $("#password_missing").removeClass("hidden");
      $("#userPassword").closest(".form-group").addClass("has-error");
      var errmsg = $("#userPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#userPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#userPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register &= false;
    } else {
      $("#password_missing").addClass("hidden");
      $("#userPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#userPassword").closest(".form-group").removeClass("has-error");
    }
    if (confirmUserPassword == "") {
      $("#confirm_password_missing").removeClass("hidden");
      $("#confirmUserPassword").closest(".form-group").addClass("has-error");
      var errmsg = $("#confirmUserPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-missing");
      $("#confirmUserPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .attr("data-content", errmsg);
      $("#confirmUserPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .removeClass("hidden");
      can_register &= false;
    } else {
      $("#confirm_password_missing").addClass("hidden");
      $("#confirmUserPassword")
        .closest(".form-group")
        .find(".pop_me_over")
        .addClass("hidden");
      $("#confirmUserPassword").closest(".form-group").removeClass("has-error");
    }
    if (userPassword != "" && confirmUserPassword != "") {
      var policy = signup.checkPasswordPolicy(userPassword);
      if (policy == 1) {
        $("#password_warning").addClass("hidden");
        $("#password_missing").addClass("hidden");
        $("#confirm_password_missing").addClass("hidden");
        $("#password_missmatch").addClass("hidden");
        $("#valid_password_missing").addClass("hidden");
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#userPassword").closest(".form-group").removeClass("has-error");
      } else {
        $("#password_warning").removeClass("hidden");
        $("#userPassword").closest(".form-group").addClass("has-error");
        var errmsg = $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-warning");
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register &= false;
        valid_password &= false;
      }
    }
    if (can_register && valid_password) {
      if (userPassword == confirmUserPassword) {
        $("#password_warning").addClass("hidden");
        $("#password_missing").addClass("hidden");
        $("#confirm_password_missing").addClass("hidden");
        $("#password_missmatch").addClass("hidden");
        $("#valid_password_missing").addClass("hidden");
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#userPassword").closest(".form-group").removeClass("has-error");
        $("#confirmUserPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .addClass("hidden");
        $("#confirmUserPassword")
          .closest(".form-group")
          .removeClass("has-error");
      } else {
        $("#password_warning").addClass("hidden");
        $("#password_missing").addClass("hidden");
        $("#confirm_password_missing").addClass("hidden");
        $("#password_missmatch").removeClass("hidden");
        $("#userPassword").closest(".form-group").addClass("has-error");
        var errmsg = $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missmatch");
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#userPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        $("#confirmUserPassword").closest(".form-group").addClass("has-error");
        var errmsg = $("#confirmUserPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-missmatch");
        $("#confirmUserPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .attr("data-content", errmsg);
        $("#confirmUserPassword")
          .closest(".form-group")
          .find(".pop_me_over")
          .removeClass("hidden");
        can_register &= false;
      }
    }
    return can_register;
  },
  getSignatureRecordCount: function (email, from_dt) {
    var recordcount;
    $.ajax({
      url: "/cfc/controller.cfc?method=getSignatureRecordCount",
      type: "POST",
      async: false,
      data: { email: email, from_dt: from_dt },
    })
      .done(function (result) {
        recordcount = result;
      })
      .fail(function () {});
    return recordcount;
  },
  deleteSignatureHistory: function (email, from_dt) {
    $.ajax({
      url: "/cfc/controller.cfc?method=deleteSignatureHistory",
      type: "POST",
      data: { email: email, from_dt: from_dt },
    })
      .done(function (result) {})
      .fail(function () {});
  },
  updateCustomerSignature: function (email, customer_no) {
    $.ajax({
      url: "/cfc/controller.cfc?method=updateCustomerSignature",
      type: "POST",
      data: { email: email, customer_no: customer_no },
    })
      .done(function (result) {})
      .fail(function () {});
  },
};
