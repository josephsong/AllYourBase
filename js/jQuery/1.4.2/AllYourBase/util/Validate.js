AYB.namespace('AYB.util.validate');

AYB.util.validate = {
	
	REGEXP: {
		CREDIT_CARD: new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/),
		CREDIT_CARD_SECURITY_CODE: new RegExp(/^[0-9]{3,4}$/),
		EMAIL: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
		PHONE: new RegExp(/^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/),
		ZIP: new RegExp(/^[0-9]{5}(-[0-9]{4})?$/)
	},

	
	CLASSES: {
		CREDIT_CARD: "validate-credit-card",
		CREDIT_CARD_SECURITY_CODE: "validate-credit-card-security-code",
		EMAIL: "validate-email",
		FORM_VALIDATE_FLAG: "validate-on-submit",
		INVALID: "invalid",
		PHONE: "validate-telephone",
		REQUIRED: "validate-required",
		ZIP: "validate-zip",
		VALIDATE_CONFIRM: "validate-confirm"
	},
	
	
	_findForm: function (form_to_validate) {
        if (!form_to_validate) {
            return null;
        }
        form_to_validate = $(form_to_validate);
        if (form_to_validate[0].tagName !== "FORM") {
            form_to_validate = form_to_validate.parent("form");
        }
        return form_to_validate;
    },
	
    _isFlaggedForValidation: function (form_to_validate) {
        if (form_to_validate && form_to_validate.hasClass(AYB.util.validate.CLASSES.FORM_VALIDATE_FLAG)) {
            return form_to_validate;
        } else {
            return false;
        }
    },
	
    _validateFields: function (form_to_validate) {
		
		if (!Array.prototype.every)
		{
		  Array.prototype.every = function(fun /*, thisp*/)
		  {
		    var len = this.length >>> 0;
		    if (typeof fun != "function")
		      throw new TypeError();
		
		    var thisp = arguments[1];
		    for (var i = 0; i < len; i++)
		    {
		      if (i in this &&
		          !fun.call(thisp, this[i], i, this))
		        return false;
		    }
		
		    return true;
		  };
		}
		
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.INVALID).each(function () {
			el = $(this);
            el.removeClass(AYB.util.validate.CLASSES.INVALID);
        });
        return [
				AYB.util.validate._validateRequiredFields(form_to_validate),
				AYB.util.validate._validateCreditCards(form_to_validate),
				AYB.util.validate._validateCreditCardSecurityCodes(form_to_validate),
				AYB.util.validate._validateEmails(form_to_validate),
				AYB.util.validate._validatePhones(form_to_validate),
				AYB.util.validate._validateZips(form_to_validate),
				AYB.util.validate._validateConfirm(form_to_validate)
		].every(function (validate_error) {
            return validate_error;
        });
    },
	
    _validateRequiredFields: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.REQUIRED).each(function () {
			el = $(this);
            if (!el.attr("value")) {
                var val = "";
            } else {
                var val = el.attr("value").trim();
            }
            if (val === el.attr("title") || val === "") {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }

        });
        return flag;
    },
	
    _validateCreditCards: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.CREDIT_CARD).each(function () {
			el = $(this);
            var val_to_test = false;
            var val = el.attr("value").trim();
            if (val) {
                val_to_test = val.replace(/[^0-9]+/gi, "");
            }
            if (val !== "" && !AYB.util.validate.REGEXP.CREDIT_CARD.test(val_to_test)) {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }
        });
        return flag;
    },
	
    _validateCreditCardSecurityCodes: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.CREDIT_CARD_SECURITY_CODE).each(function () {
			el = $(this);
            var val_to_test = false;
            var val = el.attr("value").trim();
            if (val) {
                val_to_test = val.replace(/[^0-9]+/gi, "");
            }
            if (val !== "" && !AYB.util.validate.REGEXP.CREDIT_CARD_SECURITY_CODE.test(val_to_test)) {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }
        });
        return flag;
    },
	
    _validateEmails: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.EMAIL).each(function () {
			el = $(this);
            var val = el.attr("value").trim();
            if (val !== "" && !AYB.util.validate.REGEXP.EMAIL.test(val) || val === "") {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }
        });
        return flag;
    },
	
    _validatePhones: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.PHONE).each(function () {
			el = $(this);
            var val = el.attr("value").trim();
            if (val !== "" && !AYB.util.validate.REGEXP.PHONE.test(val)) {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }
        });
        return flag;
    },
	
    _validateZips: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.ZIP).each(function () {
			el = $(this);
            var val = el.attr("value").trim();
            if (val !== "" && !AYB.util.validate.REGEXP.ZIP.test(val) || val === "") {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }
        });
        return flag;
    },
	
    _validateConfirm: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).find("." + AYB.util.validate.CLASSES.VALIDATE_CONFIRM).each(function () {
			el = $(this);
            var el_match = $(form_to_validate).find("input[name=" + el.attr("rel") + "]")[0];
            if (!el.attr("value")) {
                var val = "";
            } else {
                var val = el.attr("value").trim();
            }
            if (!el_match.attr("value")) {
                var val_match = "";
            } else {
                var val_match = el_match.attr("value").trim();
            }
            if (val === el.attr("title") || val === "" || val != val_match) {
                el.addClass(AYB.util.validate.CLASSES.INVALID);
                flag = false;
            }

        });
        return flag;
    },
	
    validate: function (e) {
		
        var form_to_validate = AYB.util.validate._findForm(e.target);
        if (form_to_validate && AYB.util.validate._isFlaggedForValidation(form_to_validate)) {
			var is_valid = AYB.util.validate._validateFields(form_to_validate);
            return is_valid;
        } else {
            return null;
        }
    }
			
	
}
