AYB.namespace("AYB.util");

AYB.util.Validate = {
	
    _findForm: function (form_to_validate) {
        if (!form_to_validate) {
            return null;
        }
        form_to_validate = $(form_to_validate);
        if (form_to_validate.get("tag") !== "form") {
            form_to_validate = form_to_validate.getParent("form");
        }
        return form_to_validate;
    },
	
    _isFlaggedForValidation: function (form_to_validate) {
        if (form_to_validate && form_to_validate.hasClass(AYB.util.Validate.CLASSES.FORM_VALIDATE_FLAG)) {
            return form_to_validate;
        } else {
            return false;
        }
    },
	
    _validateFields: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.INVALID).each(function (el) {
            el.removeClass(AYB.util.Validate.CLASSES.INVALID);
        },
        AYB.util.Validate);
        return [
				AYB.util.Validate._validateRequiredFields(form_to_validate),
				AYB.util.Validate._validateCreditCards(form_to_validate),
				AYB.util.Validate._validateCreditCardSecurityCodes(form_to_validate),
				AYB.util.Validate._validateEmails(form_to_validate),
				AYB.util.Validate._validatePhones(form_to_validate),
				AYB.util.Validate._validateZips(form_to_validate),
				AYB.util.Validate._validateConfirm(form_to_validate)
		].every(function (validate_error) {
            return validate_error;
        });
    },
	
    _validateRequiredFields: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.REQUIRED).each(function (el) {
            if (!el.get("value")) {
                var val = "";
            } else {
                var val = el.get("value").trim();
            }
            if (val === el.get("title") || val === "") {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
            if (el.get("type") && el.get("type") === "radio" && !AYB.ui.form.findRadioValue(el.form[el.get("name")])) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                el.getParent().addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validateCreditCards: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.CREDIT_CARD).each(function (el) {
            var val_to_test = false;
            var val = el.get("value").trim();
            if (val) {
                val_to_test = val.replace(/[^0-9]+/gi, "");
            }
            if (val !== "" && !AYB.util.Validate.REGEXP.CREDIT_CARD.test(val_to_test)) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validateCreditCardSecurityCodes: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.CREDIT_CARD_SECURITY_CODE).each(function (el) {
            var val_to_test = false;
            var val = el.get("value").trim();
            if (val) {
                val_to_test = val.replace(/[^0-9]+/gi, "");
            }
            if (val !== "" && !AYB.util.Validate.REGEXP.CREDIT_CARD_SECURITY_CODE.test(val_to_test)) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validateEmails: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.EMAIL).each(function (el) {
            var val = el.get("value").trim();
            if (val !== "" && !AYB.util.Validate.REGEXP.EMAIL.test(val)) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validatePhones: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.PHONE).each(function (el) {
            var val = el.get("value").trim();
            if (val !== "" && !AYB.util.Validate.REGEXP.PHONE.test(val)) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validateZips: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.ZIP).each(function (el) {
            var val = el.get("value").trim();
            if (val !== "" && !AYB.util.Validate.REGEXP.ZIP.test(val)) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    _validateConfirm: function (form_to_validate) {
        var flag = true;
        $(form_to_validate).getElements("." + AYB.util.Validate.CLASSES.VALIDATE_CONFIRM).each(function (el) {
            var el_match = $(form_to_validate).getElements("input[name=" + el.getAttribute("rel") + "]")[0];
            if (!el.get("value")) {
                var val = "";
            } else {
                var val = el.get("value").trim();
            }
            if (!el_match.get("value")) {
                var val_match = "";
            } else {
                var val_match = el_match.get("value").trim();
            }
            if (val === el.get("title") || val === "" || val != val_match) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
            if (el.get("type") && el.get("type") === "radio" && !AYB.ui.form.findRadioValue(el.form[el.get("name")])) {
                el.addClass(AYB.util.Validate.CLASSES.INVALID);
                el.getParent().addClass(AYB.util.Validate.CLASSES.INVALID);
                flag = false;
            }
        },
        AYB.util.Validate);
        return flag;
    },
	
    validate: function (e) {
        var form_to_validate = AYB.util.Validate._findForm(e.target);
        if (form_to_validate && AYB.util.Validate._isFlaggedForValidation(form_to_validate)) {
            return AYB.util.Validate._validateFields(form_to_validate);
        } else {
            return null;
        }
    }
};

AYB.util.Validate.CLASSES = {
    CREDIT_CARD: "validate-credit-card",
    CREDIT_CARD_SECURITY_CODE: "validate-credit-card-security-code",
    EMAIL: "validate-email",
    FORM_VALIDATE_FLAG: "validate-on-submit",
    INVALID: "invalid",
    PHONE: "validate-telephone",
    REQUIRED: "validate-required",
    ZIP: "validate-zip",
    VALIDATE_CONFIRM: "validate-confirm"
};

AYB.util.Validate.REGEXP = {
    CREDIT_CARD: new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/),
    CREDIT_CARD_SECURITY_CODE: new RegExp(/^[0-9]{3,4}$/),
    EMAIL: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    PHONE: new RegExp(/^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/),
    ZIP: new RegExp(/^[0-9]{5}(-[0-9]{4})?$/)
};
